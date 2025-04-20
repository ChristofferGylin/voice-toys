import { createContext, ReactNode, useRef, Ref, useContext, useState, useEffect } from "react"
import { StateFx, ToneFx } from "./types/Fx"
import { Gain, getContext, Player, start, UserMedia } from "tone";

type ControlSettingsType = {
    isLooping: boolean;
    muteInput: boolean;
    muteOutput: boolean;
    micGainValue: number;
    masterVolumeValue: number;
    isRecording: boolean;
    isPlaying: boolean;
}

type ContextType = {
    audioUrl: string | null;
    controlSettings: ControlSettingsType;
    masterVolumeSetter: (value: number) => void;
    micGainSetter: (value: number) => void
    onExport: () => void;
    onStartRecord: () => void;
    onStopRecord: () => void;
    onStartMic: () => void;
    onCloseMic: () => void;
    onStartPlay: () => void;
    onStopPlay: () => void;
    stateFx: (StateFx | null)[]
    stateFxSetter: (inded: number, fx: StateFx | null) => void;
    onToggleLoop: () => void;
    onToggleMuteInput: () => void;
    onToggleMuteOutput: () => void;
    toneFx: Ref<(ToneFx | null)[]>;
    toneFxSetter: (index: number, fx: ToneFx) => void;
}

const FxContext = createContext<ContextType | undefined>(undefined)

export const FxContextProvider = ({ children }: { children: ReactNode }) => {
    const [stateFx, setStateFx] = useState<(StateFx | null)[]>(Array(6).fill(null))
    const toneFx = useRef<(ToneFx | null)[]>(Array(6).fill(null))
    const mic = useRef<UserMedia | null>(null)
    const micGain = useRef<Gain | null>(null)
    const inputGain = useRef<Gain | null>(null)
    const outputGain = useRef<Gain | null>(null)
    const masterVolume = useRef<Gain | null>(null)
    const samplePlayer = useRef<Player | null>(null)
    const inputMediaRecorder = useRef<MediaRecorder | null>(null)
    const inputRecordedChunks = useRef<Blob[]>([])
    const outputMediaRecorder = useRef<MediaRecorder | null>(null)
    const outputRecordedChunks = useRef<Blob[]>([])
    const [controlSettings, setControlSettings] = useState<ControlSettingsType>({
        isLooping: false,
        muteInput: false,
        muteOutput: false,
        micGainValue: 1,
        masterVolumeValue: 1,
        isRecording: false,
        isPlaying: false,
    })
    const [audioUrl, setAudioUrl] = useState<string | null>(null)

    const samplePlayerOnStop = () => {
        setControlSettings((oldValue) => {
            const newValue = {...oldValue}
            newValue.isPlaying = false

            return newValue
        })
    }


    useEffect(() => {
        mic.current = new UserMedia()
        micGain.current = new Gain(1)
        inputGain.current = new Gain(1)
        outputGain.current = new Gain(1)
        masterVolume.current = new Gain(1)
        samplePlayer.current = new Player()
        samplePlayer.current.onstop = samplePlayerOnStop
        mic.current.connect(micGain.current)
        micGain.current.connect(inputGain.current)
        samplePlayer.current.connect(inputGain.current)
        inputGain.current.connect(outputGain.current)
        outputGain.current.connect(masterVolume.current)
        masterVolume.current.toDestination()

        const setUpRecoder = (input: Gain, mediaRecorderRef: React.RefObject<MediaRecorder | null>, recordedChunks: React.RefObject<Blob[]>, setUrl?: (url: string) => void) => {
            const raw = getContext().rawContext as AudioContext
            const dest = raw.createMediaStreamDestination()
            input.connect(dest)

            mediaRecorderRef.current = new MediaRecorder(dest.stream)

            mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size > 0) recordedChunks.current.push(e.data)
            }

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(recordedChunks.current, {type: "audio/webm"})
                const url = URL.createObjectURL(blob)
                
                
                if (setUrl) {
                    setUrl(url)
                } else {
                    samplePlayer.current?.load(url)
                }
            }
        }

        setUpRecoder(micGain.current, inputMediaRecorder, inputRecordedChunks)
        setUpRecoder(outputGain.current, outputMediaRecorder, outputRecordedChunks, (url) => {setAudioUrl(url)})

    }, [])

    const onStartMic = async () => {

        try {

            const toneContext = getContext()

            if (toneContext.state !== 'running') {
                await start()
            }
            
            await mic.current?.open() 

            console.log("Microphone is open")
        } catch (err) {
            console.error("Error opening microphone", err)
        }
        
    }
    
    const onCloseMic = async () => {

        try {
            
            await mic.current?.close()

            console.log("Microphone is close")
        } catch (err) {
            console.error("Error closing microphone", err)
        }
        
    }

    const micGainSetter = (value: number) => {
                
        if (!micGain.current) return
    
        setControlSettings((oldValue) => {
            const newValue = {...oldValue}
            newValue.micGainValue = value

            return newValue
        })
        
        micGain.current.gain.value = value
    }
    
    const masterVolumeSetter = (value: number) => {
                
        if (!masterVolume.current) return
    
        setControlSettings((oldValue) => {
            const newValue = {...oldValue}
            newValue.masterVolumeValue = value

            return newValue
        })
        
        masterVolume.current.gain.value = value
    }

    const onToggleMuteInput = () => {
        setControlSettings((oldValue) => {
            if (!micGain.current) return oldValue
            const newValue = {...oldValue}

            newValue.muteInput = !newValue.muteInput

            if (newValue.muteInput) {
                micGain.current.gain.value = 0
            } else {
                micGain.current.gain.value = controlSettings.micGainValue
            }

            return newValue
        })
    }
    
    const onToggleMuteOutput = () => {
        setControlSettings((oldValue) => {
            if (!masterVolume.current) return oldValue
            const newValue = {...oldValue}

            newValue.muteOutput = !newValue.muteOutput

            if (newValue.muteOutput) {
                masterVolume.current.set({
                    gain: 0
                })
            } else {
                masterVolume.current.set({
                    gain: controlSettings.masterVolumeValue
                })
            }

            return newValue
        })
    }

    const onStartRecord = () => {
        setControlSettings((oldValue) => {
            const newValue = {...oldValue}
            newValue.isRecording = true

            return newValue
        })

        inputRecordedChunks.current = []
        inputMediaRecorder.current?.start()
    }
    const onStopRecord = () => {
        setControlSettings((oldValue) => {
            const newValue = {...oldValue}
            newValue.isRecording = false

            return newValue
        })

        inputMediaRecorder.current?.stop()
    }

    const onStartPlay = () => {
        setControlSettings((oldValue) => {
            const newValue = {...oldValue}
            newValue.isPlaying = true

            return newValue
        })
        samplePlayer.current?.start()
    }


    const onStopPlay = () => {
        setControlSettings((oldValue) => {
            const newValue = {...oldValue}
            newValue.isPlaying = false

            return newValue
        })
        samplePlayer.current?.stop()
    }

    const onToggleLoop = () => {

        setControlSettings((oldValue) => {
            const newValue = {...oldValue}

            newValue.isLooping = !newValue.isLooping

            samplePlayer.current?.set({
                loop: newValue.isLooping
            })

            return newValue
        })
    }

    const onExport = () => {

        if (!masterVolume.current || !micGain.current || !samplePlayer.current) return
        
        masterVolume.current.set({gain: 0})
        micGain.current.set({gain: 0})
        samplePlayer.current.stop()
        samplePlayer.current.set({loop: false})

        outputRecordedChunks.current = []
        outputMediaRecorder.current?.start()

        samplePlayer.current.start()
        samplePlayer.current.onstop = () => {

            if (!masterVolume.current || !micGain.current) return

            masterVolume.current.set({gain: controlSettings.masterVolumeValue})
            micGain.current.set({gain: controlSettings.micGainValue})
            outputMediaRecorder.current?.stop()

            if (!samplePlayer.current) return

            samplePlayer.current.onstop = () => {
                setControlSettings((oldValue) => {
                    const newValue = {...oldValue}
                    newValue.isPlaying = false
        
                    return newValue
                })
            }
        }
    }

    const stateFxSetter = (index: number, fx: StateFx | null) => {
        setStateFx((oldState) => {
            const newState = [...oldState]
            newState[index] = fx

            return newState
        })
    }

    const toneFxSetter = (index: number, fx: ToneFx) => {
        
        if (toneFx.current[index]) {
            toneFx.current[index].dispose()
        }
        
        toneFx.current[index] = fx
    }

    return (
        <FxContext.Provider value={{
            audioUrl,
            controlSettings,
            micGainSetter,
            onStartMic,
            onCloseMic,
            onStartPlay,
            onStopPlay,
            onStartRecord,
            onStopRecord,
            stateFx,
            stateFxSetter,
            masterVolumeSetter,
            onExport,
            onToggleLoop,
            onToggleMuteInput,
            onToggleMuteOutput,
            toneFx,
            toneFxSetter
        }}>
            {children}
        </FxContext.Provider>
    )
}

export const useFxContext = (): ContextType => {
    const context = useContext(FxContext) 

    if (!context) {
        throw new Error('Fx Context could not be loaded')
    }

    return context
}
import { useEffect, useRef, useState } from "react"
import * as Tone from "tone"
import FxContainer from "./FxContainer"

const Audio = () => {

    const mic = useRef<Tone.UserMedia | null>(null)
    const micGain = useRef<Tone.Gain | null>(null)
    const inputGain = useRef<Tone.Gain | null>(null)
    const outputGain = useRef<Tone.Gain | null>(null)
    const masterVolume = useRef<Tone.Gain | null>(null)
    const samplePlayer = useRef<Tone.Player | null>(null)
    const inputMediaRecorder = useRef<MediaRecorder | null>(null)
    const inputRecordedChunks = useRef<Blob[]>([])
    const outputMediaRecorder = useRef<MediaRecorder | null>(null)
    const outputRecordedChunks = useRef<Blob[]>([])
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [loop, setLoop] = useState(false)
    const [muteInput, setMuteInput] = useState(false)
    const [muteOutput, setMuteOutput] = useState(false)
    const [micGainValue, setMicGainValue] = useState(1)
    const [masterVolumeValue, setMasterVolumeValue] = useState(1)

    useEffect(() => {
        mic.current = new Tone.UserMedia()
        micGain.current = new Tone.Gain(1)
        inputGain.current = new Tone.Gain(1)
        outputGain.current = new Tone.Gain(1)
        masterVolume.current = new Tone.Gain(1)
        samplePlayer.current = new Tone.Player()
        
        mic.current.connect(micGain.current)
        micGain.current.connect(inputGain.current)
        samplePlayer.current.connect(inputGain.current)
        inputGain.current.connect(outputGain.current)
        outputGain.current.connect(masterVolume.current)
        masterVolume.current.toDestination()

        const setUpRecoder = (input: Tone.Gain, mediaRecorderRef: React.RefObject<MediaRecorder | null>, recordedChunks: React.RefObject<Blob[]>, setUrl?: (url: string) => void) => {
            const raw = Tone.getContext().rawContext as AudioContext
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

            const toneContext = Tone.getContext()

            if (toneContext.state !== 'running') {
                await Tone.start()
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

    const toggleMuteInput = () => {
        setMuteInput((oldValue) => {
            if (!micGain.current) return oldValue
            const newValue = !oldValue

            if (newValue) {
                micGain.current.gain.value = 0
            } else {
                micGain.current.gain.value = micGainValue
            }

            return newValue
        })
    }
    
    const toggleMuteOutput = () => {
        setMuteOutput((oldValue) => {
            if (!masterVolume.current) return oldValue
            const newValue = !oldValue

            if (newValue) {
                masterVolume.current.set({
                    gain: 0
                })
            } else {
                masterVolume.current.set({
                    gain: masterVolumeValue
                })
            }

            return newValue
        })
    }

    const onStartRecord = () => {
        inputRecordedChunks.current = []
        inputMediaRecorder.current?.start()
    }

    const onStopRecord = () => {
        inputMediaRecorder.current?.stop()
    }

    const onPlaySample = () => {
        samplePlayer.current?.start()
    }

    const onStopSample = () => {
        samplePlayer.current?.stop()
    }

    const toggleLoop = () => {
        setLoop((oldValue) => {
            const newValue = !oldValue

            samplePlayer.current?.set({
                loop: newValue
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

            masterVolume.current.set({gain: masterVolumeValue})
            micGain.current.set({gain: micGainValue})
            outputMediaRecorder.current?.stop()
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <div>
                <input type="range" min={0} max={1} step={0.01} value={micGainValue} onChange={(e) => {
                
                    if (!micGain.current) return
                
                    const value = Number(e.target.value)
                    setMicGainValue(value)
                    micGain.current.gain.value = value
                }} />
                <button onClick={onStartMic} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Open Microphone</button>
                <button onClick={onCloseMic} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Close Microphone</button>
                <button onClick={toggleMuteInput} className={`m-2 border rounded-lg hover:bg-gray-400 ${muteInput ? 'bg-red-500' : 'bg-gray-500'}`}>Mute Microphone</button>
                <button onClick={toggleMuteOutput} className={`m-2 border rounded-lg hover:bg-gray-400 ${muteOutput ? 'bg-red-500' : 'bg-gray-500'}`}>Mute Output</button>
                <button onClick={onStartRecord} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Start Recording</button>
                <button onClick={onStopRecord} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Stop Recording</button>
                <button onClick={onPlaySample} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Play</button>
                <button onClick={onStopSample} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Stop</button>
                <button onClick={toggleLoop} className={`m-2 border rounded-lg hover:bg-gray-400 ${loop ? 'bg-green-500' : 'bg-gray-500'}`}>Loop</button>
                <button onClick={onExport} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Export</button>
                <input type="range" min={0} max={1} step={0.01} value={masterVolumeValue} onChange={(e) => {
                
                    if (!masterVolume.current) return
                
                    const value = Number(e.target.value)
                    setMasterVolumeValue(value)
                    masterVolume.current.gain.value = value
                }} />
                {audioUrl && (
                    <div className="mt-4">
                        <a href={audioUrl} download="recording.webm">Download recording</a>
                    </div>
                )}
            </div>
            <FxContainer />
        </div>
    )
}

export default Audio
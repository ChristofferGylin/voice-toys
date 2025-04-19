import { useEffect, useRef, useState } from "react"
import * as Tone from "tone"
import { StateFx, ToneFx } from "../types/Fx"

const Audio = () => {
    const [stateFx, setStateFx] = useState<(StateFx | null)[]>(Array(6).fill(null))

    const toneFx = useRef<(ToneFx | null)[]>(Array(6).fill(null))

    const mic = useRef<Tone.UserMedia | null>(null)
    const micGain = useRef<Tone.Gain | null>(null)
    const inputGain = useRef<Tone.Gain | null>(null)
    const outputGain = useRef<Tone.Gain | null>(null)
    const masterVolume = useRef<Tone.Volume | null>(null)
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

    useEffect(() => {
        mic.current = new Tone.UserMedia()
        micGain.current = new Tone.Gain(1)
        inputGain.current = new Tone.Gain(1)
        outputGain.current = new Tone.Gain(1)
        masterVolume.current = new Tone.Volume(0)
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

    const onStartRecord = () => {
        inputRecordedChunks.current = []
        inputMediaRecorder.current?.start()
    }

    const onStopRecord = () => {
        inputMediaRecorder.current?.stop()
    }

    const onExport = () => {

        if (!masterVolume.current || !micGain.current) return
        
        masterVolume.current.mute = true
        micGain.current.gain.value = 0

        outputRecordedChunks.current = []
        outputMediaRecorder.current?.start()

        if (!samplePlayer.current) return

        samplePlayer.current.stop()
        samplePlayer.current.set({loop: false})
        samplePlayer.current.start()
        samplePlayer.current.onstop = () => {

            if (!masterVolume.current || !micGain.current) return

            masterVolume.current.mute = muteOutput
            micGain.current.gain.value = micGainValue
            outputMediaRecorder.current?.stop()

        }
        
    }

    return (
        <div>
            <button onClick={onStartMic} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Open Microphone</button>
            <button onClick={onCloseMic} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Close Microphone</button>
            <button onClick={onStartRecord} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Start Recording</button>
            <button onClick={onStopRecord} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Stop Recording</button>
            <button onClick={onExport} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Export</button>
            {audioUrl && (
                <div className="mt-4">
                    <a href={audioUrl} download="recording.webm">Download recording</a>
                </div>
            )}
        </div>
    )
}

export default Audio
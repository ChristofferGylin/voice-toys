import { useEffect, useRef, useState } from "react"
import * as Tone from "tone"

const Audio = () => {
    const mic = useRef<Tone.UserMedia | null>(null)
    const pitchShifter = useRef<Tone.PitchShift | null>(null)
    const phaser = useRef<Tone.Phaser | null>(null)
    const gate = useRef<Tone.Gate | null>(null)

    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const recordedChunks = useRef<Blob[]>([])
    const [audioUrl, setAudioUrl] = useState<string | null>(null)

    useEffect(() => {
        mic.current = new Tone.UserMedia()
        pitchShifter.current = new Tone.PitchShift(-3)
        phaser.current = new Tone.Phaser({
            frequency: 40,
            octaves: 1,
            baseFrequency: 100
        })
        gate.current = new Tone.Gate(-35, 0.2)

        mic.current.connect(gate.current)
        gate.current.connect(pitchShifter.current)
        pitchShifter.current.connect(phaser.current)
        phaser.current.toDestination()

        const raw = Tone.getContext().rawContext as AudioContext
        const dest = raw.createMediaStreamDestination()
        phaser.current.connect(dest)

        mediaRecorder.current = new MediaRecorder(dest.stream)

        mediaRecorder.current.ondataavailable = (e) => {
            if (e.data.size > 0) recordedChunks.current.push(e.data)
        }

        mediaRecorder.current.onstop = () => {
            const blob = new Blob(recordedChunks.current, {type: "audio/webm"})
            const url = URL.createObjectURL(blob)
            setAudioUrl(url)
        }
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
        recordedChunks.current = []
        mediaRecorder.current?.start()
    }

    const onStopRecord = () => {
        mediaRecorder.current?.stop()
    }

    return (
        <div>
            <button onClick={onStartMic} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Open Microphone</button>
            <button onClick={onCloseMic} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Close Microphone</button>
            <button onClick={onStartRecord} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Start Recording</button>
            <button onClick={onStopRecord} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Stop Recording</button>
            {audioUrl && (
                <div className="mt-4">
                    <audio controls src={audioUrl} />
                    <a href={audioUrl} download="recording.webm">Download recording</a>
                </div>
            )}
        </div>
    )
}

export default Audio
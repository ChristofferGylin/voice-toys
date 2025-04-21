import { useFxContext } from "../Context"
import FxControlPanel from "./Fx/FxControlPanel"
import FxContainer from "./FxContainer"

const Audio = () => {

    const { audioUrl, controlSettings, onStartMic, onCloseMic, onToggleMuteInput, onToggleMuteOutput, micGainSetter, masterVolumeSetter, onStartRecord, onStopRecord, onStartPlay, onStopPlay, onToggleLoop, onExport, stateFx, toneFx} = useFxContext()

    return (
        <div className="flex flex-col gap-4 items-center">
            <div>
                <input type="range" min={0} max={1} step={0.01} value={controlSettings.micGainValue} onChange={(e) => {micGainSetter(Number(e.target.value))}} />
                <button onClick={onStartMic} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Open Microphone</button>
                <button onClick={onCloseMic} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Close Microphone</button>
                <button onClick={onToggleMuteInput} className={`m-2 border rounded-lg hover:bg-gray-400 ${controlSettings.muteInput ? 'bg-red-500' : 'bg-gray-500'}`}>Mute Microphone</button>
                <button onClick={onToggleMuteOutput} className={`m-2 border rounded-lg hover:bg-gray-400 ${controlSettings.muteOutput ? 'bg-red-500' : 'bg-gray-500'}`}>Mute Output</button> 
                <button onClick={controlSettings.isRecording ? onStopRecord : onStartRecord} className={`m-2 border rounded-lg hover:bg-gray-400 ${controlSettings.isRecording ? 'bg-red-500' : 'bg-gray-500'}`}>{controlSettings.isRecording ? 'Stop' : 'Start'} Recording</button>
                <button onClick={controlSettings.isPlaying ? onStopPlay : onStartPlay} className={`m-2 border rounded-lg hover:bg-gray-400 ${controlSettings.isPlaying ? 'bg-green-500' : 'bg-gray-500'}`}>{controlSettings.isRecording ? 'Stop' : 'Start'}</button>
                <button onClick={onToggleLoop} className={`m-2 border rounded-lg hover:bg-gray-400 ${controlSettings.isLooping ? 'bg-green-500' : 'bg-gray-500'}`}>Loop</button>
                <button onClick={onExport} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Export</button>
                <input type="range" min={0} max={1} step={0.01} value={controlSettings.masterVolumeValue} onChange={(e) => {masterVolumeSetter(Number(e.target.value))}} />
                {audioUrl && (
                    <div className="mt-4">
                        <a href={audioUrl} download="recording.webm">Download recording</a>
                    </div>
                )}
            </div>
            <FxContainer />
            <div>
                {stateFx.map((fx) => {

                    if (!fx || toneFx === null) return <></>

                    return <FxControlPanel stateFx={fx} />
                })}
            </div>
        </div>
    )
}

export default Audio
import { StateFx } from "../../types/Fx";
import { scaleValue } from "../../utils/math/scaleValue";
import TurnableKnob from "../TurnableKnob/TurnableKnob";

const FxControlPanel = ({ stateFx }: { stateFx: StateFx }) => {
    
    return (
        <div className="flex flex-col gap-2 rounded bg-slate-600 shadow-lg shadow-slate-950/50 p-8 text-slate-200">
            <div>
                <h1 className="text-xl">{stateFx.name}</h1>
            </div>
            <div className="flex flex-col gap-4">
                {stateFx.params.map((param) => (
                    <div className="flex flex-col items-center">
                        <h2>{param.name}</h2>
                        <TurnableKnob
                        key={param.name}
                        value={scaleValue({value: param.value, fromScale: {start: param.min, end: param.max}, toScale: {start: 0, end: 1}})}
                        callback={(newValue) => {
                            const scaledValue = scaleValue({value: newValue, fromScale: {start: 0, end: 1}, toScale: {start: param.min, end: param.max}})
                            param.setter(scaledValue)
                        }}
                    />
                    </div>
                    
                ))}
                
            </div>
        </div>
    );
};

export default FxControlPanel;
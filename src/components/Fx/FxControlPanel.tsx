import { useEffect, useRef } from "react";
import { StateFx, StateParams } from "../../types/Fx";
import { scaleValue } from "../../utils/math/scaleValue";
import TurnableKnob from "../TurnableKnob/TurnableKnob";

const FxControlPanel = ({ stateFx, setters, params, closeModal }: { stateFx: StateFx, setters: ((value: number) => void)[], params: StateParams[], closeModal: () => void}) => {

    const modalRef = useRef<HTMLDivElement | null>(null)
    
        useEffect(() => {
    
            const onClick = (e: MouseEvent) => {
    
                if (!modalRef.current) return
                if (!modalRef.current.contains(e.target as Node)) {
                    closeModal()
                }
            }
    
            window.addEventListener('mousedown', onClick)
    
            return () => { window.removeEventListener('mousedown', onClick) }
        }, [closeModal, modalRef.current])
    
    return (
        <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-slate-950/10 backdrop-blur-xs">
            <div ref={modalRef} className="flex flex-col items-center gap-2 rounded bg-slate-600 shadow-lg shadow-slate-950/50 p-8 text-slate-200">
            <h1 className="text-2xl">{stateFx.name}</h1>
            <div className="flex flex-col gap-4">
                {params.map((param, index) => (
                    <div className="flex flex-col items-center">
                        <h2 className="text-lg">{param.name}</h2>
                        <TurnableKnob
                            key={`${param.name}#${stateFx.id}`}
                            value={scaleValue({value: param.value, fromScale: {start: param.min, end: param.max}, toScale: {start: 0, end: 1}})}
                            callback={(newValue) => {
                                const scaledValue = scaleValue({value: newValue, fromScale: {start: 0, end: 1}, toScale: {start: param.min, end: param.max}})
                                setters[index](scaledValue)
                            }}  
                        />
                        <p className="text-sm">{param.value.toFixed(2)}</p>
                    </div>
                    
                ))}
                
            </div>
        </div>
        </div>
    );
};

export default FxControlPanel;
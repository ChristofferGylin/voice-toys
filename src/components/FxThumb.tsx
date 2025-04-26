import { useState } from "react"
import { useFxContext } from "../Context"
import { StateParams, type StateFx } from "../types/Fx";
import FxControlPanel from "./Fx/FxControlPanel";
import TurnableKnob from "./TurnableKnob/TurnableKnob";
import { scaleValue } from "../utils/math/scaleValue";
import { IoIosMore } from "react-icons/io";


const FxThumb = ({ stateFx }: { stateFx: StateFx }) => {

    const { toneFx } = useFxContext()

    const [showControlPanel, setShowControlPanel] = useState(false)
    const [params, setParams] = useState<StateParams[]>(toneFx.current[stateFx.id].getParams())
    
    const setters = toneFx.current[stateFx.id].getSetters().map((setter, index) => {
        return (
            (value: number) => {
                setter(value)
                setParams((oldParams) => {
                    const newParams = [ ...oldParams ]
                    newParams[index].value = value

                    return newParams
                })
            }
        ) 
    })
    

    return (
        <>
            {showControlPanel && <FxControlPanel stateFx={stateFx} params={params} setters={setters} closeModal={() => {setShowControlPanel(false)}} />}
            <div className={`flex flex-col items-center h-full w-full p-2 gap-2 text-slate-100 text-xl bg-slate-500`}>
                <h1>{stateFx.name}</h1>
                <ul className="grid grid-cols-2">
                    {params.map((param, index) => {

                        if (index > 1) {

                            return 

                        }
                        return (
                            <li key={`${param.name}#${stateFx.id}`} className="flex flex-col items-center gap-1">
                                <h2 className="text-sm">{param.name}</h2>
                                <TurnableKnob
                                    value={scaleValue({value: param.value, fromScale: {start: param.min, end: param.max}, toScale: {start: 0, end: 1}})}
                                    callback={(newValue) => {
                                        const scaledValue = scaleValue({value: newValue, fromScale: {start: 0, end: 1}, toScale: {start: param.min, end: param.max}})
                                        setters[index](scaledValue)
                                    }}  
                                />
                                <p className="text-sm">{param.value.toFixed(2)}</p>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={() => {
                        setShowControlPanel(true) 
                        }} 
                        className="hover:text-white cursor-pointer text-2xl p-1"
                    >
                        <IoIosMore />
                    </button>
                </div>
            </div>
        </>
    )
}

export default FxThumb
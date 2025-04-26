import { useState } from "react"
import { useFxContext } from "../Context"
import { StateParams, type StateFx } from "../types/Fx";
import FxControlPanel from "./Fx/FxControlPanel";


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
            <div onClick={() => {
                setShowControlPanel(true) 
            }} className={`fx-item text-green-700 border-green-500 bg-green-400`}>
                {stateFx.name}
            </div>
        </>
    )
}

export default FxThumb
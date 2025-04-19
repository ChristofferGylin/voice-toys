import { useState } from "react";
import { StateFx } from "../types/Fx"
import { FaPlusCircle, FaArrowRight } from "react-icons/fa";
import AddFxModal from "./AddFxModal";

const FxItem = ({fx, index}: {fx: StateFx | null, index: number}) => {

    const [showAddFx, setShowAddFx] = useState(false)

    const style = "flex justify-center items-center aspect-square h-full border rounded-lg text-4xl"
    const arrowStyle = "text-5xl text-slate-500 last:hidden"
    
    if (!fx) {
        return (
            <>
                {showAddFx && <AddFxModal index={index} closeModal={() => {setShowAddFx(false)}} />}
                <button className={`${style} text-slate-500 hover:text-slate-600 border-slate-500 bg-slate-100 border-dashed text-5xl`}
                onClick={() => {
                    setShowAddFx(true)
                }}><FaPlusCircle /></button>
                <FaArrowRight className={arrowStyle}/>
            </>
        )
    }

    return (
        <>
            <button className={`${style} text-green-700 border-green-500 bg-green-400`}>{fx.name}</button>
            <FaArrowRight className={arrowStyle}/>
        </>
    )
    
    
}

export default FxItem
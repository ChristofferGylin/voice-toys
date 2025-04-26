import { useState } from "react"
import AddFxModal from "./AddFxModal";
import { FaPlusCircle } from "react-icons/fa";

const AddFxThumb = ({index}: {index: number}) => {

    const [showAddFx, setShowAddFx] = useState(false)

    return (
        <>
            {showAddFx && <AddFxModal index={index} closeModal={() => {setShowAddFx(false)}} />}
            <button className={`fx-item text-slate-500 hover:text-slate-600 border-slate-500 bg-slate-100 border-dashed text-5xl`}
            onClick={() => {
                setShowAddFx(true)
            }}><FaPlusCircle /></button>
        </>
    )
}

export default AddFxThumb
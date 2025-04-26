import { type StateFx } from "../types/Fx"
import { FaArrowRight } from "react-icons/fa";
import AddFxThumb from "./AddFxThumb";
import FxThumb from "./FxThumb";

const FxItem = ({fx, index}: {fx: StateFx | null, index: number}) => {

    const style = "flex justify-center items-center aspect-square h-full border rounded-lg text-3xl overflow-hidden"
    const arrowStyle = "text-5xl text-slate-500 last:hidden"
    
    if (!fx) {
        return (
            <>
                <div className={style}>
                    <AddFxThumb index={index} />
                </div>
                <FaArrowRight className={arrowStyle}/>
            </>
        )
    }

    return (
        <>
            <div  className={style}>
                <FxThumb stateFx={fx} />
            </div>
            <FaArrowRight className={arrowStyle}/>
        </>
    )  
}

export default FxItem
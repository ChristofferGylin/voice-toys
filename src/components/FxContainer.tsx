import { useFxContext } from "../Context";
import FxItem from "./FxItem";


const FxContainer = () => {

    const { stateFx } = useFxContext()

    return (
        <div className="flex justify-between items-center gap-4 rounded-lg h-48 border border-slate-800 p-4">
            {stateFx.map((fx, index) => {
                return <FxItem fx={fx} index={index} />
            })}
        </div>
    )
}

export default FxContainer
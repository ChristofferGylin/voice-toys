import { StateFx } from "../types/Fx"
import FxItem from "./FxItem";

type FxContainerProps = {
    stateFx: (StateFx | null)[]
}

const FxContainer = ({stateFx}: FxContainerProps) => {
    return (
        <div className="flex justify-between items-center gap-4 rounded-lg h-48 border border-slate-800 p-4">
            {stateFx.map((fx, index) => {
                return <FxItem fx={fx} index={index} />
            })}
        </div>
    )
}

export default FxContainer
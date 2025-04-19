import { StateFx, ToneFx } from "../types/Fx"
import FxItem from "./FxItem";

type FxContainerProps = {
    toneFx: (ToneFx | null)[];
    stateFx: (StateFx | null)[]
}

const FxContainer = ({toneFx, stateFx}: FxContainerProps) => {
    return (
        <div className="flex gap-4 rounded-lg h-48 border border-slate-800">
            {stateFx.map((fx) => {
                return <FxItem fx={fx}  />
            })}
        </div>
    )
}

export default FxContainer
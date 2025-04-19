import { StateFx } from "../types/Fx"

const FxItem = ({fx}: {fx: StateFx | null}) => {
    
    if (!fx) {
        return (
            <div className="flex justify-center items-center aspect-square h-full border rounded-lg text-4xl text-slate-700 border-slate-500 bg-slate-400">X</div>
        )
    }

    return (
        <div className="aspect-square h-full border rounded-lg text-4xl text-green-700 border-green-500 bg-green-400">{fx.name}</div>
    )
    
    
}

export default FxItem
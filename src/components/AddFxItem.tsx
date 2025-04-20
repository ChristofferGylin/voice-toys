import { type StateFx, type ToneFx, type AddFxType } from "../types/Fx"


const AddFxItem = ({ fx, callback }: { fx: AddFxType, callback: (toneFx: ToneFx, stateFx: StateFx) => void }) => {
    return (
        <button
            className="w-full py-2 hover:bg-slate-400/20 border-b border-slate-300/50 last:border-b-0"
            onClick={() => {callback(fx.createToneFx(), fx.createStateFx())}}>
            <h2 className="text-2xl capitalize">{fx.name}</h2>
            <p className="text-lg">{fx.description}</p>
        </button>
    )
}

export default AddFxItem
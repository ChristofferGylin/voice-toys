import { type StateFx, type ToneFx, type AddFxType } from "../types/Fx"


const AddFxItem = ({ fx, callback }: { fx: AddFxType, callback: (toneFx: ToneFx, stateFx: StateFx) => void }) => {
    return (
        <button
            className="flex flex-col gap-4 w-full py-4 px-8 hover:bg-slate-400/20 border-b border-slate-300/50 last:border-b-0 text-start cursor-pointer"
            onClick={() => {
                const toneFxInstance = fx.createToneFx()
                callback(toneFxInstance, fx.createStateFx(toneFxInstance))}}>
            <h2 className="text-2xl capitalize">{fx.name}</h2>
            <p className="text-lg">{fx.description}</p>
        </button>
    )
}

export default AddFxItem
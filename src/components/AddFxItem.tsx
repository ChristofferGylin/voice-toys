type addFxType = {
    name: string;
    description: string;
    callback: () => void;
}

const AddFxItem = ({ fx }: { fx: addFxType }) => {
    return (
        <button
            className="w-full py-2 hover:bg-slate-400/20 border-b border-slate-300/50 last:border-b-0"
            onClick={fx.callback}>
            <h2 className="text-2xl capitalize">{fx.name}</h2>
            <p className="text-lg">{fx.description}</p>
        </button>
    )
}

export default AddFxItem
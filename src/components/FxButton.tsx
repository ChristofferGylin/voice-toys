const FxButton = ({title, style, onClick}: {title: string, onClick: () => void, style?: string}) => {
    return (
        <button onClick={onClick} className={`flex justify-center items-center aspect-square h-full border rounded-lg text-3xl overflow-hidden ${style}`}>{title}</button>
    )
}

export default FxButton
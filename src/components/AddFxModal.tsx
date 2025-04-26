import { useEffect, useRef } from "react"
import AddFxItem from "./AddFxItem"
import { useFxContext } from "../Context"
import addFxList from "../data/addFxList"
import { IoCloseCircleOutline } from "react-icons/io5"

const AddFxModal = ({index, id, closeModal}: {index: number, id?: string, closeModal: () => void} ) => {

    const { connectFx, disconnectFx, setFx } = useFxContext()

    const modalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {

        const onClick = (e: MouseEvent) => {

            if (!modalRef.current) return
            if (!modalRef.current.contains(e.target as Node)) {
                closeModal()
            }
        }

        window.addEventListener('mousedown', onClick)

        return () => { window.removeEventListener('mousedown', onClick) }
    }, [closeModal, modalRef.current])

    return (
        <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-slate-950/10 backdrop-blur-xs">
            <div ref={modalRef} className="flex flex-col items-center h-5/6 w-5/6 p-4 rounded-lg bg-slate-800 text-slate-200">
                <div className="w-full grid grid-cols-[1fr_4fr_1fr] border-b border-slate-200/40 pb-4">
                    <h1 className="text-4xl col-start-2 justify-self-center">Add FX</h1>
                    <button className="justify-self-end text-3xl text-slate-300 hover:text-slate-200" onClick={closeModal}><IoCloseCircleOutline /></button>
                </div>
                
                <div className="flex flex-col overflow-x-scroll">
                    {addFxList.map((fx, listIndex) => {
                        return <AddFxItem key={`${fx.name}#${listIndex}`} fx={fx} callback={(toneFx, stateFx) => {
                            setFx({
                                stFx: stateFx, tnFx: toneFx, index: index, oldId: id,
                            })
                            closeModal()
                        }} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default AddFxModal
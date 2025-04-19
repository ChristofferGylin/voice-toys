import { useEffect, useRef } from "react"

const AddFxModal = ({index, closeModal}: {index: number, closeModal: () => void} ) => {

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
            <div ref={modalRef} className="flex flex-col gap-4 p-4 rounded-lg bg-slate-800 text-slate-200">
                <h1 className="text-4xl">Add FX</h1>
                <div>

                </div>
            </div>
        </div>
    )
}

export default AddFxModal
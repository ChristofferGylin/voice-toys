import { createContext, ReactNode, useRef, Ref, useContext } from "react"
import { ToneFx } from "./types/Fx"

type ContextType = {
    toneFx: Ref<(ToneFx | null)[]>;
    setToneFx: (index: number, fx: ToneFx) => void;
}

const FxContext = createContext<ContextType | undefined>(undefined)

export const FxContextProvider = ({ children }: { children: ReactNode }) => {
    const toneFx = useRef<(ToneFx | null)[]>(Array(6).fill(null))

    const setToneFx = (index: number, fx: ToneFx) => {
        
        if (toneFx.current[index]) {
            toneFx.current[index].dispose()
        }
        
        toneFx.current[index] = fx
    }

    return (
        <FxContext.Provider value={{
            toneFx,
            setToneFx
        }}>
            {children}
        </FxContext.Provider>
    )
}

export const useFxContext = (): ContextType => {
    const context = useContext(FxContext) 

    if (!context) {
        throw new Error('Fx Context could not be loaded')
    }

    return context
}
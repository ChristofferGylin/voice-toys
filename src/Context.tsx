import { createContext, ReactNode, useRef, Ref, useContext, useState } from "react"
import { StateFx, ToneFx } from "./types/Fx"

type ContextType = {
    stateFx: (StateFx | null)[]
    stateFxSetter: (inded: number, fx: StateFx | null) => void;
    toneFx: Ref<(ToneFx | null)[]>;
    toneFxSetter: (index: number, fx: ToneFx) => void;
}

const FxContext = createContext<ContextType | undefined>(undefined)

export const FxContextProvider = ({ children }: { children: ReactNode }) => {
    const [stateFx, setStateFx] = useState<(StateFx | null)[]>(Array(6).fill(null))
    const toneFx = useRef<(ToneFx | null)[]>(Array(6).fill(null))

    const stateFxSetter = (index: number, fx: StateFx | null) => {
        setStateFx((oldState) => {
            const newState = [...oldState]
            newState[index] = fx

            return newState
        })
    }

    const toneFxSetter = (index: number, fx: ToneFx) => {
        
        if (toneFx.current[index]) {
            toneFx.current[index].dispose()
        }
        
        toneFx.current[index] = fx
    }

    return (
        <FxContext.Provider value={{
            stateFx,
            stateFxSetter,
            toneFx,
            toneFxSetter
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
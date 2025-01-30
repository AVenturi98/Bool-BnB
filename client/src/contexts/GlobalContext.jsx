import { createContext, useState } from "react"
import BtnTop from '../components/BtnTop'


const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    const [isLoading, setIsLoading] = useState(false)

    return (
        <GlobalContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
            <BtnTop />
        </GlobalContext.Provider>
    )
}

export default GlobalContext
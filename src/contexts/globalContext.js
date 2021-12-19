import { createContext, useState } from "react";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const [examsList, setExamsList] = useState([]);
    return (
        <GlobalContext.Provider
            value={{
                examsList,
                setExamsList,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
export default GlobalContext;

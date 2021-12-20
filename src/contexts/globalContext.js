import { createContext, useState } from "react";

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const [subjectsByPeriod, setSubjectsByPeriod] = useState([]);

    return (
        <GlobalContext.Provider
            value={{
                subjectsByPeriod,
                setSubjectsByPeriod,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
export default GlobalContext;

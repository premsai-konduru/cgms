import { createContext, useState } from "react";

const GrievContext = createContext({});

export const GrievProvider = ({ children }) => {
    const [grievance, setGrievance] = useState({});
    // //console.log("auth=",auth);
    return (
        <GrievContext.Provider value={{ grievance, setGrievance }}>
            {children}
        </GrievContext.Provider>
    )
}

export default GrievContext;
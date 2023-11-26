import { useContext } from "react";
import GrievContext from "../context/GrievanceProvider";

const useGriev = () => {
    return useContext(GrievContext);
}

export default useGriev;
import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within a AppContextProvider");
    }
    return context;
}
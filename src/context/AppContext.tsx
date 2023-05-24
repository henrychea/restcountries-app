import { createContext, useState } from "react";
import { IAppContext, ICountry } from "../types";

const AppContext = createContext<IAppContext | undefined>(undefined);

function AppContextProvider ({ children }: { children: React.ReactNode }) {
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<ICountry[]>([] as ICountry[]);

    return (
        <AppContext.Provider value={{ searchHistory, setSearchHistory, favorites, setFavorites }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContextProvider, AppContext };
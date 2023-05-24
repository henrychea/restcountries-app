interface ICountry {
    name: INameCountry;
    altSpellings: string[];
    cca2: string;
    cca3: string;
    idd: {
        root: string;
        suffixes: string[];
    };
    flag: string;
    flags: {
        alt: string;
        png: string;
        svg: string;
    }
}

interface INameCountry {
    common: string;
    official: string;
    nativeName: {
        [key: string]: {
            official: string;
            common: string;
        }
    }
}

interface IAppContext {
    searchHistory: string[];
    setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
    favorites: ICountry[];
    setFavorites: React.Dispatch<React.SetStateAction<ICountry[]>>;
}

export type { ICountry, IAppContext }
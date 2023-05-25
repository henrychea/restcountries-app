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

interface ICountryDetail extends ICountry {
    capital: string[];
    region: string;
    subregion: string;
    tld: string[];
    ccn3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        }
    }
    languages: {
        [key: string]: string;
    }
    translations: {
        [key: string]: {
            official: string;
            common: string;
        }
    }
    latlng: number[];
    landlocked: boolean;
    area: number;
    demonyms: {
        [key: string]: {
            f: string;
            m: string;
        }
    }
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    }
    population: number;
    gini: {
        [key: string]: number;
    }
    fifa: string;
    car: {
        signs: string[];
        side: string;
    }
    timezones: string[];
    continents: string[];
    coatOfArms: {
        png: string;
        svg: string;
    }
    startOfWeek: string;
    capitalInfo: {
        latlng: number[];
    }
}

interface IAppContext {
    searchHistory: string[];
    setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
    favorites: ICountry[];
    setFavorites: React.Dispatch<React.SetStateAction<ICountry[]>>;
}

export type { ICountry, IAppContext, ICountryDetail }
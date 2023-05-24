const BASE_URL = 'https://restcountries.com/v3.1/'

export async function GetAllCountries() {
    try {
        const response = await fetch(`${BASE_URL}all`)
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error as string)
    }
}
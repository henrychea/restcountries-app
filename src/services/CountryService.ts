const BASE_URL = 'https://restcountries.com/v3.1/'

export async function GetAllCountries() {
  try {
    const response = await fetch(`${BASE_URL}all`)
    const data = await response.json()
    if (data.status === 404) {
      return null
    }
    return data
  } catch (error) {
    throw new Error(error as string)
  }
}

export async function SearchCountryNameFuzzy(name: string) {
  try {
    const response = await fetch(`${BASE_URL}name/${name}`)
    const data = await response.json()
    if (data.status === 404) {
      return null
    }
    return data
  } catch (error) {
    throw new Error(error as string)
  }
}

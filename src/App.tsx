import { useEffect, useState } from 'react'
import './App.css'
import CountryList from './components/CountryList'
import useAppContext from './context/UseAppContextHook'
import {
  GetAllCountries,
  SearchCountryNameFuzzy,
} from './services/CountryService'

function App() {
  const [countries, setCountries] = useState<[] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const AppCtx = useAppContext()

  useEffect(() => {
    let timeoutId: number | undefined
    setLoading(true)

    async function search() {
      try {
        const res = await SearchCountryNameFuzzy(searchTerm)
        setLoading(false)
        setCountries(res)
        AppCtx.searchHistory.push(searchTerm)
      } catch (err) {
        setCountries(null)
        setLoading(false)
        console.log(err)
      }
    }

    if (searchTerm) {
      timeoutId = setTimeout(search, 500)
    } else {
      GetAllCountries()
        .then((res) => {
          setLoading(false)
          setCountries(res)
        })
        .catch((err) => {
          setCountries(null)
          setLoading(false)
          console.log(err)
        })
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchTerm])

  return (
    <div className='p-8 h-full min-h-screen dark:bg-gray-950 bg-white w-100'>
      <div className='row space-y-5'>
        <h1 className='text-5xl text-center font-bold text-green-500 dark:text-green-300'>
          Countries Catalog
        </h1>
        <h2 className='text-2xl text-center dark:text-green-500 text-green-900'>
          Search For a Country
        </h2>
        <div className='flex justify-center'>
          <input
            className='border-2 border-green-500 rounded-md p-2 w-1/2'
            type='text'
            placeholder='Search for a country'
            list='search-history'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <datalist id='search-history'>
            {AppCtx.searchHistory.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
        </div>
        <div className='transtion'>
          {loading && (
            <p className='text-center text-2xl text-green-900'>Loading...</p>
          )}
          {!loading && countries === null && (
            <p className='text-center text-2xl text-green-900'>
              No countries found
            </p>
          )}
          {!loading && countries !== null && (
            <div className='flex justify-center min-w-full'>
              <div className='row align-middle min-w-full'>
                <div className='col'>
                  <CountryList countries={countries} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

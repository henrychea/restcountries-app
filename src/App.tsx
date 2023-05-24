import { useEffect, useState } from 'react'
import './App.css'
import CountryList from './components/CountryList'
import useAppContext from './context/UseAppContextHook'
import { GetAllCountries } from './services/CountryService'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const AppCtx = useAppContext()

  useEffect(() => {
    setLoading(true)
    GetAllCountries().then((res) => {
      setLoading(false)
      setCountries(res)
    })
  }, [])

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
            placeholder='Search...'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='transtion'>
          {loading && (
            <p className='text-center text-2xl text-green-900'>Loading...</p>
          )}
          {!loading && (
            <div className='flex justify-center min-w-full'>
              <div className='row align-middle min-w-full'>
                <div className='col'>
                  <CountryList countries={countries as []} />
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

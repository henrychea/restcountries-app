import React, { useEffect, useState } from 'react'
import { ICountry } from '../types'
import CountryCard from './CountryCard'
import useAppContext from '../context/UseAppContextHook'

export default function CountryList(props: { countries: [] }) {
  const numberOfCountries = props.countries.length
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortMode, setSortMode] = useState('')
  const [displayCountries, setDisplayCountries] = useState([])
  
  const { favorites } = useAppContext()
  const [favouriteDisplayCountries, setFavoriteCountries] = useState([...favorites])
  const [showFavorites, setShowFavorites] = useState(false)
  const [numberOfFavorites, setNumberOfFavorites] = useState(favorites.length)

  useEffect(() => {
    setDisplayCountries(props.countries.slice(startIndex, endIndex))
    setNumberOfFavorites(favorites.length)
    setFavoriteCountries([...favorites])
  }, [page, itemsPerPage, sortMode, favorites])


  const maxPage = !showFavorites ? Math.ceil(numberOfCountries / itemsPerPage) - 1 : Math.ceil(numberOfFavorites / itemsPerPage) - 1
  const pageNumberButtons = []
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = page * itemsPerPage

  for (let i = 1; i <= maxPage; i++) {
    if (page === i) {
      pageNumberButtons.push(
        <button key={i} data-value={i} className='btn btn-active'>
          {i}
        </button>,
      )
    } else {
      pageNumberButtons.push(
        <button
          key={i}
          data-value={i}
          onClick={handlePageClick}
          className='btn'
        >
          {i}
        </button>,
      )
    }
  }

  function handlePageClick(event: React.MouseEvent<HTMLButtonElement>) {
    const page = Number(event.currentTarget.getAttribute('data-value'))
    setPage(page)
  }

  function handleSortMode(event: React.ChangeEvent<HTMLSelectElement>) {
    const sortMode = event.target.value
    setSortMode(sortMode)
    if (sortMode === 'Country Name (Desc)') {
      const s = props.countries.sort((a: ICountry, b: ICountry) => {
        return a.name.common.toString() < b.name.common.toString() ? 1 : -1
      })
      setDisplayCountries(s.slice(startIndex, endIndex))
    } else if (sortMode === 'Country Name (Asc)') {
      const s = props.countries.sort((a: ICountry, b: ICountry) => {
        return a.name.common.toString() > b.name.common.toString() ? 1 : -1
      })
      setDisplayCountries(s.slice(startIndex, endIndex))
    }
  }

  function handleShowFavorites() {

    setShowFavorites(!showFavorites)
  }

  return (
    <div className='space-y-4 min-w-full'>
      <div className='grid grid-cols-3'>
        <div className='flex justify-start'>
          <div onClick={handleShowFavorites} className='pl-2 link'>
            ⭐ Favorites ({numberOfFavorites})
          </div>
        </div>
        <div></div>
        <div>
          <div className='flex justify-end'>
            <div className='text-right pr-2'>Sort</div>
            <select
              className='select select-bordered select-xs w-40 max-w-xs'
              name='itemsDropDown'
              id='itemsDropDown'
              onChange={handleSortMode}
            >
              <option value={''}>None</option>
              <option value={'Country Name (Desc)'}>Country Name (Desc)</option>
              <option value={'Country Name (Asc)'}>Country Name (Asc)</option>
            </select>
            <div className='text-right px-2'>Show</div>
            <select
              className='select select-bordered select-xs w-24 max-w-xs'
              name='itemsDropDown'
              id='itemsDropDown'
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10 items</option>
              <option value={15}>15 items</option>
              <option value={20}>20 items</option>
              <option value={25}>25 items</option>
              <option value={30}>30 items</option>
            </select>
          </div>
        </div>
      </div>
      {!showFavorites &&
        displayCountries.map((country: ICountry) => {
          return (
            <div className='row' key={country.cca2}>
              <CountryCard country={country} />
            </div>
          )
        })}
      {showFavorites &&
        favouriteDisplayCountries.map((country: ICountry) => {
          return (
            <div className='row' key={country.cca2}>
              <CountryCard country={country} />
            </div>
          )
        })}
      <div className='flex justify-center'>
        <div className='btn-group'>
          {pageNumberButtons.map((button) => {
            return button
          })}
        </div>
      </div>
    </div>
  )
}

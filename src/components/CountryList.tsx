import React, { useState } from 'react'
import { ICountry } from '../types'
import CountryCard from './CountryCard'

export default function CountryList(props: { countries: [] }) {
  const numberOfCountries = props.countries.length
  console.log('Countries', props.countries)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const maxPage = Math.ceil(numberOfCountries / itemsPerPage) - 1
  const pageNumberButtons = []
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = page * itemsPerPage

  const displayCountries = props.countries.slice(
    startIndex,
    endIndex
  )

  for (let i = 1; i <= maxPage; i++) {
    if (page === i) {
      pageNumberButtons.push(<button key={i} data-value={i} className='btn btn-active'>{i}</button>)
    } else {
      pageNumberButtons.push(
        <button key={i} data-value={i} onClick={handlePageClick} className='btn'>
          {i}
        </button>,
      )
    }
  }

  function handlePageClick(event: React.MouseEvent<HTMLButtonElement>) {
    const page = Number(event.currentTarget.getAttribute('data-value'))
    setPage(page)
  }

  return (
    <div className='space-y-4 min-w-full'>
      {displayCountries.map((country: ICountry) => {
        return (
          <div className='row'>
            <CountryCard country={country} />
          </div>
        )
      })}
      <div className='btn-group'>
        {pageNumberButtons.map((button) => {
          return button
        })}
      </div>
    </div>
  )
}

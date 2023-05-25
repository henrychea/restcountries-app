import { ICountryDetail } from '../types'

export default function CountryDeatils(props: { country: ICountryDetail }) {
  console.log('Details:', props.country)
  const country = props.country

  const languageKeys = Object.keys(country.languages)

  const languages = languageKeys.map((key) => {
    return {
      keyText: key.toString(),
      valueText: country.languages[key].toString(),
    }
  })

  const translatedNameKeys = Object.keys(country.translations)

  const translatedNames = translatedNameKeys.map((key) => {
    return {
      keyText: key.toString(),
      official: country.translations[key].official,
      common: country.translations[key].common,
    }
  })

  const giniList = country.gini ? Object.keys(country.gini) : []

  const gini = giniList.map((key) => {
    return {
      keyText: key.toString(),
      valueText: country.gini[key].toString(),
    }
  })

  const currencyKeys = Object.keys(country.currencies)

  const currencies = currencyKeys.map((key) => {
    return {
      keyText: key.toString(),
      name: country.currencies[key].name.toString(),
      symbol: country.currencies[key].symbol.toString(),
    }
  })

  const flags = country.flags
  const coatOfArms = country.coatOfArms

  return (
    <div className='p-2 space-y-2'>
      <h2 className='text-5xl py-4'>Details</h2>
      <div className='font-bold text-3xl'>
        {country.name.common} {country.flag}
      </div>
      <div className='-ml-3 collapse collapse-plus bg-base-100 rounded-box'>
        <input type='checkbox' />
        <div className='collapse-title text-lg'>Translated Names</div>
        <div className='collapse-content'>
          {translatedNames.map((el) => {
            return (
              <p key={el.keyText}>
                <span className='font-bold uppercase'>{el.keyText}</span>:{' '}
                <span className='font-normal'>
                  {el.official} ({el.common})
                </span>
              </p>
            )
          })}
        </div>
      </div>
      <p>
        Capital: {country?.capital} (
        {country.capitalInfo.latlng.flat().join(' ,')})
      </p>
      <p>
        Region: {country?.region} ({country?.subregion}) within{' '}
        {country?.continents}
      </p>
      <p>Population: {country?.population}</p>
      <p>
        Currencies:{' '}
        {currencies.map((curr, index) => {
          return (
            <span
              className='inline-flex px-2 py-1 mx-1 dark:bg-slate-400 dark:text-black bg-slate-700 text-white rounded-full my-1'
              key={curr.keyText}
            >{`${curr.keyText}: ${curr.name} (${curr.symbol})${
              index !== currencies.length - 1 ? ', ' : ''
            }`}</span>
          )
        })}
      </p>
      <p>
        Gini coefficients:{' '}
        {gini.length > 0 &&
          gini.map((el, index) => {
            return (
              <span key={el.keyText}>{`${el.keyText}: "${el.valueText}"${
                index !== gini.length - 1 ? ', ' : ''
              }`}</span>
            )
          })}
        {gini.length === 0 && <span>Not Available</span>}
      </p>
      <p>
        Area: {country?.area} km<sup>2</sup>
      </p>
      <p>Timezone: {country?.timezones.flat().join(', ')}</p>
      <p>Start of Week: {country?.startOfWeek}</p>
      <p>
        Languages:{' '}
        {languages.map((el, index) => {
          return (
            <span key={el.keyText}>{`${el.valueText}${
              index !== languages.length - 1 ? ', ' : ''
            }`}</span>
          )
        })}
      </p>
      <p>
        TLD:{' '}
        <span className='font-thin italic'>
          {country?.tld.flat().join(' ,')}
        </span>
      </p>
      <p>Member of the UN : {country?.unMember ? '✓' : '✕'}</p>
      {country.car && (
        <div>
          <span className='font-bold underline'>Driving</span>
          <p>Plates: {country?.car.signs}</p>
          <p>Side: {country?.car.side}</p>
        </div>
      )}
      <p>FIFA Team: {country?.fifa}</p>
      <h3 className='font-bold text-2xl pt-2'>Images</h3>
      <div className='carousel w-full'>
        <div id='item1' className='carousel-item w-full'>
          <img
            src={flags.png}
            className='object-contain w-full p-1'
            alt={flags.alt}
          />
        </div>
        <div id='item2' className='carousel-item w-full'>
          <img
            src={coatOfArms.png}
            className='object-contain w-full p-1'
            alt={`Coat of Arms of ${country.name.common}`}
          />
        </div>
      </div>
      <div className='flex justify-center w-full py-2 gap-2'>
        <a href='#item1' className='btn btn-xs'>
          Flag
        </a>
        <a href='#item2' className='btn btn-xs'>
          Coat Of Arms
        </a>
      </div>
    </div>
  )
}

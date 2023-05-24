import { ICountry } from '../types'

function CountryCard({ country }: { country: ICountry }) {
  const { name, cca2, cca3, altSpellings, idd, flag, flags } = country
  const common = name?.common
  const native = name?.nativeName

  const nativeNameKeys = Object.keys(native)

  const nativeKeyedValueObjects = nativeNameKeys.map((key) => {
    return {
      keyText: key.toString(),
      common: native[key].common,
      official: native[key].official,
    }
  })
  function NativeNameSpan(nativeNameKeyedValue: {
    keyText: string
    common: string
    official: string
  }) {
    return (
      <div
        className='tooltip'
        data-tip={`Offical: ${nativeNameKeyedValue.official} ; Common: ${nativeNameKeyedValue.common}`}
      >
        <span className='font-bold dark:bg-orange-800 bg-orange-300 text-gray-50 px-2 py-1 rounded dark:text-white mx-1'>
          {nativeNameKeyedValue.keyText.toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <div
      key={cca2 + cca3 + common}
      className='card card-side bg-base-100 shadow-xl w-full min-w-full'
    >
      <figure className='min-w-[250px]'>
        <img
          className='pl-2 object-contain w-[250px] h-[150px]'
          src={flags?.png}
          alt={flags?.alt}
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title text-3xl'>{`${common} ${flag}`}</h2>
        <div>
          Native name :{' '}
          {nativeKeyedValueObjects.map((nativeNameKeyedValue, index) => {
            return (
              <span key={index}>
                <NativeNameSpan {...nativeNameKeyedValue} />
              </span>
            )
          })}
        </div>
        <p className='space-y-1'>
          Alternate spellings:{' '}
          {altSpellings.map((spelling, index) => {
            return (
              <span key={index} className='italic flex-grow-0 inline-flex mx-1 mt-1'>
                {spelling.toString().concat(index !== altSpellings.length - 1 ? ', ' : '') }
              </span>
            )
          })}
        </p>
        <p>Country code : <span className='font-bold'>{cca2 ? `${cca2} (${cca3})` : 'No CCA'}</span> </p>
        <p>IID : {idd?.root?.toString()}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>View Details</button>
        </div>
      </div>
    </div>
  )
}

export default CountryCard

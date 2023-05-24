import { ICountry } from "../types";

function CountryCard({ country }: { country: ICountry }) {
  const { name, cca2, cca3, altSpellings, idd, flag, flags } = country;
  const common = name?.common;
  const native = name?.nativeName;

  return (
    <div key={cca2} className="card card-side bg-base-100 shadow-xl w-full min-w-full">
      <figure className="min-w-[250px]">
        <img
          className="pl-2 object-contain w-[250px] h-[150px]"
          src={flags?.png}
          alt={flags?.alt}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${common} ${flag}`}</h2>
        <p>Native name : {native?.toString()}</p>
        <p>Alt spellings : {altSpellings}</p>
        <p>Country code : {cca2 ? `${cca2} (${cca3})` : 'No CCA'} </p>
        <p>IID : {idd?.root?.toString()}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">View Details</button>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;

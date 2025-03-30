import React from 'react';

const CountryInfo = ({ country }) => {
  if (!country) return null;
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-2">Country Facts: {country.name.common}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        </div>
        <div>
          <p><strong>Currency:</strong> {
            country.currencies ? 
            Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 
            'N/A'
          }</p>
          <p><strong>Languages:</strong> {
            country.languages ? 
            Object.values(country.languages).join(', ') : 
            'N/A'
          }</p>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;
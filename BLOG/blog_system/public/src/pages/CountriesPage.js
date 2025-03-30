import React, { useState } from 'react';
import { useBlogContext } from '../context/BlogContext';

const CountriesPage = () => {
  const { countries, loading, error } = useBlogContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  
  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading countries...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>;
  
  const regions = ['', ...new Set(countries.map(country => country.region))];
  
  const filteredCountries = countries.filter(country => {
    const matchesSearch = searchTerm === '' || 
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (country.name.official && country.name.official.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRegion = selectedRegion === '' || country.region === selectedRegion;
    
    return matchesSearch && matchesRegion;
  });
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Countries Explorer</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse countries from around the world and discover interesting facts about them.
        </p>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search countries..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.filter(r => r).map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCountries.map(country => (
            <div key={country.cca3} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={country.flags.png} 
                alt={`Flag of ${country.name.common}`}
                className="w-full h-40 object-cover"
              />
              
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{country.name.common}</h2>
                <div className="text-sm text-gray-600">
                  <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                  <p><strong>Region:</strong> {country.region}</p>
                  <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No countries match your search criteria.</p>
        </div>
      )}
    </main>
  );
};

export default CountriesPage;

import { useState, useCallback } from 'react'
import debounce from 'lodash.debounce'

function SearchBar({ setSearchTerm }) {
  const [value, setValue] = useState('')

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      setSearchTerm(searchTerm)
    }, 300),
    []
  )

  const handleChange = (e) => {
    const searchTerm = e.target.value
    setValue(searchTerm)
    debouncedSearch(searchTerm)
  }

  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={value}
      onChange={handleChange}
      className="w-full p-3 mb-4 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-500"
    />
  )
}

export default SearchBar

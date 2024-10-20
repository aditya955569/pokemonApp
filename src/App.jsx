import { useState, useEffect } from 'react'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import Pagination from './components/Pagination'

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [isPageLoading, setIsPageLoading] = useState(false)

  useEffect(() => {
    fetchPokemon(currentPage)
  }, [currentPage])

  const fetchPokemon = async (url) => {
    setIsPageLoading(true)
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setNextPage(data.next)
      setPrevPage(data.previous)
      setTotalCount(data.count)
      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url)
          return detailResponse.json()
        })
      )
      setPokemonList(detailedPokemon)
      const offset = new URL(url).searchParams.get('offset') || 0
      setCurrentPageNumber(Math.floor(offset / 20) + 1)
      window.scrollTo(0, 0)
    } catch (error) {
      console.error('Error fetching Pokemon:', error)
    } finally {
      setIsLoading(false)
      setIsPageLoading(false)
    }
  }

  const handleNextPage = (customUrl) => {
    if (customUrl) {
      setCurrentPage(customUrl)
    } else if (nextPage) {
      setCurrentPage(nextPage)
    }
  }

  const handlePrevPage = () => {
    if (prevPage) {
      setCurrentPage(prevPage)
    }
  }

  const filteredList = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !filters.type || pokemon.types.some(t => t.type.name === filters.type)
    const matchesHeight = !filters.maxHeight || pokemon.height >= filters.maxHeight
    const matchesWeight = !filters.maxWeight || pokemon.weight >= filters.maxWeight
    const matchesExperience = !filters.maxExperience || pokemon.base_experience >= filters.maxExperience
    const matchesAttack = !filters.maxAttack || 
      pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat >= filters.maxAttack

    return matchesSearch && matchesType && matchesHeight && matchesWeight && matchesExperience && matchesAttack
  })

  return (
    <div className="container mx-auto px-4 min-h-screen bg-gray-900 text-gray-100">
      <h1 className="text-4xl font-bold text-center my-8 text-yellow-400">Pokédex</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mb-4 md:mb-0 md:mr-4">
          <Filters setFilters={setFilters} />
        </div>
        <div className="md:w-3/4">
          {isPageLoading ? (
            <div className="text-center py-10">
              <p className="text-2xl text-gray-400 font-semibold">Loading Pokémon...</p>
            </div>
          ) : (
            <>
              <PokemonList pokemonList={filteredList} />
              <Pagination
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
                hasNextPage={!!nextPage}
                hasPrevPage={!!prevPage}
                currentPage={currentPageNumber}
                totalCount={totalCount}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

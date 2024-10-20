import PokemonCard from './PokemonCard'

function PokemonList({ pokemonList }) {
  if (pokemonList.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-2xl text-gray-400 font-semibold">No Pokémon found</p>
        <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}

export default PokemonList

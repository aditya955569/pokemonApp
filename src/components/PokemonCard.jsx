import React from 'react'

function PokemonCard({ pokemon }) {
  const fallbackImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
  const getBestImage = (pokemon) => {
    if (pokemon.sprites.other['official-artwork'].front_default) {
      return pokemon.sprites.other['official-artwork'].front_default
    } else if (pokemon.sprites.front_default) {
      return pokemon.sprites.front_default
    } else {
      return fallbackImageUrl
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
      <img
        src={getBestImage(pokemon)}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto object-contain"
        onError={(e) => {
          e.target.onerror = null 
          e.target.src = fallbackImageUrl
        }}
      />
      <h2 className="text-xl font-semibold text-center mt-2 text-yellow-400 capitalize">{pokemon.name}</h2>
      <div className="mt-2 text-gray-300">
        <p><span className="font-semibold">Type:</span> {pokemon.types.map((type) => type.type.name).join(', ')}</p>
        <p><span className="font-semibold">Height:</span> {pokemon.height}</p>
        <p><span className="font-semibold">Weight:</span> {pokemon.weight}</p>
        <p><span className="font-semibold">Base Experience:</span> {pokemon.base_experience}</p>
        <p><span className="font-semibold">Attack:</span> {pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
        <p><span className="font-semibold">Abilities:</span> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
      </div>
    </div>
  )
}

export default PokemonCard

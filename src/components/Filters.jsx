import { useState, useEffect } from 'react'

function Filters({ setFilters }) {
  const [type, setType] = useState('')
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [experience, setExperience] = useState(0)
  const [attack, setAttack] = useState(0)

  useEffect(() => {
    setFilters({
      type,
      maxHeight: height,
      maxWeight: weight,
      maxExperience: experience,
      maxAttack: attack,
    })
  }, [type, height, weight, experience, attack, setFilters])

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-yellow-400">Filters</h2>
      
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded"
        >
          <option value="">All Types</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Min Height: {height}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full slider"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Min Weight: {weight}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full slider"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Min Base Experience: {experience}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={experience}
          onChange={(e) => setExperience(Number(e.target.value))}
          className="w-full slider"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Min Attack: {attack}</label>
        <input
          type="range"
          min="0"
          max="200"
          value={attack}
          onChange={(e) => setAttack(Number(e.target.value))}
          className="w-full slider"
        />
      </div>
    </div>
  )
}

export default Filters

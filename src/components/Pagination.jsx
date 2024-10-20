import React from 'react'

function Pagination({ onNextPage, onPrevPage, hasNextPage, hasPrevPage, currentPage, totalCount }) {
  const pageSize = 20 
  const totalPages = Math.ceil(totalCount / pageSize)
  const maxVisiblePages = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  const pageNumbers = []
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="flex justify-center my-8">
      <ul className="flex flex-wrap items-center">
        <li className="mx-1">
          <button
            onClick={onPrevPage}
            disabled={!hasPrevPage}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
        </li>
        {startPage > 1 && (
          <>
            <li className="mx-1">
              <button
                onClick={() => onNextPage(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${pageSize}`)}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                1
              </button>
            </li>
            {startPage > 2 && <li className="mx-1">...</li>}
          </>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => onNextPage(`https://pokeapi.co/api/v2/pokemon?offset=${(number - 1) * pageSize}&limit=${pageSize}`)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? 'bg-yellow-400 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <li className="mx-1">...</li>}
            <li className="mx-1">
              <button
                onClick={() => onNextPage(`https://pokeapi.co/api/v2/pokemon?offset=${(totalPages - 1) * pageSize}&limit=${pageSize}`)}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
        <li className="mx-1">
          <button
            onClick={() => onNextPage()}
            disabled={!hasNextPage}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination

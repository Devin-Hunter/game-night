import { useState, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { apiHost } from './constants'
import useToken from '@galvanize-inc/jwtdown-for-react'

function ratingToStars(rating) {
    const starEmoji = '⭐'
    return rating ? Array(rating).fill(starEmoji).join('') : 'Not rated'
}

function OwnedList() {
    const [games, setGames] = useState([])
    const [search, setSearch] = useState('')
    const { token } = useToken()

    const getOwnedGames = useCallback(async () => {
        const request = await fetch(`${apiHost}/api/members/me/owned_games`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (request.ok) {
            const data = await request.json()
            setGames(data)
        }
    }, [token])

    async function deleteGame(game_id) {
        const result = await fetch(
            `${apiHost}/api/games/${game_id}/remove_from_owned`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (result.ok) {
            getOwnedGames()
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                await getOwnedGames()
            }
        }
        fetchData()
    }, [token, getOwnedGames])

    return (
        <>
            <div className="text-center py-8">
                <h1
                    className="text-7xl font-bold text-green-500 mb-4"
                    style={{
                        textShadow: '1px 1px 3px #000000',
                        // color: '#ffffff',
                    }}
                >
                    Owned Games
                </h1>
                <form className="max-w-sm mx-auto mt-10 mb-10">
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative flex">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 pl-10 pr-35 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search All Games"
                            required
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <NavLink to="/games" className="inline-block">
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                                />
                            </svg>
                        </NavLink>
                    </div>
                </form>
                <hr
                    className="w-full border-t-3 border-gray-300 my-8"
                    style={{
                        maxWidth: '900px',
                        margin: 'auto',
                    }}
                />
            </div>
            <div className="flex justify-center pt-5 pb-20">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-8 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-8 py-3">
                                    Your Rating
                                </th>
                                <th scope="col" className="px-8 py-3">
                                    Playing Time
                                </th>
                                <th scope="col" className="px-8 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-8 py-3">
                                    Remove game
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {games
                                .filter((game) =>
                                    game.title
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                )
                                .map((game) => (
                                    <tr
                                        key={game.title}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="p-4">
                                            <img
                                                src={game.picture}
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                }}
                                            />
                                        </td>
                                        <td className="px-8 py-4">
                                            {game.title}
                                        </td>
                                        <td className="px-8 py-4">
                                            {ratingToStars(game.rating)}
                                        </td>
                                        <td className="px-8 py-4">
                                            {game.play_time}
                                        </td>
                                        <td className="px-8 py-4">
                                            {game.category}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                onClick={() =>
                                                    deleteGame(game.id)
                                                }
                                                type="button"
                                                className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default OwnedList

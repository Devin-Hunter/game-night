import { useState, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import AddToButton from './AddToButton'
import LikeButton from './LikeButton'
import { apiHost } from './constants'
import useToken from '@galvanize-inc/jwtdown-for-react'

function GameList() {
    const [games, setGames] = useState([])
    const [search, setSearch] = useState('')
    const { token } = useToken()

    const getGames = useCallback(async () => {
        const request = await fetch(`${apiHost}/api/games`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (request.ok) {
            const data = await request.json()
            setGames(data)
        }
    }, [token])

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                await getGames()
            }
        }
        fetchData()
    }, [token, getGames])

    return (
        <div className="text-center py-8">
            <h1
                className="text-7xl font-bold text-green-300 mb-4"
                style={{
                    textShadow: '1px 1px 3px #000000',
                }}
            >
                All Games
            </h1>
            <form className="max-w-md mx-auto mt-10 mb-8 flex items-center">
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
                        className="block w-80 p-4 pl-10 pr-35 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search All Games"
                        required
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <NavLink
                    to="/games/new"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    style={{ marginLeft: '20px' }}
                >
                    Add Game
                </NavLink>
            </form>
            <hr
                className="w-full border-t-5 border-gray-100 my-8"
                style={{
                    maxWidth: '900px',
                    margin: 'auto',
                }}
            />
            <div className="game-list">
                {games
                    .filter((game) =>
                        game.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((game) => {
                        return (
                            <div className="game-card" key={game.id}>
                                <div className="game-card-img-wrapper">
                                    <img
                                        src={game.picture}
                                        className="game-card-img"
                                    />
                                    <LikeButton game={game} />
                                </div>
                                <div className="game-card-content">
                                    <h3 className="game-card-title">
                                        {game.title}
                                    </h3>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <NavLink
                                            to={`/games/${game.id}`}
                                            type="button"
                                            className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                                            style={{
                                                marginRight: '10px',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            Discover!
                                        </NavLink>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <AddToButton game={game} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default GameList

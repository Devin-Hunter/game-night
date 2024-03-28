import { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { Tabs } from 'flowbite-react'
import ReactPlayer from 'react-player'
import { apiHost } from './constants'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
;('use client')

function complexityToFire(complexity) {
    const levels = {
        'Easy Breezy': 1,
        'Serene Enigma': 2,
        'Brain Bender': 3,
        'Mind Melter': 4,
    }
    const fireEmoji = '🔥'
    const level = levels[complexity] || 0
    const emojiString = Array(level).fill(fireEmoji).join('')
    return `${emojiString} ${complexity}`
}

function ratingToStars(rating) {
    const starEmoji = '⭐'
    return rating ? Array(rating).fill(starEmoji).join('') : 'Not rated'
}

function GameDetail() {
    const [game, setGame] = useState(null)
    const { game_id } = useParams()
    const { token } = useAuthContext()

    useEffect(() => {
        const getGameDetails = async () => {
            const request = await fetch(`${apiHost}/api/games/${game_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (request.ok) {
                const data = await request.json()
                setGame(data)
            }
        }
        getGameDetails()
    }, [game_id, token])

    return (
        <div className="flex-grid">
            {game && (
                <main className="flex-grid p-20 md:ml-64 h-auto pt-10">
                    <NavLink
                        to="/games"
                        className="inline-block"
                        style={{
                            marginRight: '30px',
                        }}
                    >
                        <svg
                            className="w-8 h-8 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="#04d5e3"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                            />
                        </svg>
                    </NavLink>
                    <div
                        className="border h-98 mb-10 bg-cover bg-center rounded-xl"
                        style={{ backgroundColor: '#ddf2f4', color: '#000000' }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                            <div className="pt-[56.25%] w-full relative">
                                <img
                                    src={game.picture}
                                    alt="Game"
                                    className="object-cover absolute  top-12 left-8"
                                />
                            </div>
                            <div className="flex-grid col-span-1 lg:col-span-3 p-10">
                                <div className="flex-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="p-4 rounded-lg">
                                        <h1 className="font-bold text-5xl mb-2">
                                            <span className="text-5xl">
                                                {game.title}
                                            </span>
                                            <span className="text-lg">
                                                ({game.year})
                                            </span>
                                        </h1>
                                        <hr className="w-full border-t-3 border-gray-400 my-3" />
                                    </div>
                                    <div className="p-1 rounded-lg">
                                        <h1 className="font-bold text-lg mb-2">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <svg
                                                    className="w-5 h-5 text-gray-800 dark:text-white"
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
                                                        strokeWidth="2"
                                                        d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                </svg>

                                                <span
                                                    style={{
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    {game.min_players} -{' '}
                                                    {game.max_players}
                                                </span>
                                            </div>
                                        </h1>
                                        <h1 className="font-bold text-lg mb-2">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <svg
                                                    className="w-5 h-5 text-gray-800 dark:text-white"
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
                                                        d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                                <span
                                                    style={{
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    {' '}
                                                    {game.play_time}{' '}
                                                </span>
                                            </div>
                                        </h1>
                                        <h1 className="font-bold text-lg mb-2">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <svg
                                                    className="w-5 h-5 text-gray-800 dark:text-white"
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
                                                        strokeWidth="2"
                                                        d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                                    />
                                                </svg>
                                                <span
                                                    style={{
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    {' '}
                                                    {game.age}
                                                </span>
                                            </div>
                                        </h1>
                                        <h1 className="font-bold text-lg mb-2">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <svg
                                                    className="w-5 h-5 text-gray-800 dark:text-white"
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
                                                        d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"
                                                    />
                                                </svg>
                                                <span
                                                    style={{
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    Category: {game.category}
                                                </span>
                                            </div>
                                        </h1>
                                        <h1 className="font-bold text-lg mb-2">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <svg
                                                    className="w-5 h-5 text-gray-800 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 17a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2Z"
                                                    />
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13.815 9H16.5a2 2 0 1 0-1.03-3.707A1.87 1.87 0 0 0 15.5 5 1.992 1.992 0 0 0 12 3.69 1.992 1.992 0 0 0 8.5 5c.002.098.012.196.03.293A2 2 0 1 0 7.5 9h3.388m2.927-.985v3.604M10.228 9v2.574M15 16h.01M9 16h.01m11.962-4.426a1.805 1.805 0 0 1-1.74 1.326 1.893 1.893 0 0 1-1.811-1.326 1.9 1.9 0 0 1-3.621 0 1.8 1.8 0 0 1-1.749 1.326 1.98 1.98 0 0 1-1.87-1.326A1.763 1.763 0 0 1 8.46 12.9a2.035 2.035 0 0 1-1.905-1.326A1.9 1.9 0 0 1 4.74 12.9 1.805 1.805 0 0 1 3 11.574V12a9 9 0 0 0 18 0l-.028-.426Z"
                                                    />
                                                </svg>
                                                <span
                                                    style={{
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    Complexity:{' '}
                                                    {complexityToFire(
                                                        game.complexity
                                                    )}
                                                </span>
                                            </div>
                                        </h1>
                                        <h1 className="font-bold text-lg mb-8">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <svg
                                                    className="w-5 h-5 text-gray-800 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                                                    />
                                                </svg>
                                                <span
                                                    style={{
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    Contributor&rsquo;s Rating:{' '}
                                                    {ratingToStars(game.rating)}
                                                </span>
                                            </div>
                                        </h1>
                                        <NavLink
                                            to={`/games/update/${game.id}`}
                                            type="button"
                                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-md px-5 py-4 text-center me-2 mb-2"
                                        >
                                            Update Game Details
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="w-full border-t-3 border-gray-200 my-8" />
                    <div
                        className="flex-grid overflow-x-auto pb-20"
                        style={{
                            backgroundColor: '#ffffff',
                            padding: '0 30px',
                            color: 'black',
                        }}
                    >
                        <Tabs aria-label="Full width tabs" style="fullWidth">
                            <Tabs.Item
                                title={
                                    <>
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Overview
                                    </>
                                }
                            >
                                <div
                                    className="description-content"
                                    style={{ textAlign: 'justify' }}
                                >
                                    <h1 className="description-title">
                                        Description 📝
                                    </h1>
                                    <hr className="w-full border-t-3 border-gray-200 my-2" />
                                    <div
                                        className="description-text"
                                        style={{
                                            fontSize: '16px',
                                            color: 'black',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word',
                                            width: '100%',
                                        }}
                                    >
                                        {game.description}
                                    </div>
                                    <hr className="w-full border-t-3 border-gray-200 my-4" />
                                </div>
                            </Tabs.Item>
                            <Tabs.Item
                                title={
                                    <>
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Rules
                                    </>
                                }
                            >
                                <div
                                    className="description-content"
                                    style={{ textAlign: 'justify' }}
                                >
                                    <h1 className="description-title">
                                        Rules❗
                                    </h1>
                                    <hr className="w-full border-t-3 border-gray-200 my-2" />
                                    <div
                                        className="description-text"
                                        style={{
                                            fontSize: '16px',
                                            color: 'black',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word',
                                            width: '100%',
                                            paddingBottom: '30px',
                                        }}
                                    >
                                        {game.rules}
                                    </div>
                                </div>
                            </Tabs.Item>
                            <Tabs.Item
                                title={
                                    <>
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M19.003 3A2 2 0 0 1 21 5v2h-2V5.414L17.414 7h-2.828l2-2h-2.172l-2 2H9.586l2-2H9.414l-2 2H3V5a2 2 0 0 1 2-2h14.003ZM3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Zm2-2.414L6.586 5H5v1.586Zm4.553 4.52a1 1 0 0 1 1.047.094l4 3a1 1 0 0 1 0 1.6l-4 3A1 1 0 0 1 9 18v-6a1 1 0 0 1 .553-.894Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Instructional Video
                                    </>
                                }
                            >
                                <h1 className="description-title">
                                    🎥 Watch this instructional video to learn
                                    how to play this game!{' '}
                                </h1>
                                <hr className="w-full border-t-3 border-gray-200 my-2" />
                                <ReactPlayer url={game.video} controls={true} />
                            </Tabs.Item>
                            <Tabs.Item
                                title={
                                    <>
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M15.514 3.293a1 1 0 0 0-1.415 0L12.151 5.24a.93.93 0 0 1 .056.052l6.5 6.5a.97.97 0 0 1 .052.056L20.707 9.9a1 1 0 0 0 0-1.415l-5.193-5.193ZM7.004 8.27l3.892-1.46 6.293 6.293-1.46 3.893a1 1 0 0 1-.603.591l-9.494 3.355a1 1 0 0 1-.98-.18l6.452-6.453a1 1 0 0 0-1.414-1.414l-6.453 6.452a1 1 0 0 1-.18-.98l3.355-9.494a1 1 0 0 1 .591-.603Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Comments
                                    </>
                                }
                            ></Tabs.Item>
                            <Tabs.Item
                                title={
                                    <>
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
                                                d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                                            />
                                        </svg>
                                        Links
                                    </>
                                }
                            ></Tabs.Item>
                            <Tabs.Item
                                title={
                                    <>
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
                                                d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"
                                            />
                                        </svg>
                                        Expansions and Updates
                                    </>
                                }
                            ></Tabs.Item>
                        </Tabs>
                    </div>
                </main>
            )}
        </div>
    )
}

export default GameDetail

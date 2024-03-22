/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { apiHost } from './constants'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'

function LikeButton({ game }) {
    const [favoriteGames, setFavoriteGames] = useState([])
    const [liked, setLiked] = useState(false)
    const { token } = useAuthContext()

    useEffect(() => {
        const fetchFavoriteGames = async () => {
            const response = await fetch(
                `${apiHost}/api/members/me/favorite_games`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (response.ok) {
                const data = await response.json()
                setFavoriteGames(data)
                setLiked(data.some((g) => g.title === game.title))
            }
        }
        fetchFavoriteGames()
    }, [game.title, token])

    async function handleLike(game_id) {
        if (!liked) {
            const result = await fetch(
                `${apiHost}/api/games/${game_id}/add_to_favorites`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (result.ok) {
                setFavoriteGames((prev) => [...prev, game])
                setLiked(true)
            }
        } else {
            const result = await fetch(
                `${apiHost}/api/games/${game_id}/remove_from_favorites`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (result.ok) {
                setFavoriteGames((prev) =>
                    prev.filter((g) => g.title !== game.title)
                )
                setLiked(false)
            }
        }
    }

    return (
        <button
            className="like-button"
            style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
            }}
            onClick={() => {
                handleLike(game.id)
            }}
        >
            {liked ? (
                //full heart
                <svg
                    className="w-[30px] h-[30px] text-red-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                </svg>
            ) : (
                // hollow heart
                <svg
                    className="w-[30px] h-[30px] text-red-500 dark:text-white"
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
                        strokeWidth="3"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                </svg>
            )}
        </button>
    )
}

export default LikeButton

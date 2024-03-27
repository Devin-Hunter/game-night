import { useState, useEffect } from 'react'
;('use client')
import { Dropdown } from 'flowbite-react'
import { HiPuzzle } from 'react-icons/hi'
import { apiHost } from './constants'
import useToken from '@galvanize-inc/jwtdown-for-react'

function AddToButton({ game }) {
    const [ownedGames, setOwnedGames] = useState([])
    const [wishlistGames, setWishlistGames] = useState([])
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [errorAlertVisible, setErrorAlertVisible] = useState(false)
    const [errorAlertMessage, setErrorAlertMessage] = useState('')
    const { token } = useToken()

    useEffect(() => {
        const fetchOwnedGames = async () => {
            const response = await fetch(
                `${apiHost}/api/members/me/owned_games`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (response.ok) {
                const data = await response.json()
                setOwnedGames(data)
            }
        }
        fetchOwnedGames()
    }, [token])

    async function addToOwnedGames(game_id) {
        if (!ownedGames.some((g) => g.title === game.title)) {
            const result = await fetch(
                `${apiHost}/api/games/${game_id}/add_to_owned`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (result.ok) {
                setOwnedGames((prev) => [...prev, game])
                setAlertMessage('Game has been added to Owned Games!')
                setAlertVisible(true)
                setTimeout(() => setAlertVisible(false), 3000)
            }
        } else {
            setErrorAlertMessage(
                'This game is already in your "Owned Games" list!'
            )
            setErrorAlertVisible(true)
            setTimeout(() => setErrorAlertVisible(false), 3000)
        }
    }

    useEffect(() => {
        const fetchWishlistGames = async () => {
            const response = await fetch(
                `${apiHost}/api/members/me/wishlist_games`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (response.ok) {
                const data = await response.json()
                setWishlistGames(data)
            }
        }
        fetchWishlistGames()
    }, [token])

    async function addToWishlist(game_id) {
        if (!wishlistGames.some((g) => g.title === game.title)) {
            const result = await fetch(
                `${apiHost}/api/games/${game_id}/add_to_wishlist`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (result.ok) {
                setWishlistGames((prev) => [...prev, game])
                setAlertMessage(
                    'Game has been added to "Want To Play Games" list!'
                )
                setAlertVisible(true)
                setTimeout(() => setAlertVisible(false), 3000)
            }
        } else {
            setErrorAlertMessage(
                'This game is already in your "Want to Play" games list!'
            )
            setErrorAlertVisible(true)
            setTimeout(() => setErrorAlertVisible(false), 3000)
        }
    }

    return (
        <>
            <Dropdown
                size="md"
                gradientMonochrome="success"
                label="Add To ..."
                trigger="hover"
                style={{
                    marginBottom: '10px',
                }}
            >
                <Dropdown.Item
                    icon={HiPuzzle}
                    onClick={() => addToOwnedGames(game.id)}
                >
                    Owned Games
                </Dropdown.Item>
                <Dropdown.Item
                    icon={HiPuzzle}
                    onClick={() => addToWishlist(game.id)}
                >
                    Want to Play
                </Dropdown.Item>
            </Dropdown>
            <div>
                {alertVisible && (
                    <div className="alert-popup">{alertMessage}</div>
                )}
                {errorAlertVisible && (
                    <div className="alert-popup error">{errorAlertMessage}</div>
                )}
            </div>
        </>
    )
}

export default AddToButton

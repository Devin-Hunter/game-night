import { useState, useEffect } from 'react'
import emojis from 'emojis-list'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { apiHost } from './constants'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'

function UpdateGame() {
    const [game, setGame] = useState(null)
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [minPlayers, setMinPlayers] = useState('')
    const [maxPlayers, setMaxPlayers] = useState('')
    const [playTime, setPlayTime] = useState('')
    const [age, setAge] = useState('')
    const [description, setDescription] = useState('')
    const [rules, setRules] = useState('')
    const [picture, setPicture] = useState('')
    const [video, setVideo] = useState('')
    const [complexity, setComplexity] = useState('')
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState('')
    const [showModal, setShowModal] = useState(false)
    const emoji = emojis[1596]
    const emoji1 = emojis[3056]
    const { game_id } = useParams()
    const { token } = useAuthContext()

    useEffect(() => {
        const getGameDetails = async () => {
            const response = await fetch(`${apiHost}/api/games/${game_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                const data = await response.json()
                setGame(data)
            }
        }
        getGameDetails()
    }, [game_id, token])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.title = title
        data.year = year
        data.min_players = minPlayers
        data.max_players = maxPlayers
        data.play_time = playTime
        data.age = age
        data.description = description
        data.rules = rules
        data.picture = picture
        data.video = video
        data.complexity = complexity
        data.category = category
        data.rating = rating

        const gameUrl = `${apiHost}/api/games/update/${game_id}`
        const fetchOptions = {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await fetch(gameUrl, fetchOptions)

        if (response.ok) {
            setTitle('')
            setYear('')
            setMinPlayers('')
            setMaxPlayers('')
            setPlayTime('')
            setAge('')
            setDescription('')
            setRules('')
            setPicture('')
            setVideo('')
            setComplexity('')
            setCategory('')
            setRating('')
            setShowModal(true)
        }
    }

    const handleTitleChange = (event) => {
        const value = event.target.value
        setTitle(value)
    }

    const handleYearChange = (event) => {
        const value = event.target.value
        setYear(value)
    }

    const handleMinPlayersChange = (event) => {
        const value = event.target.value
        setMinPlayers(value)
    }

    const handleMaxPlayersChange = (event) => {
        const value = event.target.value
        setMaxPlayers(value)
    }

    const handlePlayTimeChange = (event) => {
        const value = event.target.value
        setPlayTime(value)
    }

    const handleAgeChange = (event) => {
        const value = event.target.value
        setAge(value)
    }

    const handleDescriptionChange = (event) => {
        const value = event.target.value
        setDescription(value)
    }

    const handleRulesChange = (event) => {
        const value = event.target.value
        setRules(value)
    }

    const handlePictureChange = (event) => {
        const value = event.target.value
        setPicture(value)
    }

    const handleVideoChange = (event) => {
        const value = event.target.value
        setVideo(value)
    }

    const handleComplexityChange = (event) => {
        const value = event.target.value
        setComplexity(value)
    }

    const handleCategoryChange = (event) => {
        const value = event.target.value
        setCategory(value)
    }

    const handleRatingChange = (event) => {
        const value = event.target.value
        setRating(value)
    }

    return (
        <main className="flex-grid ml-60">
            <div
                className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700"
                style={{
                    width: '750px',
                    height: '750px',
                    margin: '0 auto',
                    marginTop: '40px',
                }}
            >
                <div className="update-game-form">
                    <h1
                        className="text-center pb-3 text-5xl text-orange-300 font-bold mb-4"
                        style={{
                            // color: '#8bbdf3',
                            textShadow: '1px 2px 2px #000000',
                        }}
                    >
                        Update Game Details
                    </h1>
                    {game && (
                        <form onSubmit={handleSubmit} id="create-game-form">
                            <div style={{ marginBottom: '15px' }}>
                                <label
                                    htmlFor="title"
                                    style={{
                                        color: '#000000',
                                    }}
                                >
                                    Title<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    onChange={handleTitleChange}
                                    value={title}
                                    placeholder="Enter game title"
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label
                                    htmlFor="year"
                                    style={{
                                        color: '#000000',
                                    }}
                                >
                                    Year<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    onChange={handleYearChange}
                                    value={year}
                                    placeholder="Enter year"
                                    required
                                    type="text"
                                    name="year"
                                    id="year"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label
                                        htmlFor="min_players"
                                        style={{
                                            color: '#000000',
                                        }}
                                    >
                                        Minimum Players
                                        <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        onChange={handleMinPlayersChange}
                                        value={minPlayers}
                                        placeholder="Enter minimum players"
                                        required
                                        type="text"
                                        name="min_players"
                                        id="min_players"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label
                                        htmlFor="max_players"
                                        style={{
                                            color: '#000000',
                                        }}
                                    >
                                        Maximum Players
                                        <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        onChange={handleMaxPlayersChange}
                                        value={maxPlayers}
                                        placeholder="Enter maximum players"
                                        required
                                        type="text"
                                        name="max_players"
                                        id="max_players"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label
                                        htmlFor="play_time"
                                        style={{
                                            color: '#000000',
                                        }}
                                    >
                                        Play Time
                                        <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        onChange={handlePlayTimeChange}
                                        value={playTime}
                                        placeholder="Enter play time"
                                        required
                                        type="text"
                                        name="play_time"
                                        id="play_time"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label
                                        htmlFor="age"
                                        style={{
                                            color: '#000000',
                                        }}
                                    >
                                        Age
                                        <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        onChange={handleAgeChange}
                                        value={age}
                                        placeholder="Enter age"
                                        required
                                        type="text"
                                        name="age"
                                        id="age"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label
                                    htmlFor="description"
                                    style={{
                                        color: '#000000',
                                    }}
                                >
                                    Description
                                    <span style={{ color: 'red' }}>*</span>
                                </label>
                                <textarea
                                    onChange={handleDescriptionChange}
                                    value={description}
                                    placeholder="Fill out game description"
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    rows="2"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label
                                    htmlFor="rules"
                                    style={{
                                        color: '#000000',
                                    }}
                                >
                                    Rules<span style={{ color: 'red' }}>*</span>
                                </label>
                                <textarea
                                    onChange={handleRulesChange}
                                    value={rules}
                                    placeholder="Fill out game rules"
                                    required
                                    type="text"
                                    name="rules"
                                    id="rules"
                                    rows="2"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label
                                        htmlFor="picture"
                                        style={{
                                            color: '#000000',
                                        }}
                                    >
                                        Picture
                                        <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        onChange={handlePictureChange}
                                        value={picture}
                                        placeholder="Upload picture"
                                        required
                                        type="text"
                                        name="picture"
                                        id="picture"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label
                                        htmlFor="video"
                                        style={{
                                            color: '#000000',
                                        }}
                                    >
                                        Video
                                    </label>
                                    <input
                                        onChange={handleVideoChange}
                                        value={video}
                                        placeholder="Upload youtube video"
                                        type="text"
                                        name="video"
                                        id="video"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label
                                    htmlFor="category"
                                    style={{
                                        color: '#000000',
                                    }}
                                >
                                    Category
                                    <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    onChange={handleCategoryChange}
                                    value={category}
                                    placeholder="Enter category"
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <select
                                    onChange={handleComplexityChange}
                                    value={complexity}
                                    required
                                    name="complexity"
                                    id="complexity"
                                    className="form-select"
                                    style={{ color: '#000000' }}
                                >
                                    <option value="">
                                        Choose Complexity Level(required)
                                    </option>
                                    <option value="Easy Breezy">
                                        {`${emoji}`}Easy Breezy
                                    </option>
                                    <option value="Serene Enigma">
                                        {`${emoji}${emoji}`} Serene Enigma
                                    </option>
                                    <option value="Brain Bender">
                                        {`${emoji}${emoji}${emoji}`} Brain
                                        Bender
                                    </option>
                                    <option value="Mind Melter">
                                        {`${emoji}${emoji}${emoji}${emoji}`}Mind
                                        Melter
                                    </option>
                                </select>
                                <select
                                    onChange={handleRatingChange}
                                    value={rating}
                                    name="rating"
                                    id="rating"
                                    className="form-select"
                                    style={{ color: '#000000' }}
                                >
                                    <option value="">
                                        Choose your rating (optional)
                                    </option>
                                    <option value="1">{`${emoji1}`}</option>
                                    <option value="2">{`${emoji1}${emoji1}`}</option>
                                    <option value="3">{`${emoji1}${emoji1}${emoji1}`}</option>
                                    <option value="4">{`${emoji1}${emoji1}${emoji1}${emoji1}`}</option>
                                    <option value="5">{`${emoji1}${emoji1}${emoji1}${emoji1}${emoji1}`}</option>
                                </select>
                            </div>
                            <button
                                className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-xl px-10 py-4 text-center me-2 mb-2"
                                style={{
                                    display: 'block',
                                    margin: '0 auto',
                                    marginTop: '20px',
                                    cursor: 'pointer',
                                }}
                            >
                                UPDATE {emojis[489]}
                            </button>
                        </form>
                    )}
                    {showModal && (
                        <div className="modal">
                            <div
                                className="modal-content"
                                style={{ color: '#f8f8f8' }}
                            >
                                <p>
                                    Your Game Has Been Successfully Updated!{' '}
                                    <br />
                                    To navigate to All Games, please press{' '}
                                    <Link to="/games">here</Link>.
                                </p>
                                <button onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default UpdateGame

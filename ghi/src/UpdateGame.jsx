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
    }, [game_id])

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
        <div className="update-game-form">
            <h1
                className="text-center pb-3 text-5xl font-bold mb-4"
                style={{
                    color: '#8bbdf3',
                    textShadow: '1px 1px 2px #000000',
                }}
            >
                Update Game
            </h1>
            {game && (
                <form onSubmit={handleSubmit} id="create-game-form">
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="title"
                            style={{
                                color: '#8bbdf3',
                                textShadow: '0px 0px 1px #000000',
                            }}
                        >
                            Title
                        </label>
                        <input
                            onChange={handleTitleChange}
                            value={title}
                            placeholder="required field"
                            required
                            type="text"
                            name="title"
                            id="title"
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="year"
                            style={{
                                color: '#8bbdf3',
                                textShadow: '0px 0px 1px #000000',
                            }}
                        >
                            Year
                        </label>
                        <input
                            onChange={handleYearChange}
                            value={year}
                            placeholder="required field"
                            required
                            type="text"
                            name="year"
                            id="year"
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="min_players"
                            style={{
                                color: '#8bbdf3',
                                textShadow: '0px 0px 1px #000000',
                            }}
                        >
                            Minimum Players
                        </label>
                        <input
                            onChange={handleMinPlayersChange}
                            value={minPlayers}
                            placeholder="required field"
                            type="text"
                            name="min_players"
                            id="min_players"
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="max_players"
                            style={{
                                color: '#8bbdf3',
                                textShadow: '0px 0px 1px #000000',
                            }}
                        >
                            Maximum Players
                        </label>
                        <input
                            onChange={handleMaxPlayersChange}
                            value={maxPlayers}
                            placeholder="required field"
                            type="text"
                            name="max_players"
                            id="max_players"
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="play_time"
                            style={{
                                color: '#8bbdf3',
                                textShadow: '0px 0px 1px #000000',
                            }}
                        >
                            Play Time
                        </label>
                        <input
                            onChange={handlePlayTimeChange}
                            value={playTime}
                            placeholder="required field"
                            type="text"
                            name="play_time"
                            id="play_time"
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="age"
                            style={{
                                color: '#8bbdf3',
                                textShadow: '0px 0px 1px #000000',
                            }}
                        >
                            Age
                        </label>
                        <input
                            onChange={handleAgeChange}
                            value={age}
                            placeholder="required field"
                            type="text"
                            name="age"
                            id="age"
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="description"
                            style={{
                                color: '#8bbdf3',
                                textShadow: '0px 0px 1px #000000',
                            }}
                        >
                            Description
                        </label>
                        <textarea
                            onChange={handleDescriptionChange}
                            value={description}
                            placeholder="required field"
                            type="text"
                            name="description"
                            id="description"
                            rows="4"
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="rules"
                            style={{
                                color: '#8bbdf3',
                                textShadow: '0px 0px 1px #000000',
                            }}
                        >
                            Rules
                        </label>
                        <textarea
                            onChange={handleRulesChange}
                            value={rules}
                            placeholder="required field"
                            type="text"
                            name="rules"
                            id="rules"
                            rows="4"
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="picture"
                            style={{
                                color: '#8bbdf3',
                                textShadow: '0px 0px 1px #000000',
                            }}
                        >
                            Picture
                        </label>
                        <input
                            onChange={handlePictureChange}
                            value={picture}
                            placeholder="required field"
                            type="text"
                            name="picture"
                            id="picture"
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="video"
                            style={{
                                color: '#8bbdf3',
                                textShadow: '0px 0px 1px #000000',
                            }}
                        >
                            Video
                        </label>
                        <input
                            onChange={handleVideoChange}
                            value={video}
                            placeholder="optional"
                            type="text"
                            name="video"
                            id="video"
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="category"
                            style={{
                                color: '#8bbdf3',
                                textShadow: '0px 0px 1px #000000',
                            }}
                        >
                            Category
                        </label>
                        <input
                            onChange={handleCategoryChange}
                            value={category}
                            placeholder="required field"
                            type="text"
                            name="category"
                            id="category"
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <select
                        onChange={handleComplexityChange}
                        value={complexity}
                        required
                        name="complexity"
                        id="complexity"
                        className="form-select"
                        style={{ color: '#8bbdf3' }}
                    >
                        <option value="">
                            Choose Complexity Level [Required]
                        </option>
                        <option value="Easy Breezy">
                            {`${emoji}`}Easy Breezy
                        </option>
                        <option value="Serene Enigma">
                            {`${emoji}${emoji}`} Serene Enigma
                        </option>
                        <option value="Brain Bender">
                            {`${emoji}${emoji}${emoji}`} Brain Bender
                        </option>
                        <option value="Mind Melter">
                            {`${emoji}${emoji}${emoji}${emoji}`}Mind Melter
                        </option>
                    </select>
                    <select
                        onChange={handleRatingChange}
                        value={rating}
                        required
                        name="rating"
                        id="rating"
                        className="form-select"
                        style={{ color: '#8bbdf3' }}
                    >
                        <option value="">Choose your rating [Optional]</option>
                        <option value="1">{`${emoji1}`}</option>
                        <option value="2">{`${emoji1}${emoji1}`}</option>
                        <option value="3">{`${emoji1}${emoji1}${emoji1}`}</option>
                        <option value="4">{`${emoji1}${emoji1}${emoji1}${emoji1}`}</option>
                        <option value="4">{`${emoji1}${emoji1}${emoji1}${emoji1}${emoji1}`}</option>
                    </select>
                    <button
                        className="add-button"
                        style={{
                            display: 'block',
                            margin: '0 auto',
                            marginTop: '20px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            padding: '5px 20px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        UPDATE {emojis[489]}
                    </button>
                </form>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content" style={{ color: '#f8f8f8' }}>
                        <p>
                            Your Game Has Been Successfully Updated! <br />
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
    )
}

export default UpdateGame

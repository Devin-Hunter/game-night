import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiHost } from './constants'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'

export default function CreateEvent() {
    const { token } = useAuthContext()

    const navigate = useNavigate()
    const [venues, setVenues] = useState([])
    const [formData, setFormData] = useState({
        game: '',
        venue: '',
        date_time: '',
        competitive_rating: '',
        max_players: '',
        max_spectators: '',
        min_age: '',
        online: false,
    })

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await fetch(`${apiHost}/venues/inperson/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch venues')
                }
                const data = await response.json()
                setVenues(data)
            } catch (error) {
                console.error('Error fetching venues:', error)
            }
        }
        fetchVenues()
    }, [token])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target
        setFormData({
            ...formData,
            [name]: checked,
        })
    }

    const handleSubmit = async function (event) {
        event.preventDefault()
        const url = `${apiHost}/events/new`
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch(url, fetchConfig)
        if (!response.ok) {
            throw new Error('Bad fetch response while adding new event')
        } else {
            navigate('/events')
        }
    }

    const handleCreateVenueClick = () => {
        navigate('/venues')
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="max-w-md flex flex-col gap-4 p-4 bg-gray-100 rounded-lg">
                <div>
                    <div>
                        <div className="mb-2 block">
                            <label
                                htmlFor="online"
                                className="text-sm font-semibold"
                                style={{ color: 'black' }}
                            >
                                Is the event online? If yes, check box. If no,
                                leave box unchecked.
                            </label>
                        </div>
                        <input
                            id="online"
                            type="checkbox"
                            name="online"
                            checked={formData.online}
                            onChange={handleCheckboxChange}
                            className="rounded border-gray-300 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="mb-2 block">
                        <label
                            htmlFor="game"
                            className="text-sm font-semibold"
                            style={{ color: 'black' }}
                        >
                            Game<span className="text-red-500">*</span>
                        </label>
                    </div>
                    <input
                        id="game"
                        type="text"
                        name="game"
                        value={formData.game}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-400"
                        required
                        style={{ color: 'black' }}
                        placeholder="Enter game name..."
                    />
                </div>
                <div className="mb-2 block relative">
                    <label
                        htmlFor="venue"
                        className="text-sm font-semibold"
                        style={{ color: 'black' }}
                    >
                        Venue<span className="text-red-500">*</span>
                    </label>
                    <select
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-400"
                        required
                        style={{ color: 'black' }}
                    >
                        <option value="">Select Venue</option>
                        {venues.map((venue) => (
                            <option key={venue.id} value={venue.id}>
                                {venue.venue_name}
                            </option>
                        ))}
                    </select>
                    <p
                        style={{ color: 'black' }}
                        className="text-sm font-semibold mt-1 ml-1"
                    >
                        Don&apos;t have a venue?{' '}
                        <button
                            className="text-blue-500 cursor-pointer bg-transparent border-none"
                            onClick={handleCreateVenueClick}
                        >
                            Create one here!
                        </button>
                    </p>
                </div>
                <div>
                    <div className="mb-2 block">
                        <label
                            htmlFor="date_time"
                            className="text-sm font-semibold"
                            style={{ color: 'black' }}
                        >
                            Date and Time<span className="text-red-500">*</span>
                        </label>
                    </div>
                    <input
                        id="date_time"
                        type="datetime-local"
                        name="date_time"
                        value={formData.date_time}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-400"
                        required
                        style={{ color: 'black' }}
                        placeholder="Enter date and time..."
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <label
                            htmlFor="competitive_rating"
                            className="text-sm font-semibold"
                            style={{ color: 'black' }}
                        >
                            Competitive Rating
                            <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <select
                        id="competitive_rating"
                        name="competitive_rating"
                        value={formData.competitive_rating}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-400"
                        required
                        style={{ color: 'black' }}
                    >
                        <option value="">Select Rating</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div>
                    <div className="mb-2 block">
                        <label
                            htmlFor="max_players"
                            className="text-sm font-semibold"
                            style={{ color: 'black' }}
                        >
                            Maximum Players
                            <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <input
                        id="max_players"
                        type="text"
                        name="max_players"
                        value={formData.max_players}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-400"
                        required
                        style={{ color: 'black' }}
                        placeholder="Enter max players..."
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <label
                            htmlFor="max_spectators"
                            className="text-sm font-semibold"
                            style={{ color: 'black' }}
                        >
                            Maximum Spectators
                            <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <input
                        id="max_spectators"
                        type="text"
                        name="max_spectators"
                        value={formData.max_spectators}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-400"
                        style={{ color: 'black' }}
                        placeholder="Enter max spectators..."
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <label
                            htmlFor="min_age"
                            className="text-sm font-semibold"
                            style={{ color: 'black' }}
                        >
                            Minimum Age<span className="text-red-500">*</span>
                        </label>
                    </div>
                    <input
                        id="min_age"
                        type="text"
                        name="min_age"
                        value={formData.min_age}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-400"
                        required
                        style={{ color: 'black' }}
                        placeholder="Enter minimum age..."
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-green-500 text-white font-semibold px-4 py-2 rounded-lg"
                    >
                        Create Event!
                    </button>
                </div>
            </div>
        </div>
    )
}

import { useEffect, useState, useCallback } from 'react'
import { apiHost } from './constants'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { Card } from 'flowbite-react'
/* eslint-disable */

const MemberEventList = () => {
    const [userEvents, setUserEvents] = useState([])
    const [playerEvents, setPlayerEvents] = useState([])
    const [spectatorEvents, setSpectatorEvents] = useState([])
    const [username, setUsername] = useState('')
    const [tokenLoad, setTokenLoad] = useState(false)

    const { token, fetchWithCookie } = useToken()

    const getUserData = useCallback(async () => {
        const userData = await fetchWithCookie(`${apiHost}/token`)
        setUsername(userData.account.username)
        return userData
    }, [fetchWithCookie])
    const fetchUserEvents = useCallback(async () => {
        try {
            const request = await fetch(`${apiHost}/events`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (request.ok) {
                const data = await request.json()
                setUserEvents(data)
            }
        } catch (error) {
            console.error('Error fetching user events:', error)
        }
    }, [token])

    const fetchPlayingEvents = useCallback(async () => {
        try {
            const request = await fetch(
                `${apiHost}/user/${username}/events/player`,
                { credentials: 'include' },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (request.ok) {
                const data = await request.json()
                setPlayerEvents(data)
            }
        } catch (error) {
            console.error('Error fetching playing events:', error)
        }
    }, [token, username])

    const fetchSpectatorEvents = useCallback(async () => {
        try {
            const request = await fetch(
                `${apiHost}/user/${username}/events/spectator`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (request.ok) {
                const data = await request.json()
                setSpectatorEvents(data)
            }
        } catch (error) {
            console.error('Error fetching spectator events:', error)
        }
    }, [token, username, setSpectatorEvents])

    const filteredEvents = userEvents.filter((events) => {
        return (events.username = username)
    })

    useEffect(() => {
        if (token) {
            getUserData()
            fetchUserEvents()
            fetchPlayingEvents()
            fetchSpectatorEvents()
        }
    }, [token])

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString)
        const formattedDate = dateTime.toLocaleDateString()
        const formattedTime = dateTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
        return `${formattedDate} ${formattedTime}`
    }

    return (
        <div className="flex justify-center items-center h-full">
            <Card className="p-4 shadow-md mb-4">
                <h1 className="text-black text-xl font-bold mb-4">My Events</h1>
                <div className="event-list">
                    {filteredEvents.map((event) => (
                        <div key={event.id}>
                            <h3 className="text-green-700 font-bold">
                                {event.game}
                            </h3>
                            <p className="text-black">Venue: {event.venue}</p>
                            <p className="text-black">
                                Date and Time: {formatDateTime(event.date_time)}
                            </p>
                            <p className="text-black">
                                Max Players: {event.max_players}
                            </p>
                            <p className="text-black">
                                Max Spectators: {event.max_spectators}
                            </p>
                            <p className="text-black">
                                Competitive Rating: {event.competitive_rating}
                            </p>
                            <p className="text-black">
                                Minimum Age: {event.min_age}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>
            <Card className="p-4 shadow-md mb-4">
                <h2 className="text-black text-xl font-bold mb-4">
                    Playing Events
                </h2>
                <div className="event-list">
                    {playerEvents.map((event) => (
                        <div key={event.id}>
                            <h3 className="text-green-700 font-bold">
                                {event.game}
                            </h3>
                            <p className="text-black">Venue: {event.venue}</p>
                            <p className="text-black">
                                Date and Time: {formatDateTime(event.date_time)}
                            </p>
                            <p className="text-black">
                                Max Players: {event.max_players}
                            </p>
                            <p className="text-black">
                                Max Spectators: {event.max_spectators}
                            </p>
                            <p className="text-black">
                                Competitive Rating: {event.competitive_rating}
                            </p>
                            <p className="text-black">
                                Minimum Age: {event.min_age}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>
            <Card className="p-4 shadow-md mb-4">
                <h2 className="text-black text-xl font-bold mb-4">
                    Spectating Events
                </h2>
                <div className="event-list">
                    {spectatorEvents.map((event) => (
                        <div key={event.id}>
                            <h3 className="text-green-700 font-bold">
                                {event.game}
                            </h3>
                            <p className="text-black">Venue: {event.venue}</p>
                            <p className="text-black">
                                Date and Time: {formatDateTime(event.date_time)}
                            </p>
                            <p className="text-black">
                                Max Players: {event.max_players}
                            </p>
                            <p className="text-black">
                                Max Spectators: {event.max_spectators}
                            </p>
                            <p className="text-black">
                                Competitive Rating: {event.competitive_rating}
                            </p>
                            <p className="text-black">
                                Minimum Age: {event.min_age}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default MemberEventList

'use client'
import { useEffect, useState, useCallback } from 'react'
import { apiHost } from './constants'
import { useParams } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { Card, Button } from 'flowbite-react'
/* eslint-disable */

const MemberEventList = () => {
    const { eventId } = useParams()
    const [memberId, setMemberId] = useState('')
    const [userEvents, setUserEvents] = useState([])
    const [playerEvents, setPlayerEvents] = useState([])
    const [spectatorEvents, setSpectatorEvents] = useState([])
    const [alertMessage, setAlertMessage] = useState('')
    const { token, fetchWithCookie } = useToken()

    const getUserData = useCallback(async () => {
        try {
            const userData = await fetchWithCookie(`${apiHost}/token`)
            setMemberId(userData.account.id)
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
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
                `${apiHost}/user/${memberId}/events/player`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            if (request.ok) {
                const data = await request.json()
                setPlayerEvents(data)
            }
        } catch (error) {
            console.error('Error fetching playing events:', error)
        }
    }, [token, memberId])


    const fetchSpectatorEvents = useCallback(async () => {
        try {
            const request = await fetch(
                `${apiHost}/user/${memberId}/events/spectator`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            if (request.ok) {
                const data = await request.json()
                setSpectatorEvents(data)
            }
        } catch (error) {
            console.error('Error fetching spectator events:', error)
        }
    }, [token, memberId])


    const handleDeleteClick = async (eId) => {
        const deleteAttendees = await fetch(
            `${apiHost}/events/${eId}/members_events`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        if (deleteAttendees.ok) {
            const deleteEvent = await fetch(`${apiHost}/user/events/${eId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (deleteEvent.ok) {
                setAlertMessage('Event member deleted successfully')
                fetchUserEvents()
                fetchPlayingEvents()
                fetchSpectatorEvents()
            } else {
                setAlertMessage('Failed to delete event member')
            }
        } else {
            setAlertMessage('Failed to delete all attendees from event')
        }
    }


    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString)
        const formattedDate = dateTime.toLocaleDateString()
        const formattedTime = dateTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
        return `${formattedDate} ${formattedTime}`
    }

    const deleteAttendStatus = async (eId) => {
        const response = await fetch(
            `${apiHost}/events/${eId}/members_events/${memberId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response.ok) {
            fetchPlayingEvents()
            fetchSpectatorEvents()
        } else {
            throw new Error('Could not delete attending status')
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                await getUserData()
            }
        }

        fetchUser()
    }, [
        token,
        getUserData,
    ])

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                await fetchUserEvents()
            }
        }

        fetchUser()
    }, [token, fetchUserEvents])

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                await fetchPlayingEvents()
                await fetchSpectatorEvents()
            }
        }
        fetchData()
    }, [token, fetchPlayingEvents, fetchSpectatorEvents])


    return (
        <div className="flex justify-center items-center h-full">
            <Card className="p-4 shadow-md mb-4">
                <h1 className="text-black text-xl font-bold mb-4">My Events</h1>
                <div className="event-list">
                    {alertMessage && (
                        <p style={{ color: '#32CD32' }}>{alertMessage}</p>
                    )}
                    {userEvents.map((e) => (
                        <div key={e.id}>
                            <h3 className="text-green-700 font-bold">
                                {e.game}
                            </h3>
                            <p className="text-black">Venue: {e.venue}</p>
                            <p className="text-black">
                                Date and Time: {formatDateTime(e.date_time)}
                            </p>
                            <p className="text-black">
                                Max Players: {e.max_players}
                            </p>
                            <p className="text-black">
                                Max Spectators: {e.max_spectators}
                            </p>
                            <p className="text-black">
                                Competitive Rating: {e.competitive_rating}
                            </p>
                            <p className="text-black">
                                Minimum Age: {e.min_age}
                            </p>
                            <div
                                style={{
                                    display: 'inline-block',
                                    marginLeft: '10px',
                                }}
                            >
                                <Button
                                    gradientMonochrome="failure"
                                    onClick={() => handleDeleteClick(e.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            <Card className="p-4 shadow-md mb-4">
                <h2 className="text-black text-xl font-bold mb-4">
                    Playing Events
                </h2>
                <div className="event-list">
                    {playerEvents.map((e) => (
                        <div key={e.id}>
                            <h3 className="text-green-700 font-bold">
                                {e.game}
                            </h3>
                            <p className="text-black">Venue: {e.venue}</p>
                            <p className="text-black">
                                Date and Time: {formatDateTime(e.date_time)}
                            </p>
                            <p className="text-black">
                                Max Players: {e.max_players}
                            </p>
                            <p className="text-black">
                                Max Spectators: {e.max_spectators}
                            </p>
                            <p className="text-black">
                                Competitive Rating: {e.competitive_rating}
                            </p>
                            <p className="text-black">
                                Minimum Age: {e.min_age}
                            </p>
                            <Button
                                outline
                                gradientMonochrome="purple"
                                onClick={() => deleteAttendStatus(e.id)}
                            >
                                Remove from player list
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>
            <Card className="p-4 shadow-md mb-4">
                <h2 className="text-black text-xl font-bold mb-4">
                    Spectating Events
                </h2>
                <div className="event-list">
                    {spectatorEvents.map((e) => (
                        <div key={e.id}>
                            <h3 className="text-green-700 font-bold">
                                {e.game}
                            </h3>
                            <p className="text-black">Venue: {e.venue}</p>
                            <p className="text-black">
                                Date and Time: {formatDateTime(e.date_time)}
                            </p>
                            <p className="text-black">
                                Max Players: {e.max_players}
                            </p>
                            <p className="text-black">
                                Max Spectators: {e.max_spectators}
                            </p>
                            <p className="text-black">
                                Competitive Rating: {e.competitive_rating}
                            </p>
                            <p className="text-black">
                                Minimum Age: {e.min_age}
                            </p>
                            <Button
                                outline
                                gradientMonochrome="purple"
                                onClick={() => deleteAttendStatus(e.id)}
                            >
                                Remove from spectator list
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default MemberEventList

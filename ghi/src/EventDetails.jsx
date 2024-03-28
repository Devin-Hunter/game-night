'use client'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Button } from 'flowbite-react'
import { apiHost } from './constants'
import useToken from '@galvanize-inc/jwtdown-for-react'
/* eslint-disable */

const EventDetails = () => {
    const { token, fetchWithCookie } = useToken()
    const { eventId } = useParams()
    const [event, setEvent] = useState(null)
    const [alertMessage, setAlertMessage] = useState('')
    const [username, setUsername] = useState('')
    const [memberId, setMemberId] = useState('')
    const [player, setPlayer] = useState(false)
    const [spectator, setSpectator] = useState(false)

    const getUserData = useCallback(async () => {
        const userData = await fetchWithCookie(`${apiHost}/token`)
        setUsername(userData.account.username)
        setMemberId(userData.account.id)
        return userData
    }, [fetchWithCookie])


    const fetchPlayingEvents = useCallback(async () => {
        try {
            const request = await fetch(
                `${apiHost}/user/${memberId}/events/player`,
                { credentials: 'include' },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (request.ok) {
                const data = await request.json()
                console.log(event.id)
                setPlayer(data.some((p) => p.id === event.id))
                console.log(player)
            }
        } catch (error) {
            console.error('Error fetching playing events:', error)
        }
    }, [token, memberId])

    const fetchSpectatorEvents = useCallback(async () => {
        try {
            const request = await fetch(
                `${apiHost}/user/${memberId}/events/spectator`,
                { credentials: 'include' },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (request.ok) {
                const data = await request.json()
                setSpectator(data.some((s) => s.id === event.id))
            }
        } catch (error) {
            console.error('Error fetching spectator events:', error)
        }
    }, [token, memberId])


    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                await getUserData()
                await fetchPlayingEvents()
                await fetchSpectatorEvents()
            }
        }

        const fetchEventDetails = async () => {
            try {
                const request = await fetch(`${apiHost}/events/${eventId}`)

                if (!request.ok) {
                    throw new Error('Failed to fetch event details')
                }
                const data = await request.json()
                data.date_time = formatDate(data.date_time)
                setEvent(data)
            } catch (error) {
                console.error('Error fetching event details:', error)
            }
        }

        fetchData()
        fetchEventDetails()
    }, [token, eventId, fetchPlayingEvents, fetchSpectatorEvents])


    // useEffect(() => {
    //     fetch(`${apiHost}/events/${eventId}`)
    //         .then((res) => res.json())
    //         .then((data) => setEvent(data))
    //         .catch((error) => {
    //             console.error('Error fetching event details:', error)
    //             setAlertMessage('Failed to fetch event details')
    //         })
    // }, [eventId])

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
        }
        const formattedDate = new Date(dateString).toLocaleString(
            'en-US',
            options
        )
        return formattedDate
    }


    const deleteAttendStatus = async () => {
        const response = await fetch(
            `${apiHost}/events/${eventId}/members_events/${memberId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response.ok) {
            fetchPlayingEvents()
        } else {
            throw new Error('Could not delete attending status')
        }
    }

    const handlePlayClick = async () => {
        if (!player) {
            deleteAttendStatus()
            const response = await fetch(
                `${apiHost}/events/${eventId}/member_events/${memberId}/is_player`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ event_id: eventId, memberId }),
                }
            )

            if (response.ok) {
                setAlertMessage('You are now a player in this event!')
                setPlayer(true)
            } else {
                setAlertMessage('Failed to join as a player.')
            }
        } else {
            deleteAttendStatus()
            setAlertMessage('You are no longer a player in this event!')
            setPlayer(false)
        }
    }

    const handleSpectateClick = async () => {
        if (!spectator) {
            deleteAttendStatus()
            const response = await fetch(
                `${apiHost}/events/${eventId}/members_events/${memberId}/is_spectator`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ event_id: eventId, memberId }),
                }
            )
            if (response.ok) {
                setAlertMessage('You are now a spectator in this event!')
                setSpectator(true)
            } else {
                setAlertMessage('Failed to join as a spectator.')
            }
        } else {
            deleteAttendStatus()
            setAlertMessage('You are no longer a spectator at this event!')
            setPlayer(false)
        }

    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <div style={{ maxWidth: '600px' }}>
                <h1 style={{ color: 'black' }}>Event Details</h1>
                {event ? (
                    <Card style={{ padding: '20px' }}>
                        {alertMessage && (
                            <p style={{ color: '#32CD32' }}>{alertMessage}</p>
                        )}
                        <Card>
                            <h2 style={{ color: 'black', fontWeight: 'bold' }}>
                                {event.game}
                            </h2>
                        </Card>
                        <Card>
                            <p style={{ color: 'black' }}>
                                <span style={{ fontWeight: 'bold' }}>
                                    Venue:
                                </span>{' '}
                                {event.venue}
                            </p>
                            <p style={{ color: 'black' }}>
                                <span style={{ fontWeight: 'bold' }}>
                                    Date:
                                </span>{' '}
                                {event.date_time}
                            </p>
                            <p style={{ color: 'black' }}>
                                <span style={{ fontWeight: 'bold' }}>
                                    Competitive Rating:
                                </span>{' '}
                                {event.competitive_rating}
                            </p>
                            <p style={{ color: 'black' }}>
                                <span style={{ fontWeight: 'bold' }}>
                                    Max Players:
                                </span>{' '}
                                {event.max_players}
                            </p>
                            <p style={{ color: 'black' }}>
                                <span style={{ fontWeight: 'bold' }}>
                                    Max Spectators:
                                </span>{' '}
                                {event.max_spectators}
                            </p>
                            <p style={{ color: 'black' }}>
                                <span style={{ fontWeight: 'bold' }}>
                                    Min Age:
                                </span>{' '}
                                {event.min_age}
                            </p>
                            <div>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                    }}
                                >
                                    <Button
                                        style={{
                                            color: 'black',
                                            backgroundColor: '#3498db',
                                            padding: '5px 10px',
                                            border: 'none',
                                            borderRadius: '5px',
                                        }}
                                        onClick={handlePlayClick}
                                    >
                                        Play
                                    </Button>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <Button
                                        style={{
                                            color: 'black',
                                            backgroundColor: '#2ecc71',
                                            padding: '5px 10px',
                                            border: 'none',
                                            borderRadius: '5px',
                                        }}
                                        onClick={handleSpectateClick}
                                    >
                                        Spectate
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Card>
                ) : (
                    <p style={{ color: 'black' }}>Event not found.</p>
                )}
            </div>
        </div>
    )
}

export default EventDetails

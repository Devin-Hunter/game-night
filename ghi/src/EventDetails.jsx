import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'flowbite-react'
import { apiHost } from './constants'
import useToken from '@galvanize-inc/jwtdown-for-react'

const EventDetails = ({ member_id, username, setAlertMessage }) => {
    const { token } = useToken()

    const { eventId } = useParams()
    const [event, setEvent] = useState(null)

    useEffect(() => {
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

        fetchEventDetails()
    }, [eventId])

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

    const handlePlayClick = async () => {
        const response = await fetch(
            `${apiHost}/events/${eventId}/member_events/${member_id}/is_player`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ event_id: eventId, member_id }),
            }
        )

        if (response.ok) {
            setAlertMessage('You are now a player in this event!')
        } else {
            setAlertMessage('Failed to join as a player.')
        }
    }

    const handleSpectateClick = async () => {
        const response = await fetch(
            `${apiHost}/events/${eventId}/member_events/${member_id}/is_spectator`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ event_id: eventId, member_id }),
            }
        )
        if (response.ok) {
            setAlertMessage('You are now a spectator in this event!')
        } else {
            setAlertMessage('Failed to join as a spectator.')
        }
    }

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(
                `${apiHost}/user/${username}/events/${eventId}`,
                {
                    method: 'DELETE',
                }
            )

            if (response.ok) {
                setAlertMessage('Event deleted successfully')
            } else {
                setAlertMessage('Failed to delete event')
            }
        } catch (error) {
            console.error('Error deleting event:', error)
            setAlertMessage('Failed to delete event')
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
                                    <button
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
                                    </button>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <button
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
                                    </button>
                                    <div
                                        style={{
                                            display: 'inline-block',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        <button
                                            style={{
                                                color: 'black',
                                                backgroundColor: '#e74c3c',
                                                padding: '5px 10px',
                                                border: 'none',
                                                borderRadius: '5px',
                                            }}
                                            onClick={handleDeleteClick}
                                        >
                                            Delete
                                        </button>
                                    </div>
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

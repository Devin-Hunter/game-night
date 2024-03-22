import { useState, useEffect } from 'react'
import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'
import './App.css'
import { apiHost } from './constants'
import useToken from '@galvanize-inc/jwtdown-for-react'

export default function EventList() {
    const [events, setEvents] = useState([])

    const { token } = useToken()

    useEffect(() => {
        const getEvents = async () => {
            const request = await fetch(`${apiHost}/events/`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            try {
                if (request.ok) {
                    const data = await request.json()
                    setEvents(data)
                }
            } catch (e) {
                console.log('Error fetching events:', e)
            }
        }

        if (token) {
            getEvents()
        }
    }, [token])

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

    return (
        <div className="mt-10 mx-auto max-w-4xl">
            {events &&
                events.map((event) => (
                    <Link to={`/events/${event.id}`} key={event.id}>
                        <Card key={event.id} className="mb-8 custom-card">
                            <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white game-title">
                                {event.game}
                            </h5>
                            <p className="text-2xl font-normal text-gray-700 dark:text-gray-400">
                                <span className="font-bold">Venue:</span>{' '}
                                {event.venue_name}
                            </p>
                            <p className="text-2xl font-normal text-gray-700 dark:text-gray-400">
                                <span className="font-bold">
                                    Date and Time:
                                </span>{' '}
                                {formatDate(event.date_time)}
                            </p>
                            <p className="text-2xl font-normal text-gray-700 dark:text-gray-400">
                                <span className="font-bold">Max Players:</span>{' '}
                                {event.max_players}
                            </p>
                            <p className="text-2xl font-normal text-gray-700 dark:text-gray-400">
                                <span className="font-bold">
                                    Max Spectators:
                                </span>{' '}
                                {event.max_spectators}
                            </p>
                        </Card>
                    </Link>
                ))}
        </div>
    )
}

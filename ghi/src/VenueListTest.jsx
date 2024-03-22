'use client'
import { useEffect, useState } from 'react'
import { Tabs, Button, Card, Modal, List } from 'flowbite-react'
import { TfiViewList } from 'react-icons/tfi'
import { MdDashboard } from 'react-icons/md'
import { apiHost } from './constants'
import useToken from '@galvanize-inc/jwtdown-for-react'
import AddVenueForm from './AddVenue'

export default function VenuesList() {
    const { token } = useToken()

    const [inpersonVenues, setInpersonVenues] = useState([])
    const [onlineVenues, setOnlineVenues] = useState([])
    const [venueDetails, setVenueDetails] = useState([])
    const [openModal, setOpenModal] = useState(false)

    const getInPersonVenues = async function () {
        const url = `${apiHost}/venues/inperson`

        const request = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        })

        if (!request.ok) {
            throw new Error('Bad fetch response for In Person Venues')
        } else {
            const data = await request.json()
            setInpersonVenues(data)
        }
    }

    const getonlineVenues = async function () {
        const url = `${apiHost}/venues/online/`
        const request = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        })

        if (!request.ok) {
            throw new Error('Bad fetch response for Online Venues')
        } else {
            const data = await request.json()
            setOnlineVenues(data)
        }
    }

    const handleVenueFormSubmit = () => {
        getInPersonVenues()
        getonlineVenues()
    }

    const detailButton = async function (venueId) {
        setOpenModal(true)

        const url = `${apiHost}/venues/${venueId}`
        const request = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        })

        if (!request.ok) {
            throw new Error('Bad fetch request for venue details')
        } else {
            const data = await request.json()
            String(data.reservation_req)
            console.log(String(data.reservation_req))
            setVenueDetails(data)
            console.log(venueDetails)
        }
    }

    useEffect(() => {
        if (token) {
            getInPersonVenues(), getonlineVenues()
        }
    }, [token])

    return (
        <div className="flexbox overflow-x-auto">
            <div
                id="main"
                className="w-full max-w-screen-xl bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
            >
                <Tabs
                    aria-label="Full width tabs"
                    style="fullWidth"
                    gradientDuoTone="purpleToBlue"
                >
                    <Tabs.Item
                        active
                        title="In Person Venues"
                        className="text-xl"
                        icon={MdDashboard}
                    >
                        <div className="flex flex-wrap">
                            {inpersonVenues.map((venue) => {
                                return (
                                    <div
                                        key={venue.id}
                                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                                    >
                                        <Card className="bg-gray-100">
                                            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                                {venue.venue_name}
                                            </h5>
                                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                                {venue.city},{' '}
                                                {venue.state_abbrev}
                                            </p>
                                            <Button
                                                gradientDuoTone="purpleToBlue"
                                                onClick={() =>
                                                    detailButton(venue.id)
                                                }
                                            >
                                                Details
                                            </Button>
                                        </Card>
                                    </div>
                                )
                            })}
                            {openModal && (
                                <Modal
                                    dismissible
                                    show={openModal}
                                    onClose={() => setOpenModal(false)}
                                >
                                    <Modal.Header>
                                        {venueDetails.venue_name}
                                    </Modal.Header>
                                    <Modal.Body>
                                        <List>
                                            <List.Item>
                                                {' '}
                                                Website: {''}
                                                {venueDetails.online_link}
                                            </List.Item>
                                            <List.Item>
                                                {' '}
                                                City: {''}
                                                {venueDetails.city}
                                            </List.Item>
                                            <List.Item>
                                                {' '}
                                                State: {''}
                                                {venueDetails.state_abbrev}
                                            </List.Item>
                                            <List.Item>
                                                {' '}
                                                Hours of Operation: {''}
                                                {venueDetails.hours_operation}
                                            </List.Item>
                                            <List.Item>
                                                Phone Number: {''}
                                                {venueDetails.phone_number}
                                            </List.Item>
                                            <List.Item>
                                                Venue Type: {''}
                                                {venueDetails.venue_type}
                                            </List.Item>
                                            <List.Item>
                                                Requires Reservation: {''}
                                                {String(
                                                    venueDetails.reservation_req
                                                )}
                                            </List.Item>
                                        </List>
                                    </Modal.Body>
                                    <Modal.Footer className="flex flex-wrap gap-2">
                                        <Button gradientDuoTone="purpleToBlue">
                                            Update Venue
                                        </Button>
                                        <Button gradientMonochrome="failure">
                                            Delete Venue
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            )}
                        </div>
                    </Tabs.Item>
                    <Tabs.Item
                        active
                        title="Online Venues"
                        className="h-3/4 text-xl"
                        icon={MdDashboard}
                    >
                        <div className="grid grid-cols-4 gap-6">
                            {onlineVenues.map((venue) => {
                                const link = venue.online_link
                                const isExternalLink =
                                    link.startsWith('http://') ||
                                    link.startsWith('https://')

                                return (
                                    <Card key={venue.id} className="max-w-xl bg-gray-100">
                                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                            {venue.venue_name}
                                        </h5>
                                        {isExternalLink ? (
                                            <a
                                                href={venue.online_link}
                                                target="_blank"
                                            >
                                                {venue.online_link}
                                            </a>
                                        ) : (
                                            <p>{venue.online_link}</p>
                                        )}
                                    </Card>
                                )
                            })}
                        </div>
                    </Tabs.Item>
                    <Tabs.Item title="Add New Venue" icon={TfiViewList}>
                        <AddVenueForm onSubmit={handleVenueFormSubmit} />
                    </Tabs.Item>
                </Tabs>
            </div>
        </div>
    )
}

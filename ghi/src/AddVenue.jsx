'use client'
import { useNavigate } from 'react-router-dom'
import AddLocationForm from './AddLocation'
import {
    Button,
    Label,
    TextInput,
    Select,
    Modal,
    ToggleSwitch,
} from 'flowbite-react'
import { useEffect, useState } from 'react'
import { apiHost } from './constants'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'

export default function AddVenueForm({ onSubmit }) {
    const { token } = useAuthContext()

    const initialFormState = {
        venue_name: '',
        online_link: '',
        location_id: '',
        hours_operation: '',
        phone_number: '',
        venue_type: '',
        reservation_req: 'false',
    }

    const [formState, setFormState] = useState(initialFormState)
    const [openModal, setOpenModal] = useState(false)
    const [locations, setLocations] = useState([])
    const [switch1, setSwitch1] = useState(false)
    const navigate = useNavigate()

    const getLocations = async function () {
        const url = `${apiHost}/locations/list`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Bad fetch response for Locations')
        } else {
            const data = await response.json()
            setLocations(data)
        }
    }

    const handleVenueChange = (event) => {
        const value = event.target.value
        const inputName = event.target.id

        setFormState((prevState) => ({
            ...prevState,
            [inputName]: value,
        }))
    }

    const handleToggle = () => {
        setSwitch1(!switch1)
        setFormState((prevState) => ({
            ...prevState,
            reservation_req: !switch1,
        }))
    }

    const handleVenueSubmit = async function (event) {
        event.preventDefault()

        // const url = `${VITE_API_HOST}/api/foobar`
        const url = `${apiHost}/venues`

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formState),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await fetch(url, fetchConfig)
        if (!response.ok) {
            throw new Error('Bad fetch response while adding new venue')
        } else {
            onSubmit(formState)
            setFormState(initialFormState)
            setSwitch1(false)
            navigate('/venues')
        }
    }

    function onCloseModal() {
        setOpenModal(false)
    }

    const handleModalSubmit = () => {
        onCloseModal()
        getLocations()
    }

    useEffect(() => {
        getLocations()
    }, [])

    return (
        <form className="max-w-sm mx-auto pt-6" onSubmit={handleVenueSubmit}>
            <div className="grid sm:grid-cols-2 sm:gap-6 w-max bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="sm:col-span-2">
                    <div>
                        <Label htmlFor="venue_name" value="Name" />
                    </div>
                    <TextInput
                        id="venue_name"
                        type="text"
                        placeholder="Venue Name"
                        value={formState.venue_name}
                        onChange={handleVenueChange}
                        required
                    />
                </div>
                <div className="sm:col-span-1">
                    <div>
                        <Label htmlFor="location_id" value="Location" />
                    </div>
                    <Select
                        id="location_id"
                        placeholder="Choose a Location"
                        onChange={handleVenueChange}
                        value={formState.location_id}
                        required
                    >
                        <option defaultValue="">Choose a Location</option>
                        {locations.map((local) => {
                            return (
                                <option key={local.id} value={local.id}>
                                    {local.city}, {local.state_abbrev}
                                </option>
                            )
                        })}
                    </Select>
                </div>
                <Button
                    className="sm:col-span-1 mt-6"
                    gradientDuoTone="greenToBlue"
                    onClick={() => setOpenModal(true)}
                >
                    Add New Location
                </Button>
                <Modal
                    show={openModal}
                    onSubmit={handleModalSubmit}
                    size="md"
                    onClose={onCloseModal}
                    popup
                >
                    <Modal.Header>
                        <div className="space-y-6">
                            <h3 className=" text-xl font-medium text-gray-900 dark:text-white">
                                Add a New Location
                            </h3>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <AddLocationForm onSubmit={handleModalSubmit} />
                    </Modal.Body>
                </Modal>
                <div className="mb-1">
                    <div>
                        <Label htmlFor="phone_number" value="Phone" />
                    </div>
                    <TextInput
                        id="phone_number"
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="Ex. 555-555-0000"
                        value={formState.phone_number}
                        onChange={handleVenueChange}
                    />
                </div>
                <div className="mb-1">
                    <div>
                        <Label htmlFor="hours_operation" value="Hours" />
                    </div>
                    <TextInput
                        id="hours_operation"
                        type="text"
                        placeholder="Hours of Operation"
                        value={formState.hours_operation}
                        onChange={handleVenueChange}
                        required
                    />
                </div>
                <div className="sm:col-span-1">
                    <div>
                        <Label htmlFor="venue_type" value="Venue Type" />
                    </div>
                    <TextInput
                        id="venue_type"
                        type="text"
                        placeholder="Venue Type"
                        value={formState.venue_type}
                        onChange={handleVenueChange}
                    />
                </div>
                <div className="sm:col-span-1">
                    <div>
                        <Label htmlFor="online_link" value="Website" />
                    </div>
                    <TextInput
                        id="online_link"
                        type="text"
                        placeholder="Venue Website"
                        value={formState.online_link}
                        onChange={handleVenueChange}
                        required
                    />
                </div>
                <div className="sm:col-span-2">
                    <ToggleSwitch
                        checked={switch1}
                        label="Reservation Required"
                        value={formState.reservation_req}
                        onChange={handleToggle}
                    />
                </div>
                <Button
                    className="sm:col-span-2"
                    gradientDuoTone="greenToBlue"
                    type="submit"
                >
                    Submit
                </Button>
            </div>
        </form>
    )
}

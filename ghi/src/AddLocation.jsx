'use client'
import { ToggleSwitch, Button, Label, TextInput, Select } from 'flowbite-react'
import { useState } from 'react'

export default function AddLocationForm({ onSubmit }) {
    const initialLocationForm = {
        online: 'false',
        city: '',
        state: '',
        state_abbrev: '',
    }

    const [locationForm, setLocationForm] = useState(initialLocationForm)
    const [switch1, setSwitch1] = useState(false)

    const states = [
        { label: 'Online', value: 'N/A' },
        { label: 'Alabama', value: 'AL' },
        { label: 'Alaska', value: 'AK' },
        { label: 'American Samoa', value: 'AS' },
        { label: 'Arizona', value: 'AZ' },
        { label: 'Arkansas', value: 'AR' },
        { label: 'California', value: 'CA' },
        { label: 'Colorado', value: 'CO' },
        { label: 'Connecticut', value: 'CT' },
        { label: 'Delaware', value: 'DE' },
        { label: 'District of Columbia', value: 'DC' },
        { label: 'Florida', value: 'FL' },
        { label: 'Georgia', value: 'GA' },
        { label: 'Guam', value: 'GU' },
        { label: 'Hawaii', value: 'HI' },
        { label: 'Idaho', value: 'ID' },
        { label: 'Illinois', value: 'IL' },
        { label: 'Indiana', value: 'IN' },
        { label: 'Iowa', value: 'IA' },
        { label: 'Kansas', value: 'KS' },
        { label: 'Kentucky', value: 'KY' },
        { label: 'Louisiana', value: 'LA' },
        { label: 'Maine', value: 'ME' },
        { label: 'Maryland', value: 'MD' },
        { label: 'Massachusetts', value: 'MA' },
        { label: 'Michigan', value: 'MI' },
        { label: 'Minnesota', value: 'MN' },
        { label: 'Mississippi', value: 'MS' },
        { label: 'Missouri', value: 'MO' },
        { label: 'Montana', value: 'MT' },
        { label: 'Nebraska', value: 'NE' },
        { label: 'Nevada', value: 'NV' },
        { label: 'New Hampshire', value: 'NH' },
        { label: 'New Jersey', value: 'NJ' },
        { label: 'New Mexico', value: 'NM' },
        { label: 'New York', value: 'NY' },
        { label: 'North Carolina', value: 'NC' },
        { label: 'North Dakota', value: 'ND' },
        { label: 'Ohio', value: 'OH' },
        { label: 'Oklahoma', value: 'OK' },
        { label: 'Oregon', value: 'OR' },
        { label: 'Pennsylvania', value: 'PA' },
        { label: 'Puerto Rico', value: 'PR' },
        { label: 'Rhode Island', value: 'RI' },
        { label: 'South Carolina', value: 'SC' },
        { label: 'South Dakota', value: 'SD' },
        { label: 'Tennessee', value: 'TN' },
        { label: 'Texas', value: 'TX' },
        { label: 'Utah', value: 'UT' },
        { label: 'Vermont', value: 'VT' },
        { label: 'Virgin Islands', value: 'VI' },
        { label: 'Virginia', value: 'VA' },
        { label: 'Washington', value: 'WA' },
        { label: 'West Virginia', value: 'WV' },
        { label: 'Wisconsin', value: 'WI' },
        { label: 'Wyoming', value: 'WY' },
    ]

    const handleLocationChange = (event) => {
        const value = event.target.value
        const inputName = event.target.id

        setLocationForm((prevState) => ({
            ...prevState,
            [inputName]: value,
        }))
    }

    const handleStateChange = (event) => {
        const selectedState = states.find(
            (state) => state.label === event.target.value
        )
        setLocationForm((prevState) => ({
            ...prevState,
            state: selectedState.label,
            state_abbrev: selectedState.value,
        }))
    }

    const handleToggle = () => {
        setSwitch1(!switch1)
        setLocationForm(() => ({
            online: !switch1,
            city: 'Online',
            state: 'Online',
            state_abbrev: 'N/A',
        }))
    }

    const handleLocationSubmit = async function (event) {
        event.preventDefault()

        // const url = `${VITE_API_HOST}/locations`
        const url = `http://localhost:8000/locations/`

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(locationForm),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig)
        if (!response.ok) {
            throw new Error('Bad fetch response while adding new location')
        } else {
            onSubmit(locationForm)
            setLocationForm(initialLocationForm)
        }
    }

    return (
        <form className="max-w-sm mx-auto pt-6" onSubmit={handleLocationSubmit}>
            <div className="pb-5">
                <ToggleSwitch
                    checked={switch1}
                    label="Online Venue?"
                    value={locationForm.online}
                    onChange={handleToggle}
                />
            </div>
            <div className="mb-5">
                <div className=" block">
                    <Label htmlFor="city" value="City" />
                </div>
                <TextInput
                    id="city"
                    type="text"
                    placeholder="City"
                    value={locationForm.city}
                    onChange={handleLocationChange}
                    required
                />
            </div>
            <div className="mb-5">
                <div className="block">
                    <Label htmlFor="states" value="State" />
                </div>
                <Select
                    placeholder="Choose a State"
                    onChange={handleStateChange}
                    value={locationForm.state}
                    required
                >
                    <option placeholder="Choose a State"></option>
                    {states.map((state) => {
                        return (
                            <option key={state.value} value={state.label}>
                                {state.label}
                            </option>
                        )
                    })}
                </Select>
            </div>
            <Button type="submit">Submit</Button>
        </form>
    )
}

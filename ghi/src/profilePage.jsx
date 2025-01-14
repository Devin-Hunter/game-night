/* eslint-disable */
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { apiHost } from './constants'

const ProfilePage = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(0);
    const [skill, setSkill] = useState('');
    const [about, setAbout] = useState('');
    const [locations, setLocations] = useState([]);
    const [locationChoice, setLocationChoice] = useState('');
    const { token, fetchWithCookie } = useToken();
    const [username, setUsername] = useState('');

    const getMemberData = useCallback(async () => {
        const memberData = await fetchWithCookie(`${apiHost}/token/`)
        setFirstName(memberData['account']['first_name'])
        setLastName(memberData['account']['last_name'])
        setAge(memberData['account']['age'])
        setSkill(memberData['account']['skill_level'])
        setAbout(memberData['account']['about'])
        setLocationChoice(memberData['account']['location_id'])
        setUsername(memberData['account']['username'])
    }, [fetchWithCookie])

    const fetchLocations = async () => {
        const url = `${apiHost}/locations/list`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setLocations(data)
        }
    }

    useEffect(() => {
        fetchLocations(),
        getMemberData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const accountData = {
            first_name: firstName,
            last_name: lastName,
            age: parseInt(age),
            skill_level: skill,
            about: about,
            location_id: parseInt(locationChoice),
        }

        const url = `${apiHost}/user/${username}`
        const fetchConfig = {
            method: 'put',
            body: JSON.stringify(accountData),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await fetch(url, fetchConfig)
        if (!response.ok) {
            throw new Error('Could not update user info')
        } else {
            console.log('user info updated!')
            navigate(`/profile`)
        }
    }

    return (
        <div className="">
            <div className="grid">
                <div className="grid-cols-4 gap-4 mb-4">
                    <div className="w-full
                    max-w-sm
                    mx-auto
                    p-4 bg-white
                    border border-gray-200
                    rounded-lg
                    shadow
                    sm:p-6
                    md:p-8">
                        <div
                            className="w-full
                            max-w-sm
                            p-4
                            bg-white
                            border border-gray-200
                            rounded-lg
                            shadow
                            sm:p-6
                            md:p-8
                            dark:bg-gray-800
                            dark:border-gray-700"
                        >
                            <form
                                className="space-y-6"
                                onSubmit={(event) => handleSubmit(event)}
                            >
                                <h5
                                    className="text-xl
                                font-medium
                                text-gray-900
                                dark:text-white"
                                >
                                    Update Information
                                </h5>
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-900"
                                    >
                                        Your First Name
                                    </label>
                                    <input
                                        onChange={(event) =>
                                            setFirstName(event.target.value)
                                        }
                                        value={firstName}
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        className="bg-gray-50
                                    border border-gray-300
                                    text-gray-900 text-sm rounded-lg
                                    focus:ring-blue-500 focus:border-blue-500
                                    block w-full
                                    p-2.5"
                                        placeholder="Your First Name Here"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-900"
                                    >
                                        Your Last Name
                                    </label>
                                    <input
                                        onChange={(event) =>
                                            setLastName(event.target.value)
                                        }
                                        value={lastName}
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        className="bg-gray-50
                                    border border-gray-300
                                    text-gray-900
                                    text-sm rounded-lg
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    block w-full
                                    p-2.5"
                                        placeholder="Your Last Name Here"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="age"
                                        className="block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-900"
                                    >
                                        Your Age
                                    </label>
                                    <input
                                        onChange={(event) =>
                                            setAge(event.target.value)
                                        }
                                        value={age}
                                        type="number"
                                        name="age"
                                        id="age"
                                        className="bg-gray-50
                                    border border-gray-300
                                    text-gray-900
                                    text-sm
                                    rounded-lg
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    block w-full
                                    p-2.5"
                                        placeholder="16"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="skill"
                                        className="block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-900"
                                    >
                                        Skill Level
                                    </label>
                                    <select
                                        onChange={(event) =>
                                            setSkill(event.target.value)
                                        }
                                        value={skill}
                                        className="bg-gray-50
                                    border border-gray-300
                                    text-gray-900
                                    text-sm
                                    rounded-lg
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    block w-full
                                    p-2.5"
                                    >
                                        <option value="">
                                            Select your skill level
                                        </option>
                                        <option value="Novice">Novice</option>
                                        <option value="Average">
                                            Casual/Average
                                        </option>
                                        <option value="Advanced">
                                            Advanced
                                        </option>
                                        <option value="Master">Master</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="location"
                                        className="block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-900"
                                    >
                                        Location
                                    </label>
                                    <select
                                        onChange={(event) =>
                                            setLocationChoice(
                                                event.target.value
                                            )
                                        }
                                        id="location"
                                        value={locationChoice}
                                        className="bg-gray-50
                                    border border-gray-300
                                    text-gray-900
                                    text-sm
                                    rounded-lg
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    block w-full
                                    p-2.5"
                                    >
                                        <option>Select your location</option>
                                        {locations.map((location) => {
                                            return (
                                                <option
                                                    key={location.id}
                                                    value={location.id}
                                                >
                                                    {location.city},{' '}
                                                    {location.state_abbrev}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="about"
                                        className="block
                                        mb-2
                                        text-sm
                                        font-medium
                                        text-gray-900
                                        dark:text-white"
                                    >
                                        About You
                                    </label>
                                    <textarea
                                        onChange={(event) =>
                                            setAbout(event.target.value)
                                        }
                                        value={about}
                                        rows="3"
                                        name="about"
                                        id="about"
                                        className="bg-gray-50
                                        border border-gray-300
                                        text-gray-900
                                        text-sm
                                        rounded-lg
                                        focus:ring-blue-500
                                        focus:border-blue-500
                                        block w-full
                                        p-2.5
                                        dark:bg-gray-600
                                        dark:border-gray-500
                                        dark:placeholder-gray-400
                                        dark:text-white"
                                        placeholder="A short description of yourself and your interests"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full
                                    text-white
                                    bg-blue-700
                                    hover:bg-blue-800
                                    focus:ring-4
                                    focus:outline-none
                                    focus:ring-blue-300
                                    font-medium
                                    rounded-lg
                                    text-sm
                                    px-5
                                    py-2.5
                                    text-center
                                    dark:bg-blue-600
                                    dark:hover:bg-blue-700
                                    dark:focus:ring-blue-800"
                                    value="Register"
                                >
                                    Update your account
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfilePage

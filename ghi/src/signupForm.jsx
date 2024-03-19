import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { apiHost } from "./App";

const SignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState();
    const [skill, setSkill] = useState('');
    const [about, setAbout] = useState('');
    const [locations, setLocations] = useState([]);
    const [locationChoice, setLocationChoice] = useState('');
    const { register } = useToken();
    const navigate = useNavigate();

    const fetchLocations = async () =>{
        const url = 'http://localhost:8000/locations'
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            console.log(data)
            setLocations(data)
        }
    }
    useEffect(()=>{
        fetchLocations();
    }, [])

    const handleRegistration = (event) => {
        event.preventDefault();
        const accountData = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
            age: parseInt(age),
            skill_level: skill,
            about: about,
            location_id: parseInt(locationChoice),
        };
        register(
            accountData, 
            `${apiHost}/user`
        );
        event.target.reset();
        navigate('/profile');
    };
    return (
        <div className="p-4 ml-64">
            <div className="grid">
                <div className="grid-cols-4 gap-4 mb-4">
                    <div className="w-full max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
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
                                onSubmit={(event) => handleRegistration(event)}
                            >
                                <h5
                                    className="text-xl 
                                font-medium 
                                text-gray-900 
                                dark:text-white"
                                >
                                    Sign Up
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
                                        htmlFor="username"
                                        className="block 
                                    mb-2 
                                    text-sm 
                                    font-medium 
                                    text-gray-900"
                                    >
                                        Username
                                    </label>
                                    <input
                                        onChange={(event) =>
                                            setUsername(event.target.value)
                                        }
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 
                                    border border-gray-300 
                                    text-gray-900 
                                    text-sm 
                                    rounded-lg 
                                    focus:ring-blue-500 
                                    focus:border-blue-500 
                                    block w-full 
                                    p-2.5"
                                        placeholder="username"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block 
                                    mb-2 
                                    text-sm 
                                    font-medium 
                                    text-gray-900"
                                    >
                                        Your password
                                    </label>
                                    <input
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 
                                    border border-gray-300 
                                    text-gray-900 
                                    text-sm 
                                    rounded-lg 
                                    focus:ring-blue-500 
                                    focus:border-blue-500
                                    block w-full
                                    p-2.5"
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
                                        htmlFor="skill"
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
                                        id="skill"
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
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        About You
                                    </label>
                                    <textarea
                                        onChange={(event) =>
                                            setAbout(event.target.value)
                                        }
                                        rows="3"
                                        name="about"
                                        id="about"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="A short description of yourself and your interests"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    value="Register"
                                >
                                    Create your account
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignupForm
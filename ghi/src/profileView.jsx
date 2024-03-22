import { useNavigate } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { apiHost } from './constants'
import { useEffect, useState } from 'react';

const Profile = () => {
    const navigate = useNavigate();
    const { token, fetchWithCookie } = useToken();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [skill, setSkill] = useState('')
    const [age, setAge] = useState('')
    const [about, setAbout] = useState('')
    const [username, setUsername] = useState('')

    const getMemberData = async() =>{
        const memberData = await fetchWithCookie(`${apiHost}/token/`);
        setFirstName(memberData['account']['first_name']);
        setLastName(memberData['account']['last_name']);
        setSkill(memberData['account']['skill_level']);
        setAbout(memberData['account']['about']);
        setAge(memberData['account']['age'])
        setUsername(memberData['account']['username'])
    }
    useEffect(()=>{
        getMemberData()
    },[])
    const handleClick = (e) => {
        if (token) {
            navigate(`/profile/edit`)
        }
    }
    return (
        <div className="p-4 ml-64">
            <div className="grid">
                <div className="grid-cols-3 gap-4 mb-4"></div>
                <div className="mx-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className=" mb-2 text-2xl font-bold text-center text-gray-900 dark:text-white">
                        Your Info
                    </h5>

                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                        Name: {firstName} {lastName}
                    </p>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                        Username: {username}
                    </p>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                        Age: {age}
                    </p>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                        Skill Level: {skill}
                    </p>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                        About: {about}
                    </p>
                    <button
                        onClick={handleClick}
                        type="submit"
                        value="edit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Edit Your Info
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Profile

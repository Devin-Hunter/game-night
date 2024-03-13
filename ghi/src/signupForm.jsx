import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState();
    const [skill, setSkill] = useState('');
    const [avatar, setAvatar] = useState('');
    const [about, setAbout] = useState('');
    const [location, setLocation] = useState();
    const {register} = useToken();
    const navigate = useNavigate();


    const handleRegistration = (event) => {
        event.preventDefault();
        const memberData = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            age: age,
            skill: skill,
            avatar: avatar,
            about: about,
            location: location,
        };
        register(
            memberData,
            `${}`
        )
    }
    return(
        'something'
    )
}
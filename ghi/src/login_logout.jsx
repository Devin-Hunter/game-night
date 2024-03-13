import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const{ login } = useToken();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`username: ${username} password: ${password}`);
        const login_response = login(username, password);
        console.log('login response', login_response)
        e.target.reset();
    };

    return (
        <form class="max-w-sm mx-auto"
        onSubmit={(e) => handleSubmit(e)}>
            <div class="mb-5">
                <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your username
                </label>
                <input
                    type="text"
                    id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username here"
                    required
                />
            </div>
            <div class="mb-5">
                <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your password
                </label>
                <input
                    type="password"
                    id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="password here"
                    required
                />
            </div>
            <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Log In
            </button>
            <button
            // find how to route this to signup form and what to set button type to 
                type="..." 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Sign up
            </button>
        </form>
    );
}
import useToken from '@galvanize-inc/jwtdown-for-react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function MainPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useToken();
    const navigate = useNavigate();
    const { token } = useToken();
    
    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);
        console.log('TOKEN!!!', token)
        e.target.reset();
        navigate('/profile')
    };

    return (
        <div className="p-4 ml-64">
            <div className="grid">
                <div className="grid-cols-3 gap-4 mb-4"></div>
                <div className="w-full max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h1 className="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white">
                        Game Night
                    </h1>
                    <div>
                        <p className="my-4 text-lg text-gray-500 text-center">
                            Have fun with friends, old and new, and play games!
                        </p>
                    </div>
                    <form
                        className="space-y-6"
                        onSubmit={(e) => handleLogin(e)}
                    >
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                            Sign in to our platform
                        </h5>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your username
                            </label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                name="username"
                                id="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Your username here"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            value='Login'
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Login to your account
                        </button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{' '}
                            <Link
                                to='./sign-up/'
                                className="text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Create account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MainPage

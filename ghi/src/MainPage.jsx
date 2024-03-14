function MainPage() {
    return (
        
            <div className="p-4 ml-64">
                <div className="grid">
                    <div className="grid-cols-3 gap-4 mb-4"></div>
                    <div class="w-full max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white">
                            Game Night
                        </h1>
                        <div>
                            <p class="my-4 text-lg text-gray-500 text-center">
                                Have fun with friends, old and new, and play
                                games!
                            </p>
                        </div>
                        <form class="space-y-6" action="#">
                            <h5 class="text-xl font-medium text-gray-900 dark:text-white">
                                Sign in to our platform
                            </h5>
                            <div>
                                <label
                                    for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Your username here"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Login to your account
                            </button>
                            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered?{' '}
                                <a
                                    href="#"
                                    class="text-blue-700 hover:underline dark:text-blue-500"
                                >
                                    Create account
                                </a>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        
    )
}

export default MainPage

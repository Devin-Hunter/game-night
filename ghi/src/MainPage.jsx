import './App.css'

function MainPage() {
    return (
        <div>
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-5 fw-bold">Game Nights</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Game Nights</p>
                </div>
            </div>
            <div className="container">
                <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="input-style"
                            placeholder="name@flowbite.com"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="input-style"
                            required
                        />
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                value=""
                                className="checkbox-style"
                                required
                            />
                        </div>
                        <label
                            htmlFor="remember"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Remember me
                        </label>
                    </div>
                    <button type="submit" className="button-style">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MainPage

import { apiHost } from './constants';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
} from 'react-icons/hi'


function NavBar() {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
            const url = `${apiHost}/token`;
            const response = await fetch(url, {
                method: "delete",
                credentials: "include",
            });
            if (!response.ok) {
                console.error(response.statusText);
                return false;
            }
            navigate('/')
    }

  return (
      <nav>
          <button
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
              <span className="sr-only">Open sidebar</span>
              <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
              </svg>
          </button>

          <aside
              className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
              aria-label="Sidebar"
          >
              <div
                  className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 shadow border-gray-100"
                  id="navbar"
              >
                  <a
                      href="../public/game-night-logo.jpg"
                      className="flex items-center ps-1.5 mb-5"
                  >
                      <img
                          src="../public/game-night-logo.jpg"
                          className="h-6 me-3 sm:h-7"
                          alt="Game Night"
                      />
                      <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                          Game Night
                      </span>
                  </a>
                  <ul className="space-y-2 font-medium">
                      <li>
                          <button
                              type="button"
                              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                              aria-controls="dropdown-all-games"
                              data-collapse-toggle="dropdown-all-games"
                          >
                              <svg
                                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 18 18"
                              >
                                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                              </svg>
                              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                  Games
                              </span>
                              <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 10 6"
                              >
                                  <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 4 4 4-4"
                                  />
                              </svg>
                          </button>
                          <ul
                              id="dropdown-all-games"
                              className="hidden py-2 space-y-2"
                          >
                              <li>
                                  <Link
                                      to="/games"
                                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                  >
                                      Games
                                  </Link>
                              </li>
                              <li>
                                  <Link
                                      to="/games/new"
                                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                  >
                                      Add a Game
                                  </Link>
                              </li>
                          </ul>
                      </li>
                      <li>
                          <Link
                              to="/events"
                              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                              <svg
                                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 18 18"
                              >
                                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                              </svg>
                              <span className="flex-1 ms-3 whitespace-nowrap">
                                  Events
                              </span>
                          </Link>
                      </li>
                      <li>
                          <Link
                              to="./profile/"
                              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                  <path
                                      fillRule="evenodd"
                                      d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                                      clipRule="evenodd"
                                  />
                              </svg>
                              <span className="flex-1 ms-3 whitespace-nowrap">
                                  Profile
                              </span>
                          </Link>
                      </li>
                      <li>
                          <button
                              type="button"
                              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                              aria-controls="dropdown-my-games"
                              data-collapse-toggle="dropdown-my-games"
                          >
                              <svg
                                  className="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                              >
                                  <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                                  />
                              </svg>
                              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                  My Games
                              </span>
                              <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 10 6"
                              >
                                  <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 4 4 4-4"
                                  />
                              </svg>
                          </button>
                          <ul
                              id="dropdown-my-games"
                              className="hidden py-2 space-y-2"
                          >
                              <li>
                                  <Link
                                      to="/games/favorites"
                                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                  >
                                      Favorite Games
                                  </Link>
                              </li>
                              <li>
                                  <Link
                                      to="/games/owned"
                                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                  >
                                      Owned Games
                                  </Link>
                              </li>
                              <li>
                                  <Link
                                      to="/games/wishlist"
                                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                  >
                                      Want to Play Games
                                  </Link>
                              </li>
                          </ul>
                      </li>
                      <li>
                          <button
                              type="button"
                              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                              aria-controls="dropdown-my-events"
                              data-collapse-toggle="dropdown-my-events"
                          >
                              <svg
                                  className="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                              >
                                  <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                                  />
                              </svg>
                              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                  My Events
                              </span>
                              <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 10 6"
                              >
                                  <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 4 4 4-4"
                                  />
                              </svg>
                          </button>
                          <ul
                              id="dropdown-my-events"
                              className="hidden py-2 space-y-2"
                          >
                              <li>
                                  <Link
                                      to="/user/{username}/events"
                                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                  >
                                      My Events
                                  </Link>
                              </li>
                              <li>
                                  <Link
                                      to="/events/new"
                                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                  >
                                      Create Event
                                  </Link>
                              </li>
                              <li>
                                  <Link
                                      to="/venues"
                                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                  >
                                      Event Venues
                                  </Link>
                              </li>
                          </ul>
                      </li>
                      <li>
                          <Link
                              onClick={handleLogout}
                              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                              <svg
                                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 16"
                              >
                                  <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                  />
                              </svg>
                              <span className="flex-1 ms-3 whitespace-nowrap">
                                  Log Out
                              </span>
                          </Link>
                      </li>
                  </ul>
              </div>
          </aside>

          <div className="p-4 sm:ml-64">
              <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                  <div className="grid grid-cols-3 gap-4 mb-4"></div>
              </div>
          </div>
      </nav>
  )
}

export default NavBar

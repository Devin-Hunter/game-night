import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MainPage from './MainPage'
import SignupForm from './signupForm'
import ProfilePage from './profilePage'
import Profile from './profileView'
import NavBar from './Nav'
import VenuesList from './VenuesList'
import EventList from './EventList'
import CreateEvent from './CreateEvent'
import EventDetails from './EventDetails'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import { apiHost } from './constants'
import MemberEventList from './MemberEventList'
import ProtectedRoute from './auth/ProtectedRoute'
import GameForm from './GameForm'
import GameDetail from './GameDetail'
import UpdateGame from './UpdateGame'
import FavoriteGames from './FavoriteGames'
import OwnedGames from './OwnedGames'
import WishlistGames from './WishlistGames'
import GameList from './GameList'

function App() {
    if (!apiHost) throw new Error('base url missing')
    return (
        <BrowserRouter>
            <AuthProvider baseUrl={apiHost}>
                <NavBar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/events" element={<EventList />} />
                    <Route path="/events/member" element={<MemberEventList />} />
                    <Route path="/events/new" element={<CreateEvent />} />
                    <Route path="/events/:eventId" element={<EventDetails />} />
                    <Route path="/venues" element={<VenuesList />} />
                    <Route path="/sign-up/" element={<SignupForm />} />
                    <Route
                        path="/profile/edit"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile/"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/games/:game_id" element={<GameDetail />} />
                    <Route
                        path="/games/update/:game_id"
                        element={<UpdateGame />}
                    />
                    <Route path="/games/new" element={<GameForm />} />
                    <Route
                        path="/games/favorites"
                        element={<FavoriteGames />}
                    />
                    <Route path="/games/owned" element={<OwnedGames />} />
                    <Route path="/games/wishlist" element={<WishlistGames />} />
                    <Route path="/games" element={<GameList />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
export default App

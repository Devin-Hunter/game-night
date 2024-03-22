import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MainPage from './MainPage'
import SignupForm from './signupForm'
import ProfilePage from './profilePage'
import Profile from './profileView'
import NavBar from './Nav'
import AddLocationForm from './AddLocation'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import { apiHost } from './constants'
import ProtectedRoute from './auth/ProtectedRoute'
import GameForm from './GameForm'
import GameDetail from './GameDetail'
import UpdateGame from './UpdateGame'
import FavoriteGames from './FavoriteGames'
import OwnedGames from './OwnedGames'
import WishlistGames from './WishlistGames'

function App() {
    if (!apiHost) throw new Error('base url missing')
    return (
        <BrowserRouter>
            <AuthProvider baseUrl={apiHost}>
                <NavBar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/locations" element={<AddLocationForm />} />
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
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MainPage from './MainPage'
import SignupForm from './signupForm'
import ProfilePage from './profilePage'
import NavBar from './Nav'
import AddLocationForm from './AddLocation'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import { apiHost } from 'Constants'


function App() {
    if (!apiHost) throw new Error('base url missing')
    return (
        <BrowserRouter>
            <AuthProvider baseUrl={apiHost}>
                <NavBar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/locations" element={<AddLocationForm />} />
                        <Route path="/sign-up/" element={<SignupForm />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App

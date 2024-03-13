import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MainPage from './MainPage'
import NavBar from './Nav'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'

function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <NavBar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App

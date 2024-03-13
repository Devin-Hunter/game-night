import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MainPage from './MainPage'
import NavBar from './Nav'

function App() {

    return (
        <BrowserRouter>
            <NavBar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App

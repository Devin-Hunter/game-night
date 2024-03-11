import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './MainPage'
import Nav from './Nav'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <div className="container">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MainPage from './MainPage'
import NavBar from './Nav'
import AddLocationForm from './AddLocation'

function App() {

    return (
        <BrowserRouter>
            <NavBar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/locations" element={<AddLocationForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App

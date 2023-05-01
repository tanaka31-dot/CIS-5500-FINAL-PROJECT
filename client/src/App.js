import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BusinessesPage from './pages/Businesses'
import Navbar from './components/NavBar'
import OneBusinessPage from './pages/BusinessInfo.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/businesses" element={<BusinessesPage />} />
          <Route path="/business/:business_id" element={<OneBusinessPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

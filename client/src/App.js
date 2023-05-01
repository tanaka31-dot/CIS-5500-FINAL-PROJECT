import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BusinessesPage from './pages/Businesses'
<<<<<<< HEAD
import Navbar from './components/NavBar'
import OneBusinessPage from './pages/BusinessInfo.js'
=======
import UsersPage from './pages/Users'
>>>>>>> origin/users-selassie

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/businesses" element={<BusinessesPage />} />
<<<<<<< HEAD
          <Route path="/business/:business_id" element={<OneBusinessPage />} />
=======
          <Route path="/users" element={<UsersPage />} />
>>>>>>> origin/users-selassie
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

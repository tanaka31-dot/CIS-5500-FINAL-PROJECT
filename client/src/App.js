import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BusinessesPage from './pages/Businesses'
import UsersPage from './pages/Users'
import Navbar from './components/NavBar'
import OneBusinessPage from './pages/BusinessInfo'
import CategoryBusinesses from './pages/CategoryBusinesses'
import BusinessSearch from './pages/BusinessSearch'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/businesses" element={<BusinessesPage />} />
          <Route path="/business/:business_id" element={<OneBusinessPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/bussinesses/:category" element={<CategoryBusinesses/>}/>
          <Route path="/search/businesses" element={<BusinessSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

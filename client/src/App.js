import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BusinessesPage from './pages/Businesses'
import UsersPage from './pages/Users'
import Navbar from './components/NavBar'
import OneBusinessPage from './pages/BusinessInfo'
import CategoryBusinesses from './pages/CategoryBusinesses'
import TopCitiesPage from './pages/TopCities'

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
          <Route path="/topCities" element={<TopCitiesPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

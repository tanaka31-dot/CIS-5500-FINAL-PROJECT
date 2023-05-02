import { NavLink } from 'react-router-dom'
import './styles.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Review Roam</div>
      <div className="navbar-items">
        <NavLink to="/" >
          Home
        </NavLink>
        <NavLink to="/businesses">
          Businesses
        </NavLink>
        <NavLink to="/users">
          Users
        </NavLink>
        <NavLink to="/search/businesses">
          Search Businesses
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar

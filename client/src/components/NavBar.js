import { NavLink } from 'react-router-dom';
import './styles.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Review Roam</div>
      <div className="navbar-items">
        <NavLink to="/" exact activeClassName="active">Home</NavLink>
        <NavLink to="/businesses" activeClassName="active">Businesses</NavLink>
        <NavLink to="/" activeClassName="active">Users</NavLink>
        <NavLink to="/" activeClassName="active">Reviews</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;











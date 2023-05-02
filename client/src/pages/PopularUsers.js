import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
const config = require('../config.json')


function PopularUsersPage() {
  const bodyStyle = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    marginBottom: '50px',
  };

  const [popularUsers, setPopularUsers] = useState([])
  const [city, setCity] = useState('')

  useEffect(() => {
    fetch(
      `http://${config.server_host}:${config.server_port}/popularUsers?city=${city}`
    )
      .then((res) => res.json())
      .then((resJson) => setPopularUsers(resJson))
  
  }, [city])

  const search = () => {
    fetch(
      `http://${config.server_host}:${config.server_port}/popularUsers?city=${city}`
    )
      .then((res) => res.json())
      .then((resJson) => setPopularUsers(resJson))
  }


  return (
      <div style={bodyStyle}>
        <h1>Popular Users in Your City</h1>
        <form>
          <label style={{width: '300px', textAlign: 'center'}}>
            Enter City Here: {'    '}
            <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} style={{borderRadius: '30px'}}/>
          </label>
          {'    '}
          <button onClick={() => search() } style={{}}>
              Search
          </button>
        </form>
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}>
          {popularUsers.map((user) => (
            <div
            key={user.user_id}
            style={{
              margin: '20px',
              backgroundColor: 'white',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
              transition: 'transform 0.2s ease-in-out',
              cursor: 'pointer',
              width: '23%',
              flexBasis: '23%' ,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            <div style={{ marginTop: 'auto' }}>
            <NavLink
              to={`/users/${user.user_id}`}
              style={{ textDecoration: 'underline', color: "black"}}
            >
              <p style={{ fontSize: '16px' }}>{user.name}</p>
            </NavLink>
            </div>
          </div>
          ))}
        </div>
      </div>
  );  
}

export default PopularUsersPage;



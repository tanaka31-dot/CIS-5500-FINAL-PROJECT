import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
const config = require('../config.json')


function HomePage() {
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

  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(
      `http://${config.server_host}:${config.server_port}/topTenCategories`,
    )
      .then((res) => res.json())
      .then((resJson) => setCards(resJson))
  }, [])


  return (
    <div style={bodyStyle}>
      <img src="./homepage.jpeg" alt="homepage" style={imageStyle} />
      <h2 style={{justifyContent: "center"}}>Top Ten Categories</h2>
      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
      }}>
        {cards.map((card, index) => (
          <div
            key={card.category}
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
              to={`/bussinesses/${card.category}`}
              style={{ textDecoration: 'underline', color: "black"}}
            >
              <p style={{ fontSize: '16px' }}>{card.category}</p>
            </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default HomePage;



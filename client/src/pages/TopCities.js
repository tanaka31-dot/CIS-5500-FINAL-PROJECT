import React, { useState, useEffect } from 'react';
const config = require('../config.json')


function TopCitiesPage() {
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

  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(
      `http://${config.server_host}:${config.server_port}/topCities`,
    )
      .then((res) => res.json())
      .then((resJson) => setCities(resJson))
  }, [])


  return (
    <div style={bodyStyle}>
      <h2 style={{justifyContent: "center"}}>Top Cities by Average Quality and Activity of Business</h2>
      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
      }}>
        {cities.map((city, index) => (
          <div
            key={city.city}
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
              <p style={{ fontSize: '16px' }}>{city.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default TopCitiesPage;



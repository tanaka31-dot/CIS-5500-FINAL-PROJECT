import React from 'react';
import Navbar from '../components/NavBar';

function HomePage() {
    const bodyStyle = {
      backgroundImage: `url('./homepage.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      height: '100vh',
      color:'white',
      margin: 0,
      paddingTop: '60px',
    };
    
    return (
      <>
      <Navbar/>
      <div style={bodyStyle}>
        <div>
        </div>
        <h1>Welcome to Review Roam</h1>
      </div>
    </>
    );
  }
  
  export default HomePage;
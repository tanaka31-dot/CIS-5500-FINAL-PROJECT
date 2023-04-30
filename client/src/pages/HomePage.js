import React from 'react'

function HomePage() {
  const bodyStyle = {
    backgroundImage: `url('./homepage.jpeg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '100vh',
    color: 'white',
    margin: 0,
    paddingTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
      <div style={bodyStyle}>
        <div></div>
        <h1 style={{ textAlign: 'center' }}>
          Find your new favorite spot with Review Roam!
        </h1>
      </div>

  )
}

export default HomePage

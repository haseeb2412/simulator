// import React from 'react'

export const Navbar = () => {
  return (
    <>
      <div
        className="navbar-container"
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '8vh',
          backgroundColor: '#0d1117',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,255,157,0.1)', // Neon green glow
          zIndex: 1000,
        }}
      >
        <h1
          style={{
            color: '#00ff9d', // Accent color for Web3
            fontSize: '1.8rem',
            fontWeight: 'bold',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            letterSpacing: '1px',
            margin: 0,
          }}
        >
          Simulator Project
        </h1>
      </div>

      {/* Spacer to avoid content hiding under fixed header */}
      <div style={{ height: '8vh' }}></div>
    </>
  )
}

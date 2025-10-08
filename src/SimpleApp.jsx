import React from 'react';

const App = () => {
  console.log('BASIC APP RENDERING...');
  
  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ff6b6b',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}
      >
        <h1 style={{ color: '#333', margin: '0 0 20px 0' }}>
          🎉 SUCCESS!
        </h1>
        <p style={{ color: '#666', margin: '0' }}>
          React is working perfectly!
        </p>
        <p style={{ color: '#999', fontSize: '14px', marginTop: '10px' }}>
          If you see this, everything is fine.
        </p>
      </div>
    </div>
  );
};

export default App;
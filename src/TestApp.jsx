import React from 'react';

function TestApp() {
  console.log('TestApp rendering...');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', fontSize: '24px' }}>Test App Loading</h1>
      <p style={{ color: '#666' }}>If you can see this, React is working properly.</p>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        marginTop: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <h2>System Status</h2>
        <ul>
          <li>✅ React is loaded</li>
          <li>✅ JavaScript is working</li>
          <li>✅ CSS styles are applied</li>
        </ul>
      </div>
    </div>
  );
}

export default TestApp;
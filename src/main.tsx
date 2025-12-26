import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Remove default margins and padding, set dark background
const style = document.createElement('style')
style.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #0a0a0a;
  }
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
  }
`
document.head.appendChild(style)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


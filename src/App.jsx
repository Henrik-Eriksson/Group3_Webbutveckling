//import React from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
//import Login from './components/login.jsx'
import Calendar from "./components/Calender"
import Login from './Login';
//import Login from './Login.jsx'



function App() { 
  

  return (
    <div className="App"> {/* Apply CSS class */}
      <Calendar />
    <div className="App"> 
    <Login/>
    </div>
  );
}
export default App;  
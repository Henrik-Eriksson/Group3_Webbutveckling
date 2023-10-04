import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './views/pages/HomePage.jsx';
import Login from './views/pages/Login.jsx';
import Signup from './views/pages/Signup.jsx';
import Calendar from './views/pages/Calendar.jsx'
import CreateEvent from './views/components/CreateEvent.jsx'

const App = () => {
 return (
   <Router>
      <Link to= "/">HomePage</Link>
      <Link to= "/login">Login</Link>
      <Link to= "/signup">Signup</Link>
      <Link to= "/calendar">Calendar</Link>
       <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/CreateEvent" element= {<CreateEvent />} />
       </Routes>
    
   </Router>
 );
};

export default App;

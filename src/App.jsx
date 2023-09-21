import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Calendar from './Components/Calendar.jsx'
const App = () => {
 return (
   <Router>
       <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/calendar" element={<Calendar />} />
       </Routes>
   </Router>
 );
};

export default App;

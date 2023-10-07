import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './views/pages/HomePage.jsx';
import Login from './views/pages/Login.jsx';
import Signup from './views/pages/Signup.jsx';
import Calendar from './views/pages/Calendar.jsx';
import CreateEvent from './views/components/CreateEvent.jsx';

const useIsLoggedIn = () => {
  const sessionId = window.localStorage.getItem('session');
  return !!sessionId;
};

const LoginPage = () => {

  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) return <Navigate to='/' replace={true}/>

  return <Login />;
};

const SignupPage = () => {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) return <Navigate to='/' replace={true}/>

  return <Signup />;
};

const App = () => {
  return (
    <Router>
      <Link to="/">HomePage</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/calendar">Calendar</Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/CreateEvent" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
};

export default App;

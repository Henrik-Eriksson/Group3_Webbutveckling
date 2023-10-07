import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  console.log(isLoggedIn);
  console.log(window.localStorage.getItem('session'));
  if (isLoggedIn) {
    navigate('/', { replace: true });
    console.log("NAVIGATE TO HOMEPAGE")
  }

  return <Login />;
};

const SignupPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    navigate('/');
  }

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

import { useState, useEffect } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar.jsx';
import HomePageGrid from '../components/HomePageGrid.jsx';
import Avatar from '@mui/material/Avatar';
import { authenticate } from '../../app.jsx'; // Assuming you have this function in app.jsx

function HomePage() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    profilePicture: '/static/images/avatar/1.jpg' // default image
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await authenticate();
        const response = await fetch(`http://localhost:5050/api/users/${userId}`);
        const data = await response.json();

        setUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          profilePicture: data.profilePicture || userData.profilePicture
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <Avatar alt={`${userData.firstName} ${userData.lastName}`} src={userData.profilePicture} />
      <Avatar
        alt={`${userData.firstName} ${userData.lastName}`}
        src={userData.profilePicture}
        sx={{ width: 56, height: 56 }}
      />
      {/* You can add more user details here as needed */}
    </div>
  );
}

export default HomePage;

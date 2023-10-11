import  { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar.jsx";

const sampleUserData = {
  id: 1,
  name: "Not Me",
  email: "test@example.com",
  profilePicture: "https://wallpapercave.com/wp/wp6968998.jpg",
  // Add other user information as needed
};

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from your database or API
    // In this example, we're using sampleUserData
    setUserData(sampleUserData);
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <>
<ResponsiveAppBar/>
    <div
      style={{
        background: "#AAF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Center vertically on the page
      }}
    >
      
      <h1>User Profile</h1>
      <img
        src={userData.profilePicture}
        alt={`${userData.name}'s profile`}
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          marginBottom: "20px",
        }}
      />
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      {/* Display other user information as needed */}
    </div>
    </>
  );
};

export default UserProfile;

import {useState} from "react";
import "./Login.css"; 


function Login(){
    const [username, setUsername] = useState (''); 
    const [password, setPassword] = useState(''); 
    const [loggedIn, setLoggedIn] = useState(false); 

    const handleLogin = () => {

        if(username && password) {
            setLoggedIn(true); 
        }
    };

    return(
       <div className="login-container"> 
        {loggedIn ? (
            <h1> Welcome, {username}!</h1>
        ): (
            <>
            <h1>login</h1>
            <input
                className="login-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                className = "passowrd"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button
             className = ".login-button" 
             onClick={{handleLogin}}>submit</button>
            </>
        )}
       </div>
    )
}

export default Login; 
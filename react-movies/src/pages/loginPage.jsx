import { useContext, useState } from "react";
import { Navigate, useLocation, Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

const LoginPage = () => {
    const auth = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

 /*   const login = () => {
        context.authenticate(userName, password);
    }; */

    const location = useLocation();


    const from =
    typeof location.state?.from === "string"
      ? location.state.from
      : location.state?.from?.pathname || "/";

    const handleLogin = async () => {
        const ok = await auth.authenticate(userName, password);
        if (ok){
            navigate(from, { replace: true});
        } else { 
            alert( "Login failed. Check username and password");
        }
    };

    return (
        <>
            <h2>Login page</h2>
            <p>You must log in to view the protected pages </p>

            <input id="username" placeholder="user name" value={userName} 
            onChange={(e) => {
                setUserName(e.target.value)
            }}/>
            <br />

            <input id="password" type="password" placeholder="password" value={password}
            onChange={(e) => {
                setPassword(e.target.value);
            }}/>
            <br />
            
            <button onClick={handleLogin}>Log in</button>
            
            <p>Not Registered?
                <Link to="/signup">Sign Up!</Link></p>
        </>
    );
};

export default LoginPage;


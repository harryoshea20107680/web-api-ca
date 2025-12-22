import { Link } from "react-router";

const StartPage = () => {
  
    return(
        <>
            <p>
                Welcome to Harry OSheas WAD2 CA2! View your <Link to="/tasks">Tasks</Link> or your <Link to="/profile">Profile</Link>.
            </p>
            <p>
                <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to create tasks!
            </p>
        </>
    );
  };

export default StartPage;

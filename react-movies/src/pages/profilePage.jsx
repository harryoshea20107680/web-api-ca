import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from "react-router-dom";
import { getUserReviews } from "../api/tmdb-api";

const ProfilePage = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
  
    const [myReviews, setMyReviews] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                setError("");
                const reviews = await getUserReviews(auth.userName);
                setMyReviews(reviews); }
            catch (e) { setError(e.message || "Reviews not loaded")}
        };
        if (auth.isAuthenticated) load()
    }, [auth.isAuthenticated, auth.userName]);

    if (!auth.isAuthenticated){
        return (
            <p>
            You must log in to see your profile! {" "}
            <button onClick={() => navigate('/login')}>Login</button>
      </p>
        )
    }

    return (
        <div>
            <h1>User profile: {auth.userName}</h1>
            <br></br>
            <h3>My Reviews:</h3>
            {error && <p>{error}</p>}

            {myReviews.length === 0 ? (
                <p>No Reviews</p>
            ) : (
                <ul>
                    {myReviews.map((r) => (
                    <li key ={r._id}>
                        <strong>{r.movieTitle}</strong> — {r.rating}/10
                        <br /> {r.review} <br />
                        <small>{new Date(r.createdAt).toLocaleString()}</small>
                    </li>
                    ))}
                </ul>
            )}
            </div>
    );


};

    


export default ProfilePage;


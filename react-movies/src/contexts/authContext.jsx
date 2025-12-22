import { useState, createContext, useEffect } from "react";

import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null); //eslint-disable-line

  const normalizeToken = (token) => {
    if (!token) return null;
    return token.replace(/^BEARER\s+/i,"").trim();
  };

const AuthContextProvider = (props) => {
  const existingToken = normalizeToken(localStorage.getItem("token"));
  const existingUserName = localStorage.getItem("userName") || "";

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(existingUserName));
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState(existingUserName);
  
  useEffect(() => {
    if(authToken) {
        localStorage.setItem("token", authToken);
        setIsAuthenticated(true);
    } else {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    }

  }, [authToken]);

  useEffect(() => {
    if(userName) {
        localStorage.setItem("userName", userName);
    } else{
        localStorage.removeItem("userName");
    }
  }, [userName]);

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    const clean = normalizeToken(data);
    setAuthToken(clean);
  };


  const authenticate = async (username, password) => {
    const result = await login(username, password);

    if (result?.token) {
      setToken(result.token)
      setUserName(username)
      return true 
    }
    return false;
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return Boolean(result?.success);
  };

  const signout = () => {
    setAuthToken(null);
    setUserName("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

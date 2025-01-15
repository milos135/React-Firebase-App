import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

const Home = ({ user }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signingUp = () => {
    setIsSignUp(!isSignUp);
  };

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
      alert("Sign up successful!");
      setEmail(""); // Reset email input
      setPassword(""); // Reset password input
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message); // Postavi poruku greške
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
      alert("Sign in successful!");
      setEmail(""); // Reset email input
      setPassword(""); // Reset password input
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError(error.message); // Postavi poruku greške
    }
  };
  if (user) {
    return <Navigate to="/privated"></Navigate>;
  }
  return (
    <section>
      <h1>Home Page</h1>
      <form>
        {isSignUp && <legend>Sign Up</legend>}
        {!isSignUp && <legend>Sign In</legend>}
        <fieldset>
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={emailChange}
              />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={passwordChange}
              />
            </li>
          </ul>
          {isSignUp && (
            <button type="button" onClick={handleSignUp}>
              Sign Up
            </button>
          )}
          {!isSignUp && (
            <button type="button" onClick={handleSignIn}>
              Sign In
            </button>
          )}
        </fieldset>
        {isSignUp && <a onClick={signingUp}>Login</a>}
        {!isSignUp && <a onClick={signingUp}>Create an account</a>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </section>
  );
};

export default Home;

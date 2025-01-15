import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

const Privated = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div>
      Privated
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Privated;

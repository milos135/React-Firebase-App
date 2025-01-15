import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Privated from "./pages/Privated";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    <h2>Loading...</h2>;
  }
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<Home user={user} />}></Route>
          <Route
            path="/privated"
            element={
              <ProtectedRoute user={user}>
                <Privated></Privated>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

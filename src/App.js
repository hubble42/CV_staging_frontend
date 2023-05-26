import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Login from "./loginpage";
import Home from "./homepage";
import SignUp from "./SignUpPage";

//
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle user login
  const handleLogin = () => {
    // Perform your login logic here...
    setLoggedIn(true); // Set loggedIn to true upon successful login
  };
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <Login handleLogin={handleLogin} />
              )
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          {loggedIn ? <></> : <Route element={<Login />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

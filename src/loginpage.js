// LoginPage.js

import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const email = event.target.email.value;
    // const password = event.target.password.value;
    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    // const formData = new FormData();
    // formData.append('email', email);
    // formData.append('password',password);
    fetch("http://192.168.1.27:8000/userslogin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          props.handleLogin();
        }
      })
      .catch((error) => {
        console.error("Invalid email and password:", error);
      });
  };
  return (
    <div className="flex flex-row items-center min-h-screen w-[80%] m-auto gap-5">
      <div className="flex justify-start">
        <img src="https://picsum.photos/seed/picsum/600/450" alt="abc" />
      </div>
      <div>
        <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg py-2 px-3"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 ">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <div className="flex items-center relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full border  border-gray-300 rounded-lg py-2 px-3 pr-10"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 "
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                </button>
              </div>
            </div>
            <button className="text-blue-500 text-sm font-medium hover:underline ml-auto py-4">
              <Link to="/reset">Reset password</Link>
            </button>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mb-4"
            >
              {/* <Link to="/chat">Log in</Link> */}Login
            </button>
            <button
              type="button"
              className="text-blue-500 text-sm font-medium hover:underline ml-auto"
            >
              <Link to="/signup">Create account</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

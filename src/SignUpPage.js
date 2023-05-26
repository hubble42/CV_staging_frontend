import React, { useState } from "react";
import { Link } from "react-router-dom";
// useNavigate
const Signup = () => {
  // const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // const email = event.target.email.value;
    // const password = event.target.password.value;
    const data = {
      email: email,
      password: password,
      username: username,
    };
    console.log(data);
    // const formData = new FormData();
    // formData.append('email', email);
    // formData.append('password',password);
    fetch("http://127.0.0.1:8000/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/login";
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
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full border border-gray-300 rounded-lg py-2 px-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg py-2 px-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded-lg py-2 px-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Sign Up
            </button>
            <button
              type="button"
              className="text-blue-500 text-sm font-medium hover:underline mt-4 ml-auto"
            >
              <Link to="/">Login</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

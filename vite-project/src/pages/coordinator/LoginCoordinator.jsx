import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginCoordinator() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const loginData = { email, password };

    fetch("http://localhost:8000/coordinator/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 VERY IMPORTANT
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.coordinator) {
          alert("Login successful!");

          localStorage.setItem(
            "coordinator",
            JSON.stringify(data.coordinator)
          );

          navigate("/coordinator/dashboard");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error(error));

    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-sky-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Coordinator Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-xl font-semibold hover:bg-sky-600 transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/" className="text-sky-600 font-medium">
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default LoginCoordinator;

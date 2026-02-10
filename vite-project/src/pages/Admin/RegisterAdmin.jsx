import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function collectData(e) {
    e.preventDefault();

    const adminData = {
      name,
      email,
      password,
    };

    fetch("http://localhost:8000/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.message === "Admin registered successfully") {
          navigate("/admin-login");
        }
      })
      .catch((error) => console.log(error));

    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen from-blue-100 to-sky-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Admin Registration
        </h1>

        <form onSubmit={collectData} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

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
            Register
          </button>

          <p className="text-center text-sm text-gray-600">
            Already registered?{" "}
            <Link to="/admin-login" className="text-sky-600 font-medium">
              Log in
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default RegisterAdmin;

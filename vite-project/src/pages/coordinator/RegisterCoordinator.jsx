import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterCoordinator() {
  const [coordinatorId, setCoordinatorId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");

  function collectData(e) {
    e.preventDefault();

    const coordinatorData = {
      coordinatorId,
      name,
      email,
      department,
      password,
    };

    fetch("http://localhost:8000/coordinator/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coordinatorData),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.log(error));

    setCoordinatorId("");
    setName("");
    setEmail("");
    setDepartment("");
    setPassword("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen  from-blue-100 to-sky-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Coordinator Registration
        </h1>

        <form onSubmit={collectData} className="space-y-4">

          <input
            type="text"
            placeholder="Coordinator ID"
            value={coordinatorId}
            onChange={(e) => setCoordinatorId(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

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

          {/* Department ENUM */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={`w-full p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400
              ${department === "" ? "text-gray-400" : "text-gray-800"}`}
            required
          >
            <option value="" disabled hidden>
              Select Department
            </option>
            <option value="CSE">CSE</option>
            <option value="CE">CE</option>
            <option value="AIML">AIML</option>
            <option value="IT">IT</option>
          </select>

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
            <Link to="/coordinator-login" className="text-sky-600 font-medium">
              Log in
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default RegisterCoordinator;

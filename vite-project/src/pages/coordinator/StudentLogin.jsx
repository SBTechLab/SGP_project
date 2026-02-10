import { useState } from "react";
import axios from "axios";
import "./Auth.css";

const ID_REGEX = /^(\d{2})([1-9])(CS|IT|CE|ME|EC)(\d{1,3})$/;

export default function Login() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateStudentId = (id) => {
    const match = id.match(ID_REGEX);
    if (!match) return "Invalid ID format";

    const rollNumber = parseInt(match[4], 10);
    if (rollNumber > 200) return "Roll number cannot exceed 200";

    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateStudentId(studentId);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          studentId,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Sign In</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value.toUpperCase())}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

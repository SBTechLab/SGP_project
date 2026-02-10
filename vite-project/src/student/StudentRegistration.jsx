import { useState } from "react";
import axios from "axios";
import "./Auth.css";

const ID_REGEX = /^(\d{2})([1-9])(CS|IT|CE|ME|EC)(\d{1,3})$/;

export default function Register() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateStudentId = (id) => {
    const match = id.match(ID_REGEX);
    if (!match) return "Invalid ID format";

    const rollNumber = parseInt(match[4], 10);
    if (rollNumber > 200) return "Roll number cannot exceed 200";

    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateStudentId(studentId);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        studentId,
        password,
      });

      setSuccess("Registration successful. You can now log in.");
      setStudentId("");
      setPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          type="text"
          placeholder="Student ID (e.g. 24CE141)"
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

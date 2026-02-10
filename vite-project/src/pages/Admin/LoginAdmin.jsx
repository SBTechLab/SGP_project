import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    navigate("/admin/dashboard");
  }
}, [navigate]);

  // Generate CAPTCHA
  const generateCaptcha = () => {
    const randomCaptcha = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();
    setCaptcha(randomCaptcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  function handleLogin(e) {
    e.preventDefault();

    // CAPTCHA validation
    if (captchaInput !== captcha) {
      alert("Invalid CAPTCHA");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    const loginData = { email, password };

    fetch("http://localhost:8000/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login response:", data);
        if (data.admin) {
          localStorage.setItem("admin", JSON.stringify(data.admin));
          console.log("Admin stored in localStorage:", localStorage.getItem("admin"));
          alert("Admin login successful!");
          console.log("Navigating to /admin/dashboard");
          navigate("/admin/dashboard");
        } else {
          alert(data.message);
          setEmail("");
          setPassword("");
          setCaptchaInput("");
          generateCaptcha();
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-sky-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Admin Login
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

          {/* CAPTCHA BOX */}
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl">
            <span className="text-lg font-bold tracking-widest text-sky-600">
              {captcha}
            </span>
            <button
              type="button"
              onClick={generateCaptcha}
              className="text-sm text-sky-500 hover:underline"
            >
              Refresh
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
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

export default LoginAdmin;

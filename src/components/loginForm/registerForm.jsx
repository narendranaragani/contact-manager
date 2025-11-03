import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

  const onSubmitEvent = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userDetails = { username, email, password };

    try {
      const response = await fetch(
        "https://contact-backend-1-6hdg.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully");
        navigate("/login", { replace: true });
      } else {
        console.error("Register failed:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-gray-100 text-center">
          Register
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Create your account to manage contacts efficiently
        </p>

        <form className="space-y-5" onSubmit={onSubmitEvent}>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-200 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
              className="px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-200 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="font-semibold text-gray-200 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              className="px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-12"
            />
            <span
              className="mt-4 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/visible--v1.png"
                  alt="visible"
                />
              ) : (
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-rounded/24/FFFFFF/hide.png"
                  alt="hide"
                />
              )}
            </span>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`md:w-[360px] w-[150px] mx-auto bg-blue-500 px-3 py-2 rounded-md outline-none font-semibold text-black cursor-pointer flex justify-center items-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Register in..." : "Register"}
          </button>
          <p className="text-center text-gray-400 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

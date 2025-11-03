import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitEvent = async (event) => {
    event.preventDefault();
    setShowSubmitError(false);
    setIsLoading(true);
    setErrorMessage("");
    const token  = Cookies.get("jwt_token")
    try {
      const response = await fetch(
        "https://contact-backend-1-6hdg.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({ email, password }),
        }
      );
    
      const data = await response.json();

      console.log(data)

      if (response.ok) {
       console.log(data.token)
        Cookies.set("jwt_token", data.token, { expires: 30 });
        navigate("/"); 
      } else {
        setErrorMessage(data.message || "Login failed");
        setShowSubmitError(true);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.",error);
      setShowSubmitError(true); 
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-100">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Login to your account to continue
        </p>

        <form className="space-y-6" onSubmit={onSubmitEvent}>
          {/* Email */}
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-200 font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <button
              type="button"
              className="mt-4 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
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
            </button>
          </div>
          {showSubmitError && (
            <p className="text-red-500 font-medium text-sm">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`md:w-[360px] mx-auto w-[150px] bg-blue-500 px-3 py-2 rounded-md outline-none font-semibold text-black cursor-pointer flex justify-center items-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

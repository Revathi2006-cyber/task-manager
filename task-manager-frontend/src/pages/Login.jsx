import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
    );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">
        Login
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600"
        >
          Register
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;
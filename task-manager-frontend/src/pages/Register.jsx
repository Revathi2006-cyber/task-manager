import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
        formData
      );

      alert("Registration Successful");

      console.log(res.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };
return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">
        Register
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

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
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-blue-600"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);
  
}

export default Register;
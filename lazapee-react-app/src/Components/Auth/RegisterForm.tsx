import { useState } from "react";
import api from "../API/axios"; // path to your axios instance
import {Link} from "react-router-dom"

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/Auth/register", {
        username,
        email,
        password,
      });

      setSuccess("Registration successful! You can now log in.");
      console.log("Register successful", response.data);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Register failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {/* Card container */}
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="text-center text-success text-3xl font-bold mb-6">
            Register
          </h2>

          {error && (
            <div className="alert alert-outline alert-error text-error shadow-sm mb-4">
              <span>⚠️ {error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-outline alert-success text-success shadow-sm mb-4">
              <span>✅ {success}</span>
            </div>
          )}

          {/* Username */}
          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="form-control mt-4">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control mt-4">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-control mt-4">
            <label className="label" htmlFor="confirmPassword">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Submit button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn w-full h-12 text-lg text-black !bg-success"
            >
              Register
            </button>
          </div>
          <Link to="/login" >Already have an account? Sign in</Link>
        </form>
      </div>
    </div>
  );
}

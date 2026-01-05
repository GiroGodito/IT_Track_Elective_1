// import { useState } from "react";
// import api from "../API/axios"; // path to your axios instance
// import {Link,useNavigate} from "react-router-dom"

// export default function LoginForm() {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const { username, password } = formData;
//       const response = await api.post("/Auth/login", { username, password });
//       const token = response.data.token;

//       localStorage.setItem("jwt", token);
//       console.log("Login successful");
//       navigate("/productPage");

//     } catch (err) {
//       setError("Invalid username or password");
//       console.error("Login failed", err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center">
//       {/* Card container */}
//       <div className="card w-full max-w-md shadow-xl bg-base-200 !border-1 !border-accent">
//         <form className="card-body" onSubmit={handleSubmit}>
//           <h2 className="text-center text-success text-3xl font-bold mb-6">
//             Login
//           </h2>

//           {error && (
//             <div className="alert alert-outline alert-error text-error shadow-sm mb-4">
//               <span>⚠️ {error}</span>
//             </div>
//           )}

//           {/* Username */}
//           <div className="form-control">
//             <label className="label" htmlFor="username">
//               <span className="label-text">Username</span>
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               className="input input-bordered w-full"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="form-control mt-4">
//             <label className="label" htmlFor="password">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="input input-bordered w-full"
//               required
//             />
//           </div>

//           {/* Submit button */}
//           <div className="form-control mt-6">
//             <button
//               type="submit"
//               className="btn w-full h-12 text-lg text-black !bg-success"
//             >
//               Login
//             </button>
//           </div>
//            <Link to="/register" className="!text-success">Don't have an account? Register here</Link>
//            <Link to="/productPage" className="!text-success">Continue with Guest account</Link>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import api from "../API/axios"; // axios instance with { withCredentials: true }
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { username, password } = formData;

      // Login request — backend should set HttpOnly cookie
      await api.post("/Auth/login", { username, password }, { withCredentials: true });

      // Immediately fetch user info to update UI
      const whoAmI = await api.get("/Auth/whoAmI", { withCredentials: true });
      console.log("Logged in as:", whoAmI.data.username);

      // Navigate to product page
      navigate("/productPage");
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="card w-full max-w-md shadow-xl bg-base-200 !border-1 !border-accent">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="text-center text-success text-3xl font-bold mb-6">
            Login
          </h2>

          {error && (
            <div className="alert alert-outline alert-error text-error shadow-sm mb-4">
              <span>⚠️ {error}</span>
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

          {/* Submit button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn w-full h-12 text-lg text-black !bg-success"
            >
              Login
            </button>
          </div>

          <Link to="/register" className="!text-success">
            Don't have an account? Register here
          </Link>
          <Link to="/productPage" className="!text-success">
            Continue with Guest account
          </Link>
        </form>
      </div>
    </div>
  );
}

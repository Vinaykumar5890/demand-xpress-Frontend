import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate ,Link} from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed")
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name"
          value={name} onChange={(e) => setName(e.target.value)} required autoComplete="new-name"/>
        <input type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="new-email"/>
        <input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
        <button type="submit">Register</button>
        <p>Already have an account? <Link className="link" to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;

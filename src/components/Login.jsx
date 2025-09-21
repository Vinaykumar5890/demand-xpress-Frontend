import { useState } from "react";
import API from "../api/axios";
import Cookies from "js-cookie";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoader(true)
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      Cookies.set("token", res.data.token, { expires: 1 });
      Cookies.set("userId", res.data.user._id, { expires: 1 });
      setLoader(false)
      navigate("/");
    } catch (err) {
       setLoader(false)
       toast.error(err.response?.data?.msg  || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="new-email"  />
        <input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password"  />
        <button type="submit">{loader? <p>Loading...</p>:<p>Login</p>}</button>
       
      </form>
      <p>Don't have an account? <Link className="link" to="/register">Register</Link></p>
 </div>
  );
}

export default Login;

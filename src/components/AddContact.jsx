import { useState } from "react";
import API from "../api/axios";
import Cookies from "js-cookie";

function AddContact({ onContactAdded }) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", address: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("userId");
    try {
      const res = await API.post("/contact/add", { ...form, userId });
      onContactAdded(res.data.newContact);
      setForm({ name: "", email: "", mobile: "", address: "" });
    } catch (err) {
      alert(err.response?.data?.msg || "Error adding contact");
    }
  };

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddContact;

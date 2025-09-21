import { useState } from "react";
import API from "../api/axios";

function EditContact({ contact, onUpdated, onCancel }) {
  const [form, setForm] = useState({ ...contact });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/contact/edit/${contact._id}`, form);
      onUpdated(res.data.contact);
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating contact");
    }
  };

  return (
    <form className="form-inline" onSubmit={handleUpdate}>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="mobile" value={form.mobile} onChange={handleChange} />
      <input name="address" value={form.address} onChange={handleChange} />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditContact;

import { useEffect, useState } from "react";
import API from "../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userId = Cookies.get("userId");

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/login");
      return;
    }
    loadContacts();
  }, []);

  
  const loadContacts = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/contact/${userId}`);
      setContacts(response.data.msg || []);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };


  const deleteContact = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/contact/delete/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete contact");
    }
  };


  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h2>My Contacts</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

     
      <AddContact onContactAdded={(newContact) => setContacts([...contacts, newContact])} />

     
      {loading && (
        <div className="spinner-wrapper">
          <Spinner animation="border" role="status" />
        </div>
      )}
     
      {!loading && contacts.length === 0 && (
        <p className="no-contacts">You have no contacts. Add one above!</p>
      )}

      {!loading && contacts.length > 0 && (
        <ul className="contact-list">
          {contacts.map((contact) => (
            <li key={contact._id} className="contact-card">
              {editingId === contact._id ? (
                <EditContact
                  contact={contact}
                  onUpdated={(updated) => {
                    setContacts(
                      contacts.map((c) => (c._id === updated._id ? updated : c))
                    );
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <div className="contact-info">
                    <strong>{contact.name}</strong> – {contact.mobile}
                    <br />
                    {contact.email}, {contact.address}
                  </div>
                  <div className="contact-actions">
                    <button
                      className="edit-btn"
                      onClick={() => setEditingId(contact._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteContact(contact._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;

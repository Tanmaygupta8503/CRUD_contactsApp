import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const contactsRef = ref(db, "contacts");

    onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setContacts(contactList);
      } else {
        setContacts([]);
      }
    });

    // Clean up the listener when component unmounts
    return () => {
      // Detach the listener when component unmounts
      onValue(contactsRef, null);
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const db = getDatabase();
      const contactRef = ref(db, `contacts/${id}`);
      remove(contactRef)
        .then(() => {
          toast.success("Contact Deleted Successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div id="table-container">
      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.contact}</td>
              <td>
                <Link to={`/update/${contact.id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => onDelete(contact.id)}
                >
                  Delete
                </button>
                <Link to={`/view/${contact.id}`}>
                  <button className="btn btn-view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

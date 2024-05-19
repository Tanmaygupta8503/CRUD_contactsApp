import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import "./View.css";
import { ToastContainer, toast } from "react-toastify";

const View = () => {
  const [contact, setContact] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const GoBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const db = getDatabase();
    const contactRef = ref(db, `contacts/${id}`);

    get(contactRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setContact(snapshot.val());
        } else {
          toast.error("Contact not found");
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [id, navigate]);

  return (
    <div className="view-container">
      <ToastContainer />
      <h2>View Contact</h2>
      {contact ? (
        <div className="contact-details">
          <p>
            <strong>Name:</strong> {contact.name}
          </p>
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Contact:</strong> {contact.contact}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button className="btn-go-back" onClick={GoBack}>
        Go back
      </button>
    </div>
  );
};

export default View;

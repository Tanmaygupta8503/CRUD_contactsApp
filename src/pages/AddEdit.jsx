import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddEdit.css";
import { getDatabase, ref, push, onValue } from "firebase/database";
import db from "../firebase";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;
  const navigate = useNavigate();
  const { id } = useParams();
  const [contacts, setContacts] = useState({});

  useEffect(() => {
    const dbRef = ref(getDatabase(), "contacts");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContacts(data);
      } else {
        setContacts({});
      }
    });

    // Clean up the listener when component unmounts
    return () => {
      onValue(dbRef, null);
    };
  }, [id]);

  useEffect(() => {
    if (id && contacts[id]) {
      setState({ ...contacts[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please fill all the fields");
    } else {
      push(ref(getDatabase(), "contacts"), state, (err) => {
        if (err) {
          toast.error("Failed to add contact");
        } else {
          toast.success("Contact Added Successfully");
          navigate("/");
        }
      });
      toast.success("Contact Added Successfully");
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ..."
          value={name || ""}
          onChange={handleInputChange}
          className="form-input"
        />
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email ..."
          value={email || ""}
          onChange={handleInputChange}
          className="form-input"
        />
        <label htmlFor="contact" className="form-label">
          Contact
        </label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact Number..."
          value={contact || ""}
          onChange={handleInputChange}
          className="form-input"
        />
        <input type="submit" value={id ? "Update" : "Save"} className="form-submit" />
      </form>
    </div>
  );
};

export default AddEdit;

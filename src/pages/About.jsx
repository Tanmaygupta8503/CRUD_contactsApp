import React from 'react';
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About This Project</h1>
      <p>
        This project is a simple CRUD (Create, Read, Update, Delete) application built using React and Firebase. It allows users to manage a list of contacts by adding, viewing, editing, and deleting contact information.
      </p>
      <h2>Technologies Used</h2>
      <ul>
        <li><strong>React:</strong> A JavaScript library for building user interfaces.</li>
        <li><strong>Firebase:</strong> A platform developed by Google for creating mobile and web applications. It provides a real-time NoSQL database and various other features.</li>
        <li><strong>React Router:</strong> A standard library for routing in React.</li>
        <li><strong>React Toastify:</strong> A library for providing toast notifications in React applications.</li>
      </ul>
      <h2>Features</h2>
      <ul>
        <li>Add new contacts with name, email, and phone number.</li>
        <li>View a list of all contacts.</li>
        <li>Edit the details of existing contacts.</li>
        <li>Delete contacts from the list.</li>
      </ul>
      <h2>Future Improvements</h2>
      <p>
        Future enhancements for this project could include user authentication, better styling, and additional features such as search and filter functionality.
      </p>
    </div>
  );
};

export default About;

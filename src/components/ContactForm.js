import React, { useState } from "react";
import firebase from "../components/firebase";

function ContactForm() {
  const [contact, setContact] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    categories: "",
  });

  const { name, company, email, phone, categories } = contact;

  function onChange(e) {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    firebase
      .firestore()
      .collection("contacts")
      .add({
        name,
        company,
        email,
        phone,
        categories,
      })
      .finally(() => {
        setContact({
          name: "",
          company: "",
          email: "",
          phone: "",
          categories: "",
        });
      });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h4>Add New Contact</h4>
        <label htmlFor="name">Name</label>
        <input onChange={onChange} type="text" name="name" id="" />
        <label htmlFor="company">Company</label>
        <input onChange={onChange} type="text" name="company" id="" />
        <label htmlFor="email">Email</label>
        <input onChange={onChange} type="text" name="email" id="" />
        <label htmlFor="phone">Phone</label>
        <input onChange={onChange} type="text" name="phone" id="" />
        <label htmlFor="categories">Categories</label>
        <input onChange={onChange} type="text" name="categories" id="" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;

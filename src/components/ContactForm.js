import React, { useState } from "react";
import firebase, { storage } from "../components/firebase";

function ContactForm() {
  const [contact, setContact] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    categories: "",
  });

  const { name, company, email, phone, categories } = contact;

  const [image, setImage] = useState();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  function onChange(e) {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setError("");
        setImage(file);
      } else {
        setError("Please select an image to upload");
      }
    }
  };

  const handleSaveImage = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setProgress(0);
            });
        }
      );
    } else {
      setError("Error please choose an image to upload");
    }
  };

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
      .then(() => {
        handleSaveImage();
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
        <label>Image Upload</label>
        <div style={{ height: "10px" }}>
          {progress > 0 ? <progress value={progress} max="100" /> : ""}
          <p style={{ color: "red" }}>{error}</p>
        </div>
        <input
          type="file"
          accept="capture=camera"
          onChange={handleImageChange}
        />
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

import React, { useState } from "react";
import axios from "axios";
import "./SignupForm.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("image", formData.image);

    try {
      const response = await axios.post("http://localhost:3000/signup", data);
      alert("Signup Successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup Form</h2>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      <label>Phone:</label>
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      <label>Image:</label>
      <input type="file" name="image" onChange={handleImageChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;

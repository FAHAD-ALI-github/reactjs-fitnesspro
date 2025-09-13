import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'; 
import BrandLogo from '../../components/Hero/Header/BrandLogo';

const Register = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    username: '',
    password: '',
    gender: 'M',
    date_of_birth: '',
    weight: '',
    height: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Use FormData for file + text
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/adduser/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data || 'Registration failed');
      console.error('Registration failed:', error);
    }
  };

  return (
   <div className="Page">
    <BrandLogo/>
    <div className="blur page-blur-1"></div>
    <div className="form-body">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
          <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="date" name="date_of_birth" placeholder="Date of Birth" onChange={handleChange} required />
          <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} required />
          <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} required />
          <select name="gender" onChange={handleChange} required>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>

          <label htmlFor="profile_picture">Profile Picture:</label>
          <input type="file" name="profile_picture" accept="image/*" onChange={handleFileChange} />

          <button type="submit">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="footer">
          <p>Already have an account? <button onClick={() => navigate('/login')}>Back to Login</button></p>
        </div>
      </div>
      <div className="blur page-blur-2"></div>
    </div>
    <Footer/>
   </div>
  );
};

export default Register;

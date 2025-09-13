import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './update.css';
import Footer from '../../components/Footer/Footer';
import BrandLogo from '../../components/Hero/Header/BrandLogo';

const Update = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    date_of_birth: user?.date_of_birth || '',
    weight: user?.weight || '',
    height: user?.height || '',
    gender: user?.gender || 'M',
    password: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleUpdate = async () => {
    const dataToSubmit = new FormData();

    // Only add changed fields
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] !== user[key] &&
        !(key === 'password' && !formData.password)
      ) {
        dataToSubmit.append(key, formData[key]);
      }
    });

    // Add profile picture only if new one is selected
    if (profilePicture) {
      dataToSubmit.append('profile_picture', profilePicture);
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/update/${user.id}/`, {
      method: 'PUT',
      body: dataToSubmit,
    });

    if (response.ok) {
      const updatedUser = { ...user, ...formData };
      if (profilePicture) {
        updatedUser.profile_picture = URL.createObjectURL(profilePicture);
      }
      // Redirect to login page after update
      navigate('/login');
    } else {
      console.error('Failed to update user');
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete/${user.id}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      navigate('/register');
    } else {
      console.error('Failed to delete user');
    }
  };

  const handleCancel = () => {
    navigate('/profile', { state: { user } });
  };

  return (
    <div className="Page">
      <BrandLogo />
      <div className="blur page-blur-1"></div>
      <div className="update-body">
        <div className="update-container">
          <h2>Update Profile</h2>

          {/* Profile Picture Section */}
          <label style={{ color: 'white' }}>Profile Picture</label>
          <div style={{ marginBottom: '1rem' }}>
            {/* Show current picture if exists */}
            {user?.profile_picture && !profilePicture && (
              <img
                src={`${process.env.REACT_APP_API_URL}${user.profile_picture}`}
                alt="Current Profile"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '10px',
                }}
              />
            )}

            {/* Show preview if new picture is selected */}
            {profilePicture && (
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="New Profile Preview"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '10px',
                }}
              />
            )}

            {/* File input */}
            <input
              type="file"
              name="profile_picture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* First Name */}
          <label style={{ color: 'white' }}>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            placeholder="First Name"
          />

          {/* Last Name */}
          <label style={{ color: 'white' }}>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Last Name"
          />

          {/* Email */}
          <label style={{ color: 'white' }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />

          {/* Phone */}
          <label style={{ color: 'white' }}>Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />

          {/* DOB */}
          <label style={{ color: 'white' }}>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            placeholder="Date of Birth"
          />

          {/* Weight */}
          <label style={{ color: 'white' }}>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Weight (kg)"
          />

          {/* Height */}
          <label style={{ color: 'white' }}>Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            placeholder="Height (cm)"
          />

          {/* Gender */}
          <label style={{ color: 'white' }}>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>

          {/* Password */}
          <label style={{ color: 'white' }}>New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="New Password"
          />

          {/* Buttons */}
          <div className="button-group">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>

          {/* Delete Section */}
          <div className="delete-section">
            <p>If you want to delete your account?</p>
            <button onClick={handleDelete} className="delete-button">
              Delete Account
            </button>
          </div>
        </div>
        <div className="blur page-blur-2"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Update;

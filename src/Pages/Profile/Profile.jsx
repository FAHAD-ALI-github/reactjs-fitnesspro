import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './profile.css';
import '../../App.css';
import Footer from '../../components/Footer/Footer';
import BrandLogo from '../../components/Hero/Header/BrandLogo';
import Exercises from '../../components/Exercises/Exercises';

const Profile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/update', { state: { user } });
  };

  // Base URL for images (MEDIA_URL in Django)
  const BASE_URL = "http://127.0.0.1:8000"; // change this if deployed
  const profileImage = user?.profile_picture
    ? `${BASE_URL}${user.profile_picture}`
    : `${BASE_URL}/media/profile_pics/default.jpg`;

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Calculate BMI
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return 'N/A';
    const heightInM = height / 100;
    const bmi = (weight / (heightInM * heightInM)).toFixed(1);
    return bmi;
  };

  const age = calculateAge(user?.date_of_birth);
  const bmi = calculateBMI(user?.weight, user?.height);

  return (
    <div className="Page">
      <BrandLogo/>

      <div className="blur page-blur-1"></div>
    <div className="blur page-blur-2"></div>
      <div className="profile-container">
        <div className="profile-hero">
          <div className="profile-card-modern">
            {/* Profile Header */}
            <div className="profile-header">
              <div className="profile-avatar-container">
                <div className="profile-avatar-wrapper">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-avatar"
                  />
                  <div className="profile-avatar-ring"></div>
                </div>
              </div>
              
              <div className="profile-header-info">
                <h1 className="profile-name">
                  Welcome, {user?.first_name} {user?.last_name}
                </h1>
                <p className="profile-subtitle">Member since 2024</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="profile-stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🎂</div>
                <div className="stat-value">{age}</div>
                <div className="stat-label">Years Old</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⚖️</div>
                <div className="stat-value">{user?.weight || 'N/A'}</div>
                <div className="stat-label">kg</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📏</div>
                <div className="stat-value">{user?.height || 'N/A'}</div>
                <div className="stat-label">cm</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">💪</div>
                <div className="stat-value">{bmi}</div>
                <div className="stat-label">BMI</div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="profile-details">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="details-grid">
                <div className="detail-item">
                  <div className="detail-icon">📧</div>
                  <div className="detail-content">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{user?.email || 'Not provided'}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-icon">📱</div>
                  <div className="detail-content">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">{user?.phone_number || 'Not provided'}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-icon">🎂</div>
                  <div className="detail-content">
                    <span className="detail-label">Date of Birth</span>
                    <span className="detail-value">{user?.date_of_birth || 'Not provided'}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-icon">👤</div>
                  <div className="detail-content">
                    <span className="detail-label">Gender</span>
                    <span className="detail-value">
                      {user?.gender === "M" ? "Male" : user?.gender === "F" ? "Female" : "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="profile-actions">
              <button
                className="btn-primary edit-profile-btn"
                onClick={handleEditProfile}
              >
                <span className="btn-icon">✏️</span>
                Edit Profile
              </button>
              
              <button className="btn-secondary">
                <span className="btn-icon">📊</span>
                View Progress
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Exercises />
      <Footer />
    </div>
  );
};

export default Profile;
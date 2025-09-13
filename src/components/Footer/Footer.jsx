import React from "react";
import "./footer.css";
import Github from "../../assets/github.png";
import Instagram from "../../assets/instagram.png";
import Linkesdin from "../../assets/linkedin.png";
import Logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="footer-container">
{/* blur patches */}
<div className="blur footer-blur-1"></div>
<div className="blur footer-blur-2"></div>
        <hr />
      <div className="footer">
        <div className="social-links">
        <img src={Github} alt="" />
        <img src={Instagram} alt="" />
        <img src={Linkesdin} alt="" />
        </div>
        <div className="logo-footer">
        <img src={Logo} alt="" />
      </div>
      </div>
      
    </div>
  );
};

export default Footer;

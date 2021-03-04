import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="main-footer">
      <div className="footer">
        <div className="footer-logo">
          <img
            className="footer-image"
            src="footerImg.png"
            alt="civil connecter"
          />
          <h3 className="footer-h">Civil Connecters</h3>
        </div>
        <div className="footer-ab">
          <h4 className="Footer-h4">See more</h4>
          <span className="footer-spn">Home</span>
          <span className="footer-spn">Civil Connecters</span>
          <span className="footer-spn">About Us</span>
          <span className="footer-spn">Register</span>
          <span className="footer-spn">Log In</span>
        </div>
        <div className="footer-social">
          <h4 className="Footer-h4">Contact Us</h4>
          <div className="footer-img">
            <img className="images-footer" src="facebook.png" alt="facebook" />
            <img className="images-footer" src="twitter.png" alt="twitter" />
            <img className="images-footer" src="gmail.png" alt="gmail" />
            <img className="images-footer" src="youtube.png" alt="youtube" />
            <img
              className="images-footer"
              src="instagram.png"
              alt="instagram"
            />
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>Copyright 2020 civil connecters</p>
      </div>
    </div>
  );
};

export default Footer;

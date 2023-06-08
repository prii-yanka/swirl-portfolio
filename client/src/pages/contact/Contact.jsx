import React from "react";
import "./contact.css";
import ContactForm from "./ContactForm";
import "../pages.css";
import { useNav } from "../../customHooks/useNav";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const Contact = (props) => {
  const contactRef = useNav("Contact");

  return (
    <section className="contact" ref={contactRef} id="contactContainer">
      <div className="contact-container">
        <div className="contact-illustration-container">
          <div className="image-container">
            <img
              src="images/contact@72x.png"
              className="contact-illustration"
            />
          </div>
        </div>
        <div className="about-contact">
          <h1> Contact</h1>
          <div>
            I believe your website should celebrate what makes your business
            unique, connect you with new people who will love what you do, and
            foster stronger relationships with your existing customers.
          </div>
          <br />
          <div>
            With your vision, my design savvy, and a hefty amount of coffee, we
            can create a digital experience that is creative, accessible, and
            memorable.
          </div>
          <ContactForm />
          <div className="profile-links">
            <div className="link-container">
              <a
                href="https://github.com/prii-yanka"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="link-div">
                  <GitHubIcon fontSize="large" sx={{ color: "#EF8181" }} />
                </div>
                <p>GitHub</p>
              </a>
            </div>
            {/* <div className="link-div">
              <EmailIcon fontSize='large' sx={{ color: "#EF8181" }} />
            </div> */}
            <div className="link-container">
              <a
                href="https://www.linkedin.com/in/pri-yanka/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="link-div">
                  <LinkedInIcon fontSize="large" sx={{ color: "#EF8181" }} />
                </div>
                <p>LinkedIn</p>
              </a>
            </div>
            <div className="link-container">
              <a
                href="https://dribbble.com/priyanka_jain"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="link-div">
                  <SportsBasketballIcon
                    fontSize="large"
                    sx={{ color: "#EF8181" }}
                  />
                </div>
                <p>Dribble</p>
              </a>
            </div>
            <div className="link-container">
              <a
                href="Priyanka_Jain.pdf"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="link-div">
                  <TextSnippetIcon fontSize="large" sx={{ color: "#EF8181" }} />
                </div>
                <p>Resume</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

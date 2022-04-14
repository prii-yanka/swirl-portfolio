import React from 'react'
import './contact.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';

const Contact = props => {

  const contactRef = useNav('Contact');

  return (
    <section className='contact' ref={contactRef} id='contactContainer'>
      <div className="contact-container">
        <div className="contact-illustration-container">
          <img src="/images/contact@72x.png" className="contact-illustration" />
        </div>
        <div className="about-contact">
          Contact
        </div>
      </div>
    </section>

  )
}

export default Contact
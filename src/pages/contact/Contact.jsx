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
          <img src="images/contact@72x.png" className="contact-illustration" />
        </div>
        <div className="about-contact">
          <h1> Contact</h1>
          <div>I believe your website should celebrate what makes your business unique, connect you with new people who will love what you do, and foster stronger relationships with your existing customers.</div>
          <div>With your vision, my design savvy, and a hefty amount of coffee, we can create a digital experience that is creative, accessible, and memorable.</div>
        </div>
      </div>
    </section>

  )
}

export default Contact
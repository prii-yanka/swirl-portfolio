import React from 'react'
import './contact.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';

const Contact = props => {

  const contactRef = useNav('Contact');

  return (
    <section className='contact' ref={contactRef} id='contactContainer'>
      <div>Contact</div>
    </section>

  )
}

export default Contact
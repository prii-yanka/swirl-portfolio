import React from 'react'
import './education.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';
// import { motion, useViewportScroll } from "framer-motion"

const Education = () => {
  // const { scrollYProgress } = useViewportScroll()

  const educationRef = useNav('Education')

  return (
    <section className='education' ref={educationRef} id='educationContainer'>
      <div className="container">
        <div className="education-illustration-container">
          <div className="image-container">
            <img src="/images/education@72x.png" className="ed-illustration" />
          </div>
        </div>
        <div className="about-education">
          Education
        </div>
      </div>
    </section>
  )
}

export default Education
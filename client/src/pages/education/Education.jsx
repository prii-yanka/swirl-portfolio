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
            <img src="images/education@72x.png" className="ed-illustration" />
          </div>
        </div>
        <div className="about-education">
          <h1> Education </h1>
          <h3> Purdue University </h3>
          <div className="graduation"> Graduation: December 2022 </div>
          <div className='education-item'>
            <div>Computer Science Major</div>
            <ul>
              <li> CS 180: Object-Oriented Programming in Java </li>
              <li> CS 182: Foundations of Computer Science </li>
              <li> CS 240: Programming in C/C++ </li>
              <li> CS 250: Computer Architecture </li>
              <li> CS 251: Data Structures and Algorithms </li>
              <li> CS 252: Systems Programming </li>
              <li> CS 307: Software Engineering 1 </li>
              <li> CS 348: Information Systems </li>
              <li> CS 354: Operating Systems</li>
              <li> CS 373: Data Mining and Machine Learning </li>
              <li> CS 407: Software Engineering Senior Project </li>
              <li> CS 408: Software Testing </li>
              <li> MA 416: Statistics/Probability </li>
            </ul>
          </div>
          <div className='education-item'>
            <div>Enrepreneurship Certificate</div>
            <ul>
              <li> ENTR 200: Intro to Entrepreneurship & Innovation </li>
              <li> ENTR 310: Marketing & Management for New Ventures </li>
            </ul>
          </div>
          <div className='education-item'>
            <div>Art and Design Studio Minor</div>
            <ul>
              <li> AD 105: Design I </li>
              <li> AD 113: Basic Drawing </li>
              <li> AD 233: Electronic and Time Based Art</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
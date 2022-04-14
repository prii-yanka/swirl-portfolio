import React from 'react'
import './skills.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';

const Skills = () => {

  const skillsRef = useNav('Skills')

  return (
    <section className='skills' ref={skillsRef} id='skillsContainer'>
      <div className="skills-container">
        <div className="about-skills">
          <h1> Skills </h1>
          <div className="specialize"> I specialize in building experiences that are:</div>
          <ul>
            <li><span>Fast:</span><br /> Fast load times and lag free interaction, my highest priority.</li>
            <li><span>Responsive:</span><br /> My layouts will work on any device, big or small.</li>
            <li><span>Intuitive:</span><br /> Strong preference for easy to use, intuitive UX/UI.</li>
            <li><span>Dynamic:</span>:<br /> Websites don't have to be static, I love making pages come to life.</li>
          </ul>
        </div>
        <div className='skills-illustration-container'>
          <div className="image-container">
            <img src="images/skills@72x.png" className="skills-bg" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
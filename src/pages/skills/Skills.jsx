import React from 'react'
import './skills.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';

const Skills = () => {

  const skillsRef = useNav('Skills')

  return (
    <section className='skills' ref={skillsRef} id='skillsContainer'>
      <div className="skills-container">
        <div className="about-education">
          Skills
        </div>
        <div className='skills-illustration-container'>
          <div className="image-container">
            <img src="/images/skills@72x.png" className="skills-bg" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
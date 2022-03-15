import React from 'react'
import './skills.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';

const Skills = () => {

  const skillsRef = useNav('Skills')

  return (
    <section className='skills' ref={skillsRef} id='skillsContainer'>
      <div>Skills</div>
    </section>
  )
}

export default Skills
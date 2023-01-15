import React from 'react'
import './experience.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';


const Experience = () => {

  const experienceRef = useNav('Experience');

  return (
    <section className='experience' ref={experienceRef} id='experienceContainer'>
      <div>Experience</div>
    </section>

  )
}

export default Experience
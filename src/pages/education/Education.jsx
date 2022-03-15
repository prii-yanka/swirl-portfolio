import React from 'react'
import './education.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';

const Education = () => {

  const educationRef = useNav('Education')

  return (
    <section className='education' ref={educationRef} id='educationContainer'>
      <div>Education</div>
    </section>
  )
}

export default Education
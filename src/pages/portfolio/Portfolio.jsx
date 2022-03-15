import React from 'react'
import './portfolio.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';

const Portfolio = () => {

  const portfolioRef = useNav('Portfolio')

  return (
    <section className='portfolio' ref={portfolioRef} id='portfolioContainer'>
      <div>Portfolio</div>
    </section>
  )
}

export default Portfolio
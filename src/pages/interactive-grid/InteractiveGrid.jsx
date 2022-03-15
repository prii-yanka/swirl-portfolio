import React from 'react'
import './interactive-grid.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';

const InteractiveGrid = () => {

  const interactiveGridRef = useNav('InteractiveGrid')

  return (
    <section className='interactive-grid' ref={interactiveGridRef} id='interactiveGridContainer'>
      <div>Interactive Grid</div>
    </section>
  )
}

export default InteractiveGrid
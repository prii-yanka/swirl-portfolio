import React from 'react'
import './interactive-grid.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';
import ScriptTag from 'react-script-tag';

const InteractiveGrid = () => {

  const interactiveGridRef = useNav('InteractiveGrid')

  return (
    <section className='interactive-grid' ref={interactiveGridRef} id='interactiveGridContainer'>
      <div>Interactive Grid</div>
      <ScriptTag type="text/javascript" src="../../public/sketch.js" />
    </section>
  )
}

export default InteractiveGrid
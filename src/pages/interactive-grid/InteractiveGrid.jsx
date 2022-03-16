import React, { Suspense } from 'react'
import './interactive-grid.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Box from '../../components/Box'
import Dragon from '../../components/Dragon'

const InteractiveGrid = () => {

  const interactiveGridRef = useNav('InteractiveGrid')

  return (
    <section className="interactive-grid" ref={interactiveGridRef} id='interactiveGridContainer'>
      <Canvas className="canvas">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[-2, 5, 2]} />
        <Suspense fallback={null}>
          <Dragon />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default InteractiveGrid
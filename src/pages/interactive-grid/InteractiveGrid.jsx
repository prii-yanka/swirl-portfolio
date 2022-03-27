// import React, { useRef, Suspense } from 'react'
import './interactive-grid.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';
import { useScript } from '../../customHooks/useScript';
import React, { useRef, useState, useLayoutEffect } from "react"
import { Parallax } from 'react-parallax';

// import { Canvas, useFrame, useLoader } from "@react-three/fiber"
// import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from "@react-three/postprocessing"
// import { Html, Icosahedron, Sphere, MeshDistortMaterial } from "@react-three/drei"
// import { TextureLoader } from 'three/src/loaders/TextureLoader'
// import { MathUtils } from 'three';
// import { FirstPersonControls, OrbitControls } from '@react-three/drei';

// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { useLoader } from '@react-three/fiber'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

{/* <Canvas>
<ambientLight intensity={0.5} />
<pointLight />
<Suspense fallback={null}>
  <OrbitControls />
  <Model />
</Suspense>
</Canvas> */}

// import Model from '../../components/Model'

// <img src="/images/table_top@72x.png" className="table_top" />
// <img src="/images/base@72x.png" className="base" />
// <img src="/images/ruler@72x.png" className="ruler" />
// <img src="/images/marker@72x.png" className="marker" />
// <img src="/images/book@72x.png" className="book" />
// <img src="/images/folders@72x.png" className="folders" />
// <img src="/images/color_cards@72x.png" className="color_cards" />
// <img src="/images/camera@72x.png" className="camera" />
// <img src="/images/tablet@72x.png" className="tablet" />
// <img src="/images/phone@72x.png" className="phone" />

const InteractiveGrid = () => {

  const interactiveGridRef = useNav('InteractiveGrid');
  return (
    <section className="interactive-grid" ref={interactiveGridRef} id='interactiveGridContainer'>

    </section>
  )
}

export default InteractiveGrid
import React from 'react'
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import greek from '../images/Greek.png'

const Box = props => {
  const textureMap = useLoader(TextureLoader, greek);
  return (
    <mesh rotation={[90, 0, 30]}>
      <boxBufferGeometry attach='geometry' args={[3, 3, 3]} />
      <meshStandardMaterial map={textureMap} />
    </mesh>
  )
}

export default Box
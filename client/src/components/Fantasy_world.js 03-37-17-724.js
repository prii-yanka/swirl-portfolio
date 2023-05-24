/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Fantasy_world.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.alpha.geometry} material={materials.environment_alpha} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.environment.geometry} material={materials.environment_builder} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.floor_variability1.geometry} material={materials.floor_variability} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.water.geometry} material={materials['sample_level:water1']} position={[24, -0.97, -7.08]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
    </group>
  )
}

useGLTF.preload('/Fantasy_world.glb')
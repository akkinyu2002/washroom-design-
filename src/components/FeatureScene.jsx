import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei'

function FeatureOrb() {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.2
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })
  return (
    <group ref={ref}>
      <Float speed={2} floatIntensity={0.5}>
        <mesh scale={2}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#c9a96e"
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
            wireframe
          />
        </mesh>
      </Float>
      <Float speed={1.5} floatIntensity={0.3}>
        <mesh scale={1.3}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#e8e2da" roughness={0.1} metalness={0.5} transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

export default function FeatureScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#c9a96e" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#e8e2da" />
      <FeatureOrb />
      <Environment preset="city" />
    </Canvas>
  )
}

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial, RoundedBox } from '@react-three/drei'

const featureTiles = [
  { kind: 'materials', position: [-1.55, 1.05, 0.1], color: '#c9a96e', phase: 0 },
  { kind: 'storage', position: [1.55, 0.95, -0.05], color: '#e8e2da', phase: 1.2 },
  { kind: 'friendly', position: [-1.35, -1.05, -0.05], color: '#dfc08a', phase: 2.4 },
  { kind: 'timeless', position: [1.35, -1.15, 0.1], color: '#f5f0e8', phase: 3.6 },
]

function FeatureOrb() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
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

function StorageGlyph({ color }) {
  return (
    <group>
      {[-0.24, 0, 0.24].map((y, i) => (
        <RoundedBox key={i} args={[0.72, 0.16, 0.14]} radius={0.025} smoothness={3} position={[0, y, 0.18]}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.45} />
        </RoundedBox>
      ))}
      {[-0.24, 0, 0.24].map((y, i) => (
        <mesh key={`handle-${i}`} position={[0.22, y, 0.27]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.015, 0.13, 6, 10]} />
          <meshStandardMaterial color="#c9a96e" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function FriendlyGlyph({ color }) {
  return (
    <group>
      <RoundedBox args={[0.62, 0.78, 0.12]} radius={0.045} smoothness={4} position={[0, 0, 0.18]} rotation={[0, 0, -0.08]}>
        <meshStandardMaterial color={color} roughness={0.18} metalness={0.35} />
      </RoundedBox>
      <mesh position={[-0.11, -0.02, 0.28]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.08, 0.28, 0.035]} />
        <meshStandardMaterial color="#c9a96e" roughness={0.18} metalness={0.8} />
      </mesh>
      <mesh position={[0.12, 0.04, 0.29]} rotation={[0, 0, 0.75]}>
        <boxGeometry args={[0.08, 0.48, 0.035]} />
        <meshStandardMaterial color="#c9a96e" roughness={0.18} metalness={0.8} />
      </mesh>
    </group>
  )
}

function TimelessGlyph({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.2]}>
        <torusGeometry args={[0.32, 0.035, 18, 64]} />
        <meshStandardMaterial color={color} roughness={0.15} metalness={0.6} />
      </mesh>
      <mesh position={[0.08, 0.08, 0.25]} rotation={[0, 0, -0.55]}>
        <boxGeometry args={[0.035, 0.32, 0.035]} />
        <meshStandardMaterial color="#c9a96e" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.27]}>
        <sphereGeometry args={[0.045, 18, 18]} />
        <meshStandardMaterial color="#c9a96e" roughness={0.15} metalness={0.95} />
      </mesh>
    </group>
  )
}

function MaterialsGlyph({ color }) {
  return (
    <mesh position={[0, 0, 0.2]} rotation={[0.45, 0.4, 0.25]}>
      <octahedronGeometry args={[0.42, 0]} />
      <meshStandardMaterial color={color} roughness={0.12} metalness={0.75} />
    </mesh>
  )
}

function IconGlyph({ kind, color }) {
  if (kind === 'storage') return <StorageGlyph color={color} />
  if (kind === 'friendly') return <FriendlyGlyph color={color} />
  if (kind === 'timeless') return <TimelessGlyph color={color} />
  return <MaterialsGlyph color={color} />
}

function FeatureTile({ kind, position, color, phase }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const elapsed = state.clock.elapsedTime
    ref.current.rotation.y = Math.sin(elapsed * 0.45 + phase) * 0.22
    ref.current.rotation.x = Math.sin(elapsed * 0.35 + phase) * 0.12
  })

  return (
    <Float speed={1.4 + phase * 0.08} floatIntensity={0.28} rotationIntensity={0.18}>
      <group ref={ref} position={position}>
        <RoundedBox args={[1.08, 1.08, 0.18]} radius={0.13} smoothness={6}>
          <meshStandardMaterial color="#24221f" roughness={0.28} metalness={0.18} />
        </RoundedBox>
        <RoundedBox args={[0.92, 0.92, 0.08]} radius={0.1} smoothness={6} position={[0, 0, 0.11]}>
          <meshStandardMaterial color="#332f29" roughness={0.24} metalness={0.12} />
        </RoundedBox>
        <IconGlyph kind={kind} color={color} />
      </group>
    </Float>
  )
}

export default function FeatureScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.4], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#c9a96e" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#e8e2da" />
      <FeatureOrb />
      {featureTiles.map((tile) => (
        <FeatureTile key={tile.kind} {...tile} />
      ))}
      <Environment preset="city" />
    </Canvas>
  )
}

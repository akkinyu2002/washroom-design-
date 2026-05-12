import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial, RoundedBox } from '@react-three/drei'

function seededRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function MarbleSphere({ position, scale = 1, speed = 0.3 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.003
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.1
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#e8e2da"
          roughness={0.15}
          metalness={0.3}
          distort={0.2}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

function GoldRing({ position, scale = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.3
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
  })
  return (
    <Float speed={2} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.08, 32, 100]} />
        <meshStandardMaterial color="#c9a96e" roughness={0.2} metalness={0.9} />
      </mesh>
    </Float>
  )
}

function FloatingBox({ position, scale = 1, color = '#1a1917' }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.005
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
  })
  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.6}>
      <RoundedBox ref={ref} position={position} scale={scale} args={[1.2, 1.6, 0.8]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </RoundedBox>
    </Float>
  )
}

function Particles({ count = 80 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i + 1) - 0.5) * 20
      pos[i * 3 + 1] = (seededRandom(i + 101) - 0.5) * 20
      pos[i * 3 + 2] = (seededRandom(i + 201) - 0.5) * 20
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#c9a96e" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#f5f0e8" />
      <pointLight position={[-3, 2, -3]} intensity={0.5} color="#c9a96e" />
      <MarbleSphere position={[0, 0, 0]} scale={1.8} />
      <GoldRing position={[0, 0, 0]} scale={2.5} />
      <GoldRing position={[3.5, 1, -2]} scale={0.8} />
      <FloatingBox position={[-3.5, -1, -1]} scale={0.7} color="#252420" />
      <FloatingBox position={[3, -1.5, -2]} scale={0.5} />
      <Particles count={100} />
      <Environment preset="city" />
    </Canvas>
  )
}

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, OrbitControls, RoundedBox } from '@react-three/drei'

function Cabinet({ position = [0, 0, 0] }) {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
  })

  return (
    <group ref={group} position={position}>
      {/* Main cabinet body */}
      <RoundedBox args={[2.4, 3, 0.8]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3a3530" roughness={0.4} metalness={0.1} />
      </RoundedBox>
      {/* Shelves */}
      {[-0.8, 0, 0.8].map((y, i) => (
        <RoundedBox key={i} args={[2.3, 0.06, 0.75]} radius={0.02} position={[0, y, 0.03]}>
          <meshStandardMaterial color="#e8e2da" roughness={0.15} metalness={0.2} />
        </RoundedBox>
      ))}
      {/* Gold handles */}
      {[-0.4, 0.4].map((y, i) => (
        <mesh key={`h${i}`} position={[0, y, 0.45]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.02, 0.4, 8, 16]} />
          <meshStandardMaterial color="#c9a96e" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      {/* Decorative items on shelves */}
      <Float speed={1} floatIntensity={0.2}>
        <mesh position={[-0.6, 1.15, 0.1]}>
          <cylinderGeometry args={[0.15, 0.12, 0.5, 32]} />
          <meshStandardMaterial color="#c9a96e" roughness={0.3} metalness={0.7} />
        </mesh>
      </Float>
      <Float speed={1.5} floatIntensity={0.15}>
        <mesh position={[0.5, 1.2, 0.05]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color="#e8e2da" roughness={0.1} metalness={0.3} />
        </mesh>
      </Float>
      <Float speed={0.8} floatIntensity={0.1}>
        <mesh position={[0.3, 0.35, 0.1]}>
          <boxGeometry args={[0.25, 0.35, 0.2]} />
          <meshStandardMaterial color="#b5aea4" roughness={0.2} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  )
}

function Vanity({ position = [0, 0, 0] }) {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25 + 1) * 0.12
  })

  return (
    <group ref={group} position={position}>
      {/* Counter top - marble */}
      <RoundedBox args={[3, 0.12, 1.2]} radius={0.03} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#f0ebe3" roughness={0.1} metalness={0.15} />
      </RoundedBox>
      {/* Base drawers */}
      <RoundedBox args={[2.8, 1.5, 1.1]} radius={0.04} position={[0, -0.02, 0]}>
        <meshStandardMaterial color="#2a2520" roughness={0.5} metalness={0.05} />
      </RoundedBox>
      {/* Drawer lines */}
      {[0.35, -0.15, -0.55].map((y, i) => (
        <mesh key={i} position={[0, y, 0.56]}>
          <boxGeometry args={[2.6, 0.02, 0.01]} />
          <meshStandardMaterial color="#c9a96e" roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
      {/* Sink basin */}
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.35, 0.3, 0.15, 32]} />
        <meshStandardMaterial color="#e8e2da" roughness={0.05} metalness={0.4} />
      </mesh>
      {/* Faucet */}
      <mesh position={[0, 1.3, -0.25]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 16]} />
        <meshStandardMaterial color="#c9a96e" roughness={0.15} metalness={0.95} />
      </mesh>
      <mesh position={[0, 1.55, -0.1]}>
        <torusGeometry args={[0.15, 0.02, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#c9a96e" roughness={0.15} metalness={0.95} />
      </mesh>
    </group>
  )
}

function ShelfUnit({ position = [0, 0, 0] }) {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + 2) * 0.1
  })

  return (
    <group ref={group} position={position} scale={0.85}>
      {/* Frame */}
      {[-1.2, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <boxGeometry args={[0.08, 4, 0.5]} />
          <meshStandardMaterial color="#c9a96e" roughness={0.25} metalness={0.85} />
        </mesh>
      ))}
      {/* Shelves */}
      {[-1.5, -0.5, 0.5, 1.5].map((y, i) => (
        <RoundedBox key={i} args={[2.3, 0.08, 0.5]} radius={0.02} position={[0, y, 0]}>
          <meshStandardMaterial color="#e8e2da" roughness={0.15} metalness={0.2} />
        </RoundedBox>
      ))}
      {/* Items on shelves */}
      <Float speed={1.2} floatIntensity={0.1}>
        <mesh position={[-0.5, -1.15, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.6, 6]} />
          <meshStandardMaterial color="#8b7355" roughness={0.4} metalness={0.3} />
        </mesh>
      </Float>
      <Float speed={0.9} floatIntensity={0.12}>
        <mesh position={[0.4, 0.85, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 0.5, 32]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.1} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  )
}

export default function ShowcaseScene() {
  return (
    <Canvas camera={{ position: [0, 1, 6], fov: 40 }} dpr={[1, 2]}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1} color="#f5f0e8" castShadow />
      <pointLight position={[-4, 3, 2]} intensity={0.4} color="#c9a96e" />
      <spotLight position={[0, 6, 3]} angle={0.4} penumbra={0.8} intensity={0.6} color="#f5f0e8" />
      <Cabinet position={[-3, 0, -1]} />
      <Vanity position={[0, -0.5, 0]} />
      <ShelfUnit position={[3.5, 0, -1]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
      <Environment preset="apartment" />
    </Canvas>
  )
}

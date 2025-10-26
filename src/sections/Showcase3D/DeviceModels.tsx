import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function DeviceModels() {
  const laptopRef = useRef<THREE.Group>(null)
  const tabletRef = useRef<THREE.Group>(null)
  const mobileRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Gentle floating animation with different phases
    if (laptopRef.current) {
      laptopRef.current.position.y = Math.sin(time * 0.5) * 0.1
      laptopRef.current.rotation.y = time * 0.1
    }

    if (tabletRef.current) {
      tabletRef.current.position.y = Math.sin(time * 0.5 + Math.PI / 3) * 0.15
      tabletRef.current.rotation.y = time * 0.1
    }

    if (mobileRef.current) {
      mobileRef.current.position.y = Math.sin(time * 0.5 + (Math.PI * 2) / 3) * 0.12
      mobileRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group>
      {/* Laptop */}
      <group ref={laptopRef} position={[-2, 0, 0]}>
        <RoundedBox args={[2.5, 1.5, 0.1]} radius={0.05}>
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </RoundedBox>
        {/* Screen */}
        <Box args={[2.3, 1.3, 0.05]} position={[0, 0, 0.08]}>
          <meshStandardMaterial color="#0066FF" emissive="#0066FF" emissiveIntensity={0.3} />
        </Box>
      </group>

      {/* Tablet */}
      <group ref={tabletRef} position={[0, 0.3, 1]}>
        <RoundedBox args={[1.5, 2, 0.1]} radius={0.05}>
          <meshPhysicalMaterial
            color="#2a2a2a"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </RoundedBox>
        {/* Screen */}
        <Box args={[1.3, 1.8, 0.05]} position={[0, 0, 0.08]}>
          <meshStandardMaterial color="#FF0080" emissive="#FF0080" emissiveIntensity={0.3} />
        </Box>
      </group>

      {/* Mobile */}
      <group ref={mobileRef} position={[2, -0.2, 0.5]}>
        <RoundedBox args={[0.8, 1.5, 0.1]} radius={0.05}>
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </RoundedBox>
        {/* Screen */}
        <Box args={[0.7, 1.3, 0.05]} position={[0, 0, 0.08]}>
          <meshStandardMaterial color="#6B00FF" emissive="#6B00FF" emissiveIntensity={0.3} />
        </Box>
      </group>
    </group>
  )
}

export default DeviceModels

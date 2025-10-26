import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ParticleSystemProps {
  count?: number
}

function ParticleSystem({ count = 15000 }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const targetPositions = useRef<Float32Array>()

  // Generate particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // Create SYNCTA logo-ish distribution (clustered in center)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Create clustered distribution
      const radius = Math.random() * 8 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Gradient colors based on position
      const normalizedY = (positions[i3 + 1] + 8) / 16
      colors[i3] = normalizedY * 0 + (1 - normalizedY) * 0.4 // Electric Blue R
      colors[i3 + 1] = normalizedY * 0.4 + (1 - normalizedY) * 0 // Neon Pink G
      colors[i3 + 2] = normalizedY * 1.0 + (1 - normalizedY) * 1.0 // Deep Purple B
    }

    targetPositions.current = new Float32Array(positions)
    return { positions, colors }
  }, [count])

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current || !targetPositions.current) return

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const originalX = targetPositions.current[i3]
      const originalY = targetPositions.current[i3 + 1]
      const originalZ = targetPositions.current[i3 + 2]

      // Curl noise movement
      const noiseX = Math.sin(time * 0.5 + originalX * 0.5) * 0.3
      const noiseY = Math.cos(time * 0.5 + originalY * 0.5) * 0.3
      const noiseZ = Math.sin(time * 0.3 + originalZ * 0.5) * 0.2

      // Mouse attraction force
      const mouseX = mousePosition.current.x * 10
      const mouseY = mousePosition.current.y * 10
      const mouseZ = 0

      const dx = mouseX - positions[i3]
      const dy = mouseY - positions[i3 + 1]
      const dz = mouseZ - positions[i3 + 2]
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

      let attractionForceX = 0
      let attractionForceY = 0
      let attractionForceZ = 0

      if (distance < 5) {
        const force = (5 - distance) / 5
        attractionForceX = dx * force * 0.05
        attractionForceY = dy * force * 0.05
        attractionForceZ = dz * force * 0.05
      }

      // Apply forces
      positions[i3] = originalX + noiseX + attractionForceX
      positions[i3 + 1] = originalY + noiseY + attractionForceY
      positions[i3 + 2] = originalZ + noiseZ + attractionForceZ
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Rotate entire system slowly
    pointsRef.current.rotation.y = time * 0.05
  })

  return (
    <Points ref={pointsRef} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function ParticleBackground() {
  // Adaptive particle count based on device
  const particleCount = useMemo(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    return isMobile ? 3000 : 15000
  }, [])

  return (
    <div className="particle-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <ParticleSystem count={particleCount} />
      </Canvas>
    </div>
  )
}

export default ParticleBackground

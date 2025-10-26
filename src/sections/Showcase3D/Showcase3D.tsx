import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import DeviceModels from './DeviceModels'
import './Showcase3D.css'

const Showcase3D = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  return (
    <section className="showcase-3d-section" id="showcase">
      <div className="showcase-content">
        <div className="showcase-text">
          <h2 className="showcase-title">
            Immersive <span className="text-gradient">3D Experiences</span>
          </h2>
          <p className="showcase-description">
            We bring your products to life with interactive 3D visualizations that captivate
            and engage. Explore our device showcase below - click and drag to interact.
          </p>
        </div>

        <div className="showcase-canvas-wrapper">
          <Canvas
            shadows
            dpr={[1, isMobile ? 1.5 : 2]}
            gl={{ antialias: true }}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0066FF" />
            <pointLight position={[10, 10, 5]} intensity={0.5} color="#FF0080" />

            {/* Environment */}
            <Environment preset="city" />

            {/* 3D Models */}
            <Suspense fallback={null}>
              <DeviceModels />
            </Suspense>

            {/* Controls */}
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={(3 * Math.PI) / 4}
              minAzimuthAngle={-Math.PI / 4}
              maxAzimuthAngle={Math.PI / 4}
              minDistance={5}
              maxDistance={15}
            />

            {/* Post-processing (desktop only) */}
            {!isMobile && (
              <EffectComposer>
                <Bloom
                  intensity={0.4}
                  luminanceThreshold={0.85}
                  luminanceSmoothing={0.5}
                />
              </EffectComposer>
            )}
          </Canvas>
        </div>
      </div>
    </section>
  )
}

export default Showcase3D

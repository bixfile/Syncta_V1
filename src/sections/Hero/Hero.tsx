import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from '../../components/MagneticButton/MagneticButton'
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator'
import './Hero.css'

// Lazy load the heavy WebGL component
const ParticleBackground = lazy(() => import('./ParticleBackground'))

const Hero = () => {
  const words = ['We', 'Create', 'Digital', 'Experiences', 'That', 'Break', 'Reality']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateX: -5,
      fontVariationSettings: '"wght" 100',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      fontVariationSettings: '"wght" 900',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const sublineWords = [
    { text: 'Immersive 3D', delay: 1.2 },
    { text: 'Advanced Animations', delay: 1.4 },
    { text: 'Award-Winning Design', delay: 1.6 },
  ]

  return (
    <section className="hero-section" role="banner">
      {/* WebGL Particle Background */}
      <Suspense fallback={<div className="hero-fallback" />}>
        <ParticleBackground />
      </Suspense>

      {/* Content */}
      <div className="hero-content">
        {/* Main headline with kinetic typography */}
        <motion.h1
          className="hero-headline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="hero-word"
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Interactive subheadline */}
        <motion.div
          className="hero-subheadline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          {sublineWords.map((item, index) => (
            <span key={index}>
              {index > 0 && <span className="separator">•</span>}
              <motion.span
                className="subheadline-word"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: item.delay, duration: 0.5 }}
              >
                {item.text}
              </motion.span>
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <MagneticButton
            variant="primary"
            onClick={() => {
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Start Your Project
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            onClick={() => {
              document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Our Work
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  )
}

export default Hero

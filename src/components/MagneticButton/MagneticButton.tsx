import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './MagneticButton.css'

interface MagneticButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  href?: string
}

interface Particle {
  id: number
  x: number
  y: number
  color: string
  velocityX: number
  velocityY: number
  life: number
}

const MagneticButton = ({ children, variant = 'primary', onClick, href }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const rippleIdRef = useRef(0)
  const particleIdRef = useRef(0)

  const magneticStrength = variant === 'primary' ? 12 : 8
  const magneticRadius = variant === 'primary' ? 80 : 60

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

      if (distance < magneticRadius) {
        const force = (magneticRadius - distance) / magneticRadius
        setPosition({
          x: distanceX * force * (magneticStrength / magneticRadius),
          y: distanceY * force * (magneticStrength / magneticRadius),
        })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    document.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [magneticRadius, magneticStrength])

  const handleClick = (e: React.MouseEvent) => {
    const button = buttonRef.current
    if (!button) return

    // Create ripple effect
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: rippleIdRef.current++,
      x,
      y,
    }

    setRipples((prev) => [...prev, newRipple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)

    // Create confetti particles
    const colors = ['#0066FF', '#FF0080', '#6B00FF', '#FFD700']
    const newParticles: Particle[] = []

    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50
      const velocity = 2 + Math.random() * 3
      newParticles.push({
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity,
        life: 1,
      })
    }

    setParticles((prev) => [...prev, ...newParticles])

    if (onClick) {
      onClick()
    }
  }

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.velocityX,
            y: p.y + p.velocityY + 0.5, // Gravity
            velocityY: p.velocityY + 0.1, // Gravity acceleration
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0)
      )
    }, 16)

    return () => clearInterval(interval)
  }, [particles.length])

  const buttonProps = {
    ref: buttonRef as any,
    className: `magnetic-button ${variant}`,
    onClick: handleClick,
  }

  const content = (
    <>
      <motion.div
        className="magnetic-button-inner"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 7 }}
      >
        {children}
      </motion.div>

      {/* Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </>
  )

  return (
    <>
      {href ? (
        <a {...buttonProps} href={href}>
          {content}
        </a>
      ) : (
        <button {...buttonProps}>{content}</button>
      )}

      {/* Confetti particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.life,
          }}
        />
      ))}
    </>
  )
}

export default MagneticButton

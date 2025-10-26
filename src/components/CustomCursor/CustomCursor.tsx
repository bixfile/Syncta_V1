import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

interface Position {
  x: number
  y: number
}

interface TrailParticle extends Position {
  alpha: number
  id: number
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState<TrailParticle[]>([])
  const trailIdRef = useRef(0)
  const targetPosition = useRef<Position>({ x: 0, y: 0 })
  const currentPosition = useRef<Position>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY }

      // Add trail particle
      const newParticle: TrailParticle = {
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        id: trailIdRef.current++,
      }

      setTrail((prev) => [...prev.slice(-9), newParticle])
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.role === 'button' ||
        target.closest('a, button, [role="button"]')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver, true)

    // Animation loop with lerp
    let rafId: number
    const animate = () => {
      // Lerp the cursor position
      currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * 0.1
      currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * 0.1

      setPosition({
        x: currentPosition.current.x,
        y: currentPosition.current.y,
      })

      rafId = requestAnimationFrame(animate)
    }

    animate()

    // Fade out trail particles
    const trailInterval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, alpha: p.alpha - 0.1 }))
          .filter((p) => p.alpha > 0)
      )
    }, 50)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver, true)
      cancelAnimationFrame(rafId)
      clearInterval(trailInterval)
    }
  }, [])

  // Hide cursor on mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) return null

  return (
    <>
      {/* Trail particles */}
      {trail.map((particle) => (
        <div
          key={particle.id}
          className="cursor-trail"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            opacity: particle.alpha,
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  )
}

export default CustomCursor

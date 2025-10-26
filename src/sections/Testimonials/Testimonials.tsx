import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import './Testimonials.css'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  quote: string
  avatar: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechFlow',
    quote: 'Syncta transformed our vision into reality with stunning 3D experiences.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Head of Product',
    company: 'InnovateCo',
    quote: 'The attention to detail and performance is unmatched. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Founder',
    company: 'StartupXYZ',
    quote: 'Our conversion rates doubled after the redesign. Incredible work!',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'VP of Design',
    company: 'DesignHub',
    quote: 'Syncta pushes boundaries and delivers experiences that wow users.',
    avatar: 'https://i.pravatar.cc/150?img=14',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'CMO',
    company: 'BrandCo',
    quote: 'Professional, creative, and results-driven. A true partner!',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
  },
  {
    id: 6,
    name: 'Alex Johnson',
    role: 'CEO',
    company: 'FutureTech',
    quote: 'The team brought innovation and expertise to every pixel.',
    avatar: 'https://i.pravatar.cc/150?img=8',
    rating: 5,
  },
  {
    id: 7,
    name: 'Rachel Green',
    role: 'Product Lead',
    company: 'WebSolutions',
    quote: 'Best agency we have worked with. Period.',
    avatar: 'https://i.pravatar.cc/150?img=45',
    rating: 5,
  },
  {
    id: 8,
    name: 'Michael Brown',
    role: 'Director',
    company: 'CreativeStudio',
    quote: 'Syncta delivers award-winning work consistently.',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
  },
]

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<GSAPTimeline>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Duplicate testimonials for seamless loop
    const timeline = gsap.timeline({ repeat: -1 })

    timeline.to(container, {
      x: `-${testimonials.length * 350}px`,
      duration: 40,
      ease: 'none',
    })

    animationRef.current = timeline

    return () => {
      timeline.kill()
    }
  }, [])

  useEffect(() => {
    if (animationRef.current) {
      isPaused ? animationRef.current.pause() : animationRef.current.play()
    }
  }, [isPaused])

  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-header">
        <h2 className="testimonials-title">
          What <span className="text-gradient">Clients Say</span>
        </h2>
        <p className="testimonials-subtitle">
          Trusted by innovative companies worldwide
        </p>
      </div>

      <div
        className="testimonials-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div ref={containerRef} className="testimonials-container">
          {duplicatedTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className="testimonial-card glass"
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <div className="testimonial-header">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
                <div>
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-rating">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="testimonials-controls">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="control-button"
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? '▶' : '⏸'}
        </button>
      </div>
    </section>
  )
}

export default Testimonials

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './Services.css'

interface Service {
  id: number
  title: string
  description: string
  icon: string
  size: 'large' | 'small'
}

const services: Service[] = [
  {
    id: 1,
    title: 'Immersive 3D Experiences',
    description: 'WebGL and Three.js expertise to create interactive product showcases that captivate your audience.',
    icon: '🎮',
    size: 'large',
  },
  {
    id: 2,
    title: 'Advanced Animations',
    description: 'GSAP and Framer Motion mastery for scroll-driven narratives and micro-interactions.',
    icon: '⚡',
    size: 'small',
  },
  {
    id: 3,
    title: 'Award-Winning Design',
    description: 'Awwwards-worthy aesthetics with proven case studies and recognition.',
    icon: '🏆',
    size: 'small',
  },
  {
    id: 4,
    title: 'Performance Optimization',
    description: '60fps guarantee with Lighthouse scores of 95+ for blazing fast experiences.',
    icon: '⚙️',
    size: 'large',
  },
]

function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 120, damping: 7 })
  const springY = useSpring(y, { stiffness: 120, damping: 7 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    const maxDistance = 100
    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance
      x.set(distanceX * force * 0.15)
      y.set(distanceY * force * 0.15)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`service-card glass ${service.size}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, zIndex: 10 }}
    >
      <div className="service-icon">{service.icon}</div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.description}</p>
      <motion.a
        href="#contact"
        className="service-cta"
        whileHover={{ x: 8 }}
      >
        Learn More →
      </motion.a>
    </motion.div>
  )
}

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="services-title">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="services-subtitle">
            Comprehensive digital solutions that push boundaries
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

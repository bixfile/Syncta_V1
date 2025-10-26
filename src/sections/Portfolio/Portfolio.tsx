import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: number
  title: string
  category: string
  image: string
  color: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'TechFlow Platform',
    category: 'SaaS Dashboard',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    color: '#0066FF',
  },
  {
    id: 2,
    title: 'Crypto Wallet',
    category: 'Web3 Application',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    color: '#FF0080',
  },
  {
    id: 3,
    title: 'E-Commerce Store',
    category: 'Online Retail',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    color: '#6B00FF',
  },
  {
    id: 4,
    title: 'Portfolio Agency',
    category: 'Creative Studio',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    color: '#FFD700',
  },
  {
    id: 5,
    title: 'Fitness Tracker',
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    color: '#0066FF',
  },
  {
    id: 6,
    title: 'Real Estate Hub',
    category: 'Property Platform',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    color: '#FF0080',
  },
]

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const scrollContainer = scrollContainerRef.current

    if (!section || !scrollContainer) return

    // Calculate scroll distance
    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth

    // Create horizontal scroll effect
    const tween = gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="portfolio-section" id="portfolio">
      <div className="portfolio-header">
        <h2 className="portfolio-title">
          Featured <span className="text-gradient">Work</span>
        </h2>
        <p className="portfolio-subtitle">
          Scroll to explore our projects →
        </p>
      </div>

      <div ref={scrollContainerRef} className="portfolio-scroll-container">
        {projects.map((project) => (
          <div key={project.id} className="portfolio-card">
            <div className="portfolio-image-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="portfolio-image"
                loading="lazy"
              />
              <div className="portfolio-overlay" style={{ background: `linear-gradient(135deg, ${project.color}aa, ${project.color}dd)` }} />
            </div>
            <div className="portfolio-info">
              <p className="portfolio-category">{project.category}</p>
              <h3 className="portfolio-card-title">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Portfolio

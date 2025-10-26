import { useState } from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setEmail('')
        setIsSubscribed(false)
      }, 3000)
    }
  }

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', url: '#' },
    { name: 'LinkedIn', icon: 'in', url: '#' },
    { name: 'GitHub', icon: 'GH', url: '#' },
    { name: 'Dribbble', icon: 'Db', url: '#' },
  ]

  return (
    <footer className="footer-section">
      {/* Animated background pattern */}
      <div className="footer-pattern">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.5;0.3" dur="6s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="footer-container">
        <div className="footer-grid">
          {/* Logo and tagline */}
          <div className="footer-column">
            <h3 className="footer-logo text-gradient">SYNCTA</h3>
            <p className="footer-tagline">
              Creating digital experiences that break reality.
            </p>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="#services">3D Experiences</a></li>
              <li><a href="#services">Animations</a></li>
              <li><a href="#services">Design</a></li>
              <li><a href="#services">Performance</a></li>
            </ul>
          </div>

          {/* Work */}
          <div className="footer-column">
            <h4 className="footer-heading">Work</h4>
            <ul className="footer-links">
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#showcase">Showcase</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li><a href="#contact">Get in Touch</a></li>
              <li><a href="mailto:hello@syncta.com">hello@syncta.com</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-column newsletter-column">
            <h4 className="footer-heading">Newsletter</h4>
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="newsletter-input"
                  required
                />
                <motion.button
                  type="submit"
                  className="newsletter-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  →
                </motion.button>
              </form>
            ) : (
              <motion.div
                className="newsletter-success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✓ Subscribed!
              </motion.div>
            )}
          </div>
        </div>

        {/* Social icons */}
        <div className="footer-social">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 200 }}
              aria-label={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Syncta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

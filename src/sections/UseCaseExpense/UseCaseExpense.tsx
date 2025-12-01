import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './UseCaseExpense.css'

// Types
interface EmailItem {
  id: number
  vendor: string
  logo: string
  amount: string
  date: string
  category: 'PRO' | 'PERSO' | 'PENDING'
  location: string
  confidence: number
}

interface MetricItem {
  before: string
  after: string
  label: string
  icon: string
}

interface ComparisonRow {
  feature: string
  ramp: boolean | string
  syncta: boolean | string
}

// Data
const mockEmails: EmailItem[] = [
  { id: 1, vendor: 'Uber', logo: '🚗', amount: '$43.72', date: 'Nov 15', category: 'PRO', location: 'Houston, TX', confidence: 96 },
  { id: 2, vendor: 'Lyft', logo: '🚙', amount: '$56.33', date: 'Nov 9', category: 'PERSO', location: 'Maui, HI', confidence: 94 },
  { id: 3, vendor: 'DoorDash', logo: '🍕', amount: '$28.32', date: 'Nov 12', category: 'PERSO', location: 'Las Vegas, NV', confidence: 91 },
  { id: 4, vendor: 'Hilton', logo: '🏨', amount: '$342.00', date: 'Nov 8', category: 'PRO', location: 'Austin, TX', confidence: 98 },
  { id: 5, vendor: 'Delta', logo: '✈️', amount: '$487.50', date: 'Nov 5', category: 'PRO', location: 'Houston → Paris', confidence: 99 },
  { id: 6, vendor: 'Apple', logo: '🍎', amount: '$1,877.00', date: 'Nov 14', category: 'PENDING', location: 'Online', confidence: 67 },
]

const metrics: MetricItem[] = [
  { before: '5+ hours', after: '10 min', label: 'Monthly Time', icon: '⏱️' },
  { before: '15-20%', after: '0%', label: 'Missed Receipts', icon: '📄' },
  { before: 'Frequent', after: '< 5%', label: 'Classification Errors', icon: '❌' },
  { before: '2-3 weeks', after: '< 3 days', label: 'Reimbursement Delay', icon: '💰' },
]

const comparisonData: ComparisonRow[] = [
  { feature: 'Requires Their Card', ramp: true, syncta: false },
  { feature: 'Multi-Card Support', ramp: false, syncta: true },
  { feature: 'PRO/PERSO Auto-Classification', ramp: false, syncta: true },
  { feature: 'France + US Support', ramp: 'US Only', syncta: true },
  { feature: 'Data Ownership', ramp: 'Theirs', syncta: 'Yours' },
  { feature: 'Full Customization', ramp: false, syncta: true },
  { feature: 'Deep Gmail Integration', ramp: false, syncta: true },
  { feature: 'AI Context Understanding', ramp: false, syncta: true },
]

const workflowSteps = [
  { icon: '📧', title: 'Email Arrives', desc: 'Receipt from Uber, Lyft, Hotels...' },
  { icon: '🤖', title: 'AI Extracts', desc: 'Parse HTML, extract data' },
  { icon: '📄', title: 'PDF Generated', desc: 'Branded receipt created' },
  { icon: '🏷️', title: 'Smart Classification', desc: 'PRO vs PERSO with context' },
  { icon: '💾', title: 'Auto-Stored', desc: 'Google Drive + Airtable' },
  { icon: '🔔', title: 'Notified', desc: 'Slack/SMS if review needed' },
]

// Components
const LiveEmailFeed = () => {
  const [visibleEmails, setVisibleEmails] = useState<EmailItem[]>([])
  const [processedCount, setProcessedCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleEmails(prev => {
        if (prev.length >= mockEmails.length) {
          return mockEmails.slice(0, 1)
        }
        const nextEmail = mockEmails[prev.length]
        setProcessedCount(p => p + 1)
        return [...prev, nextEmail]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="live-feed">
      <div className="feed-header">
        <div className="feed-status">
          <span className="status-dot" />
          <span>Live Processing</span>
        </div>
        <div className="feed-counter">
          <span className="counter-number">{processedCount}</span>
          <span className="counter-label">receipts processed</span>
        </div>
      </div>
      
      <div className="email-list">
        <AnimatePresence>
          {visibleEmails.map((email, index) => (
            <motion.div
              key={`${email.id}-${index}`}
              className="email-item"
              initial={{ opacity: 0, x: -50, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="email-vendor">
                <span className="vendor-logo">{email.logo}</span>
                <div className="vendor-info">
                  <span className="vendor-name">{email.vendor}</span>
                  <span className="vendor-location">{email.location}</span>
                </div>
              </div>
              <div className="email-amount">{email.amount}</div>
              <div className={`email-category ${email.category.toLowerCase()}`}>
                {email.category === 'PENDING' ? (
                  <span className="category-pending">⏳ Review</span>
                ) : (
                  <>
                    <span className="category-badge">{email.category}</span>
                    <span className="category-confidence">{email.confidence}%</span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

const WorkflowAnimation = () => {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % workflowSteps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="workflow-container">
      <div className="workflow-steps">
        {workflowSteps.map((step, index) => (
          <motion.div
            key={index}
            className={`workflow-step ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
            initial={{ opacity: 0.5 }}
            animate={{ 
              opacity: index <= activeStep ? 1 : 0.5,
              scale: index === activeStep ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-content">
              <span className="step-title">{step.title}</span>
              <span className="step-desc">{step.desc}</span>
            </div>
            {index < workflowSteps.length - 1 && (
              <div className={`step-connector ${index < activeStep ? 'active' : ''}`}>
                <motion.div 
                  className="connector-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: index < activeStep ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const ComparisonTable = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div 
      ref={ref}
      className="comparison-table-wrapper"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="comparison-table">
        <div className="table-header">
          <div className="table-cell feature-cell">Feature</div>
          <div className="table-cell ramp-cell">
            <span className="provider-name">Ramp</span>
            <span className="provider-tag">Traditional SaaS</span>
          </div>
          <div className="table-cell syncta-cell">
            <span className="provider-name">Syncta</span>
            <span className="provider-tag highlight">Custom AI</span>
          </div>
        </div>
        {comparisonData.map((row, index) => (
          <motion.div 
            key={index}
            className="table-row"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="table-cell feature-cell">{row.feature}</div>
            <div className="table-cell ramp-cell">
              {typeof row.ramp === 'boolean' ? (
                row.ramp ? <span className="check negative">✓</span> : <span className="cross">✗</span>
              ) : (
                <span className="text-value negative">{row.ramp}</span>
              )}
            </div>
            <div className="table-cell syncta-cell">
              {typeof row.syncta === 'boolean' ? (
                row.syncta ? <span className="check positive">✓</span> : <span className="cross">✗</span>
              ) : (
                <span className="text-value positive">{row.syncta}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const MetricsGrid = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="metrics-grid">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          className="metric-card glass"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="metric-icon">{metric.icon}</div>
          <div className="metric-comparison">
            <div className="metric-before">
              <span className="metric-value strikethrough">{metric.before}</span>
              <span className="metric-label">Before</span>
            </div>
            <div className="metric-arrow">→</div>
            <div className="metric-after">
              <span className="metric-value highlight">{metric.after}</span>
              <span className="metric-label">After</span>
            </div>
          </div>
          <div className="metric-title">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

const AIClassificationDemo = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const runDemo = () => {
    setIsAnalyzing(true)
    setShowResult(false)
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResult(true)
    }, 3000)
  }

  return (
    <div className="ai-demo-container">
      <div className="demo-input glass">
        <div className="demo-email-preview">
          <div className="email-header">
            <span className="email-from">📧 From: receipts@uber.com</span>
            <span className="email-date">Nov 9, 2025</span>
          </div>
          <div className="email-subject">Your trip with Uber - $56.33</div>
          <div className="email-body">
            <p>🚗 <strong>Uber Receipt</strong></p>
            <p>Pickup: Four Seasons Resort, Maui</p>
            <p>Dropoff: Kahului Airport (OGG)</p>
            <p>Rider: Isabelle Batreau</p>
            <p>Amount: <strong>$56.33</strong></p>
          </div>
        </div>
        <motion.button 
          className="demo-btn"
          onClick={runDemo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : '🤖 Run AI Classification'}
        </motion.button>
      </div>

      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            className="demo-processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="processing-steps">
              <motion.div 
                className="processing-step"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                📊 Extracting data...
              </motion.div>
              <motion.div 
                className="processing-step"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
              >
                🗓️ Checking calendar context...
              </motion.div>
              <motion.div 
                className="processing-step"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, delay: 1, repeat: Infinity }}
              >
                🧠 AI reasoning...
              </motion.div>
            </div>
          </motion.div>
        )}

        {showResult && (
          <motion.div 
            className="demo-result glass"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="result-header">
              <span className="result-badge perso">PERSO</span>
              <span className="result-confidence">94% Confidence</span>
            </div>
            <div className="result-details">
              <div className="result-row">
                <span className="result-label">📍 Location:</span>
                <span className="result-value">Maui, Hawaii (Four Seasons → Airport)</span>
              </div>
              <div className="result-row">
                <span className="result-label">👤 Account:</span>
                <span className="result-value">Isabelle Batreau (Family)</span>
              </div>
              <div className="result-row">
                <span className="result-label">📅 Context:</span>
                <span className="result-value">Weekend - No business meetings</span>
              </div>
              <div className="result-row">
                <span className="result-label">🏷️ Trip Tag:</span>
                <span className="result-value">hawaii_family_vacation</span>
              </div>
              <div className="result-row">
                <span className="result-label">💰 Tax Deductible:</span>
                <span className="result-value negative">NO</span>
              </div>
            </div>
            <div className="result-reasoning">
              <strong>AI Reasoning:</strong> Weekend date + Resort location (Four Seasons = vacation) + Family member name + No nearby business meetings in calendar
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main Component
const UseCaseExpense = () => {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  return (
    <section className="usecase-expense-section" id="usecase-expense">
      {/* Hero Section */}
      <div className="usecase-hero" ref={heroRef}>
        <motion.div 
          className="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-icon">💡</span>
          <span>Use Case: Finance & Expense Management</span>
        </motion.div>

        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-gradient">ExpenseBot AI</span>
          <br />
          Intelligent Expense Automation
        </motion.h1>

        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Stop wasting 5+ hours monthly on expense reports. Let AI handle the tedious work 
          while you focus on growing your business.
        </motion.p>

        <motion.div 
          className="hero-tags"
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="tag">🚗 Uber/Lyft</span>
          <span className="tag">🍕 DoorDash</span>
          <span className="tag">🏨 Hotels</span>
          <span className="tag">✈️ Airlines</span>
          <span className="tag">🛍️ Retail</span>
        </motion.div>
      </div>

      {/* Problem Statement */}
      <div className="problem-section">
        <div className="problem-container glass">
          <div className="problem-icon">😰</div>
          <blockquote className="problem-quote">
            "As an entrepreneur with multiple companies (France/US), I spend <strong>5+ hours monthly</strong> on:
            searching for invoices in Gmail, downloading PDFs manually, sorting PRO vs PERSO, 
            filling expense reports, and preparing accounting..."
          </blockquote>
          <div className="problem-pain-points">
            <div className="pain-point">
              <span className="pain-icon">🔍</span>
              <span>Hunting for receipts</span>
            </div>
            <div className="pain-point">
              <span className="pain-icon">📥</span>
              <span>Manual downloads</span>
            </div>
            <div className="pain-point">
              <span className="pain-icon">🏷️</span>
              <span>PRO/PERSO confusion</span>
            </div>
            <div className="pain-point">
              <span className="pain-icon">📊</span>
              <span>Tedious reporting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Demo Section */}
      <div className="demo-section">
        <div className="section-header">
          <h2 className="section-title">
            See It <span className="text-gradient">In Action</span>
          </h2>
          <p className="section-subtitle">Real-time expense processing with AI classification</p>
        </div>

        <div className="demo-grid">
          <div className="demo-left">
            <h3 className="demo-heading">📧 → 🤖 → 📄</h3>
            <p className="demo-description">
              Watch as emails arrive and get automatically processed, classified, 
              and organized - no manual work required.
            </p>
            <LiveEmailFeed />
          </div>
          <div className="demo-right">
            <h3 className="demo-heading">AI Classification Engine</h3>
            <p className="demo-description">
              Our AI understands context: dates, locations, account names, 
              and even your calendar to make smart decisions.
            </p>
            <AIClassificationDemo />
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="workflow-section">
        <div className="section-header">
          <h2 className="section-title">
            Automated <span className="text-gradient">Workflow</span>
          </h2>
          <p className="section-subtitle">From email to expense report - fully automated</p>
        </div>
        <WorkflowAnimation />
      </div>

      {/* Why Not Ramp Section */}
      <div className="comparison-section">
        <div className="section-header">
          <h2 className="section-title">
            Why Not <span className="text-gradient strikethrough-text">Ramp</span>?
          </h2>
          <p className="section-subtitle">Traditional SaaS vs Custom AI Solution</p>
        </div>

        <div className="ramp-problems glass">
          <h3>❌ Why Ramp Doesn't Work for You:</h3>
          <ul className="problems-list">
            <li>
              <span className="problem-bullet">💳</span>
              <span>You use <strong>multiple cards</strong> (Visa, Apple Pay, etc.) - Ramp requires their card only</span>
            </li>
            <li>
              <span className="problem-bullet">✈️</span>
              <span>You travel <strong>internationally</strong> (Hawaii, Vegas, France) - Ramp is US-only</span>
            </li>
            <li>
              <span className="problem-bullet">👥</span>
              <span>You have <strong>mixed expenses</strong> (personal for family, pro for business) - Ramp can't distinguish</span>
            </li>
            <li>
              <span className="problem-bullet">🌍</span>
              <span>You're <strong>based in France</strong> with US activities - Ramp cards are US-only</span>
            </li>
            <li>
              <span className="problem-bullet">🔒</span>
              <span>You want <strong>data ownership</strong> - with SaaS, your data lives on their servers</span>
            </li>
          </ul>
        </div>

        <ComparisonTable />
      </div>

      {/* ROI Section */}
      <div className="roi-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="text-gradient">ROI</span> That Speaks
          </h2>
          <p className="section-subtitle">Real impact on your daily operations</p>
        </div>
        <MetricsGrid />
      </div>

      {/* Pricing Section */}
      <div className="pricing-section">
        <div className="section-header">
          <h2 className="section-title">
            Investment & <span className="text-gradient">Pricing</span>
          </h2>
          <p className="section-subtitle">Transparent pricing for custom solutions</p>
        </div>

        <div className="pricing-grid">
          <motion.div 
            className="pricing-card glass"
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="pricing-header">
              <h3 className="pricing-name">Setup</h3>
              <div className="pricing-amount">
                <span className="currency">$</span>
                <span className="price">1,500</span>
                <span className="period">one-time</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Gmail MCP Integration</li>
              <li>✓ Custom PDF Templates (5 vendors)</li>
              <li>✓ Real-time Dashboard</li>
              <li>✓ Initial AI Training</li>
              <li>✓ Google Drive Setup</li>
            </ul>
          </motion.div>

          <motion.div 
            className="pricing-card glass featured"
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="pricing-badge">Most Popular</div>
            <div className="pricing-header">
              <h3 className="pricing-name">Monthly</h3>
              <div className="pricing-amount">
                <span className="currency">$</span>
                <span className="price">150</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Unlimited Processing</li>
              <li>✓ AI Classification Credits</li>
              <li>✓ Cloud Hosting</li>
              <li>✓ Priority Support</li>
              <li>✓ Monthly Reports</li>
              <li>✓ n8n Workflow Updates</li>
            </ul>
          </motion.div>

          <motion.div 
            className="pricing-card glass"
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="pricing-header">
              <h3 className="pricing-name">Enterprise</h3>
              <div className="pricing-amount">
                <span className="price">Custom</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Multi-Entity Support</li>
              <li>✓ Custom API Integrations</li>
              <li>✓ Team Training</li>
              <li>✓ Dedicated Account Manager</li>
              <li>✓ SLA Guarantees</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <motion.div 
          className="cta-container glass"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="cta-title">
            Ready to Automate Your <span className="text-gradient">Expenses</span>?
          </h2>
          <p className="cta-subtitle">
            Let's build your custom ExpenseBot AI in just 2 weeks.
          </p>
          <div className="cta-buttons">
            <motion.a 
              href="#contact" 
              className="cta-btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Demo
            </motion.a>
            <motion.a 
              href="#contact" 
              className="cta-btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </div>
          <div className="cta-guarantee">
            <span>✨</span> 100% Data Ownership • Custom to Your Workflow • Built in 2 Weeks
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default UseCaseExpense


import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'message') {
      setCharCount(value.length)
    }

    // Clear errors on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setIsSuccess(false)
      setCharCount(0)
    }, 3000)
  }

  const isFormValid = formData.name.length >= 2 && validateEmail(formData.email) && formData.message.length >= 10

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="contact-title">
            Let's <span className="text-gradient">Create Together</span>
          </h2>
          <p className="contact-subtitle">
            Ready to bring your vision to life? Get in touch.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                    rows={5}
                    maxLength={500}
                  />
                  <div className="char-count">
                    {charCount}/500
                    {charCount > 450 && <span className="warning"> (keep it concise)</span>}
                  </div>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className={`submit-button ${!isFormValid ? 'disabled' : ''}`}
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading-spinner">Sending...</span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                className="success-message"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>We'll get back to you soon.</p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="contact-illustration"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="illustration-placeholder">
              <div className="floating-shape shape-1"></div>
              <div className="floating-shape shape-2"></div>
              <div className="floating-shape shape-3"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

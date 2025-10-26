import { motion } from 'framer-motion'
import './DarkModeToggle.css'

interface DarkModeToggleProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeToggle = ({ darkMode, toggleDarkMode }: DarkModeToggleProps) => {
  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? (
          // Moon icon
          <motion.path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          // Sun icon
          <>
            <motion.circle
              cx="12"
              cy="12"
              r="5"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
            </motion.g>
          </>
        )}
      </motion.svg>
    </button>
  )
}

export default DarkModeToggle

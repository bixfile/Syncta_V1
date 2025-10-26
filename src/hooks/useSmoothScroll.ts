import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useSmoothScroll = () => {
  useEffect(() => {
    // Custom easing function
    const customEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: customEasing,
      smoothWheel: true,
      touchMultiplier: 2,
    })

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Cleanup
    return () => {
      lenis.destroy()
      gsap.ticker.remove(() => {})
    }
  }, [])
}

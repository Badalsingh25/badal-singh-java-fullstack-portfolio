import React, { useEffect, useMemo, useRef, useState } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
import {
  SiSpring, SiNodedotjs, SiExpress, SiMysql, SiMongodb, SiDocker,
  SiJsonwebtokens, SiGooglecloud
} from 'react-icons/si'
import { TbShieldLock, TbApi, TbBrandReact } from 'react-icons/tb'

function Splash() {
  const [show, setShow] = useState<boolean>(() => !sessionStorage.getItem('seenSplash'))

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => dismiss(), 1250)
    return () => clearTimeout(t)
  }, [show])

  const dismiss = () => {
    sessionStorage.setItem('seenSplash', '1')
    setShow(false)
  }

  if (!show) return null
  const particles = Array.from({ length: 18 }).map((_, i) => (
    <div
      key={i}
      className="particle"
      style={{ left: `${(i * 5.3) % 100}vw`, top: `${(i * 7.1) % 100}vh`, // initial
        // custom CSS vars for drift path/duration
        ['--x' as any]: `${(i % 2 === 0 ? -1 : 1) * (5 + (i % 7))}vw`,
        ['--dur' as any]: `${5 + (i % 6)}s` }}
    />
  ))
  return (
    <motion.div
      className="splash-overlay splash-grain"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={dismiss}
    >
      <div className="splash-grid" />
      {particles}
      <div className="relative text-center px-6">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <svg viewBox="0 0 100 110" className="mx-auto mb-5 splash-hex" aria-hidden="true">
            <polygon className="core" points="50,5 93,28 93,82 50,105 7,82 7,28" />
            <polygon className="line" points="50,5 93,28 93,82 50,105 7,82 7,28 50,5" />
            <polyline className="line" points="20,55 50,35 80,55 50,75 20,55" />
          </svg>
          <div className="splash-title" data-text="Sandeep.dev">Sandeep<span className="text-teal-500">.dev</span></div>
          <div className="splash-sub">Bloddy Developer</div>
        </motion.div>
        <div className="splash-scan" />
        
      </div>
    </motion.div>
  )
}

function LandingHero() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -220])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Only intercept on the hero
      const hero = document.getElementById('landing-hero')
      if (!hero) return
      const atHero = window.scrollY < hero.clientHeight - 10
      if (atHero && e.deltaY > 10) {
        e.preventDefault()
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <section id="landing-hero" className="landing-wrap relative overflow-hidden">
      <div ref={heroRef} className="landing-inner container-pro">
        <div className="landing-topbar">
          <div className="landing-logo">SB</div>
        
          <a href="#contact" className="landing-cta">Let’s Start</a>
        </div>

        <div className="landing-content">
          <motion.div style={{ y: titleY }} className="landing-text">
            <p className="landing-role">Developer</p>
            <h1 className="landing-title"><span>SANDEEP</span><span>BEHERA</span></h1>
            <div className="landing-bottom">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-600/80 via-blue-600/80 to-purple-600/80 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:duration-300"></div>
                <div className="relative bg-gradient-to-r from-neutral-900/90 to-neutral-950/90 backdrop-blur-sm rounded-lg border border-neutral-700/50 px-6 py-3">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-semibold text-lg tracking-wide">
                        EMPOWERING COMPANIES
                      </span>
                      <span className="text-teal-400 font-medium text-sm tracking-wider">
                        WITH SCALABLE SOLUTIONS
                      </span>
                    </div>

                    {/* Logo Container Below Text */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="p-2 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <a
                  href="https://github.com/sandeepbehera21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:scale-110"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/sandeep2333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/sandeepb_21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:scale-110"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.336-1.297C4.225 14.794 3.735 13.643 3.735 12.346s.49-2.448 1.297-3.336c.888-.807 2.039-1.297 3.336-1.297s2.448.49 3.336 1.297c.807.888 1.297 2.039 1.297 3.336s-.49 2.448-1.297 3.336c-.888.807-2.039 1.297-3.336 1.297z"/>
                  </svg>
                </a>

                <a
                  href="https://x.com/Sandeepkumar99B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:scale-110"
                  aria-label="X (Twitter) Profile"
                >
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div style={{ y: portraitY }} className="landing-portrait">
            <div className="landing-photo">
              <img src="/portrait/Screenshot%202025-10-08%20122351.png" alt="Sandeep portrait" className="landing-img" />
            </div>
          </motion.div>
        </div>

        {/* Side labels to match the reference composition */}
    <div className="landing-side-left">Web developer</div>
        <div className="landing-side-right">Developer with bold vision</div>

        <button className="landing-scroll" onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll">
          ↓
        </button>
      </div>
      <div className="landing-bg" />
    </section>
  )
}

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
      <nav className="container-pro flex items-center justify-between py-3">
        <a href="#home" className="font-display text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">Sandeep<span className="text-teal-600 dark:text-teal-400">.dev</span></a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-sm text-neutral-600 dark:text-neutral-300">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-neutral-900 dark:hover:text-white transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#contact" className="hidden md:inline-flex text-sm px-4 py-2 rounded-md bg-teal-600 text-white border border-teal-700 hover:bg-teal-500">Let’s talk</a>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white/95 dark:bg-neutral-950/95 backdrop-blur border-b border-neutral-200 dark:border-neutral-800"
        >
          <div className="container-pro py-4 space-y-3">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex text-sm px-4 py-2 rounded-md bg-teal-600 text-white border border-teal-700 hover:bg-teal-500 mt-3"
            >
              Let’s talk
            </a>
          </div>
        </motion.div>
      )}
    </header>
  )
}

function Section({ id, title, children, subtitle }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="container-pro py-16 sm:py-20">
      <header className="mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">{subtitle}</p>}
      </header>
      {children}
    </section>
  )
}

function ContactForm() {

  return (
    <div className="p-6 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-sm rounded-xl border border-neutral-700/50">
      <div className="mb-6">
        <h3 className="text-xl font-display text-white mb-2">Send Message</h3>
        <p className="text-sm text-neutral-400">Let's discuss your next project</p>
      </div>

      <form name="contact" data-netlify="true" className="space-y-5">
        {/* Hidden field for Netlify Forms */}
        <input type="hidden" name="form-name" value="contact" />

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full pl-10 pr-3 py-3 bg-neutral-800/50 border border-neutral-600/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-200"
            placeholder="Your name"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full pl-10 pr-3 py-3 bg-neutral-800/50 border border-neutral-600/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-200"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="w-full pl-10 pr-3 py-3 bg-neutral-800/50 border border-neutral-600/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-200"
            placeholder="Subject"
          />
        </div>

        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <svg className="h-5 w-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full pl-10 pr-3 pt-10 pb-3 bg-neutral-800/50 border border-neutral-600/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-200 resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Send Message
        </button>
      </form>
    </div>
  )
}

export default function App() {
  const fadeIn = useMemo(() => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.5 }
  }), [])
  return (
    <div className="bg-white text-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 min-h-screen">
      <Splash />
      <LandingHero />
      <Nav />

      {/* Hero */}
      <section id="home" className="container-pro pt-16 sm:pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div {...fadeIn} className="lg:col-span-7 text-center lg:text-left">
            <p className="text-sm uppercase tracking-widest text-teal-600/80 dark:text-teal-300/80 mb-2">Backend Developer Portfolio</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight mt-3">
              Sandeep Behera
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-300">
              Backend Developer | Java Spring Boot & MERN Stack | Building Scalable APIs & Secure Systems
            </p>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto lg:mx-0">
              Designing backend architectures that scale, perform, and stay reliable — from microservices to full-stack solutions.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href="#projects" className="btn-primary">View Projects</a>
              <button onClick={() => window.open('/Sandeepwebresume44.pdf', '_blank')} className="btn-ghost">Resume</button>
            </div>
          </motion.div>
          <motion.div {...fadeIn} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 p-4 sm:p-6">
              <div className="text-sm text-neutral-700 dark:text-neutral-400">“I don’t just build APIs — I build systems that think, scale, and deliver.”</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="Who I Am">
        <div className="prose dark:prose-invert max-w-none">
          <p>
          I’m a Backend Developer who loves turning ideas into scalable, production-ready systems using Java–Spring Boot and the MERN stack. Currently in my 3rd year of B.Tech in Computer Science at Centurion University, Bhubaneswar, I enjoy designing robust APIs, optimized databases, and secure authentication flows that power real-world applications.
          </p>
          <p>
          From REST API design and microservices architecture to cloud deployment on Google Cloud, I’m driven by the challenge of building systems that are both technically strong and impactful in the real world.
          </p>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills & Tech Stack" subtitle="Organized for clarity across backend, security, DevOps, and frontend integration.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: 'Core Backend', items: [
              { name: 'Spring Boot', icon: <SiSpring className="text-[#6DB33F]" /> },
              { name: 'Node.js', icon: <SiNodedotjs className="text-[#3C873A]" /> },
              { name: 'Express.js', icon: <SiExpress /> },
              { name: 'REST API', icon: <TbApi /> },
            ]},
            { title: 'Database & ORM', items: [
              { name: 'MySQL', icon: <SiMysql className="text-[#00618A]" /> },
              { name: 'MongoDB', icon: <SiMongodb className="text-[#4DB33D]" /> },
              
            ]},
            { title: 'Security & Auth', items: [
              { name: 'Spring Security', icon: <TbShieldLock /> },
              { name: 'JWT', icon: <SiJsonwebtokens /> },
              { name: 'OAuth2', icon: <TbShieldLock /> },
            ]},
            { title: 'DevOps & Cloud', items: [
              { name: 'Docker', icon: <SiDocker className="text-[#2496ED]" /> },
              { name: 'Google Cloud', icon: <SiGooglecloud className="text-[#FF9900]" /> },
              
            ]},
            { title: 'Frontend Integration', items: [
              { name: 'React', icon: <TbBrandReact className="text-sky-400" /> },
              { name: 'HTML ,CSS,JS', icon: <TbBrandReact className="text-orange-400" /> },
              
            ]},
            { title: 'Docs & Tooling', items: [
              
              { name: 'Postman', icon: <TbApi /> },
            ]},
          ].map(cat => (
            <motion.div {...fadeIn} key={cat.title} className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-4 sm:p-5 card-hover">
              <h3 className="font-display text-base sm:text-lg text-neutral-900 dark:text-white mb-2">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map(i => (
                  <motion.span whileHover={{ y: -2 }} key={i.name} className="inline-flex items-center gap-1.5 sm:gap-2 text-xs px-2 sm:px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700">
                    <span className="text-sm sm:text-base">{i.icon}</span>
                    <span className="truncate">{i.name}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" subtitle="Selected backend projects with enterprise-grade patterns and deployment.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {[
            {
              name: 'Handmade Marketplace MERN',
              desc: 'A full-stack niche e-commerce platform that empowers local artisans to showcase and sell their handmade products.',
              stack: 'React.js, Express.js, Mongodb, JWT, Razorpay API, Node.js',
              links: [{ label: 'GitHub Repo', href: 'https://github.com/sandeepbehera21/handmade-marketplace_mern' }],
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 8l4-4m0 0l4 4m-4-4v12" />
                </svg>
              ),
            },
            {
              name: 'Digital Library Backend',
              desc: 'RESTful backend  managing digital libraries with JWT security, pagination, caching, audit logs, Swagger docs. and role-based access control.',
              stack: 'Spring Boot, MySQL, Redis, JWT, java , REST API',
              links: [{ label: 'GitHub Repo', href: 'https://github.com/sandeepbehera21/Digital-Library---backend' }],
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
            },
            {
              name: 'Craft Connect MERN',
              desc: 'CraftConnect connects traditional artisans with global customers using AI-powered storytelling and cloud-native tools, AI Story Generator,Global Marketplace,Social Sharing ',
              stack: 'Node.js, Express, MongoDB, JWT, Google cloud , GeminiAPI , React.js',
              links: [{ label: 'GitHub Repo', href: 'https://github.com/sandeepbehera21/CraftConnect' }, { label: 'Live Link', href: 'https://craftconnect-hackathon-2025.uc.r.appspot.com/' }],
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l6-3m0 0l6 3" />
                </svg>
              ),
            },
            {
              name: 'AI For Social Impact',
              desc: 'An intelligent, multi-agent AI system that transforms the way businesses handle customer queries. This chatbot automates conversation summarization, action extraction, resolution recommendations',
              stack: 'HTML, CSS, JavaScript, Python, Gemini API, Postman',
              links: [{ label: 'GitHub Repo', href: 'https://github.com/sandeepbehera21/AI_for_social_impact' }],
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              ),
            },
          ].map(p => (
            <div key={p.name} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative p-4 sm:p-6 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm rounded-xl border border-neutral-700/50 hover:border-neutral-600/50 transition-all duration-300">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="p-2 sm:p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50 group-hover:border-teal-500/30 transition-colors duration-300 flex-shrink-0">
                    {p.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg sm:text-xl text-white mb-2 group-hover:text-teal-300 transition-colors duration-300 break-words">{p.name}</h3>
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                      {p.stack.split(', ').map(tech => (
                        <span key={tech} className="px-2 py-0.5 sm:px-2 sm:py-1 text-xs bg-neutral-800/50 text-neutral-400 rounded-md border border-neutral-700/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {p.links.map(l => (
                        <a
                          key={l.label}
                          href={l.href}
                          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-teal-400 hover:text-teal-300 border border-teal-500/30 hover:border-teal-400/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-teal-500/5 hover:bg-teal-500/10 transition-all duration-200 text-center"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="truncate">{l.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" subtitle="Professional journey and key achievements.">
        <div className="space-y-6">
          {[
            {
              title: 'Web developer Intern',
              company: 'INFOTACT Solutions',
              period: 'April 2025 – June 2025',
              location: 'Remote',
              description: [
                'Developed MERN websites ',
                'Implemented JWT auth tokens',
                'Gained hands-on experience in React, Node.js, Express, and MongoDB while collaborating on real-world client projects.',
                'Partnered with frontend to integrate React apps with backend services',
              ],
              tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'OAuth'],
              wins: ['Achieved 40% faster API responses by optimizing queries and indexing', 'production-grade logging and metrics for real-time performance monitoring and debugging'],
            },
            {
              title: 'AI & CLOUD Programme',
              company: 'Edunet Foundation',
              period: 'Sept 2025 – Present',
              location: 'Remote',
              description: [
                'Delivered AI apps end‑to‑end with Cloud',
                'Designed database schemas for e‑commerce flows',
                
              ],
              tech: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
              
            },
          ].map((exp, i) => (
            <motion.div {...fadeIn} key={i} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-700 group-hover:duration-200"></div>
              <div className="relative p-4 sm:p-6 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm rounded-xl border border-neutral-700/50 hover:border-neutral-600/50">
                <div className="flex flex-col gap-4 sm:gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center mx-auto sm:mx-0">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                      <div className="flex-1">
                        <h3 className="font-display text-lg sm:text-xl text-white group-hover:text-teal-300 transition-colors mb-1">{exp.title}</h3>
                        <p className="text-teal-400 text-sm font-medium">{exp.company}</p>
                      </div>
                      <div className="text-center sm:text-right mt-2 sm:mt-0">
                        <p className="text-sm text-neutral-400">{exp.period}</p>
                        <div className="mt-1">
                          <p className="text-xs text-neutral-500">{exp.location}</p>
                          {exp.title === 'Web developer Intern' && (
                            <div className="mt-2 flex justify-center sm:justify-start">
                              <button
                                onClick={() => window.open('/sandeep-infotact.pdf', '_blank')}
                                className="inline-flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 border border-teal-500/30 hover:border-teal-400/50 px-4 py-2 rounded-lg bg-teal-500/5 hover:bg-teal-500/10 transition-all duration-200 hover:scale-105"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                View Certificate
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-neutral-300 text-sm mb-4 text-left">
                      {exp.description.map((d: string, j: number) => (
                        <li key={j} className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                          </svg>
                          <span className="text-xs sm:text-sm">{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-white/90 mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {exp.tech.map((t: string) => (
                          <span key={t} className="px-2.5 py-1 text-[11px] rounded-full bg-neutral-800/60 border border-neutral-700/60 text-teal-300">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white/90 mb-2">Achievements</h4>
                      <div className="space-y-1">
                        {exp.wins?.map((w: string, k: number) => (
                          <div key={k} className="flex items-center gap-2 text-sm text-neutral-300">
                            <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-xs sm:text-sm">{w}</span>
                          </div>
                        )) || (
                          <div className="flex items-center gap-2 text-sm text-neutral-400 italic">
                            <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-xs sm:text-sm">Ongoing projects and achievements in progress</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* System Design */}
      <Section id="system-design" title="How I Design Systems" subtitle="Maintainability, scalability, and security with clean, modular architecture and efficient data flow.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-800 p-5 bg-neutral-900/40">
            <h4 className="font-display text-white mb-2">For MERN</h4>
            <p className="text-sm text-neutral-300">End-to-end web apps with React, Node.js, Express, and MongoDB — using REST APIs, JWT auth, and Redis caching for performance and stateless sessions.</p>
          </div>
          <div className="rounded-xl border border-neutral-800 p-5 bg-neutral-900/40">
            <h4 className="font-display text-white mb-2">For Java</h4>
            <p className="text-sm text-neutral-300">Enterprise-grade backends with layered architecture (Controller → Service → Repository), secure JWT authentication, pagination, and database optimization.</p>
          </div>
        </div>
      </Section>


      {/* Contact */}
      <Section id="contact" title="Contact" subtitle="Have an opportunity, collaboration idea, or backend challenge? Let’s connect.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 sm:p-5 lg:p-6">
            <ul className="space-y-3 sm:space-y-4 text-neutral-300">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <span className="text-neutral-400 text-sm block">Email:</span>
                  <a className="underline/30 hover:text-white transition-colors break-all" href="mailto:beherasandeepkumar21@gmail.com">beherasandeepkumar21@gmail.com</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8-8m0 0L4 4m4-4v8m0 0l4-4m-4 4H8m8 0v8m0 0l-4-4m4 4h4m-4 4v4m0-4h-4m4 0v-4" />
                </svg>
                <div className="min-w-0 flex-1">
                  <span className="text-neutral-400 text-sm block">LinkedIn:</span>
                  <a className="underline/30 hover:text-white transition-colors break-all" href="https://www.linkedin.com/in/sandeep2333" target="_blank" rel="noopener noreferrer">linkedin.com/in/sandeep2333</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <span className="text-neutral-400 text-sm block">GitHub:</span>
                  <a className="underline/30 hover:text-white transition-colors break-all" href="https://github.com/sandeepbehera21" target="_blank" rel="noopener noreferrer">github.com/sandeepbehera21</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <div className="min-w-0 flex-1">
                  <span className="text-neutral-400 text-sm block">X (Twitter):</span>
                  <a className="underline/30 hover:text-white transition-colors break-all" href="https://x.com/Sandeepkumar99B" target="_blank" rel="noopener noreferrer">x.com/Sandeepkumar99B</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <span className="text-neutral-400 text-sm block">Phone:</span>
                  <a className="underline/30 hover:text-white transition-colors" href="tel:+919337333525">+91 93373 33525</a>
                </div>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 sm:p-5 lg:p-6">
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 mt-10">
        <div className="container-pro py-6 text-sm text-neutral-400">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
            <p>Made with ❤️ by Sandeep Behera</p>
            <p className="max-w-md sm:max-w-none">"Clean architecture, consistent logic, and secure APIs — that's my way of writing backend."</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

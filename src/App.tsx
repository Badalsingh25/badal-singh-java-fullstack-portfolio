import React, { useEffect, useMemo, useRef, useState } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
import {
  SiSpring, SiMysql,
  SiJsonwebtokens, SiPostman, SiGit, SiGithub, SiLinkedin, SiInstagram
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { TbShieldLock, TbApi, TbBrandReact, TbBrandJavascript, TbBrandHtml5, TbBrandCss3 } from 'react-icons/tb'
import emailjs from '@emailjs/browser'

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
      style={{
        left: `${(i * 5.3) % 100}vw`, top: `${(i * 7.1) % 100}vh`, // initial
        // custom CSS vars for drift path/duration
        ['--x' as any]: `${(i % 2 === 0 ? -1 : 1) * (5 + (i % 7))}vw`,
        ['--dur' as any]: `${5 + (i % 6)}s`
      }}
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
          <div className="splash-title" data-text="Badal.dev">Badal<span className="text-teal-500">.dev</span></div>
          <div className="splash-sub">Java Fullstack Developer</div>
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
    <section id="landing-hero" className="relative w-full h-[100svh] bg-[#050505] overflow-hidden">
      {/* Halftone / Dotted Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at center, #333 1.5px, transparent 1.5px)',
        backgroundSize: '8px 8px',
        opacity: 0.3
      }}></div>

      <div ref={heroRef} className="container-pro relative z-10 h-full flex flex-col justify-between py-6 md:py-10">

        {/* Topbar */}
        <div className="flex justify-between items-center w-full z-30 pt-2 lg:pt-6">
          <div className="font-bold text-xl md:text-2xl text-white tracking-widest pl-2 font-display">BS</div>
          <a href="#about" className="border border-[#ff6b57] text-[#ff6b57] rounded-full px-6 py-2 md:px-8 md:py-2.5 text-[10px] md:text-[11px] font-bold tracking-[0.25em] hover:bg-[#ff6b57] hover:text-black transition-all">LET'S START</a>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center relative w-full z-20 pb-20 md:pb-0">
          <motion.div style={{ y: titleY }} className="w-full md:w-[65%] lg:w-[60%] flex flex-col z-20 pl-4 sm:pl-10 lg:pl-16 mt-8 md:mt-0">
            <p className="text-[#888] tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[11px] font-semibold mb-3 md:mb-5 uppercase ml-2 md:ml-12">
              Java Fullstack Developer
            </p>

            <h1 className="text-[#ff6b57] flex flex-col leading-[0.85] text-center sm:text-left" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <span className="text-[70px] sm:text-[130px] md:text-[170px] lg:text-[200px] xl:text-[220px] ml-0 sm:ml-20 md:ml-24 lg:ml-28 xl:ml-32 drop-shadow-lg tracking-tight sm:tracking-normal">BADAL</span>
              <span className="text-[70px] sm:text-[130px] md:text-[170px] lg:text-[200px] xl:text-[220px] -mt-2 sm:-mt-4 md:-mt-6 ml-0 sm:ml-[-20px] md:ml-[-40px] drop-shadow-lg tracking-tight sm:tracking-normal">SINGH</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6 md:mt-10 ml-2 md:ml-12">
              <div className="bg-[#0a0a0a] border border-[#222]/80 rounded-2xl p-4 md:p-5 flex gap-5 md:gap-7 shadow-2xl backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex gap-5 md:gap-8 relative z-10 items-center">
                  <div className="flex flex-col text-gray-300 font-bold tracking-widest text-[9px] md:text-[11px] leading-relaxed">
                    <span>EMPOWERING</span>
                    <span>COMPANIES</span>
                  </div>
                  <div className="flex flex-col text-[#00E5FF] font-semibold tracking-widest text-[9px] md:text-[11px] leading-relaxed">
                    <span>WITH</span>
                    <span>SCALABLE</span>
                    <span>SOLUTIONS</span>
                  </div>
                </div>
                <div className="bg-[#00E5FF] w-8 h-8 md:w-9 md:h-9 rounded-md shrink-0 flex items-center justify-center relative z-10 self-center hover:scale-110 transition-transform cursor-pointer" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2.05v8.95h7.52l-9.52 10.95v-8.95H3.48l9.52-10.95z" /></svg>
                </div>
              </div>

              <div className="flex gap-3">
                <a href="https://github.com/Badalsingh25" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[#777] hover:text-white hover:border-[#666] transition-all hover:scale-110">
                  <SiGithub className="text-lg" />
                </a>
                <a href="https://www.linkedin.com/in/badal-singh-767911333" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[#777] hover:text-white hover:border-[#666] transition-all hover:scale-110">
                  <SiLinkedin className="text-lg" />
                </a>
                <a href="https://www.instagram.com/b2_badal_002/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[#777] hover:text-white hover:border-[#666] transition-all hover:scale-110">
                  <SiInstagram className="text-lg" />
                </a>
                <a href="https://x.com/b2_badal_002" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[#777] hover:text-white hover:border-[#666] transition-all hover:scale-110">
                  <svg className="w-4 h-4 md:w-[18px] md:h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Portrait Image */}
          <motion.div style={{ y: portraitY }} className="absolute bottom-0 right-[-5%] sm:right-0 w-[85%] sm:w-[60%] md:w-[55%] lg:w-[48%] h-[60%] sm:h-[75%] md:h-[85%] lg:h-[95%] z-10 flex items-end justify-center pointer-events-none origin-bottom">
            <div className="relative w-full h-full flex justify-end">
              <img src="/portrait/Badal_portfolio_image2.png" alt="Badal Singh portrait" className="w-auto h-full object-contain object-bottom" style={{ filter: 'brightness(1.1) contrast(1.15)', mixBlendMode: 'lighten' }} />
              {/* Left fade to blend portrait into background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" style={{ width: '30%' }}></div>
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-[#050505] to-transparent"></div>
            </div>
          </motion.div>

        </div>

        {/* Vertical Text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block z-40">
          <p className="text-neutral-600/60 tracking-[0.6em] text-[9px] uppercase font-bold whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            Developer with bold vision
          </p>
        </div>

        {/* Scroll Button */}
        <button
          className="absolute left-4 md:left-8 bottom-4 md:bottom-8 w-11 h-11 rounded-full border border-[#333] text-[#777] bg-[#0a0a0a] flex items-center justify-center hover:text-white hover:border-[#666] hover:bg-[#111] transition-all z-30"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll down"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  )
}

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const links = [
    { href: '#landing-hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
      <nav className="container-pro flex items-center justify-between py-3">
        <a href="#landing-hero" className="font-display text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">Badal<span className="text-teal-600 dark:text-teal-400">.dev</span></a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10 text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-500 dark:text-neutral-400">
          {links.map(l => (
            <li key={l.href} className="relative group">
              <a href={l.href} className="hover:text-teal-500 transition-colors duration-300 peer">{l.label}</a>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
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
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // EmailJS Configuration — Using environment variables for security
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (serviceID === templateID) {
        console.warn("EmailJS Config Warning: serviceID and templateID are usually different.");
      }

      // Use sendForm with the form ref for maximum reliability
      if (formRef.current) {
        const result = await emailjs.sendForm(
          serviceID,
          templateID,
          formRef.current,
          publicKey
        )

        if (result.status === 200) {
          setSubmitStatus('success')
          setFormData({
            from_name: '',
            from_email: '',
            subject: '',
            message: ''
          })
        } else {
          throw new Error('Failed to send email')
        }
      }
    } catch (error: any) {
      console.error('Email submission error:', error?.text || error?.message || error)
      setSubmitStatus('error')
      // Provide a helpful error message
      const errMsg = error?.text || error?.message || ''
      if (errMsg.includes('service_id') || errMsg.includes('The service ID is invalid') || errMsg.includes('The service ID not found')) {
        setErrorMessage('EmailJS Error: Your Service ID is invalid or not found. Please log in to EmailJS, go to "Email Services", and copy your correct Service ID (usually starts with "service_").')
      } else if (errMsg.includes('template_id') || errMsg.includes('The template ID is invalid')) {
        setErrorMessage('EmailJS Error: Your Template ID is invalid. Copy it from "Email Templates" in your EmailJS dashboard.')
      } else if (errMsg.includes('publicKey') || errMsg.includes('public key')) {
        setErrorMessage('EmailJS Error: Your Public Key is invalid. Copy it from "Account" > "Public Key" in EmailJS.')
      } else {
        setErrorMessage(errMsg || 'Something went wrong. Check your EmailJS Account keys.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-sm rounded-xl border border-neutral-700/50">
      <div className="mb-6">
        <h3 className="text-xl font-display text-white mb-2">Send Message</h3>
        <p className="text-sm text-neutral-400">Let's discuss your next project</p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {/* Hidden field for EmailJS to_email template variable */}
        <input type="hidden" name="to_email" value="badalkusingh8@gmail.com" />
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            type="text"
            id="name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
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
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
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
            value={formData.subject}
            onChange={handleChange}
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
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full pl-10 pr-3 pt-10 pb-3 bg-neutral-800/50 border border-neutral-600/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-200 resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Message
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-400 text-sm text-center flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Message sent successfully! I'll get back to you soon.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="space-y-3">
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-xs text-center">
                <strong>Error:</strong> {errorMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const mailtoUrl = `mailto:badalkusingh8@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formData.from_name}\nEmail: ${formData.from_email}\n\n${formData.message}`)}`;
                window.location.href = mailtoUrl;
              }}
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs py-2 px-4 rounded-lg border border-neutral-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send via Direct Email instead
            </button>
          </div>
        )}
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

      {/* Hero Redundant Removed */}


      {/* About */}
      <Section id="about" title="Who I Am">
        <div className="prose dark:prose-invert max-w-none">
          <p>
            I’m a passionate Java Full Stack Developer focused on building scalable, secure, and production-ready web applications using Java, Spring Boot, React, and MySQL. Currently pursuing my B.Tech in Computer Science, I enjoy transforming ideas into efficient digital solutions through clean architecture and modern development practices.
          </p>
          <p>
            My expertise includes backend development, REST API design, authentication systems, database optimization, and full-stack application development. I love solving real-world problems by creating systems that are fast, reliable, and user-focused.
          </p>
        </div>
      </Section>

      {/* Skills */}
      <section id="skills" className="relative py-16 sm:py-20 overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(13,17,23,1) 50%, rgba(10,10,10,1) 100%)' }}>
        <div className="absolute inset-y-0 left-0 w-[5%] sm:w-[15%] md:w-[25%] bg-gradient-to-r from-white/[0.12] to-transparent pointer-events-none z-0"></div>
        <div className="absolute inset-y-0 right-0 w-[5%] sm:w-[15%] md:w-[25%] bg-gradient-to-l from-white/[0.12] to-transparent pointer-events-none z-0"></div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(800px at 30% 20%, rgba(20,184,166,0.08), transparent 60%), radial-gradient(600px at 70% 80%, rgba(59,130,246,0.06), transparent 60%)' }} />
        <div className="container-pro relative z-10">
          <header className="mb-10 text-center">
            <motion.p {...fadeIn} className="text-teal-400 text-sm font-medium tracking-widest uppercase mb-2">What I Work With</motion.p>
            <motion.h2 {...fadeIn} className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Skills & Tech Stack</motion.h2>
            <motion.p {...fadeIn} className="text-neutral-400 max-w-xl mx-auto">Technologies I use to build scalable, secure, production-ready applications.</motion.p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                title: 'Frontend',
                gradient: 'from-orange-500/20 to-sky-500/20',
                iconBg: 'from-orange-500 to-pink-500',
                categoryIcon: (<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>),
                items: [
                  { name: 'HTML', icon: <TbBrandHtml5 className="text-orange-500" /> },
                  { name: 'CSS', icon: <TbBrandCss3 className="text-blue-500" /> },
                  { name: 'JavaScript', icon: <TbBrandJavascript className="text-yellow-400" /> },
                  { name: 'React.js', icon: <TbBrandReact className="text-sky-400" /> },
                ]
              },
              {
                title: 'Core Backend',
                gradient: 'from-amber-500/20 to-green-500/20',
                iconBg: 'from-amber-500 to-green-500',
                categoryIcon: (<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>),
                items: [
                  { name: 'Java', icon: <FaJava className="text-[#ED8B00]" /> },
                  { name: 'Spring Boot', icon: <SiSpring className="text-[#6DB33F]" /> },
                  { name: 'REST API', icon: <TbApi className="text-emerald-400" /> },
                  { name: 'Spring Security', icon: <TbShieldLock className="text-green-400" /> },
                ]
              },
              {
                title: 'Auth & Security',
                gradient: 'from-violet-500/20 to-rose-500/20',
                iconBg: 'from-violet-500 to-rose-500',
                categoryIcon: (<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>),
                items: [
                  { name: 'JWT', icon: <SiJsonwebtokens className="text-pink-400" /> },
                  { name: 'OAuth2', icon: <TbShieldLock className="text-violet-400" /> },
                ]
              },
              {
                title: 'Database',
                gradient: 'from-blue-500/20 to-cyan-500/20',
                iconBg: 'from-blue-500 to-cyan-500',
                categoryIcon: (<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>),
                items: [
                  { name: 'MySQL', icon: <SiMysql className="text-[#00618A]" /> },
                ]
              },
              {
                title: 'Tools & Workflow',
                gradient: 'from-red-500/20 to-orange-500/20',
                iconBg: 'from-red-500 to-orange-500',
                categoryIcon: (<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
                items: [
                  { name: 'Git', icon: <SiGit className="text-[#F05032]" /> },
                  { name: 'GitHub', icon: <SiGithub className="text-white" /> },
                  { name: 'Postman', icon: <SiPostman className="text-[#FF6C37]" /> },
                ]
              },
            ].map((cat, idx) => (
              <motion.div
                {...fadeIn}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={cat.title}
                className="skill-card group relative bg-gradient-to-br from-neutral-900/90 to-neutral-950/80 backdrop-blur-sm rounded-xl border border-neutral-800/60 p-5 sm:p-6"
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.iconBg} flex items-center justify-center shadow-lg skill-icon-float`}>
                      {cat.categoryIcon}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white group-hover:text-teal-300 transition-colors duration-300">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {cat.items.map(i => (
                      <motion.span
                        whileHover={{ y: -3, scale: 1.05 }}
                        key={i.name}
                        className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-neutral-800/60 text-neutral-200 border border-neutral-700/50 hover:border-teal-500/40 hover:bg-neutral-700/50 transition-all duration-300 cursor-default"
                      >
                        <span className="text-lg">{i.icon}</span>
                        <span className="font-medium">{i.name}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" title="Projects" subtitle="Selected backend projects with enterprise-grade patterns and deployment.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {[
            {
              name: 'HungerExpress-Food Delivery Management System',
              desc: 'A full-stack food delivery application that streamlines online food ordering, restaurant management, and order tracking with secure authentication and responsive user experience.',
              stack: 'React.js, Java, Spring Boot, MySQL, REST API, JWT, Spring Security, Razorpay API',
              links: [{ label: 'GitHub Repo', href: 'https://github.com/Badalsingh25/HungerExpress-Food-Delivery-Management-App' }],
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-2.21 0-4 .895-4 2s1.79 2 4 2 4-.895 4-2-1.79-2-4-2zM3 12c0-1.333 1.333-2.667 4-4M21 12c0-1.333-1.333-2.667-4-4M3 12v4c0 2.21 4.03 4 9 4s9-1.79 9-4v-4M3 12c0 2.21 4.03 4 9 4s9-1.79 9-4" />
                </svg>
              ),
            },
            {
              name: 'Hospital Management System',
              desc: 'Built a scalable hospital management system with secure authentication, patient and doctor management, appointment booking, and efficient healthcare data handling using Spring Boot and React.',
              stack: 'React.js, Java, Spring Boot, MySQL, REST API, JWT, Spring Security',
              links: [{ label: 'GitHub Repo', href: 'https://github.com/Badalsingh25/Hospital-Management-System' }],
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v4m-2-2h4" />
                </svg>
              ),
            },
            {
              name: 'Job Portal Platform',
              desc: 'A modern full-stack recruitment platform designed for seamless job posting, candidate applications, and role-based user management with secure JWT authentication and optimized backend architecture.',
              stack: 'React.js, Java, Spring Boot, MySQL, REST API, JWT, Spring Security',
              links: [{ label: 'GitHub Repo', href: 'https://github.com/Badalsingh25/job-portal-platform' }],
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              name: '10xCoders – Online Education Platform',
              desc: 'A full-stack online education platform designed for coding and learning, featuring course management, authentication, interactive learning modules, and responsive user experience.',
              stack: 'React.js, JavaScript, Node.js, Express.js, MongoDB, REST API, Gemini API, Postman, Judge0 API',
              links: [{ label: 'GitHub Repo', href: 'https://github.com/Badalsingh25/10xCoders-Platform' },
              { label: 'Live Link', href: 'https://10xcoders-platform.netlify.app/' }
              ],
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              ),
            },
            {
              name: 'PdfX – PDF Merge Web Application',
              desc: 'A lightweight and user-friendly web application that allows users to merge multiple PDF files into a single document instantly with secure file handling and responsive UI.',
              stack: 'HTML, CSS, Bootstrap, JavaScript, Node.js, Express.js, Multer',
              links: [{ label: 'GitHub Repo', href: 'https://github.com/Badalsingh25/pdf-merge-webapp' },
              { label: 'Live Link', href: 'https://pdf-merge-0lx9.onrender.com/' }
              ],
              icon: (
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
              period: 'May 2025 – August 2025',
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
              title: 'Codec Technologies Pvt.Ltd.',
              company: 'Edunet Foundation',
              period: 'May 2025 – June 2025',
              location: 'Remote',
              description: [
                'Built responsive web interfaces using HTML, CSS, JavaScript, and React.js.',
                'Developed reusable frontend components to enhance development efficiency and maintain scalable UI architecture.',

              ],
              tech: ['React.js', 'JavaScript', 'HTML', 'CSS', 'MongoDB'],
              wins: ['Improved UI responsiveness.',
                'Contributed to scalable frontend development workflows.'],

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
                                onClick={() => window.open('/Badal _Singh_Internship_certificate.pdf', '_blank')}
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

      {/* Contact */}
      <section id="contact" className="relative py-16 sm:py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1117 50%, #0a1628 100%)' }}>
        <div className="absolute inset-y-0 left-0 w-[5%] sm:w-[15%] md:w-[25%] bg-gradient-to-r from-white/[0.12] to-transparent pointer-events-none z-0"></div>
        <div className="absolute inset-y-0 right-0 w-[5%] sm:w-[15%] md:w-[25%] bg-gradient-to-l from-white/[0.12] to-transparent pointer-events-none z-0"></div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(600px at 20% 50%, rgba(13,148,136,0.15), transparent 70%), radial-gradient(600px at 80% 50%, rgba(59,130,246,0.1), transparent 70%)' }} />
        <div className="container-pro relative z-10">
          <header className="mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">Contact</h2>
            <p className="mt-2 text-sm text-neutral-400 max-w-2xl">Have an opportunity, collaboration idea, or backend challenge? Let's connect.</p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm p-5 sm:p-6 lg:p-7 shadow-lg shadow-teal-500/5">
              <h3 className="text-lg font-display text-white mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                </span>
                Get in Touch
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/40 border border-neutral-700/30 hover:border-teal-500/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-teal-400/80 text-xs font-medium uppercase tracking-wider block">Email</span>
                    <a className="text-white hover:text-teal-300 transition-colors break-all text-sm" href="mailto:badalkusingh8@gmail.com">badalkusingh8@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/40 border border-neutral-700/30 hover:border-teal-500/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-blue-400/80 text-xs font-medium uppercase tracking-wider block">LinkedIn</span>
                    <a className="text-white hover:text-blue-300 transition-colors break-all text-sm" href="https://www.linkedin.com/in/badal-singh-767911333" target="_blank" rel="noopener noreferrer">linkedin.com/in/badal-singh-767911333</a>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/40 border border-neutral-700/30 hover:border-teal-500/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-neutral-700/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-neutral-400 text-xs font-medium uppercase tracking-wider block">GitHub</span>
                    <a className="text-white hover:text-teal-300 transition-colors break-all text-sm" href="https://github.com/Badalsingh25" target="_blank" rel="noopener noreferrer">github.com/Badalsingh25</a>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/40 border border-neutral-700/30 hover:border-teal-500/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-neutral-700/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-neutral-400 text-xs font-medium uppercase tracking-wider block">X (Twitter)</span>
                    <a className="text-white hover:text-teal-300 transition-colors break-all text-sm" href="https://x.com/b2_badal_002" target="_blank" rel="noopener noreferrer">x.com/b2_badal_002</a>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/40 border border-neutral-700/30 hover:border-teal-500/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-green-400/80 text-xs font-medium uppercase tracking-wider block">Phone</span>
                    <a className="text-white hover:text-green-300 transition-colors" href="tel:+918260047829">+91 82600 47829</a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm p-1 shadow-lg shadow-teal-500/5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 mt-10">
        <div className="container-pro py-6 text-sm text-neutral-400">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
            <p>Made with ❤️ by Badal Singh</p>
            <p className="max-w-md sm:max-w-none">"Clean architecture, consistent logic, and secure APIs — that's my way of writing backend."</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

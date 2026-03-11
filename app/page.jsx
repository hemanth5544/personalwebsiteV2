"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

import { useTheme } from "next-themes"
import { Sun, Moon, Heart, Download, X } from "lucide-react"
import { useState, useEffect } from "react"
import Oneko from "@/components/pet"

import ClickSpark from "@/components/ClickSpark"
import TimeCounter from "@/components/TimeCounter"
import CodeHover from "@/components/CodeHover"
import LinkPreview from "@/components/LinkPreview"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import { RandomMatrix } from "@/components/ui/matrix"
import githubAvatar from "@/assets/githubhemu.jpeg"
import linkedinAvatar from "@/assets/linkhemu.png"
import GithubCalendarClient from "@/components/gg"
import {skillsData} from './data'
import OpenSourceContributionsCard from "@/components/ContributionCard"
import CheckMyGitPreview from "@/components/CheckMyGitPreview"
import CalendarModal from "@/components/CalendarModal"
import StatusBadge from "@/components/StatusBadge"
export default function Page() {
  const { theme, setTheme } = useTheme()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showResume, setShowResume] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark")
      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    }, 100)
  }

  const triggerRandomLetterEffect = () => {
    if (typeof document === 'undefined') return
    const letters = document.querySelectorAll('.letter');
    if (letters.length === 0) return;
    
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    

    const effects = [
      // Colors
      'color-red', 'color-blue', 'color-green', 'color-purple', 'color-orange',
      'color-pink', 'color-yellow', 'color-cyan', 'color-lime', 'color-indigo',
      'color-teal', 'color-rose', 'color-amber', 'color-emerald', 'color-violet',
      
      // Scales
      'scale-tiny', 'scale-small', 'scale-big', 'scale-huge', 'scale-crazy',
      
      // Rotations
      'rotate-left', 'rotate-right', 'rotate-crazy', 'rotate-flip', 'rotate-spin',
      
      // Basic animations
      'shake', 'bounce', 'wobble', 'flip', 'pulse-big', 'pulse-crazy',
      
      // Glow effects
      'glow', 'glow-intense', 'glow-rainbow', 'neon-glow',
      
      // Rainbow and gradients
      'rainbow', 'rainbow-fast', 'fire-gradient', 'ocean-gradient', 'sunset-gradient',
      
      // Crazy animations
      'matrix-rain', 'glitch', 'elastic', 'jello', 'rubber', 'swing',
      'tada', 'heartbeat', 'flash', 'zoom-in', 'zoom-out', 'roll-in',
      'roll-out', 'fade-in-down', 'fade-in-up', 'slide-in', 'typewriter',
      'lightning', 'earthquake', 'tornado', 'explode', 'implode',
      
      // 3D effects
      'flip-x', 'flip-y', 'flip-z', 'rotate-3d', 'cube-flip', 'card-flip',
      
      // Particle effects
      'sparkle', 'confetti', 'fireworks', 'snow', 'rain',
      
      // Distortion effects
      'stretch-x', 'stretch-y', 'skew-left', 'skew-right', 'wave', 'ripple'
    ];
    
    // Pick random effect
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    
    // Apply effect
    randomLetter.classList.add('letter-active', randomEffect);
    
    // Remove effect after 2-3 seconds
    const duration = 2000 + Math.random() * 1000;
    setTimeout(() => {
      randomLetter.classList.remove('letter-active', randomEffect);
    }, duration);
  };

  useEffect(() => {
    if (typeof document === 'undefined') return
    const handleGlobalClick = (e) => {
      const target = e.target;
      if (target && target.closest && target.closest('[data-no-letter]')) return;
      triggerRandomLetterEffect();
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const calcProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0
      setScrollProgress(pct)
    }
    calcProgress()
    window.addEventListener('scroll', calcProgress, { passive: true })
    window.addEventListener('resize', calcProgress)
    return () => {
      window.removeEventListener('scroll', calcProgress)
      window.removeEventListener('resize', calcProgress)
    }
  }, [])





  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={8}
      sparkRadius={15}
      sparkCount={6}
      duration={400}
      easing="ease-out"
      extraScale={1.0}
    >
      <div className={`min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white relative transition-colors duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isTransitioning ? 'transition-all' : ''
      }`}>
        {/* Interactive Ripple Grid Background */}
        <BackgroundRippleEffect rows={20} cols={40} cellSize={50} />
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6 flex justify-end items-center animate-fade-in relative z-50">
        <div className="flex items-center gap-2 sm:gap-3">
          <StatusBadge />
          <Button
            variant="ghost"
            size="icon"
            data-no-letter
            onClick={handleThemeToggle}
            disabled={isTransitioning}
            className={`relative rounded-full w-10 h-10 sm:w-12 sm:h-12 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
              isTransitioning ? 'opacity-70 cursor-wait' : ''
            }`}
            aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
          >
            {/* Sun Icon - shows in dark mode to switch to light */}
            <Sun 
              className={`absolute h-5 w-5 sm:h-6 sm:w-6 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                theme === "dark" 
                  ? 'rotate-0 scale-100 opacity-100' 
                  : 'rotate-[360deg] scale-0 opacity-0'
              }`}
              style={{
                filter: theme === "dark" ? 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))' : 'none',
                transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1), filter 700ms ease-in-out'
              }}
            />
            {/* Moon Icon - shows in light mode to switch to dark */}
            <Moon 
              className={`absolute h-5 w-5 sm:h-6 sm:w-6 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                theme === "dark" 
                  ? 'rotate-[-360deg] scale-0 opacity-0' 
                  : 'rotate-0 scale-100 opacity-100'
              }`}
              style={{
                filter: theme === "dark" ? 'none' : 'drop-shadow(0 0 4px rgba(147, 197, 253, 0.5))',
                transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1), filter 700ms ease-in-out'
              }}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 max-w-7xl relative z-50" role="main">
        {/* Hero Section */}
        <section className="space-y-4 sm:space-y-6 animate-fade-in-up flex flex-col items-center" aria-labelledby="hero-heading" itemScope itemType="https://schema.org/Person">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-8 w-full max-w-5xl">
            <div className="flex-1 space-y-4 sm:space-y-6 w-full">
              <ClickSpark
                sparkColor="#ffffff"
                sparkSize={12}
                sparkRadius={20}
                sparkCount={8}
                duration={600}
                easing="ease-out"
                extraScale={1.2}
              >
                <h1
                  id="hero-heading"
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight cursor-pointer relative text-zinc-900 dark:text-white"
                >
                  Hi, I&apos;m{" "}
                  <span className="interactive-name" itemProp="name">
                    <span className="letter letter-a" data-letter="A">He</span>
                    <span className="letter letter-d1" data-letter="d">m</span>
                    <span className="letter letter-i" data-letter="i">a</span>
                    <span className="letter letter-t" data-letter="t">n</span>
                    <span className="letter letter-y" data-letter="y">t</span>
                    <span className="letter letter-a2" data-letter="a">h</span> 
                  </span>.
                </h1>
              </ClickSpark>
              
              <div className="space-y-4 sm:space-y-6 max-w-3xl">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 -mt-2">
                  been here for <TimeCounter startDate={new Date("2003-06-04")} /> years
                </p>
          
                <div className="space-y-2 sm:space-y-3">
                  <h2 className="text-base sm:text-lg md:text-xl font-medium text-zinc-900 dark:text-white">about;</h2>
                  
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Passionte about backend systems and cloud computing
                  </p>
                  
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    
                     <span itemProp="jobTitle">Software Enginner</span> at{" "}
                    <span className="text-zinc-900 dark:text-white font-medium" itemProp="worksFor">Datopic</span>
                  </p>
                  
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    I live in Chandigarh. You can keep up with me on{" "}
                    <LinkPreview
                      title="LinkedIn • Hemanth Rachapalli"
                      subtitle="SDE 1 • Datopic"
                      href="https://in.linkedin.com/in/hemanthrachapalli"
                      avatar={linkedinAvatar}
                      position="bottom"
                    >
                      <a
                        href="https://in.linkedin.com/in/hemanthrachapalli"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-900 dark:text-white font-medium hover:underline"
                      >
                        LinkedIn
                      </a>
                    </LinkPreview>
                    
                    {" or "}
                    <LinkPreview
                      title="GitHub • Hemanth Rachapalli"
                      subtitle="Open-source projects and profile"
                      href="https://github.com/hemanth5544"
                      avatar={githubAvatar}
                      position="bottom"
                    >
                      <a
                        href="https://github.com/hemanth5544"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-900 dark:text-white font-medium hover:underline"
                      >
                        GitHub
                      </a>
                    </LinkPreview>.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Matrix Component - aligned with top of heading */}
            <div className="hidden lg:flex items-start justify-center self-start flex-shrink-0">
              <RandomMatrix
                rows={20}
                cols={20}
                fps={15}
                size={8}
                gap={3}
                patternChangeInterval={4000}
                palette={mounted && theme === "dark" ? {
                  on: "#ffffff",
                  off: "#000000",
                } : {
                  on: "#000000",
                  off: "#ffffff",
                }}
                ariaLabel="Random matrix patterns"
                className="rounded-lg border-2 border-zinc-600 dark:border-zinc-500 shadow-xl p-3 lg:p-4 bg-white dark:bg-black"
              />
            </div>
          </div>
        </section>


        <section className="space-y-6 sm:space-y-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-900 dark:text-white">
              GitHub Contributions
            </h2>
            {/* <CheckMyGitPreview username="hemanth5544" /> */}
          </div>
          <GithubCalendarClient className="" username="hemanth5544" blockSize={13} />
        </section>

        <Oneko/>


         <section className="space-y-8 sm:space-y-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-xl sm:text-2xl md:text-3xl text-center font-medium text-purple-900 dark:text-white">
          Open Source Contributions
        </h2>

        <div className="px-4 sm:px-6 lg:px-8">
                    <OpenSourceContributionsCard />
                  </div>
        </section>


        {/* Technical Skills Section */}
        <section className="space-y-8 sm:space-y-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-center text-zinc-900 dark:text-white">
            Technical Space
         </h2>
          
          {/* Programming Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr items-stretch">
            <div className="p-3 sm:p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 h-full flex flex-col gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-white">Programming Languages</h3>
                <div className="flex flex-wrap gap-2 items-start w-full">
                  {skillsData.languages.map((skill) => {
                    const chip = (
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300">
                        <img src={skill.iconSrc || skill.iconUrl} alt="" aria-hidden className="w-4 h-4 sm:w-5 sm:h-5" loading="lazy" />
                        <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white">{skill.name}</span>
                      </div>
                    )
                    if (skill.name === 'C') {
                      return (
                        <CodeHover key={skill.name} lang="c">
                          {chip}
                        </CodeHover>
                      )
                    }
                    const map = {
                      'C++': 'cpp',
                      'Java': 'java',
                      'Python': 'python',
                      'JavaScript': 'javascript',
                      'TypeScript': 'typescript',
                      'Rust': 'rust',
                      'Go': 'go',
                    }
                    const langKey = map[skill.name]
                    if (langKey) {
                      return (
                        <CodeHover key={skill.name} lang={langKey}>
                          {chip}
                        </CodeHover>
                      )
                    }
                    return (
                      <div key={skill.name}>
                        {chip}
                      </div>
                    )
                  })}
                </div>
            </div>

        

            <div className="p-3 sm:p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 h-full flex flex-col gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-white">Backend & Databases</h3>
                <div className="flex flex-wrap gap-2 items-start">
                  {skillsData.backend.map((skill) => {
                    const chip = (
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300">
                        <img src={skill.iconSrc || skill.iconUrl} alt="" aria-hidden className="w-4 h-4 sm:w-5 sm:h-5" loading="lazy" />
                        <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white">{skill.name}</span>
                      </div>
                    )
                    const map = {
                      'Node.js': 'node',
                      'Express.js': 'express',
                      'MongoDB': 'mongodb',
                      'MySQL': 'mysql',
                      'PostgreSQL': 'postgresql',
                      'GraphQL': 'graphql',
                      'NestJs': 'nestjs',
                      'Sequelize': 'sequelize', 
                      'Socket': 'socket',                    
                      // 'Supabase': 'supabase', 
                    }
                    const langKey = map[skill.name]
                    if (langKey) {
                      return (
                        <CodeHover key={skill.name} lang={langKey}>
                          {chip}
                        </CodeHover>
                      )
                    }
                    return (
                      <div key={skill.name}>{chip}</div>
                    )
                  })}
                </div>
            </div>

            <div className="p-3 sm:p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 h-full flex flex-col gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-white"> Jobs & Libraries</h3>
                <div className="flex flex-wrap gap-2 items-start">
                  {skillsData.libraries.map((skill) => {
                    const chip = (
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300">
                        <img src={skill.iconSrc || skill.iconUrl} alt="" aria-hidden className="w-4 h-4 sm:w-5 sm:h-5" loading="lazy" />
                        <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white">{skill.name}</span>
                      </div>
                    )
                    const map = {
                      'Jest': 'jest',
                      'Elasticsearch': 'elasticsearch',
                      'Redis': 'redis',
                      'Kafka': 'kafka',
                      'Deno': 'deno',
                      'Bun': 'bun',
                      'Electron': 'electron',
                      
                    }
                    const langKey = map[skill.name]
                    if (langKey) {
                      return (
                        <CodeHover key={skill.name} lang={langKey}>
                          {chip}
                        </CodeHover>
                      )
                    }
                    return (
                      <div key={skill.name}>{chip}</div>
                    )
                  })}
                </div>
            </div>

            <div className="p-3 sm:p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 h-full flex flex-col gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-white">DevOps & Tools</h3>
                <div className="flex flex-wrap gap-2 items-start">
                  {skillsData.tools.map((skill) => {
                    const chip = (
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300">
                        <img src={skill.iconSrc || skill.iconUrl} alt="" aria-hidden className="w-4 h-4 sm:w-5 sm:h-5" loading="lazy" />
                        <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white">{skill.name}</span>
                      </div>
                    )
                    const map = {
                      'Linux': 'linux',
                      'Git': 'git',
                      'VS Code': 'vscode',
                      'Docker': 'docker',
                      'Firebase': 'firebase',
                      'AWS': 'aws',
                      'Vercel': 'vercel',
                      'Apple': 'apple',
                    }
                    const langKey = map[skill.name]
                    if (langKey) {
                      return (
                        <CodeHover key={skill.name} lang={langKey}>
                          {chip}
                        </CodeHover>
                      )
                    }
                    return (
                      <div key={skill.name}>{chip}</div>
                    )
                  })}
                </div>
            </div>

            <div className="p-3 sm:p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 h-full flex flex-col gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-white">Monitring & Tools</h3>
                <div className="flex flex-wrap gap-2 items-start">
                  {[...skillsData?.hardware].map((skill) => {
                    const chip = (
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300">
                        <img src={skill.iconSrc || skill.iconUrl} alt="" aria-hidden className="w-4 h-4 sm:w-5 sm:h-5" loading="lazy" />
                        <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white">{skill.name}</span>
                      </div>
                    )
                    const map = {
                      'Arduino': 'arduino',
                      'IoT Programming': 'iot',
                      'Discord Bot Dev': 'discord',
                      'Discord.js': 'discordjs',
                      'Discord.py': 'discordpy',
                    }
                    const langKey = map[skill.name]
                    if (langKey) {
                      return (
                        <CodeHover key={skill.name} lang={langKey}>
                          {chip}
                        </CodeHover>
                      )
                    }
                    return (
                      <div key={skill.name}>{chip}</div>
                    )
                  })}
                </div>
            </div>

          </div>
        </section>
        {/* Projects Section */}
        <section className="space-y-8 sm:space-y-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-xl sm:text-2xl md:text-3xl text-center font-medium text-zinc-900 dark:text-white">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-auto">
          {[
            {
              title: "QuickSync",
              description:
                "Quick Sync is a web‑based app for quickly sharing links, text snippets, and files Open the site on one device, scan the QR code with another, and you instantly get a private, end‑to‑end‑encrypted WebRTC tunnel with no installs, no sign‑ups, and no middleman servers ferrying your data"            ,
              size: "large",
              github: "https://github.com/hemanth5544/quicksync"
            },
            {
              title: "Order Execution Engine with retry logic and job mechanism",
              description:
                "A high-performance order execution engine with DEX routing and real-time WebSocket status updates. Built for processing market, limit, and sniper orders on Solana DEXs (Raydium and Meteora).",
              size: "medium",
              github: "https://github.com/hemanth5544/order-execution-engine"
            },
            {
              title: "Production-ready Boilerplate",
              description:
                "A production-ready TypeScript/Express API server with PostgreSQL database integration, type-safe API contracts, and automated OpenAPI documentation generation.",
              size: "medium",
              github: "https://github.com/hemanth5544/boiler-plate"
            },
            {
              title: "Nalanda Library Management System",
              description:
                "A comprehensive backend system for a library management application with RESTful and GraphQL APIs, built with Node.js, Express, and MongoDB.",
              size: "medium",
              github: "https://github.com/hemanth5544/nalanda"
            },
            {
              title: "MediaSync",
              description:
                "Go live in a click. Stream, connect, and share instantly using WebRTC and Node.js.",
              size: "medium",
              github: "https://github.com/hemanth5544/mediasync"
            },
            {
              title: "InkSync",
              description:
                "Real-time collaborative editor built with React & MongoDB.",
              size: "medium",
              github: "https://github.com/hemanth5544/inksync"
            }
          ].map((project, index) => (
            <div
              key={project.title}
              onClick={() => typeof window !== 'undefined' && window.open(project.github, "_blank")}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              className={`relative p-4 sm:p-6 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 transition-all duration-300 cursor-pointer ${
                project.size === "large"
                  ? "md:col-span-2 lg:col-span-2"
                  : project.size === "medium"
                  ? "md:col-span-2 lg:col-span-1"
                  : ""
              } ${
                hoveredProject !== null && hoveredProject !== index
                  ? "blur-sm scale-[0.98] opacity-60"
                  : "shadow-lg"
              }`}
            >
              <div className="flex flex-col h-full gap-2 sm:gap-3">
                <h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        </section>
        
        <section className="space-y-8 sm:space-y-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-900 dark:text-white">
            Get in touch
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Based in Hyderabad,Telangana. You can reach me at{" "}
              <a
                href="mailto:rachapalli.hemanth5544@gmail.com"
                className="text-zinc-900 dark:text-white relative inline-block group break-all sm:break-normal"
              >
                <span>rachapalli.hemanth5544@gmail.com</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-zinc-400 dark:bg-zinc-500 group-hover:w-full transition-all duration-300 ease-out"></span>
              </a>
            </p>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
              <LinkPreview
                title="LinkedIn • Hemanth Rachapalli"
                subtitle="SDE 1 • Datopic"
                href="https://in.linkedin.com/in/hemanthrachapalli"
                avatar={linkedinAvatar}
                position="bottom"
              >
                <a
                  href="https://in.linkedin.com/in/hemanthrachapalli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 dark:text-white relative inline-block group"
                aria-label="Connect with me on LinkedIn"
              >
                  <span>LinkedIn</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-zinc-400 dark:bg-zinc-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                </a>
              </LinkPreview>
              
              <LinkPreview
                title="GitHub • Hemanth Rachapalli"
                subtitle="Open-source projects and profile"
                href="https://github.com/hemanth5544"
                avatar={githubAvatar}
                position="bottom"
              >
                <a
                  href="https://github.com/hemanth5544"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 dark:text-white relative inline-block group"
                aria-label="View my GitHub profile"
              >
                  <span>GitHub</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-zinc-400 dark:bg-zinc-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                </a>
              </LinkPreview>
              
              <button
                type="button"
                onClick={() => setShowResume(true)}
                className="text-zinc-900 dark:text-white relative inline-block group"
                data-no-letter
                aria-label="View Resume"
              >
                <span>Resume</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-zinc-400 dark:bg-zinc-500 group-hover:w-full transition-all duration-300 ease-out"></span>
              </button>
            </div>
            
  
          </div>
        </section>

        <section className="text-center py-6 sm:py-8 border-t border-zinc-200 dark:border-zinc-700">
        </section>
      </main>

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-2 sm:p-4" role="dialog" aria-modal="true">
          <div className="w-[min(98vw,1000px)] h-[min(95vh,900px)] max-h-[95vh] bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-700 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
              <h3 className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white truncate flex-1 mr-2">Resume — Hemanth Rachapalli</h3>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <a href="/Hemanth.RES.pdf" download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white text-xs sm:text-sm" data-no-letter>
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button onClick={() => setShowResume(false)} className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label="Close resume" data-no-letter>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 overflow-auto">
              <iframe src="/Hemanth.RES.pdf#view=FitH" className="w-full h-full min-h-[400px] sm:min-h-[500px]" title="Resume PDF" />
            </div>
          </div>
        </div>
      )}
      {/* Bottom scroll progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1.5 bg-transparent z-50" aria-hidden="true">
        <div
          className="h-full bg-zinc-900 dark:bg-white transition-[width] duration-150 ease-linear"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Calendar Modal Component */}
      <CalendarModal />
    </div>
    </ClickSpark>
    
  )
}
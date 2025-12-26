import React, { useState, useEffect, useRef } from 'react'
import Landing from './components/Landing'
import ImageGallery from './components/ImageGallery'
import VideoGallery from './components/VideoGallery'
import { getVideoPath } from './config/videos'

// Helper to get asset path with base URL
const getAssetPath = (path: string) => {
  return `${import.meta.env.BASE_URL}${path}`
}

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true)
  const [activeSection, setActiveSection] = useState<'gaming' | 'posters' | 'videos'>('gaming')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Reset scroll to top when switching sections
  useEffect(() => {
    if (!showLanding) {
      // Use both window and document scrolling to ensure it works
      window.scrollTo({ top: 0, behavior: 'smooth' })
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
      document.body.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeSection, showLanding])

  useEffect(() => {
    if (showLanding) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let spots: Array<{
      x: number
      y: number
      size: number
      opacity: number
      gridSize: number
      lineWidth: number
    }> = []

    // Generate a few fixed random grid spots (only positions are random)
    const generateRandomSpots = () => {
      const spotCount = 4 + Math.floor(Math.random() * 3) // 4-6 spots
      const newSpots = []
      const fixedGridSize = 60 // Fixed grid size
      const fixedSpotSize = 250 // Fixed spot size
      const fixedOpacity = 0.03 // Fixed opacity
      const fixedLineWidth = 1 // Fixed line width
      
      for (let i = 0; i < spotCount; i++) {
        newSpots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: fixedSpotSize,
          opacity: fixedOpacity,
          gridSize: fixedGridSize,
          lineWidth: fixedLineWidth,
        })
      }
      return newSpots
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Generate spots once, keep them fixed
      if (spots.length === 0) {
        spots = generateRandomSpots()
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    let animationFrameId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      spots.forEach(spot => {
        // Draw grid lines in this spot area with fixed properties
        ctx.strokeStyle = `rgba(255, 255, 255, ${spot.opacity})`
        ctx.lineWidth = spot.lineWidth
        
        const startX = Math.max(0, spot.x - spot.size / 2)
        const endX = Math.min(canvas.width, spot.x + spot.size / 2)
        const startY = Math.max(0, spot.y - spot.size / 2)
        const endY = Math.min(canvas.height, spot.y + spot.size / 2)
        
        // Vertical lines with fixed grid size
        for (let x = Math.floor(startX / spot.gridSize) * spot.gridSize; x < endX; x += spot.gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, startY)
          ctx.lineTo(x, endY)
          ctx.stroke()
        }
        
        // Horizontal lines with fixed grid size
        for (let y = Math.floor(startY / spot.gridSize) * spot.gridSize; y < endY; y += spot.gridSize) {
          ctx.beginPath()
          ctx.moveTo(startX, y)
          ctx.lineTo(endX, y)
          ctx.stroke()
        }
      })

      // Subtle cursor interaction
      const gradient = ctx.createRadialGradient(
        mousePosition.x,
        mousePosition.y,
        0,
        mousePosition.x,
        mousePosition.y,
        150
      )
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.02)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [showLanding, mousePosition])

  // Image arrays - single source of truth
  const gamingImages = [
    getAssetPath('Assets/Gaming/1.png'),
    getAssetPath('Assets/Gaming/CWL Base DesignNov_25 (1).png'),
    getAssetPath('Assets/Gaming/CWL BAse Pack (1).png'),
    getAssetPath('Assets/Gaming/LL Sub_Dec25.png'),
    getAssetPath('Assets/Gaming/October 25 LL Sub.png'),
    getAssetPath('Assets/Gaming/priceless.png'),
    getAssetPath('Assets/Gaming/QL Sale Poster.png'),
    getAssetPath('Assets/Gaming/Samantha Intro Design.png'),
  ]

  const posterImages = [
    getAssetPath('Assets/Posters/Canva Challenge.png'),
    getAssetPath('Assets/Posters/Photography.png'),
    getAssetPath('Assets/Posters/Pixel Premiere.png'),
    getAssetPath('Assets/Posters/Quiz.png'),
    getAssetPath('Assets/Posters/Taal.png'),
    getAssetPath('Assets/Posters/Vogue Vista_1.png'),
    getAssetPath('Assets/Posters/Vogue Vista.png'),
    getAssetPath('Assets/Posters/Western_group_dance.png'),
  ]

  // Videos - use external URLs if configured, otherwise fall back to local paths
  const videos = Array.from({ length: 10 }, (_, i) => getVideoPath(i))

  if (showLanding) {
    return (
      <Landing 
        onEnterPortfolio={() => setShowLanding(false)}
        posterImages={posterImages}
        gamingImages={gamingImages}
        videos={videos}
      />
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      position: 'relative',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .portfolio-header {
            padding: 1rem !important;
            margin: 3rem 0.5rem 0.5rem !important;
            border-radius: 16px !important;
          }
          .portfolio-nav {
            gap: 0.25rem !important;
          }
          .portfolio-nav-button {
            padding: 0.4rem 0.8rem !important;
            font-size: 0.75rem !important;
          }
          .portfolio-main {
            padding: 2rem 1rem !important;
          }
          .portfolio-footer {
            padding: 2rem 1rem !important;
            font-size: 0.7rem !important;
          }
        }
        @media (max-width: 480px) {
          .portfolio-header {
            padding: 0.75rem !important;
            margin: 2.5rem 0.5rem 0.5rem !important;
          }
          .portfolio-back-button {
            font-size: 1rem !important;
          }
          .portfolio-nav-button {
            padding: 0.35rem 0.6rem !important;
            font-size: 0.7rem !important;
          }
        }
      `}</style>

      {/* Header */}
      <header className="portfolio-header" style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1.5rem 2rem',
        margin: '5rem 1rem 1rem',
        borderRadius: '999px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <button
            className="portfolio-back-button"
            onClick={() => setShowLanding(true)}
            style={{
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: 300,
              color: '#ffffff',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              letterSpacing: '-0.02em',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            ← SJ's Studio
          </button>
          <nav className="portfolio-nav" style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}>
            {(['gaming', 'posters', 'videos'] as const).map((section) => (
              <button
                key={section}
                className="portfolio-nav-button"
                onClick={() => {
                  setActiveSection(section)
                  // Immediate scroll reset on click
                  window.scrollTo({ top: 0, behavior: 'instant' })
                  document.documentElement.scrollTo({ top: 0, behavior: 'instant' })
                  document.body.scrollTo({ top: 0, behavior: 'instant' })
                }}
                style={{
                  padding: '0.5rem 1.2rem',
                  backgroundColor: activeSection === section 
                    ? '#ffffff' 
                    : 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '999px',
                  color: activeSection === section ? '#0a0a0a' : '#999',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section) {
                    e.currentTarget.style.borderColor = '#ffffff'
                    e.currentTarget.style.color = '#ffffff'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.color = '#999'
                  }
                }}
              >
                {section}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="portfolio-main" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 2rem',
      }}>
        {activeSection === 'gaming' && (
          <ImageGallery 
            title="Gaming Designs" 
            images={gamingImages} 
          />
        )}
        {activeSection === 'posters' && (
          <ImageGallery 
            title="Posters" 
            images={posterImages} 
          />
        )}
        {activeSection === 'videos' && (
          <VideoGallery 
            title="Video Projects" 
            videos={videos} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="portfolio-footer" style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '3rem 2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#999',
        fontSize: '0.85rem',
        fontWeight: 300,
      }}>
        <p style={{ margin: 0, marginBottom: '0.5rem' }}>
          SJ's Studio
        </p>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>
          © {new Date().getFullYear()} SJ's Studio. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default App

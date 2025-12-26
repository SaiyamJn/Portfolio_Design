import React, { useMemo, useEffect, useRef } from 'react'

interface LandingProps {
  onEnterPortfolio: () => void
  posterImages: string[]
  gamingImages: string[]
  videos: string[]
}

// Software icons/logos from Assets/Icons folder
const SoftwareIcon: React.FC<{ name: string }> = ({ name }) => {
  const iconMap: { [key: string]: string } = {
    'Adobe Photoshop': 'Assets/Icons/photoshop.png',
    'Adobe Lightroom': 'Assets/Icons/photoshop-lightroom.png',
    'Adobe After Effects': 'Assets/Icons/after-effects.png',
    'Adobe Premiere Pro': 'Assets/Icons/premiere-pro.png',
    'Adobe Illustrator': 'Assets/Icons/illustrator.png',
    'Canva': 'Assets/Icons/canva.png',
    'Figma': 'Assets/Icons/figma.png',
  }

  const iconPath = iconMap[name] || ''

  return (
    <img
      src={iconPath}
      alt={name}
      style={{
        width: '24px',
        height: '24px',
        objectFit: 'contain',
        display: 'block',
      }}
    />
  )
}

const Landing: React.FC<LandingProps> = ({ onEnterPortfolio, posterImages, gamingImages, videos }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
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

    let animationFrameId: number | null = null
    let needsRedraw = true

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Generate spots once, keep them fixed
      if (spots.length === 0) {
        spots = generateRandomSpots()
      }
      needsRedraw = true
    }
    
    // Debounce resize
    let resizeTimeout: ReturnType<typeof setTimeout>
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 150)
    }
    
    resizeCanvas()
    window.addEventListener('resize', debouncedResize)
    
    // Draw subtle grid spots - optimized with requestAnimationFrame
    const draw = () => {
      if (!needsRedraw) {
        animationFrameId = requestAnimationFrame(draw)
        return
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Batch drawing operations
      ctx.save()
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
      ctx.restore()
      
      needsRedraw = false
      animationFrameId = requestAnimationFrame(draw)
    }
    
    // Only draw once initially, then on resize
    draw()

    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(resizeTimeout)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  const software = [
    'Adobe Photoshop',
    'Adobe Lightroom',
    'Adobe After Effects',
    'Adobe Premiere Pro',
    'Adobe Illustrator',
    'Canva',
    'Figma',
  ]

  // Combine posters and gaming images for scroll and shuffle for randomness
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
  
  const allPosters = useMemo(() => shuffleArray([...posterImages, ...gamingImages]), [])
  const shuffledVideos = useMemo(() => shuffleArray([...videos]), [])
  
  // Generate random spacing and widths for posters
  const posterRandomValues = useMemo(() => 
    [...allPosters, ...allPosters].map(() => ({
      spacing: 2 + Math.random() * 2,
      width: 280 + Math.random() * 80,
    })), [allPosters]
  )
  
  // Generate random spacing and widths for videos
  const videoRandomValues = useMemo(() => 
    [...shuffledVideos, ...shuffledVideos].map(() => ({
      spacing: 2 + Math.random() * 2,
      width: 280 + Math.random() * 80,
    })), [shuffledVideos]
  )

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '2rem',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          willChange: 'auto',
        }}
      />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scrollLeft {
          from {
            transform: translateX(0) translateZ(0);
          }
          to {
            transform: translateX(-50%) translateZ(0);
          }
        }
        @keyframes scrollRight {
          from {
            transform: translateX(-50%) translateZ(0);
          }
          to {
            transform: translateX(0) translateZ(0);
          }
        }
        @keyframes scrollLeft {
          from {
            transform: translateX(0) translateZ(0);
          }
          to {
            transform: translateX(-50%) translateZ(0);
          }
        }
        @media (max-width: 768px) {
          .landing-container {
            padding: 1rem !important;
          }
          .landing-content {
            max-width: 100% !important;
            padding: 0 1rem !important;
          }
          .landing-software-badge {
            font-size: 0.75rem !important;
            padding: 0.5rem 0.75rem !important;
          }
          .landing-button {
            padding: 0.875rem 2rem !important;
            font-size: 0.85rem !important;
            margin-bottom: 3rem !important;
          }
          .landing-scroll-item {
            width: 200px !important;
            margin-right: 1rem !important;
          }
          .landing-contact-container {
            max-width: 100% !important;
            padding: 0.875rem 1rem !important;
            margin: 0 1rem !important;
          }
          .landing-contact-links {
            flex-direction: column !important;
            gap: 0.5rem !important;
          }
          .landing-footer {
            padding: 1.5rem 1rem 0.75rem !important;
            font-size: 0.7rem !important;
          }
        }
        @media (max-width: 480px) {
          .landing-scroll-item {
            width: 160px !important;
            margin-right: 0.5rem !important;
          }
          .landing-software-badge {
            font-size: 0.7rem !important;
            padding: 0.4rem 0.6rem !important;
          }
          .landing-contact-container {
            padding: 0.75rem !important;
          }
        }
        @media (max-width: 768px) {
          .landing-scroll-item {
            margin-right: 1rem !important;
          }
        }
      `}</style>

      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
        <div className="landing-content" style={{
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center',
          animation: 'fadeIn 0.8s ease-out',
          marginTop: 'auto',
          marginBottom: 'auto',
        }}>
        {/* Studio Name */}
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 300,
          margin: 0,
          marginBottom: '0.5rem',
          color: '#ffffff',
          letterSpacing: '-0.03em',
          animation: 'slideUp 0.8s ease-out 0.1s both',
        }}>
          SJ's Studio
        </h1>

        {/* Name */}
        <h2 style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: 400,
          margin: 0,
          marginBottom: '3rem',
          color: '#999',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          animation: 'slideUp 0.8s ease-out 0.2s both',
        }}>
          Saiyam Jain
        </h2>

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          margin: 0,
          marginBottom: '1rem',
          color: '#cccccc',
          lineHeight: 1.8,
          fontWeight: 300,
          animation: 'slideUp 0.8s ease-out 0.3s both',
        }}>
          Computer Science Engineer × Graphic Designer
        </p>
        <p style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          margin: 0,
          marginBottom: '4rem',
          fontStyle: 'italic',
          fontWeight: 300,
          animation: 'slideUp 0.8s ease-out 0.4s both',
          background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #999999 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Where code meets creativity, and pixels tell stories
        </p>

        {/* Enter Portfolio Button */}
        <button
          className="landing-button"
          onClick={onEnterPortfolio}
          style={{
            padding: '1rem 2.5rem',
            fontSize: '0.95rem',
            fontWeight: 400,
            color: '#ffffff',
            background: 'transparent',
            border: '1px solid #ffffff',
            borderRadius: '999px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            animation: 'slideUp 0.8s ease-out 0.5s both',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '4rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff'
            e.currentTarget.style.color = '#0a0a0a'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#ffffff'
          }}
        >
          View Portfolio
        </button>

        {/* Software Tools */}
        <div style={{
          marginBottom: '4rem',
          animation: 'slideUp 0.8s ease-out 0.6s both',
        }}>
          <h3 style={{
            fontSize: '0.9rem',
            fontWeight: 400,
            margin: 0,
            marginBottom: '1.5rem',
            color: '#aaaaaa',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            What I can use:
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {software.map((tool) => (
              <div
                key={tool}
                className="landing-software-badge"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1rem',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '999px',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#999',
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = '#999'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <SoftwareIcon name={tool} />
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Infinite Horizontal Scroll - Posters & Gaming (Left) */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          marginBottom: '2rem',
          overflow: 'hidden',
          marginTop: '2rem',
        }}>
        <div style={{
          display: 'flex',
          width: 'fit-content',
          animation: 'scrollLeft 120s linear infinite',
        }}>
          {[...allPosters, ...allPosters].map((image, index) => {
            const { spacing: randomSpacing, width: randomWidth } = posterRandomValues[index]
            return (
              <div
                key={index}
                className="landing-scroll-item"
                style={{
                  width: `${randomWidth}px`,
                  aspectRatio: '16/9',
                  marginRight: `${randomSpacing}rem`,
                  flexShrink: 0,
                  overflow: 'hidden',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                  }}
                  loading="lazy"
                  decoding="async"
                  onLoad={(e) => {
                    const img = e.currentTarget
                    const imgAspectRatio = img.naturalWidth / img.naturalHeight
                    const containerAspectRatio = 16 / 9
                    
                    // If image is landscape (wider than tall), use cover to fill
                    // If image is portrait (taller than wide), use contain to show full image
                    if (imgAspectRatio >= containerAspectRatio) {
                      img.style.width = '100%'
                      img.style.height = '100%'
                      img.style.objectFit = 'cover'
                    } else {
                      img.style.maxWidth = '100%'
                      img.style.maxHeight = '100%'
                      img.style.width = 'auto'
                      img.style.height = 'auto'
                      img.style.objectFit = 'contain'
                    }
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

        {/* Infinite Horizontal Scroll - Videos (Right) */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          marginBottom: '4rem',
          overflow: 'hidden',
          willChange: 'transform',
        }}>
        <div style={{
          display: 'flex',
          width: 'fit-content',
          animation: 'scrollRight 140s linear infinite',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}>
          {[...shuffledVideos, ...shuffledVideos].map((video, index) => {
            const { spacing: randomSpacing, width: randomWidth } = videoRandomValues[index]
            return (
              <div
                key={index}
                className="landing-scroll-item"
                style={{
                  width: `${randomWidth}px`,
                  aspectRatio: '16/9',
                  marginRight: `${randomSpacing}rem`,
                  flexShrink: 0,
                  overflow: 'hidden',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <video
                  src={video}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                  }}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  autoPlay
                />
              </div>
            )
          })}
        </div>
      </div>

        {/* Contact Links */}
        <div className="landing-contact-container" style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 'auto',
          width: '100%',
          maxWidth: '500px',
          borderRadius: '999px',
          backgroundColor: 'rgba(26, 26, 26, 0.5)',
          padding: '1rem 1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
        <h3 style={{
          fontSize: '0.8rem',
          fontWeight: 400,
          margin: 0,
          color: '#aaaaaa',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Contact Me
        </h3>
        <div className="landing-contact-links" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <a
          href="mailto:sjstudios45@gmail.com"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#999',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 400,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#999'
          }}
        >
          <img
            src="Assets/Icons/mail.png"
            alt="Email"
            style={{
              width: '16px',
              height: '16px',
              objectFit: 'contain',
              filter: 'invert(1)',
            }}
          />
          sjstudios45@gmail.com
        </a>
        <a
          href="https://discord.com/users/1268533060052324392"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#999',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 400,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#999'
          }}
        >
          <img
            src="Assets/Icons/discord.png"
            alt="Discord"
            style={{
              width: '16px',
              height: '16px',
              objectFit: 'contain',
              filter: 'invert(1)',
            }}
          />
          Discord
        </a>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#999',
            fontSize: '0.8rem',
            fontWeight: 400,
          }}
        >
          <img
            src="Assets/Icons/Location.png"
            alt="Location"
            style={{
              width: '16px',
              height: '16px',
              objectFit: 'contain',
              filter: 'invert(1)',
            }}
          />
          India
        </div>
      </div>
        </div>
      </div>

      {/* Footer */}
      <div className="landing-footer" style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        marginTop: 'auto',
        color: '#666',
        fontSize: '0.75rem',
        fontWeight: 300,
      }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} SJ's Studio. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Landing

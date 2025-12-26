import React, { useState } from 'react'
import Modal from './Modal'

interface VideoGalleryProps {
  title: string
  videos: string[]
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ title, videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const handleVideoHover = (videoElement: HTMLVideoElement, isEntering: boolean) => {
    if (isEntering) {
      videoElement.play().catch(() => {})
    } else {
      videoElement.pause()
      videoElement.currentTime = 0
    }
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .video-gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 480px) {
          .video-gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .video-gallery-title {
            font-size: 1.5rem !important;
            margin-bottom: 2rem !important;
          }
        }
      `}</style>
      <h2 className="video-gallery-title" style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 300,
        marginBottom: '3rem',
        textAlign: 'left',
        color: '#ffffff',
        letterSpacing: '-0.02em',
      }}>
        {title}
      </h2>
      
      <div className="video-gallery-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
      }}>
        {videos.map((video, index) => (
          <div
            key={index}
            onClick={() => setSelectedVideo(video)}
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              overflow: 'hidden',
              cursor: 'pointer',
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-4px)'
              const videoEl = e.currentTarget.querySelector('video') as HTMLVideoElement
              if (videoEl) handleVideoHover(videoEl, true)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
              const videoEl = e.currentTarget.querySelector('video') as HTMLVideoElement
              if (videoEl) handleVideoHover(videoEl, false)
            }}
          >
            <video
              src={video}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
              muted
              loop
              playsInline
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
            }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  marginLeft: '3px',
                }}
              >
                <path
                  d="M8 5v14l11-7z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
          type="video"
          src={selectedVideo}
        />
      )}
    </>
  )
}

export default VideoGallery

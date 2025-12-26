import React, { useState } from 'react'
import Modal from './Modal'

interface ImageGalleryProps {
  title: string
  images: string[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ title, images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const isPosters = title.toLowerCase() === 'posters'

  return (
    <>
      <h2 className="image-gallery-title" style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 300,
        marginBottom: '3rem',
        textAlign: 'left',
        color: '#ffffff',
        letterSpacing: '-0.02em',
      }}>
        {title}
      </h2>
      
      <style>{`
        @media (max-width: 768px) {
          .image-gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 480px) {
          .image-gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .image-gallery-title {
            font-size: 1.5rem !important;
            margin-bottom: 2rem !important;
          }
        }
      `}</style>
      <div className="image-gallery-grid" style={{
        display: 'grid',
        gridTemplateColumns: isPosters 
          ? 'repeat(auto-fill, minmax(220px, 1fr))' 
          : 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
      }}>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(image)}
            style={{
              position: 'relative',
              aspectRatio: isPosters ? '9/16' : '16/9',
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
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              loading="lazy"
              onLoad={(e) => {
                const img = e.currentTarget
                const imgAspectRatio = img.naturalWidth / img.naturalHeight
                const containerAspectRatio = isPosters ? 9 / 16 : 16 / 9
                
                // For posters (9/16), if image is taller than container, use cover
                // For gaming (16/9), if image is wider than container, use cover
                // Otherwise use contain to show full image
                if (isPosters) {
                  if (imgAspectRatio < containerAspectRatio) {
                    img.style.objectFit = 'cover'
                  } else {
                    img.style.objectFit = 'contain'
                  }
                } else {
                  if (imgAspectRatio > containerAspectRatio) {
                    img.style.objectFit = 'cover'
                  } else {
                    img.style.objectFit = 'contain'
                  }
                }
              }}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          type="image"
          src={selectedImage}
        />
      )}
    </>
  )
}

export default ImageGallery

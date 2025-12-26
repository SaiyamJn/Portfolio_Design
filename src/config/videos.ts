// Video configuration
// For GitHub Pages, videos must be hosted externally since Git LFS files aren't served
// You can use services like:
// - Cloudinary (free tier: 25GB storage, 25GB bandwidth)
// - Vimeo (free tier available)
// - YouTube (unlisted videos)
// - AWS S3 or similar CDN

// Replace these URLs with your actual hosted video URLs
// Format: 'https://your-cdn.com/videos/1.mp4'
export const videoUrls: string[] = [
  // Add your external video URLs here
  // Example: 'https://res.cloudinary.com/your-cloud/video/upload/v1/1.mp4',
  // For now, these will fall back to local paths (won't work on GitHub Pages)
  '/Portfolio_Design/Assets/Videos/1.mp4',
  '/Portfolio_Design/Assets/Videos/2.mp4',
  '/Portfolio_Design/Assets/Videos/3.mp4',
  '/Portfolio_Design/Assets/Videos/4.mp4',
  '/Portfolio_Design/Assets/Videos/5.mp4',
  '/Portfolio_Design/Assets/Videos/6.mp4',
  '/Portfolio_Design/Assets/Videos/7.mp4',
  '/Portfolio_Design/Assets/Videos/8.mp4',
  '/Portfolio_Design/Assets/Videos/9.mp4',
  '/Portfolio_Design/Assets/Videos/10.mp4',
]

// Helper to get video URL with base path for local development
export const getVideoPath = (index: number): string => {
  if (videoUrls[index] && videoUrls[index].startsWith('http')) {
    // External URL - use as is
    return videoUrls[index]
  }
  // Local path - add base URL
  return `${import.meta.env.BASE_URL}Assets/Videos/${index + 1}.mp4`
}


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Type declaration for process.env (will be available after npm install)
declare const process: {
  env: {
    GITHUB_PAGES?: string
    [key: string]: string | undefined
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Check if we're building for GitHub Pages
  const isGitHubPages = process.env.GITHUB_PAGES === 'true'
  
  return {
    plugins: [react()],
    // For GitHub Pages: base path matches repository name 'Portfolio_Design'
    // Use '/' if deploying to a user/organization page (username.github.io)
    base: isGitHubPages ? '/Portfolio_Design/' : '/',
  }
})


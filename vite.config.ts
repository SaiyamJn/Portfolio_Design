import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: use '/Portfolio/' if deploying to a project page
  // Change 'Portfolio' to your repository name if different
  // Use '/' if deploying to a user/organization page (username.github.io)
  base: process.env.GITHUB_PAGES === 'true' ? '/Portfolio/' : '/',
})


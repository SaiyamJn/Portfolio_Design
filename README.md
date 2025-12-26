# SJ's Studio - Digital Design & Video Editor Portfolio

A modern, minimal, and professional portfolio website showcasing digital design, graphics editing, and video editing work. Built with React, TypeScript, and Vite.

## 🎨 Features

- **Modern Landing Page**: Clean, minimal design with animated background
- **Interactive Portfolio Gallery**: Browse through gaming designs, posters, and video projects
- **Infinite Horizontal Scrolls**: Showcase work with smooth, continuous scrolling animations
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Professional dark color scheme with subtle grid patterns
- **Image & Video Modals**: Full-screen viewing experience for portfolio items
- **Smooth Animations**: Elegant transitions and hover effects throughout

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Inline CSS** - All styling done inline for component-based design

## 📁 Project Structure

```
Portfolio/
├── Assets/
│   ├── Gaming/          # Gaming design images
│   ├── Posters/         # Poster design images
│   ├── Videos/          # Video project files
│   └── Icons/           # Software and contact icons
├── src/
│   ├── components/
│   │   ├── Landing.tsx      # Landing page component
│   │   ├── ImageGallery.tsx # Image gallery component
│   │   ├── VideoGallery.tsx # Video gallery component
│   │   └── Modal.tsx        # Full-screen modal component
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📝 Adding New Content

### Adding Images

1. Add your images to the appropriate folder:
   - `Assets/Posters/` for poster designs
   - `Assets/Gaming/` for gaming designs

2. Update the image arrays in `src/App.tsx`:
```typescript
const posterImages = [
  'Assets/Posters/YourNewImage.png',
  // ... other images
]
```

### Adding Videos

1. Add your video files to `Assets/Videos/`

2. Update the videos array in `src/App.tsx`:
```typescript
const videos = [
  'Assets/Videos/YourNewVideo.mp4',
  // ... other videos
]
```

## 🎯 Features Breakdown

### Landing Page
- Studio branding and personal introduction
- Software tools showcase with icons
- Infinite horizontal scrolls displaying portfolio work
- Contact information (email, Discord, location)

### Portfolio Gallery
- Three sections: Gaming, Posters, Videos
- Responsive grid layout
- Full-screen modal viewing
- Smooth scroll-to-top on section change

### Design Elements
- Dark theme (#0a0a0a background)
- Subtle grid pattern background
- Pill-shaped buttons and badges
- Smooth animations and transitions
- Mobile-responsive design

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with all features
- **Tablet (≤768px)**: Adjusted spacing and font sizes
- **Mobile (≤480px)**: Single column layouts, optimized touch targets

## 🎨 Customization

### Colors
- Background: `#0a0a0a`
- Text: `#ffffff`, `#cccccc`, `#999999`
- Accents: `#1a1a1a` for containers

### Typography
- Font Family: Inter, system fonts
- Responsive font sizes using `clamp()`

## 🌐 Deploying to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages in your repository:**
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to main branch:**
   - The workflow will automatically build and deploy on every push to `main`
   - You can also manually trigger it from the Actions tab
   - Your site will be live at: `https://SaiyamJn.github.io/Portfolio_Design/`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# The dist folder will contain the built files
# Push the dist folder to the gh-pages branch
```

### Important Notes

- The `.nojekyll` file is included to ensure GitHub Pages serves all files correctly
- The base path is set to `/Portfolio_Design/` to match your repository name
- Your live site URL: `https://SaiyamJn.github.io/Portfolio_Design/`

### Video Files

Videos are stored directly in the repository (compressed to be under GitHub's 100MB limit). They are served from the `public/Assets/Videos/` folder and will work on GitHub Pages.

## 📄 License

This project is private and proprietary.

## 👤 Author

**Saiyam Jain**
- Email: sjstudios45@gmail.com
- Discord: [Discord Profile](https://discord.com/users/1268533060052324392)
- Location: India

---

**SJ's Studio** - Where code meets creativity, and pixels tell stories


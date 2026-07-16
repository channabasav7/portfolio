# Portfolio Website

A modern, interactive portfolio website built with React and Vite, showcasing projects, skills, and professional experience with smooth animations and dark/light theme support.

## ✨ Features

- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Dark/Light Theme Toggle**: User-preferred theme persistence and smooth transitions
- **Hero Section**: Eye-catching landing section with animated particle effects
- **About Section**: Professional overview and background information
- **Projects Showcase**: Display of portfolio projects with descriptions
- **Skills Section**: Comprehensive skills breakdown with visual representation
- **Testimonials**: Client/user testimonials section
- **Contact Form**: Email integration using EmailJS for direct inquiries
- **Pricing Section**: Service pricing options (if applicable)
- **Resume/CV**: Downloadable resume in multiple formats (standard, Flutter/Android-focused, print-ready)
- **Loading Screen**: Custom loading animation for optimal UX
- **Smooth Animations**: Framer Motion and GSAP for professional motion design

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **Animation**: Framer Motion, GSAP
- **Icons**: Lucide React, React Icons
- **Email Service**: EmailJS
- **Code Quality**: ESLint

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── Hero.jsx       # Hero landing section
│   ├── About.jsx      # About section
│   ├── Projects.jsx   # Projects showcase
│   ├── Skills.jsx     # Skills section
│   ├── Contact.jsx    # Contact form
│   ├── Resume.jsx     # Resume section
│   ├── Testimonials.jsx
│   ├── Pricing.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ParticleCanvas.jsx
│   └── ThemeToggle.jsx
├── context/           # React Context
│   └── ThemeContext.jsx
├── hooks/             # Custom React hooks
│   └── useTheme.js
├── assets/            # Images and media
├── App.jsx
└── main.jsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/channabasav7/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The portfolio will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎨 Theme System

The portfolio includes a context-based theme system with dark and light modes. Theme preference is persisted in localStorage for a seamless user experience.

## 📧 Contact Form Setup

The contact form uses EmailJS. To enable email notifications:
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Add your service ID, template ID, and public key to the Contact component

## 📄 Resume Versions

Multiple resume formats are available:
- **Standard Resume** (RESUME.md)
- **Flutter/Android-Focused** (RESUME_FLUTTER_ANDROID.md)
- **Print-Ready HTML** (RESUME_PRINT_READY.html)

## 🚀 Deployment

The portfolio is optimized for deployment on platforms like:
- Vercel
- Netlify
- GitHub Pages
- AWS Amplify

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

## 🔧 Customization

- **Colors & Styling**: Edit CSS modules in `src/components/`
- **Theme**: Modify `src/context/ThemeContext.jsx`
- **Content**: Update component data and text in respective component files
- **Animations**: Adjust animation timings in component files using Framer Motion/GSAP

## 📝 License

This project is open source and available for personal and professional use.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for improvements.

## 📬 Contact

For resume or portfolio-related updates, reach out at channabasav40@gmail.com or +91 9483992653.

---

**Made with ❤️ by Channabasav**

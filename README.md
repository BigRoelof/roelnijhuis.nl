# Roel Nijhuis - Portfolio & Resume Website

A modern, highly optimized, and modular portfolio and resume website built using [Astro](https://astro.build/). The website showcases professional experience, education, skills, projects, and contact information with a fully responsive design.

---

## 🚀 Features

- **Component-Based Architecture**: Built with Astro components for modularity, clean code separation, and ease of maintenance.
- **Modern UI/UX**: Responsive styling, fluid transitions, and clean typography.
- **Tabbed Experience/Education Timeline**: Interactive tabs to toggle between experience, education, and projects.
- **Language Selection**: Ready for multi-language support.
- **High Performance**: Excellent Core Web Vitals, fully static pre-rendering, and optimized asset loading.

---

## 🛠️ Tech Stack

- **Framework**: [Astro v7](https://astro.build/)
- **Styling**: Vanilla CSS (custom design system)
- **Icons**: Lucide Icons
- **Language**: JavaScript / HTML

---

## 📂 Project Structure

```text
├── public/                 # Static assets (images, PDFs, icons)
│   ├── images/             # All logo's and profile pictures
│   └── CV_Roel_Nijhuis.pdf # Downloadable resume PDF
│
├── src/
│   ├── components/         # Modular Astro components
│   │   ├── Header.astro    # Navigation, language toggle, and mobile menu
│   │   ├── Hero.astro      # Welcome screen and introduction
│   │   ├── About.astro     # "About me" section with image stack
│   │   ├── Resume.astro    # Work experience, Education, and Projects tabs
│   │   ├── Skills.astro    # Skills grid and level indicators
│   │   └── Contact.astro   # Contact details and email form
│   │
│   ├── layouts/
│   │   └── Layout.astro    # Main HTML shell (metadata, fonts, global scripts/styles)
│   │
│   ├── pages/
│   │   └── index.astro     # The landing page assembling all components
│   │
│   ├── scripts/
│   │   └── script.js       # Client-side JavaScript (tabs, mobile nav, custom animations)
│   │
│   └── styles/
│       └── styles.css      # Core stylesheet with variables and layout styling
│
├── package.json            # NPM dependencies and scripts
├── .gitignore              # Files ignored by Git
└── README.md               # Project documentation
```

---

## 💻 Getting Started

Follow these steps to run the project locally on your machine:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### Installation

1. Clone or download this repository.
2. Open your terminal in the project folder (`resume_new`).
3. Install the dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:4321` to view the website. It will automatically reload when files are changed.

### Build and Deployment

To build the static site for production:
```bash
npm run build
```
This generates a production-ready build in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 📄 License

This project is personal portfolio content. Feel free to use the structure and template for your own portfolio.

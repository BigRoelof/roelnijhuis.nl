# Astro Portfolio & Resume Migration

Dit project is gemigreerd naar **Astro** om de codebase modulair, onderhoudbaar en schaalbaar te maken. De gehele website is opgesplitst in herbruikbare Astro-componenten, wat de laadtijd minimaliseert en de SEO optimaliseert.

## Project Structuur

De bestanden zijn nu als volgt georganiseerd:

```text
├── public/                 # Statische bestanden (afbeeldingen, pdfs, etc.)
│   ├── images/             # Alle logo's en profielfoto's
│   └── CV_Roel_Nijhuis.pdf # Je downloadbare CV
│
├── src/
│   ├── components/         # Modulaire paginaselecties (Astro Componenten)
│   │   ├── Header.astro    # Navigatie, taalwisselaar en mobiel menu
│   │   ├── Hero.astro      # Welkomstscherm en introductie
│   │   ├── About.astro     # Over mij sectie
│   │   ├── Resume.astro    # Werkervaring, Opleiding en Projecten tabs
│   │   ├── Skills.astro    # Vaardighedengrid en voortgangsbalken
│   │   └── Contact.astro   # Contactgegevens en formulier
│   │
│   ├── layouts/
│   │   └── Layout.astro    # De basis HTML structuur (fonts, scripts, css)
│   │
│   ├── pages/
│   │   └── index.astro     # De hoofdpagina die alle componenten samenvoegt
│   │
│   ├── scripts/
│   │   └── script.js       # Client-side JavaScript (voor Lucide, formulier & tabs)
│   │
│   └── styles/
│       └── styles.css      # Hoofdstijlblad met responsive design
│
├── package.json            # Astro configuratie en scripts
└── README_ASTRO.md         # Deze handleiding
```

## Hoe te starten op je eigen machine

Omdat de ontwikkelomgeving offline kan zijn, kun je dit project eenvoudig lokaal opstarten met de volgende stappen:

1. Open je terminal in deze map (`resume_new`).
2. Installeer de Astro-pakketten:
   ```bash
   npm install
   ```
3. Start de lokale ontwikkelserver:
   ```bash
   npm run dev
   ```
4. Open je browser op `http://localhost:4321` om je vernieuwde, modulaire website te bekijken!

## Voordelen van deze structuur
* **Modulair**: Wil je een project toevoegen of een vaardigheid aanpassen? Dan hoef je nu alleen nog maar `src/components/Resume.astro` of `src/components/Skills.astro` te openen in plaats van te zoeken in een HTML-bestand van 1000+ regels.
* **Geoptimaliseerd**: Astro bundelt je CSS en Javascript automatisch en verwijdert ongebruikte elementen voor maximale snelheid.
* **SEO-vriendelijk**: Astro rendert alles als pure, statische HTML aan de serverkant, wat perfect is voor Google-indexering.

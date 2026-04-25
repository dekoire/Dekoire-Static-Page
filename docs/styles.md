# CSS-Architektur

## Datei: `style.css` (~1280 Zeilen)

### Aufbau (in Reihenfolge)

```
1.   CSS Variables (:root)
2.   Reset & Base
3.   Layout-Utilities (.container, .section)
4.   Section-Header (.section__header, .section__label, .section__title)
5.   Buttons (.btn, .btn--primary, .btn--ghost, .btn--full)
6.   Navigation (.nav, .nav__inner, .nav__logo, .nav__links, .nav__toggle)
7.   Hero (.hero, .hero__content, .hero__img-wrap, .hero__badge, ...)
8.   Services (.services__grid, .service-card, .service-card--accent)
9.   About (.about__inner, .about__img-wrap, .about__tag, .about__pillars)
10.  Expertise (.expertise__grid, .expertise__item)
11.  Process (.process__steps, .process__step, .process__connector)
12.  Contact (.contact__inner, .contact-form, .form-group, .map-card)
13.  Social Links (.contact__social, .social-link, .footer__social)
14.  Animations ([data-animate], [data-animate-stagger], @keyframes)
15.  Legal Pages (.legal-page, .legal-hero, .legal-body, .legal-section)
16.  Responsive Utilities (max-width: 768px)
```

---

## CSS Custom Properties (Design-Tokens)

Alle in `:root` definiert. **Einen Wert ändern = siteweite Wirkung.**

### Farben

```css
--color-bg:           #ffffff    /* Haupthintergrund */
--color-bg-soft:      #f8f8f7    /* Abwechselnde Sektionen (leicht grau) */
--color-bg-subtle:    #f2f1ef    /* Noch subtiler – Platzhalter-Hintergründe */
--color-text:         #111110    /* Haupttext + Footer-Hintergrund */
--color-text-muted:   #6b6b68    /* Sekundärtext, Beschreibungen */
--color-text-light:   #a3a39e    /* Placeholder, Labels */
--color-accent:       #7c5cfc    /* ← PRIMÄRE MARKENFARBE (Lila) */
--color-accent-light: #ede9ff    /* Heller Lila-Tint für Hintergründe */
--color-accent-hover: #6a4df0    /* Dunkleres Lila für Hover-States */
--color-border:       #e8e8e5    /* Dezente Rahmen */
--color-border-mid:   #d4d4cf    /* Etwas stärkere Rahmen */
```

**Markenfarbe ändern:** Nur `--color-accent` anpassen – alles andere passt sich automatisch an.

### Schatten

```css
--shadow-sm   /* 1px-3px, sehr subtil */
--shadow-md   /* 4px-16px, für Karten und Modals */
--shadow-lg   /* 12px-40px, für hero/about Bilder */
```

### Abstände

```css
--sp-xs:  0.5rem   /*  8px */
--sp-sm:  1rem     /* 16px */
--sp-md:  1.5rem   /* 24px */
--sp-lg:  2.5rem   /* 40px */
--sp-xl:  4rem     /* 64px */
--sp-2xl: 6rem     /* 96px */
--sp-3xl: 9rem     /* 144px – Sektions-Padding */
```

### Layout

```css
--max-width:  1200px   /* Container-Breite */
--nav-height: 72px     /* Höhe der Navigation */
--radius-sm:  6px
--radius-md:  12px
--radius-lg:  20px
--radius-xl:  28px     /* Für Bild-Container */
```

### Übergänge

```css
--transition:      0.22s ease   /* Schnell – Hover-States */
--transition-slow: 0.38s ease   /* Langsamer – Karten-Hover */
```

---

## BEM-ähnliches Naming-System

Das CSS nutzt ein BEM-ähnliches Muster: `block__element--modifier`

**Beispiele:**
- `.service-card` → Block
- `.service-card__icon` → Element
- `.service-card--accent` → Modifier (die lila AI-Karte)
- `.btn--primary`, `.btn--ghost` → Button-Modifier
- `.nav--scrolled` → Wird via JS auf `<nav>` gesetzt beim Scrollen
- `.is-open` → State-Klasse (Hamburger-Menü)
- `.is-visible` → State-Klasse (Animationen + Formular-Nachrichten)

---

## Responsive Breakpoints

| Breakpoint | Was ändert sich |
|---|---|
| `max-width: 960px` | Hero wird einspaltig (Bild oben, Text unten) |
| `max-width: 960px` | Services-Grid: 4 → 2 Spalten |
| `max-width: 900px` | About-Grid: 2 → 1 Spalte |
| `max-width: 900px` | Expertise-Grid: 3 → 2 Spalten |
| `max-width: 800px` | Prozess-Steps: horizontal → vertikal |
| `max-width: 900px` | Kontakt-Grid: 2 → 1 Spalte |
| `max-width: 768px` | Nav: Desktop → Hamburger-Menü |
| `max-width: 540px` | Services-Grid: 2 → 1 Spalte |
| `max-width: 540px` | Expertise-Grid: 2 → 1 Spalte |

---

## Animations-System

### Hero (CSS-only, kein JS)
Läuft beim Laden automatisch. Jedes Element hat eigenen Delay:
```css
.hero__eyebrow  { animation: fade-up 0.6s ease 0.10s both; }
.hero__headline { animation: fade-up 0.7s ease 0.25s both; }
.hero__sub      { animation: fade-up 0.6s ease 0.42s both; }
.hero__actions  { animation: fade-up 0.6s ease 0.56s both; }
.hero__visual   { animation: fade-up 0.8s ease 0.18s both; }
```

### Scroll-Animationen (JS + CSS)
JS setzt `data-animate` oder `data-animate-stagger` auf Elemente.
CSS definiert den Ausgangszustand (unsichtbar, verschoben).
JS-Observer setzt `.is-visible` → CSS übergeht zum Zielzustand.

```css
[data-animate]            → einzelnes Element, fade+slide-up
[data-animate-stagger]    → Container, Kinder werden gestaffelt animiert
                            (nth-child 1–7, je +0.06s Delay)
```

Animationen sind in `@media (prefers-reduced-motion: no-preference)` gewrappt
→ Nutzer mit Bewegungsempfindlichkeit sehen keine Animationen.

---

## Sonderfälle im CSS

### Nav auf Legal-Seiten
Legal-Seiten (impressum, privacy, agb) haben `class="nav--scrolled"` direkt im HTML,
weil sie keine Hero-Sektion haben und der Nav immer sichtbar sein muss.

### Service-Card Grid
`grid-template-columns: repeat(4, 1fr)` mit letzter Karte `grid-column: span 2`
→ ergibt 4+3 Layout (Zeile 1: 4 Karten, Zeile 2: 2+1 breite Karte)

### Bild-Platzhalter
`hero__img-wrap::before` und `about__img-wrap::before` erzeugen ein
CSS-Raster-Muster als visuellen Platzhalter wenn kein Bild vorhanden.

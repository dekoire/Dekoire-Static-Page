# Seiten & Sektionen

## index.html – Alle Sektionen

### 1. Navigation `<nav class="nav" id="nav">`
- **Verhalten:** Startet transparent, wird beim Scrollen (>20px) solid + Blur-Backdrop
- **Klasse beim Scrollen:** `nav--scrolled` (via JS in `script.js`)
- **Logo:** Text `dekoire`, Link zu `index.html`
- **Links:** Leistungen → `#leistungen`, Über uns → `#about`, Prozess → `#prozess`
- **CTA-Button:** Klasse `nav__cta`, Link zu `#kontakt`
- **Mobile:** Hamburger-Button `#navToggle`, öffnet `#navLinks` mit Klasse `is-open`
- **Breakpoint:** Mobile-Menü ab `max-width: 768px`

### 2. Hero `<section class="hero" id="hero">`
- **Layout:** 2-spaltig (Text links, Bild rechts), Stack auf Mobile
- **Elemente:**
  - `.hero__eyebrow` – kleines Tagline über der Headline
  - `.hero__headline` – `<h1>`, großer Titel
  - `.hero__sub` – Subheadline-Text
  - `.hero__actions` – 2 CTA-Buttons (Primary + Ghost)
  - `.hero__img-wrap` – Bild-Container mit Gradient-Platzhalter
  - `.hero__badge` – Floating Badge unten links am Bild mit pulsierendem Punkt
  - `.hero__scroll-indicator` – animierte Linie unten mittig
- **Bild:** `images/hero-visual.jpg`, bei Fehler automatisch versteckt
- **Animationen:** CSS-Keyframes `fade-up`, gestaffelt per Element (0.1s–0.6s delay)
- **Hintergrund:** Subtiler radialer Gradient (lila) oben rechts via `::before`

### 3. Leistungen `<section class="section services" id="leistungen">`
- **Layout:** 4-spaltiges CSS-Grid
- **Karten:** 7 Service-Cards, letzte (AI) spannt 2 Spalten (`grid-column: span 2`)
- **Card-Struktur:** Icon (inline SVG) + Titel + Beschreibung
- **Spezial-Card:** `.service-card--accent` (lila Hintergrund) = AI Optimierung
- **Hover:** Karte hebt sich an, lila Linie erscheint oben
- **Animation:** `data-animate-stagger` auf `.services__grid` (via JS gesetzt)
- **Sektions-Hintergrund:** `--color-bg-soft` (leicht grau)

**Die 7 Services:**
| # | Titel | Icon |
|---|---|---|
| 1 | Konzeption | Kompass |
| 2 | Design | Pen-Tool |
| 3 | Webauftritte | Layout-Grid |
| 4 | Produktdesign | Layers/Ebenen |
| 5 | Prozessoptimierung | Sliders |
| 6 | Technische Implementierung | Code-Klammern |
| 7 | AI Optimierung | Sparkle-Stern |

### 4. Über uns `<section class="section about" id="about">`
- **Layout:** 2-spaltig (Bild links, Text rechts)
- **Bild:** `images/about-visual.jpg` mit Gradient-Platzhalter + Raster-Overlay
- **Tag:** Schwarzes Floating-Element unten rechts am Bild: „Klar gedacht. Präzise umgesetzt."
- **Inhalt:** Label, H2, 2 Absätze, 4 Pillars (Strategie, Design, Technik, Betrieb)
- **Text (aktuell):** Erwähnt Stuttgart explizit als Standort
- **Animation:** `.about__visual` und `.about__content` separat animiert

### 5. Stärken `<section class="section expertise" id="expertise">`
- **Layout:** 3×2 CSS-Grid mit geteilten Borders (kein Gap, nur Border-Lines)
- **Hintergrund:** `--color-bg-soft`
- **Items:** 6 Stück, je mit Nummer (01–06), H3 und Beschreibung
- **Hover:** Hintergrund wechselt zu `--color-bg`
- **Animation:** `data-animate-stagger` staggert alle 6 Items beim Einrollen

**Die 6 Stärken:**
1. Von der Idee bis zur Umsetzung
2. Klare digitale Konzepte
3. Moderne Webpräsenz
4. E-Commerce & Store-Integration
5. AI-gestützte Prozesse
6. Stilvolle Markenauftritte

### 6. Prozess `<section class="section process" id="prozess">`
- **Layout:** Horizontal Flex mit 4 Steps und 3 Connectors dazwischen
- **Mobile:** Vertical Stack (Flex-Direction: column)
- **Step-Elemente:** Nummerierter Kreis (Border, lila) + H3 + Text
- **Connector:** Linie mit Pfeilspitze via `::after` Pseudo-Element

**Die 4 Prozess-Schritte:**
1. Verstehen
2. Schärfen
3. Umsetzen
4. Optimieren

### 7. Kontakt `<section class="section contact" id="kontakt">`
- **Layout:** 2-spaltig (Info links, Formular rechts), darunter volle Breite: Karte
- **Linke Spalte:**
  - Label + H2 + Beschreibungstext
  - E-Mail-Info + Standort-Info
  - Social-Media-Links (LinkedIn + Instagram)
- **Rechte Spalte:**
  - Erfolgs-/Fehlermeldung (versteckt, via JS eingeblendet)
  - Kontaktformular (Action: `contact.php`, Method: POST)
- **Formularfelder:** Name*, E-Mail*, Unternehmen (optional), Nachricht*
- **Honeypot:** Verstecktes Feld `name="website"` gegen Spam
- **Karte:** OpenStreetMap iframe, Stuttgart (48.7758°N, 9.1829°E), kein API-Key

### 8. Footer `<footer class="footer">`
- **Hintergrund:** `--color-text` (fast schwarz)
- **Elemente:** Logo, Nav-Links (Impressum, Datenschutz, AGB, Kontakt), Social-Icons (LinkedIn, Instagram), Copyright
- **TODO:** AGB-Link entfernen wenn agb.html gelöscht wird

---

## impressum.html

**Status:** FERTIG – echte Daten eingetragen

**Inhalt:**
- Angaben § 5 TMG: Nael Ahmed, dekoire by Nael Ahmed, Eckartshaldenweg 19, 70191 Stuttgart
- Kontakt: Telefon [TODO: eintragen], E-Mail nael@duck.com
- Streitbeilegungshinweis + Quellenlink e-recht24

**Struktur:** Nav (immer solid, `nav--scrolled`) + `legal-hero` Header + `legal-body` + Footer

---

## privacy.html

**Status:** INHALT NOCH PLATZHALTER – echter Text liegt vor, wurde noch nicht eingesetzt

Der fertige Datenschutztext (von e-recht24) wartet auf Umsetzung. Der Text enthält:
- Abschnitt 1: Datenschutz auf einen Blick
- Abschnitt 2: Hosting (IONOS)
- Abschnitt 3: Allgemeine Hinweise, Rechtsgrundlagen, Betroffenenrechte

**TODO:** Inhalt des `<main>` Blocks durch den echten Text ersetzen.

---

## agb.html

**Status:** TODO LÖSCHEN – Nutzer hat das angefragt

Enthält nur Platzhalter-Sektionen (§1–§10). Soll entfernt werden.
Nach dem Löschen: AGB-Links aus allen Footer-Navs entfernen (index.html, impressum.html, privacy.html).

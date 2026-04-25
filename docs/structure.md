# Dateistruktur

## Verzeichnis-Übersicht

```
Dekoire-Static-Page/
├── index.html          ← Hauptseite (alle 8 Sektionen, ~510 Zeilen)
├── style.css           ← Komplettes Design-System (~1280 Zeilen)
├── script.js           ← Vanilla JS (~130 Zeilen)
├── contact.php         ← PHP Mail-Handler (~100 Zeilen)
├── impressum.html      ← Impressum-Seite (~95 Zeilen)
├── privacy.html        ← Datenschutz-Seite (~120 Zeilen, Inhalt TODO)
├── agb.html            ← AGB-Seite (~150 Zeilen, TODO: löschen)
├── images/             ← Ordner MUSS noch erstellt werden
│   ├── hero-visual.jpg     ← Noch nicht vorhanden – ersetzen!
│   └── about-visual.jpg    ← Noch nicht vorhanden – ersetzen!
├── docs/               ← Dokumentation für Agents
│   ├── structure.md    ← Diese Datei
│   ├── pages.md        ← Seiten & Sektionen
│   ├── styles.md       ← CSS-Architektur
│   ├── functions.md    ← JS & PHP Logik
│   └── deploy.md       ← Deployment-Guide
└── CLAUDE.md           ← Agent-Einstiegspunkt
```

## Wo welche Inhalte stehen

### Texte ändern
| Inhalt | Datei | Position |
|---|---|---|
| Hero-Headline | `index.html` | Zeile ~55, `.hero__headline` |
| Hero-Subheadline | `index.html` | Zeile ~58, `.hero__sub` |
| Hero-Eyebrow | `index.html` | Zeile ~52, `.hero__eyebrow` |
| About-Text (2 Absätze) | `index.html` | Zeile ~233–234 |
| Service-Cards (7 Stück) | `index.html` | Zeile ~107–196 |
| Expertise-Items (6 Stück) | `index.html` | Zeile ~261–291 |
| Prozess-Schritte (4 Stück) | `index.html` | Zeile ~309–337 |
| Kontakt-Intro-Text | `index.html` | Zeile ~356 |
| Footer Copyright | `index.html` | Zeile ~500 |
| Impressum-Inhalt | `impressum.html` | `<main>` Block |
| Datenschutz-Inhalt | `privacy.html` | `<main>` Block |

### Links & URLs ändern
| Was | Datei | Suchbegriff |
|---|---|---|
| CTA-Button „Projekt starten" | `index.html` | `href="#kontakt"` (Zeile ~62) |
| LinkedIn-URL | `index.html` | `href="#"` bei `aria-label="LinkedIn"` (~373, ~483) |
| Instagram-URL | `index.html` | `href="#"` bei `aria-label="Instagram"` (~380, ~490) |
| E-Mail-Adresse (Anzeige) | `index.html` | `nael@duck.com` (~362) |
| E-Mail-Adresse (PHP) | `contact.php` | `RECIPIENT_EMAIL` Konstante (~Zeile 18) |
| Karten-Koordinaten | `index.html` | `bbox=` im iframe-src (~444) |

### Bilder ersetzen
| Bild | Pfad | Empfohlene Größe |
|---|---|---|
| Hero-Bild | `images/hero-visual.jpg` | 900×1100px, Hochformat |
| About-Bild | `images/about-visual.jpg` | 800×1050px, Hochformat |

Bilder einfach in den `images/` Ordner legen (Ordner erst erstellen).
Der `onerror="this.style.display='none'"` Handler versteckt fehlende Bilder
automatisch und zeigt stattdessen einen CSS-Platzhalter.

## Verlinkungen zwischen Seiten

```
index.html
  ├── #leistungen     (Anker-Link, gleiche Seite)
  ├── #about          (Anker-Link, gleiche Seite)
  ├── #prozess        (Anker-Link, gleiche Seite)
  ├── #kontakt        (Anker-Link, gleiche Seite)
  ├── contact.php     (Formular-Action, POST)
  ├── privacy.html    (Link im Formular-Consent + Footer)
  ├── impressum.html  (Footer)
  └── agb.html        (Footer – TODO: entfernen wenn AGB gelöscht)

impressum.html
  └── index.html      (Logo + Zurück-Link + Footer-Links)

privacy.html
  └── index.html      (Logo + Zurück-Link + Footer-Links)

agb.html
  └── index.html      (Logo + Zurück-Link + Footer-Links)

contact.php
  └── index.html      (Redirect nach Formular-Submit mit ?sent=1 oder ?sent=error)
```

## Abhängigkeiten

### Externe Dienste (CDN / Third-Party)

| Dienst | URL | Zweck | Pflicht? | Fallback |
|---|---|---|---|---|
| Google Fonts | `fonts.googleapis.com` | Inter-Schrift (300–800) | Nein | `system-ui, -apple-system, sans-serif` aus `--font-sans` |
| OpenStreetMap | `openstreetmap.org` | Karten-Embed im Kontaktbereich | Nein | iframe zeigt OSM-Fehlerseite, Rest der Seite unberührt |

### Server / Hosting

| Abhängigkeit | Version | Zweck | Pflicht? |
|---|---|---|---|
| PHP | >= 7.4 | Kontaktformular `contact.php` | Ja – ohne PHP kein Formular |
| PHP `mail()` | – | E-Mails versenden | Ja – muss auf Hoster aktiviert sein |
| Webserver | Apache / Nginx / LiteSpeed | HTML/CSS/JS ausliefern | Ja (Standard überall) |
| SSL-Zertifikat | TLS 1.2+ | HTTPS für Formular | Empfohlen (Pflicht für Datenschutz) |

### Browser-APIs (JavaScript)

Kein Polyfill eingebaut. Alle APIs sind in allen modernen Browsern verfügbar (Chrome 80+, Firefox 75+, Safari 14+, Edge 80+).

| API | Verwendet in | Fallback wenn nicht vorhanden |
|---|---|---|
| `IntersectionObserver` | `script.js` – Scroll-Animationen | Animationen werden per `prefers-reduced-motion` oder Guard übersprungen |
| `URLSearchParams` | `script.js` – Formular-Feedback lesen | Parameter werden nicht gelesen, Meldung erscheint nicht |
| `history.replaceState` | `script.js` – URL nach Redirect bereinigen | URL bleibt mit `?sent=` Parameter (harmlos) |
| `window.matchMedia` | `script.js` – `prefers-reduced-motion` prüfen | Animationen laufen immer (kein Schaden) |
| `element.classList` | `script.js` – überall | IE11 nicht unterstützt (irrelevant 2025) |
| CSS `backdrop-filter` | `style.css` – Nav-Blur-Effekt | Nav bleibt weiß ohne Blur (Safari braucht `-webkit-backdrop-filter`) |
| CSS `aspect-ratio` | `style.css` – Bild-Container | Ältere Browser: Container kollabiert (kein Bild sichtbar) |
| CSS `clamp()` | `style.css` – Responsive Typografie | Ältere Browser: Feste Fallback-Größe |

### Keine Abhängigkeiten (bewusst weggelassen)

| Was | Warum nicht |
|---|---|
| npm / Node.js | Kein Build-Step – Dateien direkt deployen |
| Composer / PHP-Pakete | Nur `mail()` nötig, kein Mailer-Framework |
| React / Vue / Framework | Plain HTML – kein Framework-Overhead |
| jQuery | Nicht nötig – vanilla JS reicht |
| Icon-Bibliothek | Icons sind inline SVG (Lucide) – keine externe Datei |
| CSS-Präprozessor | Reines CSS mit Custom Properties |
| Datenbank | Kontaktformular speichert nichts – nur E-Mail-Versand |
| Cookies / LocalStorage | Nichts wird gespeichert – kein Banner nötig (Stand jetzt) |

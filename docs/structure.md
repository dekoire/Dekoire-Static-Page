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

## Externe Abhängigkeiten

| Dienst | Zweck | Erforderlich? |
|---|---|---|
| Google Fonts (fonts.googleapis.com) | Inter-Schrift laden | Nein – fällt auf System-Font zurück |
| OpenStreetMap (openstreetmap.org) | Karten-Embed im Kontaktbereich | Nein – iframe zeigt Fehlermeldung offline |
| PHP `mail()` | E-Mails versenden | Ja – Hoster muss mail() unterstützen |

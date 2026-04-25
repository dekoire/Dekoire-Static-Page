# Deployment & Offene Aufgaben

## Deployment

### Voraussetzungen
- PHP-fähiges Hosting (Shared Hosting reicht aus)
- PHP >= 7.4
- `mail()` Funktion aktiviert (Standard bei den meisten Hostern)
- SSL (HTTPS) – wichtig für Formular-Sicherheit

### Empfohlene Hoster (günstig, PHP-Support)
- **IONOS** (Datenschutztext referenziert IONOS bereits)
- **All-Inkl.com**
- **Hetzner Webhosting**
- **Strato**

### Deploy-Schritte

```
1. Alle Dateien hochladen (FTP/SFTP/Git-Deploy):
   index.html, style.css, script.js, contact.php,
   impressum.html, privacy.html, agb.html (oder gelöscht lassen)

2. Ordner "images/" erstellen und Bilder hochladen:
   images/hero-visual.jpg
   images/about-visual.jpg

3. Domain auf den Hosting-Ordner zeigen lassen

4. SSL aktivieren (meist 1 Klick im Hoster-Panel)

5. Kontaktformular testen:
   - Formular auf dekoire.com/index.html#kontakt ausfüllen
   - Absenden → prüfen ob E-Mail bei nael@duck.com ankommt
   - Erfolgs-Meldung auf der Seite prüfen
```

### Kein Build-Step notwendig
Die Dateien können direkt hochgeladen werden. Kein npm, kein webpack,
kein Composer. Die `docs/` und `CLAUDE.md` Dateien sind nur Dokumentation
und können optional weggelassen werden (haben keinen Einfluss auf die Website).

---

## Was noch fehlt / offene TODOs

### Priorität HOCH

**1. Bilder hinzufügen**
- `images/hero-visual.jpg` – Portrait-Format, ~900×1100px
- `images/about-visual.jpg` – Portrait-Format, ~800×1050px
- Empfehlung: Moderne, helle Workspace-Fotos oder abstrakte Architektur
- Ordner `images/` muss erst erstellt werden

**2. privacy.html – Datenschutztext einsetzen**
- Der fertige Text liegt vor (von e-recht24 generiert)
- Inhalt: §1 Überblick, §2 Hosting IONOS, §3 Rechtsgrundlagen + Betroffenenrechte
- Abschnitt „Verantwortliche Stelle" mit echten Daten befüllen:
  - Name: Nael Ahmed / dekoire by Nael Ahmed
  - Adresse: Eckartshaldenweg 19, 70191 Stuttgart
  - E-Mail: nael@duck.com
- Den `<main>` Block in `privacy.html` ersetzen

**3. agb.html löschen**
- Datei löschen
- AGB-Link aus Footer entfernen in: `index.html`, `impressum.html`, `privacy.html`
- Footer-Nav-Code in allen drei Dateien:
  ```html
  <!-- Diese Zeile löschen: -->
  <a href="agb.html">AGB</a>
  ```

### Priorität MITTEL

**4. Social-Media-URLs eintragen**
- In `index.html` bei beiden LinkedIn-Links: `href="#"` → echte URL
- In `index.html` bei beiden Instagram-Links: `href="#"` → echte URL
- LinkedIn findet sich an zwei Stellen: Kontaktbereich (~Zeile 372) + Footer (~Zeile 483)
- Instagram ebenfalls an zwei Stellen: ~Zeile 380 + ~Zeile 490

**5. Telefonnummer im Impressum**
- `impressum.html`, Zeile ~62: `Telefon: [Telefonnummer]` → echte Nummer

**6. Consent-Text im Kontaktformular anpassen**
- `index.html`, Zeile ~428–432
- Aktueller Platzhalter: `[Diesen Text an Ihren Rechtstext anpassen.]`
- An die fertige Datenschutzerklärung anpassen

### Priorität NIEDRIG

**7. Meta-Description aktualisieren**
- `index.html` Zeile ~6: `<meta name="description" content="...">`
- Aktuell generisch, kann für SEO optimiert werden

**8. Favicon hinzufügen**
- Noch kein Favicon vorhanden
- `<link rel="icon" href="favicon.ico">` in den `<head>` aller HTML-Dateien
- Oder SVG-Favicon: `<link rel="icon" type="image/svg+xml" href="favicon.svg">`

**9. Open Graph Tags für Social Sharing**
- Für schöne Link-Vorschauen bei WhatsApp, LinkedIn etc.
- In `<head>` von `index.html` ergänzen:
  ```html
  <meta property="og:title" content="Dekoire – Digitale Lösungen mit Anspruch">
  <meta property="og:description" content="...">
  <meta property="og:image" content="https://dekoire.com/images/og-image.jpg">
  <meta property="og:url" content="https://dekoire.com">
  ```

**10. Google Analytics / Tracking (optional)**
- Aktuell kein Tracking eingebaut
- Falls gewünscht: nur DSGVO-konform einbauen (Consent-Banner nötig)

**11. Datums-Felder in Rechtsseiten**
- `impressum.html` + `privacy.html`: `Zuletzt aktualisiert: [Datum eintragen]`

---

## Dateien und ihre Größen (Stand: Erstellung)

| Datei | Größe | Zeilen |
|---|---|---|
| `index.html` | ~24 KB | ~510 |
| `style.css` | ~31 KB | ~1280 |
| `script.js` | ~4 KB | ~130 |
| `contact.php` | ~4 KB | ~100 |
| `impressum.html` | ~3 KB | ~95 |
| `privacy.html` | ~5 KB | ~120 |
| `agb.html` | ~5 KB | ~150 |

---

## Git-Workflow

```
Branch: claude/php-contact-form-OcyYr
Remote: origin (dekoire/Dekoire-Static-Page auf GitHub)
PR:     https://github.com/dekoire/Dekoire-Static-Page/pull/1

Änderungen machen → git add → git commit → git push origin claude/php-contact-form-OcyYr
NIE direkt auf main pushen.
```

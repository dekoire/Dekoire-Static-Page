# dekoire.com – Agent Briefing

Premium-Website für dekoire.com. Plain HTML/CSS/JS + PHP Kontaktformular.
Kein Framework, kein Build-Step, kein npm.

## Schnellübersicht

| Thema | Dokument |
|---|---|
| Dateistruktur & wo was liegt | [docs/structure.md](docs/structure.md) |
| Alle Seiten & Sektionen | [docs/pages.md](docs/pages.md) |
| CSS-System & Design-Tokens | [docs/styles.md](docs/styles.md) |
| JavaScript & PHP Funktionen | [docs/functions.md](docs/functions.md) |
| Deployment & offene Aufgaben | [docs/deploy.md](docs/deploy.md) |

## Stack auf einen Blick

- **HTML** – semantisch, `lang="de"`, keine Templates
- **CSS** – reines CSS mit Custom Properties (keine Präprozessoren)
- **JavaScript** – vanilla ES5-kompatibel, kein Framework, IIFE-Pattern
- **PHP** – `contact.php` mit `mail()`, kein Composer, kein Framework
- **Fonts** – Inter via Google Fonts CDN (in HTML-Head austauschbar)
- **Icons** – inline SVG (Lucide-Icons), keine externe Bibliothek
- **Karte** – OpenStreetMap iframe, kein API-Key nötig

## Wichtigste Dateien

```
index.html      ← gesamte Hauptseite (alle 8 Sektionen)
style.css       ← komplettes Design-System (~1280 Zeilen)
script.js       ← Nav, Menü, Formular-Feedback, Animationen
contact.php     ← Formular-Handler (E-Mail senden)
impressum.html  ← Impressum (FERTIG mit echten Daten)
privacy.html    ← Datenschutz (Inhalt noch Platzhalter – TODO)
agb.html        ← AGB (TODO: löschen oder befüllen)
```

## Inhaber / Kontakt

- **Name:** Nael Ahmed
- **Marke:** dekoire by Nael Ahmed
- **Adresse:** Eckartshaldenweg 19, 70191 Stuttgart
- **E-Mail:** nael@duck.com
- **Standort:** Stuttgart, Baden-Württemberg

## Git

- **Repo:** `dekoire/Dekoire-Static-Page`
- **Arbeits-Branch:** `claude/php-contact-form-OcyYr`
- **PR:** https://github.com/dekoire/Dekoire-Static-Page/pull/1
- Immer auf diesem Branch entwickeln, nie direkt auf `main`

## Offene TODOs (Priorität)

1. `privacy.html` – echten Datenschutztext einsetzen (Inhalt bereit, wartet auf Umsetzung)
2. `agb.html` – löschen (Nutzer hat das angefragt, noch nicht umgesetzt)
3. Beide Bilder ersetzen: `images/hero-visual.jpg` + `images/about-visual.jpg`
4. Social-Media-URLs in `index.html` ersetzen (aktuell `href="#"`)
5. Telefonnummer im Impressum eintragen
6. Consent-Text im Kontaktformular an echten Rechtstext anpassen

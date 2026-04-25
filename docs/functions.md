# JavaScript & PHP – Funktionen

## script.js (~130 Zeilen)

Alles in einer IIFE (`(function(){ 'use strict'; ... }())`), kein globaler Scope.

---

### 1. Navbar-Scroll-Verhalten

```js
// Element: <nav id="nav">
// Trigger: window scroll
// Schwellwert: 20px
// Aktion: fügt/entfernt Klasse "nav--scrolled" hinzu
```

**Was `nav--scrolled` bewirkt (CSS):**
- `background: rgba(255,255,255,0.93)` + `backdrop-filter: blur(14px)`
- `box-shadow` wird sichtbar
- `{ passive: true }` für Performance

---

### 2. Mobile Menü

```js
// Button:  <button id="navToggle">
// Liste:   <ul id="navLinks">
// Toggle:  Klasse "is-open" auf beiden Elementen
// ARIA:    aria-expanded + aria-label werden synchron gesetzt
// Close:   Alle Links im Menü schließen es beim Click automatisch
```

---

### 3. Formular-Feedback nach Submit

`contact.php` leitet nach dem Absenden zurück mit URL-Parameter:
- `?sent=1` → Erfolgsmeldung
- `?sent=error` → Fehlermeldung

```js
// Liest: new URLSearchParams(window.location.search).get('sent')
// Zeigt: Element #formSuccess oder #formError via Klasse "is-visible"
// Scrollt: zur #kontakt Sektion (setTimeout 80ms)
// Bereinigt: URL via history.replaceState (entfernt ?sent= Parameter)
```

---

### 4. Scroll-Animationen (IntersectionObserver)

**Schritt 1 – Elemente markieren (JS setzt Attribute automatisch):**

```js
// data-animate (einzelne Elemente):
'.section__header', '.about__visual', '.about__content',
'.contact__intro', '.contact__form-wrap', '.contact__map'

// data-animate-stagger (Container mit Kinder-Stagger):
'.services__grid', '.expertise__grid', '.process__steps'
```

**Schritt 2 – Observer:**
```js
// threshold: 0.12 → Animation startet wenn 12% des Elements sichtbar
// Einmalig: Nach Trigger wird unobserved (kein Re-Trigger)
// Fallback: Wenn prefers-reduced-motion aktiv → sofort .is-visible setzen
```

**CSS übernimmt den Rest** – siehe `docs/styles.md` Abschnitt Animationen.

---

## contact.php (~100 Zeilen)

### Konfiguration (Zeile 17–26)
```php
define('RECIPIENT_EMAIL', 'nael@duck.com');  // ← hier E-Mail ändern
define('SITE_NAME',       'Dekoire');
define('REDIRECT_URL',    'index.html');
```

### Ablauf

```
POST-Request eingehend
    ↓
Nur POST akzeptieren (sonst Redirect zu index.html)
    ↓
Honeypot-Check: $_POST['website'] befüllt? → fake-success, Exit
    ↓
Sanitize: strip_tags() + trim() + htmlspecialchars() auf alle Felder
    ↓
Validierung:
  - name, email, message dürfen nicht leer sein
  - email muss FILTER_VALIDATE_EMAIL bestehen
  - name max 200 Zeichen, company max 200, message max 5000
  - Kein \r oder \n in name/email (Header-Injection-Schutz)
    ↓
E-Mail bauen:
  - From: Dekoire <nael@duck.com>
  - Reply-To: {Name} <{E-Mail des Absenders}>
  - Content-Type: text/plain; charset=UTF-8
  - Subject: [Dekoire] Neue Anfrage von {Name}
    ↓
mail() aufrufen
    ↓
Redirect: index.html?sent=1 (Erfolg) oder index.html?sent=error
```

### Honeypot-Feld
Das Feld `name="website"` im Formular ist per CSS vollständig versteckt:
```css
.hp-field { position: absolute; width: 1px; height: 1px; opacity: 0; ... }
```
Echte Nutzer sehen und befüllen es nie. Bots füllen alles aus → werden erkannt.

### Sicherheits-Maßnahmen
| Maßnahme | Schutz gegen |
|---|---|
| `strip_tags()` | HTML/Script-Injection in E-Mail-Body |
| `htmlspecialchars()` | XSS (falls Output irgendwo landet) |
| `FILTER_VALIDATE_EMAIL` | Ungültige E-Mail-Adressen |
| `preg_match('/[\r\n]/')` | E-Mail Header-Injection |
| Längenbeschränkungen | Übermäßig lange Eingaben |
| Honeypot | Einfache Spam-Bots |
| POST-Only | Direkter URL-Aufruf |

### Hinweis zu mail()
`mail()` funktioniert auf den meisten Shared-Hostern (IONOS, All-Inkl, Hetzner Webhosting).
Falls es nicht funktioniert: `RECIPIENT_EMAIL` korrekt gesetzt? Hoster-Docs prüfen.
Für zuverlässigeren Versand: SMTP via PHPMailer einbauen (erfordert Composer).

---

## Formular im HTML (index.html)

```html
<form action="contact.php" method="POST" id="contactForm">
  <input type="text" name="website" class="hp-field" ...>   <!-- Honeypot -->
  <input name="name"    required>
  <input name="email"   type="email" required>
  <input name="company">                                      <!-- optional -->
  <textarea name="message" required></textarea>
  <button type="submit">Nachricht senden</button>
</form>
```

Kein JavaScript-Submit – das Formular sendet nativ per POST.
JS wird nur für die Erfolgs-/Fehlermeldung nach dem Redirect genutzt.

<?php
/**
 * contact.php – Dekoire Contact Form Handler
 *
 * Quick edits:
 *   RECIPIENT_EMAIL  → your email address
 *   SITE_NAME        → your brand / site name (used in subject line)
 *   REDIRECT_URL     → path to your index page
 *
 * Notes:
 *   - Uses PHP mail() which works on most shared hosting.
 *     If it doesn't work on your host, replace the mail() call
 *     with a transactional service (Brevo, Mailgun, Postmark, etc.).
 *   - No database required.
 *   - Honeypot field provides basic spam protection.
 *   - All user input is sanitised before use.
 */

/* ── CONFIGURATION ──────────────────────────────────────────── */

// Edit: recipient email address
define('RECIPIENT_EMAIL', 'nael@duck.com');

// Edit: site/brand name (appears in email subject)
define('SITE_NAME', 'Dekoire');

// Edit: redirect target after form submit (relative path)
define('REDIRECT_URL', 'index.html');

/* ─────────────────────────────────────────────────────────────── */


// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . REDIRECT_URL);
    exit;
}

/* ── HONEYPOT CHECK ─────────────────────────────────────────── */
// Bots often fill every visible field. The "website" field is
// hidden via CSS, so real users never touch it.
if (!empty($_POST['website'])) {
    // Silently pretend success to avoid revealing the check
    header('Location: ' . REDIRECT_URL . '?sent=1');
    exit;
}

/* ── SANITIZE INPUTS ────────────────────────────────────────── */
function clean(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['name']    ?? '');
$email   = clean($_POST['email']   ?? '');
$company = clean($_POST['company'] ?? '');
$message = clean($_POST['message'] ?? '');

/* ── VALIDATION ─────────────────────────────────────────────── */
$errors = [];

if ($name    === '') { $errors[] = 'Name fehlt.'; }
if ($email   === '') { $errors[] = 'E-Mail fehlt.'; }
if ($message === '') { $errors[] = 'Nachricht fehlt.'; }

// Email format check
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Ungültige E-Mail-Adresse.';
}

// Length limits
if (strlen($name)    > 200)  { $errors[] = 'Name zu lang.'; }
if (strlen($company) > 200)  { $errors[] = 'Unternehmen zu lang.'; }
if (strlen($message) > 5000) { $errors[] = 'Nachricht zu lang (max. 5000 Zeichen).'; }

// Header injection guard: reject newlines in any header-bound fields
if (preg_match('/[\r\n]/', $name) || preg_match('/[\r\n]/', $email)) {
    $errors[] = 'Ungültige Eingabe.';
}

if (!empty($errors)) {
    header('Location: ' . REDIRECT_URL . '?sent=error');
    exit;
}

/* ── BUILD EMAIL ────────────────────────────────────────────── */
$company_line = ($company !== '') ? "\nUnternehmen: {$company}" : '';

$body = <<<TEXT
Neue Kontaktanfrage über die Dekoire-Website.

Name:    {$name}{$company_line}
E-Mail:  {$email}

Nachricht:
{$message}

---
Gesendet über das Kontaktformular auf dekoire.com.
TEXT;

$subject = '[' . SITE_NAME . '] Neue Anfrage von ' . $name;

$headers = implode("\r\n", [
    'From: '    . SITE_NAME . ' <' . RECIPIENT_EMAIL . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . PHP_VERSION,
]);

/* ── SEND & REDIRECT ────────────────────────────────────────── */
$ok = mail(RECIPIENT_EMAIL, $subject, $body, $headers);

header('Location: ' . REDIRECT_URL . ($ok ? '?sent=1' : '?sent=error'));
exit;

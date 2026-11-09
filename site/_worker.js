// Wachtwoordslot voor het dashboard. Draait bij Cloudflare voor elk verzoek.
// Zonder geldig wachtwoord in DASHBOARD_WACHTWOORD blijft alles dicht.
const COOKIE = "tcb_sessie";
const SESSION_DAYS = 90;
const MIN_LENGTH = 12;
const LOGIN_PATH = "/__inloggen";
const encoder = new TextEncoder();

const hmacKey = (secret) =>
  crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
const toHex = (buffer) => [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
const fromHex = (text) => new Uint8Array(text.match(/../g).map((h) => parseInt(h, 16)));

async function makeToken(secret, expires) {
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder.encode(String(expires)));
  return `${expires}.${toHex(signature)}`;
}

async function tokenIsValid(secret, token) {
  const match = /^(\d{10,})\.([0-9a-f]{64})$/.exec(token || "");
  if (!match || Number(match[1]) < Date.now() / 1000) return false;
  return crypto.subtle.verify("HMAC", await hmacKey(secret), fromHex(match[2]), encoder.encode(match[1]));
}

async function passwordMatches(secret, attempt) {
  const label = encoder.encode("tradingcardbrain");
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(attempt || " "), label);
  return crypto.subtle.verify("HMAC", await hmacKey(secret), signature, label);
}

function readCookie(request, name) {
  for (const part of (request.headers.get("Cookie") || "").split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return "";
}

function page(status, title, body) {
  const html = `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>TradingCardBrain</title><style>:root{color-scheme:light dark}body{font:17px/1.5 system-ui,sans-serif;max-width:24em;margin:0 auto;padding:40px 16px;background:Canvas;color:CanvasText}input,button{width:100%;min-height:48px;font:inherit;margin-top:10px;padding:8px 10px;border-radius:8px;border:1px solid GrayText;box-sizing:border-box}button{font-weight:600}small{display:block;margin-top:24px;color:GrayText}a{color:inherit}</style></head><body><h1>${title}</h1>${body}<small>Prijzen van <a href="https://www.pricecharting.com" rel="noopener">PriceCharting</a>. Niet verbonden met PriceCharting.</small></body></html>`;
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
      "Referrer-Policy": "no-referrer",
    },
  });
}

function loginPage(message) {
  const note = message ? `<p role="alert">${message}</p>` : "";
  return page(
    401,
    "Inloggen",
    `${note}<form method="POST" action="${LOGIN_PATH}"><label for="w">Wachtwoord</label><input id="w" name="wachtwoord" type="password" autocomplete="current-password" required autofocus><button type="submit">Inloggen</button></form>`
  );
}

export default {
  async fetch(request, env) {
    const secret = env.DASHBOARD_WACHTWOORD || "";
    if (secret.length < MIN_LENGTH) {
      return page(503, "Nog niet ingesteld", `<p>Dit dashboard is dicht totdat er een wachtwoord van minstens ${MIN_LENGTH} tekens is ingesteld. Volg de stap over het wachtwoord in SETUP.md.</p>`);
    }
    const url = new URL(request.url);

    if (url.pathname === LOGIN_PATH && request.method === "POST") {
      const form = await request.formData().catch(() => null);
      const attempt = form ? String(form.get("wachtwoord") || "") : "";
      if (!(await passwordMatches(secret, attempt))) {
        await new Promise((resolve) => setTimeout(resolve, 900));
        return loginPage("Dat wachtwoord klopt niet.");
      }
      const expires = Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400;
      const cookie = `${COOKIE}=${await makeToken(secret, expires)}; Path=/; Max-Age=${SESSION_DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`;
      return new Response(null, { status: 303, headers: { Location: "/", "Set-Cookie": cookie, "Cache-Control": "no-store" } });
    }

    if (!(await tokenIsValid(secret, readCookie(request, COOKIE)))) return loginPage("");

    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    response.headers.set("X-Robots-Tag", "noindex");
    response.headers.set("Cache-Control", "private, no-cache");
    return response;
  },
};

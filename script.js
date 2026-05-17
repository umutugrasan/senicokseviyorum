// ───── Config ─────
const PDF_FILENAME = 'PEKİ BİZ ŞİMDİ NEYİZ BİRLEŞTİRİLMİŞ.pdf';
const ANNIVERSARY_START = new Date('2024-05-18T00:00:00');

// Compute absolute PDF URL so QR works wherever it's hosted
function getPdfUrl() {
  const base = window.location.href.split('#')[0].split('?')[0];
  const dir = base.endsWith('/') ? base : base.substring(0, base.lastIndexOf('/') + 1);
  return dir + encodeURIComponent(PDF_FILENAME);
}

// ───── Floating hearts ─────
const heartChars = ['♥', '♡', '❤', '💕', '💖', '🌸'];
const heartsLayer = document.querySelector('.hearts');

function spawnHeart() {
  const h = document.createElement('span');
  h.className = 'heart';
  h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  const size = 14 + Math.random() * 24;
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = size + 'px';
  h.style.animationDuration = (8 + Math.random() * 7) + 's';
  h.style.color = ['#ff8fb1', '#e6447a', '#ffb3cf', '#ff5c8a'][Math.floor(Math.random() * 4)];
  heartsLayer.appendChild(h);
  setTimeout(() => h.remove(), 16000);
}

setInterval(spawnHeart, 600);
for (let i = 0; i < 8; i++) setTimeout(spawnHeart, i * 200);

// ───── Sparkles ─────
const sparklesLayer = document.querySelector('.sparkles');
for (let i = 0; i < 40; i++) {
  const s = document.createElement('span');
  s.className = 'sparkle';
  s.style.left = Math.random() * 100 + 'vw';
  s.style.top = Math.random() * 100 + 'vh';
  s.style.animationDelay = (Math.random() * 3) + 's';
  s.style.animationDuration = (2 + Math.random() * 3) + 's';
  sparklesLayer.appendChild(s);
}

// ───── Live counter (days & hours together) ─────
function updateCounter() {
  const counter = document.getElementById('counter');
  if (!counter) return;
  const now = new Date();
  const diff = now - ANNIVERSARY_START;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  counter.innerHTML = `birlikte tam <strong>${days}</strong> gün · <strong>${hours}</strong> saat · <strong>${mins}</strong> dakika · <strong>${secs}</strong> saniye`;
}
updateCounter();
setInterval(updateCounter, 1000);

// ───── Petal burst on open ─────
function petalBurst() {
  const petals = ['♥', '♡', '🌸', '💖', '✨'];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = petals[Math.floor(Math.random() * petals.length)];
    const angle = (Math.PI * 2 * i) / 28 + Math.random() * 0.3;
    const dist = 200 + Math.random() * 250;
    p.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--by', Math.sin(angle) * dist + 'px');
    p.style.setProperty('--br', (Math.random() * 720 - 360) + 'deg');
    p.style.color = ['#ff8fb1', '#e6447a', '#ffb3cf', '#ff5c8a', '#d4a373'][Math.floor(Math.random() * 5)];
    p.style.fontSize = (18 + Math.random() * 16) + 'px';
    p.style.animationDelay = (Math.random() * 0.25) + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2000);
  }
}

// ───── Open transition ─────
const openBtn = document.getElementById('openBtn');
const stageIntro = document.getElementById('stageIntro');
const stageGift = document.getElementById('stageGift');

let qrRendered = false;

function renderQr() {
  if (qrRendered) return;
  const url = getPdfUrl();
  const target = document.getElementById('qrcode');
  target.innerHTML = '';
  new QRCode(target, {
    text: url,
    width: 240,
    height: 240,
    colorDark: '#c2185b',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
  document.getElementById('directLink').href = url;
  qrRendered = true;
}

openBtn.addEventListener('click', () => {
  petalBurst();
  setTimeout(() => {
    stageIntro.classList.add('hidden');
    stageGift.classList.remove('hidden');
    renderQr();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 450);
});

// ───── Music toggle (uses bundled file if present, falls back silently) ─────
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
let audio = null;
let musicOn = false;

musicToggle.addEventListener('click', async () => {
  if (!audio) {
    audio = new Audio('music.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audio.addEventListener('error', () => {
      musicToggle.style.display = 'none';
    });
  }
  if (musicOn) {
    audio.pause();
    musicToggle.classList.remove('playing');
    musicIcon.textContent = '♪';
  } else {
    try {
      await audio.play();
      musicToggle.classList.add('playing');
      musicIcon.textContent = '♫';
    } catch (e) {
      musicToggle.style.display = 'none';
    }
  }
  musicOn = !musicOn;
});

// ───── Keyboard: Enter/Space on intro opens too ─────
document.addEventListener('keydown', (e) => {
  if (!stageIntro.classList.contains('hidden') && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    openBtn.click();
  }
});

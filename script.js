/* ═══════════════════════════════════════════
   LOVE WEBSITE — script.js
   ─────────────────────────────────────────
   PASSWORD: "iloveyou"  ← change as needed
   START DATE: Change LOVE_START_DATE below
═══════════════════════════════════════════ */

'use strict';

// ─── CONFIG ───────────────────────────────
const LOVE_START_DATE = new Date("2025-01-10T00:00:00"); // 📅 Change this

// ─── GALLERY ITEMS ────────────────────────
const GALLERY_ITEMS = [
  { type: "img", src: "images/Image0244.jpg", label: "Our first photo" },
  { type: "img", src: "images/sunset.png",     label: "That sunset" },
  { type: "img", src: "images/coffee.png",     label: "Coffee mornings" },
  { type: "video", src: "videos/video1.mp4",   label: "A beautiful moment" },
  { type: "video", src: "videos/video2.mp4",   label: "Our first trip" },
  { type: "img", src: "images/music.png",      label: "Our song night" },
  { type: "img", src: "images/moment.png",     label: "A candid snap" },
  { type: "img", src: "images/night.png",      label: "Late-night talks" },
];

// ─── CHAT MESSAGES ────────────────────────
const CHAT_MESSAGES = [
  { type: "received", text: "Hey… gooby .. ?", time: "10:32 PM" },
  { type: "sent",     text: "poodi korangu..", time: "10:33 PM" },
  { type: "received", text: "I Miss you..", time: "10:33 PM" },
  { type: "sent",     text: "naanum than thangoo", time: "10:34 PM" },
  { type: "received", text: "poo da..", time: "10:35 PM" },
  { type: "sent",     text: "serii.. ❤️", time: "10:35 PM" },
];

// ══════════════════════════════════════════
// INTRO SEQUENCE
// ══════════════════════════════════════════
function runIntro() {
  const line1 = document.getElementById("intro-line1");
  const line2 = document.getElementById("intro-line2");
  const introScreen = document.getElementById("intro-screen");

  setTimeout(() => line1.classList.add("visible"), 600);
  setTimeout(() => line2.classList.add("visible"), 2000);
  setTimeout(() => {
    introScreen.classList.add("fade-out");
    setTimeout(() => {
      introScreen.classList.add("hidden");
      revealMainSite();
    }, 1000);
  }, 4200);
}


// ══════════════════════════════════════════
// REVEAL MAIN SITE
// ══════════════════════════════════════════
function revealMainSite() {
  const site = document.getElementById("main-site");
  site.classList.remove("hidden");
  site.style.opacity = "0";
  site.style.transition = "opacity 1s ease";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { site.style.opacity = "1"; });
  });

  initTyping();
  startTimer();
  buildGallery();
  initScrollReveal();
  setTimeout(buildChat, 1200);
  spawnHearts();
  setupMusicOnInteraction();
}

// ══════════════════════════════════════════
// TYPING ANIMATION
// ══════════════════════════════════════════
function initTyping() {
  const target = document.getElementById("typing-text");
  const subtitle = document.querySelector(".hero-subtitle");
  const text = "I love you…";
  let i = 0;

  function typeChar() {
    if (i < text.length) {
      target.textContent += text[i++];
      setTimeout(typeChar, 95 + Math.random() * 55);
    } else {
      setTimeout(() => subtitle.classList.add("visible"), 400);
    }
  }

  setTimeout(typeChar, 600);
}

// ══════════════════════════════════════════
// LOVE TIMER
// ══════════════════════════════════════════
function startTimer() {
  function update() {
    const now = new Date();
    const diff = now - LOVE_START_DATE;

    const totalSecs = Math.floor(diff / 1000);
    const secs  = totalSecs % 60;
    const mins  = Math.floor(totalSecs / 60) % 60;
    const hours = Math.floor(totalSecs / 3600) % 24;
    const days  = Math.floor(totalSecs / 86400);

    document.getElementById("t-days").textContent  = String(days).padStart(3, "0");
    document.getElementById("t-hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("t-mins").textContent  = String(mins).padStart(2, "0");
    document.getElementById("t-secs").textContent  = String(secs).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// ══════════════════════════════════════════
// GALLERY
// ══════════════════════════════════════════
function buildGallery() {
  const grid = document.getElementById("gallery-grid");
  GALLERY_ITEMS.forEach((item, idx) => {
    const el = document.createElement("div");
    el.className = "gallery-item";
    el.style.animationDelay = `${idx * 0.1}s`;

    if (item.src) {
      // Use real image if src is provided
      if (item.type === "video") {
        el.innerHTML = `
          <video src="${item.src}" muted loop playsinline></video>
          <div class="play-overlay">▶</div>
        `;
      el.addEventListener('mouseenter', () => {
        el.querySelector('video').play();
        const overlay = el.querySelector('.play-overlay');
        if (overlay) overlay.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        const v = el.querySelector('video');
        v.pause();
        v.currentTime = 0;
        const overlay = el.querySelector('.play-overlay');
        if (overlay) overlay.style.opacity = '';
      });
      } else {
        el.innerHTML = `<img src="${item.src}" alt="${item.label}" loading="lazy">`;
      }
    } else {
      // Fallback to emoji placeholder
      el.innerHTML = `<div class="gallery-placeholder">${item.emoji || "❤️"}</div>`;
    }

    el.title = item.label;
    grid.appendChild(el);
  });
}

// ══════════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════════
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal-section");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(t => io.observe(t));
}

// ══════════════════════════════════════════
// CHAT REPLAY
// ══════════════════════════════════════════
function buildChat() {
  const body = document.getElementById("chat-body");
  CHAT_MESSAGES.forEach((msg, idx) => {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${msg.type}`;
    bubble.innerHTML = `${msg.text}<span class="bubble-time">${msg.time} ✓✓</span>`;
    body.appendChild(bubble);

    setTimeout(() => bubble.classList.add("visible"), idx * 650);
  });
}

// ══════════════════════════════════════════
// FLOATING HEARTS
// ══════════════════════════════════════════
function spawnHearts() {
  const container = document.getElementById("floating-hearts");
  const emojis = ["❤️", "🤍", "💕", "✨", "🌸", "💫"];

  function createHeart() {
    const el = document.createElement("span");
    el.className = "heart-particle";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = (0.7 + Math.random() * 1.2) + "rem";
    const dur = 7 + Math.random() * 8;
    el.style.animationDuration = dur + "s";
    el.style.animationDelay = "0s";
    container.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
  }

  setInterval(createHeart, 1800);
}

// ══════════════════════════════════════════
// MUSIC
// ══════════════════════════════════════════
let musicStarted = false;
let musicPlaying = false;

function setupMusicOnInteraction() {
  const handler = () => {
    if (!musicStarted) {
      musicStarted = true;
      const audio = document.getElementById("bg-music");
      audio.volume = 0.35;
      audio.play().then(() => {
        musicPlaying = true;
        updateMusicBtn();
      }).catch(() => {});
    }
    document.removeEventListener("click", handler);
  };
  document.addEventListener("click", handler, { once: true });
}

function toggleMusic() {
  const audio = document.getElementById("bg-music");
  if (!musicStarted) return;
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
  } else {
    audio.play().catch(() => {});
    musicPlaying = true;
  }
  updateMusicBtn();
}

function updateMusicBtn() {
  const btn = document.getElementById("music-btn");
  document.getElementById("music-icon").textContent = musicPlaying ? "❚❚" : "♪";
  btn.classList.toggle("playing", musicPlaying);
}

// ══════════════════════════════════════════
// OPEN WHEN LETTERS
// ══════════════════════════════════════════
function toggleLetter(card) {
  const wasOpen = card.classList.contains("open");
  // Close all
  document.querySelectorAll(".letter-card.open").forEach(c => c.classList.remove("open"));
  if (!wasOpen) card.classList.add("open");
}

// ══════════════════════════════════════════
// FINAL REVEAL
// ══════════════════════════════════════════
function revealFinalMessage() {
  const msg = document.getElementById("final-message");
  const btn = document.getElementById("reveal-btn");
  btn.style.display = "none";
  msg.classList.remove("hidden");
}

// ══════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════
runIntro();

'use strict';

const $ = (selector) => document.querySelector(selector);
const weddingDate = new Date('2026-12-10T08:30:00+05:30');

// Every invitation can have a personal URL:
// ?guest=Kumari%20Perera   OR   ?guest=<base64 of "n:Kumari Perera">
// Names placed in URLs can be seen by anyone with the link. Do not put sensitive details here.
function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const value = (params.get('guest') || params.get('to') || '').trim().slice(0, 400);
  if (!value) return '';
  let name = value;
  try {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(normalized);
    const bytes = Uint8Array.from(decoded, (c) => c.charCodeAt(0));
    const text = new TextDecoder().decode(bytes);
    if (text.startsWith('n:')) name = text.slice(2);
    else if (/^w:\d+$/.test(text)) return ''; // The reference site's ID tokens require its private guest list.
  } catch { /* Plain-text name parameter. */ }
  if (/^w:\d+$/.test(name) || /[<>\r\n]/.test(name)) return '';
  return name.replace(/\s+/g, ' ').trim().slice(0, 90);
}

// Default greeting for the main link. Individual ?guest= links override this name.
// Leave this blank to use the general greeting for visitors without a guest link.
const defaultGuestName = 'Chandrika Sajeewani';
const guest = getGuestName() || defaultGuestName;
if (guest) {
  $('#opening-guest').textContent = `Dear ${guest}`;
  $('#hero-guest').textContent = `A special invitation for ${guest}`;
  $('#guest-name').value = guest;
}

// Opening screen and subtle reveal animations.
document.documentElement.classList.add('js-ready');
const opening = $('#opening');
function openInvitation() {
  if (opening.classList.contains('is-opened')) return;
  opening.classList.add('is-opened');
  opening.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
  $('#open-invite').blur();
  setTimeout(() => { opening.hidden = true; }, 1000);
  // Call play directly in the click handler so mobile browsers allow audio.
  playMusic();
}
$('#open-invite').addEventListener('click', openInvitation);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
}

// A sparse scatter of petals; each fall takes a fresh, random path.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const petals = $('#petals');
  const petalCount = window.matchMedia('(max-width: 700px)').matches ? 5 : 7;
  function scatterPetal(petal) {
    petal.style.setProperty('--left', `${5 + Math.random() * 90}%`);
    petal.style.setProperty('--drift', `${(Math.random() - 0.5) * 180}px`);
    petal.style.setProperty('--size', `${8 + Math.random() * 5}px`);
    petal.style.setProperty('--blur', Math.random() < 0.2 ? '0.6px' : '0px');
  }
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('i');
    petal.className = 'petal';
    const duration = 18 + Math.random() * 14;
    petal.style.setProperty('--duration', `${duration}s`);
    petal.style.setProperty('--delay', `${-Math.random() * duration}s`);
    scatterPetal(petal);
    petal.addEventListener('animationiteration', () => scatterPetal(petal));
    petals.appendChild(petal);
  }
}

// Countdown uses Sri Lanka time (+05:30), regardless of a visitor's time zone.
function updateCountdown() {
  const secondsLeft = Math.max(0, Math.floor((weddingDate.getTime() - Date.now()) / 1000));
  const vals = [Math.floor(secondsLeft / 86400), Math.floor((secondsLeft % 86400) / 3600), Math.floor((secondsLeft % 3600) / 60), secondsLeft % 60];
  ['days', 'hours', 'minutes', 'seconds'].forEach((id, i) => { document.getElementById(id).textContent = String(vals[i]).padStart(2, '0'); });
  if (!secondsLeft) $('#countdown').setAttribute('aria-label', 'Our wedding day has arrived!');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// The local 35-second clip is already trimmed to 1:35–2:10 and loops natively.
const weddingAudio = $('#wedding-audio');
const musicButton = $('#music-button');
const musicLabel = $('#music-label');
weddingAudio.volume = 0.6;
function updateMusicButton() {
  const playing = !weddingAudio.paused && !weddingAudio.ended;
  musicButton.setAttribute('aria-pressed', String(playing));
  musicButton.setAttribute('aria-label', playing ? 'Pause our song' : 'Play our song');
  musicLabel.textContent = playing ? 'Pause song' : 'Our song';
}
async function playMusic() {
  try {
    await weddingAudio.play();
  } catch (error) {
    if (error.name === 'AbortError') return; // The guest paused while audio loaded.
    updateMusicButton();
    musicLabel.textContent = 'Tap for music';
  }
}
weddingAudio.addEventListener('play', updateMusicButton);
weddingAudio.addEventListener('pause', updateMusicButton);
weddingAudio.addEventListener('error', () => {
  updateMusicButton();
  musicLabel.textContent = 'Retry music';
});
musicButton.addEventListener('click', () => weddingAudio.paused ? playMusic() : weddingAudio.pause());
$('#invitation-video').addEventListener('play', () => weddingAudio.pause());

// RSVP is intentionally transparent about where it goes. Without a backend,
// a static GitHub Pages site cannot silently collect submissions.
const form = $('#rsvp-form');
const countRow = $('#guest-count-row');
const attendanceInputs = [...document.querySelectorAll('input[name="attending"]')];
function updateAttendance() { countRow.hidden = attendanceInputs.find(el => el.checked).value.startsWith('Sorry'); }
attendanceInputs.forEach((input) => input.addEventListener('change', updateAttendance));
updateAttendance();
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const name = $('#guest-name').value.trim();
  const choice = attendanceInputs.find(el => el.checked).value;
  const count = choice.startsWith('Sorry') ? 0 : Number($('#guest-count').value);
  const message = $('#rsvp-message').value.trim();
  const lines = [
    '💌 Naduni & Ushan — Wedding RSVP',
    `Guest: ${name}`,
    `Attendance: ${choice}`,
    ...(count ? [`Number of attendees: ${count}`] : []),
    ...(message ? [`Wishes: ${message}`] : []),
    'Wedding: Thursday, 10 December 2026',
  ];
  window.open(`https://wa.me/94777591732?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
});

// Share the public link, not the current personalised guest URL.
$('#share-button').addEventListener('click', async () => {
  const url = new URL(window.location.href);
  url.search = ''; url.hash = '';
  const data = { title: 'Naduni & Ushan | Wedding Invitation', text: 'You are warmly invited to celebrate the wedding of Naduni and Ushan!', url: url.toString() };
  try {
    if (navigator.share) await navigator.share(data);
    else if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(data.url); $('#share-button').textContent = 'Invitation link copied ✓'; }
    else window.prompt('Copy the invitation link:', data.url);
  } catch (e) {
    if (e.name !== 'AbortError') window.prompt('Copy the invitation link:', data.url);
  }
});

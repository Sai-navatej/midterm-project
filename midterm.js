
const overlay = document.getElementById('overlay');
const openTimerBtn = document.getElementById('openTimerBtn');
const closeBtn = document.getElementById('closeBtn');
const secondsInput = document.getElementById('secondsInput');
const applyTimeBtn = document.getElementById('applyTime');
const timeDisplay = document.getElementById('timeDisplay');
const progressBar = document.getElementById('progressBar');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let totalSeconds = Math.max(0, parseInt(secondsInput.value, 10) || 0);
let remainingSeconds = totalSeconds;
let intervalId = null;
let running = false;

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatMMSS(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${pad(mm)}:${pad(ss)}`;
}

function updateUI() {
  timeDisplay.textContent = formatMMSS(remainingSeconds);
  const percent = totalSeconds > 0 ? (remainingSeconds / totalSeconds) : 0;
  progressBar.style.width = `${Math.round(percent * 100)}%`;
  secondsInput.disabled = running;
  applyTimeBtn.disabled = running;
}

function openModal() {
  overlay.classList.add('show');
  overlay.style.display = 'flex';
  overlay.setAttribute('aria-hidden', 'false');
  totalSeconds = Math.max(0, parseInt(secondsInput.value, 10) || 0);
  remainingSeconds = totalSeconds;
  updateUI();
}

function closeModal() {
  overlay.classList.remove('show');
  overlay.style.display = 'none';
  overlay.setAttribute('aria-hidden', 'true');
  stopTimer();
}

function startTimer() {
  if (running || remainingSeconds <= 0) return;
  running = true;
  intervalId = setInterval(() => {
    remainingSeconds -= 1;
    if (remainingSeconds <= 0) {
      remainingSeconds = 0;
      updateUI();
      stopTimer();
const sound = document.getElementById('finishSound');
if (sound) {
  sound.currentTime = 0;
  sound.play().catch(() => {

  });
}
alert('Timer finished!');

      return;
    }
    updateUI();
  }, 1000);
  updateUI();
}

function stopTimer() {
  running = false;
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  updateUI();
}

openTimerBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

applyTimeBtn.addEventListener('click', () => {
  totalSeconds = Math.max(0, parseInt(secondsInput.value, 10) || 0);
  remainingSeconds = totalSeconds;
  updateUI();
});

increaseBtn.addEventListener('click', () => {
  totalSeconds += 60;
  remainingSeconds += 60;
  secondsInput.value = totalSeconds;
  updateUI();
});

decreaseBtn.addEventListener('click', () => {
  totalSeconds = Math.max(0, totalSeconds - 60);
  remainingSeconds = Math.max(0, remainingSeconds - 60);
  secondsInput.value = totalSeconds;
  updateUI();
});

startBtn.addEventListener('click', startTimer);

pauseBtn.addEventListener('click', () => {
  if (running) stopTimer();
  else if (remainingSeconds > 0) startTimer();
});

resetBtn.addEventListener('click', () => {
  stopTimer();
  remainingSeconds = totalSeconds;
  updateUI();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('show')) {
    closeModal();
  }
});

(function init() {
  totalSeconds = Math.max(0, parseInt(secondsInput.value, 10) || 0);
  remainingSeconds = totalSeconds;
  updateUI();
})();

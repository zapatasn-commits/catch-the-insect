const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start-btn');
const chooseBugBtns = document.querySelectorAll('.choose-bug-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let selectedBug = '';

startBtn.addEventListener('click', () => screens[0].classList.add('up'));

chooseBugBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedBug = btn.dataset.bug;
    screens[1].classList.add('up');
    setTimeout(createBug, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(() => {
    seconds++;
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
  }, 1000);
}

function createBug() {
  const bugEl = document.createElement('div');
  bugEl.classList.add('bug');
  bugEl.textContent = selectedBug;

  const { x, y } = getRandomLocation();
  bugEl.style.left = `${x}px`;
  bugEl.style.top = `${y}px`;

  bugEl.addEventListener('click', function() {
    catchBug(this);
  });

  gameContainer.appendChild(bugEl);
}

function getRandomLocation() {
  const width = gameContainer.offsetWidth;
  const height = gameContainer.offsetHeight;
  const x = Math.random() * (width - 100) + 50;
  const y = Math.random() * (height - 100) + 50;
  return { x, y };
}

function catchBug(bugEl) {
  score++;
  bugEl.classList.add('caught');
  setTimeout(() => bugEl.remove(), 300);

  // spawn 2 more bugs
  setTimeout(createBug, 500);
  setTimeout(createBug, 1000);

  if(score > 9) message.classList.add('visible');
  scoreEl.innerHTML = `Score: ${score}`;
}
function floatBug(bugEl) {
  const { x, y } = getRandomLocation();
  bugEl.style.transition = "left 1s ease, top 1s ease";
  bugEl.style.left = `${x}px`;
  bugEl.style.top = `${y}px`;

  // Continue floating every 1.5 seconds
  if (!bugEl.classList.contains('caught')) {
    setTimeout(() => floatBug(bugEl), 1500);
  }
}

  

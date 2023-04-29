const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const toSeconds = (str) => {
  [h, m, s] = str.split(':').map((i) => +i);
  return h * 60 ** 2 + m * 60 + s;
};

const toString = (total) => {
  let h = Math.floor(total / 3600);
  let m = Math.floor((total - h * 3600) / 60);
  let s = total - h * 3600 - m * 60;

  return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
};

const createTimerAnimator = () => {
  return (seconds) => {
    timerEl.textContent = toString(seconds);
    const myInterval = setInterval(() => {
      if (toSeconds(timerEl.textContent) === 1) clearInterval(myInterval);
      timerEl.textContent = toString(toSeconds(timerEl.textContent) - 1);
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  let currentStr = e.target.value.split('');
  let lastSymbol = currentStr.slice(-1);
  if (isNaN(lastSymbol) && lastSymbol != ':') {
    e.target.value = currentStr.slice(0, -1);
  }
});

buttonEl.addEventListener('click', () => {
  const regTime = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;

  if (inputEl.value.match(regTime)) {
    animateTimer(toSeconds(inputEl.value));
  }

  inputEl.value = '';
});

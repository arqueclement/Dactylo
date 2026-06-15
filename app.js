const texts = {
  easy: [
    "Le clavier devient plus facile quand on garde les yeux sur le texte.",
    "Tape doucement puis accelere quand tes doigts trouvent le bon rythme.",
    "Une phrase courte aide a rester precis sans se presser."
  ],
  medium: [
    "Chaque exercice mesure la vitesse, la precision et le temps restant pour progresser.",
    "Les habitudes solides commencent avec une posture calme et des frappes regulieres.",
    "Recommencer un texte permet de comparer ses resultats et de gagner en confiance."
  ],
  hard: [
    "La dactylographie efficace demande une attention fine aux accents, aux espaces et a la ponctuation.",
    "Quand la vitesse augmente, la precision doit rester prioritaire pour eviter les corrections inutiles.",
    "Un entrainement quotidien de quelques minutes suffit souvent a rendre la saisie plus naturelle."
  ]
};

const quoteEl = document.querySelector("#quote");
const inputEl = document.querySelector("#typingInput");
const levelEl = document.querySelector("#levelSelect");
const newTextBtn = document.querySelector("#newTextBtn");
const resetBtn = document.querySelector("#resetBtn");
const wpmEl = document.querySelector("#wpm");
const accuracyEl = document.querySelector("#accuracy");
const timerEl = document.querySelector("#timer");

let targetText = "";
let startedAt = null;
let countdown = 60;
let timerId = null;

function pickText() {
  const list = texts[levelEl.value];
  targetText = list[Math.floor(Math.random() * list.length)];
  reset(false);
}

function renderQuote(value = "") {
  quoteEl.innerHTML = "";
  [...targetText].forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    if (value[index] === char) span.className = "done";
    if (value[index] && value[index] !== char) span.className = "wrong";
    quoteEl.append(span);
  });
}

function startTimer() {
  if (timerId) return;
  startedAt = Date.now();
  timerId = setInterval(() => {
    countdown -= 1;
    timerEl.textContent = countdown;
    updateStats();
    if (countdown <= 0) {
      inputEl.disabled = true;
      clearInterval(timerId);
    }
  }, 1000);
}

function updateStats() {
  const typed = inputEl.value;
  const correct = [...typed].filter((char, index) => char === targetText[index]).length;
  const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
  const elapsedMinutes = startedAt ? Math.max((Date.now() - startedAt) / 60000, 1 / 60) : 1 / 60;
  const words = correct / 5;

  wpmEl.textContent = Math.round(words / elapsedMinutes);
  accuracyEl.textContent = `${accuracy}%`;
}

function reset(keepText = true) {
  inputEl.value = "";
  inputEl.disabled = false;
  startedAt = null;
  countdown = 60;
  clearInterval(timerId);
  timerId = null;
  timerEl.textContent = countdown;
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100%";
  if (!keepText) renderQuote();
  inputEl.focus();
}

inputEl.addEventListener("input", () => {
  startTimer();
  renderQuote(inputEl.value);
  updateStats();
  if (inputEl.value === targetText) {
    clearInterval(timerId);
    inputEl.disabled = true;
  }
});

levelEl.addEventListener("change", pickText);
newTextBtn.addEventListener("click", pickText);
resetBtn.addEventListener("click", () => reset(true));

pickText();

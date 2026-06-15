const stages = [
  {
    title: "Depart",
    goal: "Termine une phrase courte",
    text: "Je pose mes doigts et je tape calmement."
  },
  {
    title: "Rythme",
    goal: "Garde une frappe reguliere",
    text: "Le bon rythme arrive quand chaque touche est precise."
  },
  {
    title: "Espaces",
    goal: "Respecte tous les espaces",
    text: "Les espaces donnent de l'air aux phrases et aux idees."
  },
  {
    title: "Precision",
    goal: "Vise au moins 90% de precision",
    text: "Je corrige mes erreurs sans perdre mon calme."
  },
  {
    title: "Vitesse",
    goal: "Accelere sans oublier la precision",
    text: "La vitesse vient apres la confiance et les gestes propres."
  },
  {
    title: "Longue phrase",
    goal: "Tiens jusqu'au bout",
    text: "Un entrainement court chaque jour rend la dactylographie plus naturelle et plus rapide."
  },
  {
    title: "Ponctuation",
    goal: "Tape aussi les virgules et les points",
    text: "Quand j'ecris vite, je garde les virgules, les points et les apostrophes au bon endroit."
  },
  {
    title: "Champion",
    goal: "Termine le dernier defi",
    text: "Je peux maintenant recopier un texte complet avec attention, vitesse et precision."
  }
];

const quoteEl = document.querySelector("#quote");
const inputEl = document.querySelector("#typingInput");
const newTextBtn = document.querySelector("#newTextBtn");
const resetBtn = document.querySelector("#resetBtn");
const previousStageBtn = document.querySelector("#previousStageBtn");
const nextStageBtn = document.querySelector("#nextStageBtn");
const wpmEl = document.querySelector("#wpm");
const accuracyEl = document.querySelector("#accuracy");
const timerEl = document.querySelector("#timer");
const stageLabelEl = document.querySelector("#stageLabel");
const stageTitleEl = document.querySelector("#stageTitle");
const stageGoalEl = document.querySelector("#stageGoal");
const stageProgressEl = document.querySelector("#stageProgress");
const overallProgressEl = document.querySelector("#overallProgress");
const pathMapEl = document.querySelector("#pathMap");

const storageKey = "dactilo-pracsi-progress";
let unlockedStage = Math.max(0, Math.min(stages.length, Number(localStorage.getItem(storageKey) || 0)));
let activeStage = Math.min(unlockedStage, stages.length - 1);
let startedAt = null;
let countdown = 60;
let timerId = null;

function targetText() {
  return stages[activeStage].text;
}

function renderPath() {
  pathMapEl.innerHTML = "";

  stages.forEach((stage, index) => {
    const button = document.createElement("button");
    button.className = "stage-node";
    button.type = "button";
    button.disabled = index > unlockedStage;
    button.innerHTML = `
      <span class="stage-badge">${index < unlockedStage ? "OK" : index + 1}</span>
      <span>
        <strong>${stage.title}</strong>
        <small>${stage.goal}</small>
      </span>
    `;

    if (index === activeStage) button.classList.add("is-active");
    if (index < unlockedStage) button.classList.add("is-done");
    if (index > unlockedStage) button.classList.add("is-locked");

    button.addEventListener("click", () => {
      if (index <= unlockedStage) {
        activeStage = index;
        loadStage();
      }
    });

    pathMapEl.append(button);
  });

  overallProgressEl.textContent = `${unlockedStage} / ${stages.length} niveaux termines`;
}

function loadStage() {
  const stage = stages[activeStage];
  stageLabelEl.textContent = `Etape ${activeStage + 1}`;
  stageTitleEl.textContent = stage.title;
  stageGoalEl.textContent = `Objectif : ${stage.goal}`;
  previousStageBtn.disabled = activeStage === 0;
  nextStageBtn.disabled = activeStage >= unlockedStage || activeStage === stages.length - 1;
  reset();
  renderPath();
}

function renderQuote(value = "") {
  quoteEl.innerHTML = "";
  [...targetText()].forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    if (value[index] === char) span.className = "done";
    if (value[index] && value[index] !== char) span.className = "wrong";
    quoteEl.append(span);
  });

  const percent = Math.min(100, Math.round((value.length / targetText().length) * 100));
  stageProgressEl.style.width = `${percent}%`;
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

function getAccuracy() {
  const typed = inputEl.value;
  const correct = [...typed].filter((char, index) => char === targetText()[index]).length;
  return typed.length ? Math.round((correct / typed.length) * 100) : 100;
}

function updateStats() {
  const typed = inputEl.value;
  const correct = [...typed].filter((char, index) => char === targetText()[index]).length;
  const elapsedMinutes = startedAt ? Math.max((Date.now() - startedAt) / 60000, 1 / 60) : 1 / 60;

  wpmEl.textContent = Math.round((correct / 5) / elapsedMinutes);
  accuracyEl.textContent = `${getAccuracy()}%`;
}

function completeStage() {
  clearInterval(timerId);
  inputEl.disabled = true;

  if (activeStage === unlockedStage && unlockedStage < stages.length) {
    unlockedStage += 1;
    localStorage.setItem(storageKey, String(unlockedStage));
  }

  renderPath();

  if (activeStage < stages.length - 1) {
    setTimeout(() => {
      activeStage += 1;
      loadStage();
    }, 800);
  }
}

function reset() {
  inputEl.value = "";
  inputEl.disabled = false;
  startedAt = null;
  countdown = 60;
  clearInterval(timerId);
  timerId = null;
  timerEl.textContent = countdown;
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100%";
  renderQuote();
  inputEl.focus();
}

inputEl.addEventListener("input", () => {
  startTimer();
  renderQuote(inputEl.value);
  updateStats();

  if (inputEl.value === targetText() && getAccuracy() >= 90) {
    completeStage();
  }
});

newTextBtn.addEventListener("click", reset);
resetBtn.addEventListener("click", reset);
previousStageBtn.addEventListener("click", () => {
  activeStage = Math.max(0, activeStage - 1);
  loadStage();
});
nextStageBtn.addEventListener("click", () => {
  activeStage = Math.min(unlockedStage, activeStage + 1);
  loadStage();
});

loadStage();

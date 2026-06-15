const chapters = [
  {
    name: "Chapitre 1",
    title: "Depart",
    stages: [
      ["Posture", "Termine une phrase courte", "Je m'installe bien et je regarde le texte."],
      ["Calme", "Tape sans te presser", "Je tape doucement avec des gestes propres."],
      ["Espaces", "Respecte chaque espace", "Un espace clair se place entre chaque mot."],
      ["Petits mots", "Reste precis", "Le chat va sur le tapis et il dort."],
      ["Phrase simple", "Termine sans erreur", "La dactilo devient facile avec un peu de patience."],
      ["Premier defi", "Vise 90% de precision", "Je garde le rythme et je termine le premier defi."]
    ]
  },
  {
    name: "Chapitre 2",
    title: "Rangée du milieu",
    stages: [
      ["A S D F", "Travaille la main gauche", "a s d f fa da sa ad fd sf"],
      ["J K L M", "Travaille la main droite", "j k l m mj kl jk lm kj"],
      ["Deux mains", "Alterne gauche et droite", "as jk df lm fa mj sd kl"],
      ["Mots courts", "Garde les doigts poses", "salade lama falaise madame"],
      ["Rythme", "Frappe regulierement", "as df jk lm as df jk lm"],
      ["Defi milieu", "Termine le chapitre", "madame lisa aime la salade calme"]
    ]
  },
  {
    name: "Chapitre 3",
    title: "Rangée du haut",
    stages: [
      ["A Z E", "Monte vers le haut", "az ez za ze aze zaza"],
      ["R T Y", "Ajoute le centre", "rt ty yr tr rythme tartre"],
      ["U I O P", "Main droite en haut", "ui op io pu oui pour"],
      ["Mots du haut", "Enchaine les touches", "route pierre tuyau poire"],
      ["Mix haut", "Melange les rangees", "le petit stylo rouge est pose"],
      ["Defi haut", "Termine avec precision", "il trouve toujours le papier pour ecrire"]
    ]
  },
  {
    name: "Chapitre 4",
    title: "Rangée du bas",
    stages: [
      ["W X C", "Descends a gauche", "wc xw cx wax avec exact"],
      ["V B N", "Descends au centre", "vb bn nv bon vent bien"],
      ["Mots bas", "Reste stable", "avec bonne voix dans cave"],
      ["Transitions", "Passe haut bas milieu", "un clavier vivant demande des doigts souples"],
      ["Longueur", "Tiens une phrase plus longue", "je tape une phrase plus longue sans oublier les espaces"],
      ["Defi bas", "Finis le chapitre", "avec un bon entrainement je gagne en vitesse"]
    ]
  },
  {
    name: "Chapitre 5",
    title: "Ponctuation",
    stages: [
      ["Point", "Place les points", "Je termine ma phrase. Je commence la suivante."],
      ["Virgule", "Place les virgules", "Je respire, je regarde, puis je continue."],
      ["Apostrophe", "Tape les apostrophes", "J'apprends l'ordre des touches et j'avance."],
      ["Question", "Ajoute les questions", "Pourquoi taper vite si la precision manque ?"],
      ["Melange", "Gere plusieurs signes", "Aujourd'hui, je tape mieux : c'est visible."],
      ["Defi signes", "Termine sans te bloquer", "Si je rate une touche, je corrige puis je repars."]
    ]
  },
  {
    name: "Chapitre 6",
    title: "Vitesse",
    stages: [
      ["Acceleration", "Garde le controle", "La vitesse vient quand les gestes restent simples."],
      ["Fluidite", "Evite les pauses", "Je lis quelques mots en avance pour taper plus fluide."],
      ["Precision 1", "Vise 92% de precision", "Un texte propre vaut mieux qu'un texte rempli d'erreurs."],
      ["Precision 2", "Ne regarde pas le clavier", "Mes doigts connaissent le chemin des lettres."],
      ["Sprint", "Tape une phrase vive", "Je peux accelerer sans casser mon rythme."],
      ["Defi vitesse", "Termine le chapitre", "Plus je m'entraine, plus mon clavier devient naturel."]
    ]
  },
  {
    name: "Chapitre 7",
    title: "Endurance",
    stages: [
      ["Concentration", "Reste attentif", "Je reste concentre du debut a la fin de l'exercice."],
      ["Texte moyen", "Tiens la longueur", "La dactylographie demande de la memoire, du calme et de la regularite."],
      ["Texte long", "Continue sans abandonner", "Chaque niveau ajoute une petite difficulte pour construire une vraie progression."],
      ["Relecture", "Observe tes erreurs", "Quand je remarque une erreur, je reprends le rythme sans paniquer."],
      ["Derniere montee", "Prepare le final", "Le chemin complet transforme des gestes lents en reflexes rapides."],
      ["Champion", "Termine le parcours", "Je peux maintenant recopier un texte complet avec attention, vitesse et precision."]
    ]
  }
];

const stages = chapters.flatMap((chapter, chapterIndex) =>
  chapter.stages.map((stage, stageIndex) => ({
    chapterIndex,
    stageIndex,
    chapterName: chapter.name,
    chapterTitle: chapter.title,
    title: stage[0],
    goal: stage[1],
    text: stage[2]
  }))
);

const accounts = [
  { id: "eleve", code: "1234", name: "Eleve" },
  { id: "prof", code: "2026", name: "Prof" }
];

const loginScreenEl = document.querySelector("#loginScreen");
const appScreenEl = document.querySelector("#appScreen");
const loginFormEl = document.querySelector("#loginForm");
const loginIdEl = document.querySelector("#loginId");
const loginCodeEl = document.querySelector("#loginCode");
const loginErrorEl = document.querySelector("#loginError");
const logoutBtn = document.querySelector("#logoutBtn");
const userBadgeEl = document.querySelector("#userBadge");
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

const storageKey = "dactilo-pracsi-chapter-progress";
const sessionKey = "dactilo-pracsi-session";
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

  chapters.forEach((chapter, chapterIndex) => {
    const section = document.createElement("section");
    section.className = "chapter-section";

    const heading = document.createElement("div");
    heading.className = "chapter-heading";
    heading.innerHTML = `
      <span>${chapter.name}</span>
      <strong>${chapter.title}</strong>
    `;
    section.append(heading);

    const stageList = document.createElement("div");
    stageList.className = "chapter-stages";

    chapter.stages.forEach((stage, stageIndex) => {
      const index = stages.findIndex(
        (item) => item.chapterIndex === chapterIndex && item.stageIndex === stageIndex
      );
      const button = document.createElement("button");
      button.className = "stage-node";
      button.type = "button";
      button.disabled = index > unlockedStage;
      button.innerHTML = `
        <span class="stage-badge">${index < unlockedStage ? "OK" : stageIndex + 1}</span>
        <span>
          <strong>${stage[0]}</strong>
          <small>${stage[1]}</small>
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

      stageList.append(button);
    });

    section.append(stageList);
    pathMapEl.append(section);
  });

  overallProgressEl.textContent = `${unlockedStage} / ${stages.length} niveaux termines`;
}

function loadStage() {
  const stage = stages[activeStage];
  stageLabelEl.textContent = `${stage.chapterName} - niveau ${stage.stageIndex + 1}`;
  stageTitleEl.textContent = `${stage.chapterTitle} : ${stage.title}`;
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

function showApp(accountId) {
  const account = accounts.find((item) => item.id === accountId) || accounts[0];
  userBadgeEl.textContent = account.name;
  loginScreenEl.hidden = true;
  appScreenEl.hidden = false;
  loadStage();
}

function showLogin() {
  clearInterval(timerId);
  loginScreenEl.hidden = false;
  appScreenEl.hidden = true;
  loginCodeEl.value = "";
  loginErrorEl.hidden = true;
  loginIdEl.focus();
}

function checkLogin(id, code) {
  const cleanId = id.trim().toLowerCase();
  return accounts.find((account) => account.id === cleanId && account.code === code.trim());
}

loginFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const account = checkLogin(loginIdEl.value, loginCodeEl.value);

  if (!account) {
    loginErrorEl.hidden = false;
    loginCodeEl.select();
    return;
  }

  localStorage.setItem(sessionKey, account.id);
  showApp(account.id);
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(sessionKey);
  showLogin();
});

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

const savedSession = localStorage.getItem(sessionKey);
if (accounts.some((account) => account.id === savedSession)) {
  showApp(savedSession);
} else {
  showLogin();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

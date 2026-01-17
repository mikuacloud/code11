let xp = 0;

const questions = [
  { q: "print(5 > 3)", a: true, tip: "5 é maior que 3 ✅" },
  { q: "print(2 > 10)", a: false, tip: "2 não é maior que 10 ❌" },
  { q: "print(10 == 10)", a: true, tip: "== compara igualdade ✅" },
  { q: "print(3 < 1)", a: false, tip: "3 não é menor que 1 ❌" },
  { q: "print(5 > 3 and 2 < 1)", a: false, tip: "and: precisa tudo ser True" },
  { q: "print(1 == 2 or 3 == 3)", a: true, tip: "or: só uma parte True já basta" },
];

let deck = [];
let current = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function newDeck() {
  deck = shuffle([...questions]); // copia + embaralha
  current = 0;
}

function showEnd() {
  document.getElementById("question").innerText = "🏁 Você zerou as perguntas!";
  document.getElementById("feedback").innerText = "Quer jogar de novo? 😈";
  document.querySelector(".buttons").innerHTML =
    `<button onclick="restart()">Jogar de novo</button>`;
}

function restart() {
  // volta os botões True/False
  document.querySelector(".buttons").innerHTML = `
    <button onclick="answer(true)">True</button>
    <button onclick="answer(false)">False</button>
  `;
  newDeck();
  loadQuestion();
}

function loadQuestion() {
  if (current >= deck.length) return showEnd();

  document.getElementById("question").innerText =
    "O que será impresso?\n\n" + deck[current].q;

  document.getElementById("feedback").innerText = "";
}

function answer(choice) {
  const item = deck[current];

  if (choice === item.a) {
    xp += 10;
    document.getElementById("feedback").innerText = "🔥 BOA! +10 XP";
  } else {
    document.getElementById("feedback").innerText = "❌ QUASE! Dica: " + item.tip;
  }

  document.getElementById("xp").innerText = xp;

  current += 1;
  setTimeout(loadQuestion, 700);
}

// start
newDeck();
loadQuestion();

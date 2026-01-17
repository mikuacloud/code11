let xp = 0;

const questions = [
  { q: "print(5 > 3)", a: true },
  { q: "print(2 > 10)", a: false },
  { q: "print(10 == 10)", a: true },
  { q: "print(3 < 1)", a: false }
];

let current = 0;

function loadQuestion() {
  document.getElementById("question").innerText =
    "O que será impresso?\n\n" + questions[current].q;
  document.getElementById("feedback").innerText = "";
}

function answer(choice) {
  if (choice === questions[current].a) {
    xp += 10;
    document.getElementById("feedback").innerText = "🔥 BOA! +10 XP";
  } else {
    document.getElementById("feedback").innerText = "❌ QUASE!";
  }

  document.getElementById("xp").innerText = xp;

  current = (current + 1) % questions.length;
  setTimeout(loadQuestion, 800);
}

loadQuestion();

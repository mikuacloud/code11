let xp = 0;
let streak = 0;
let bestStreak = 0;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Gera uma expressão booleana simples tipo: "7 > 3"
function genSimple() {
  const a = randInt(0, 20);
  const b = randInt(0, 20);
  const op = pick([">", "<", ">=", "<=", "==", "!="]);

  // Em JS, a gente pode avaliar com segurança porque a expressão é gerada por nós
  const expr = `${a} ${op} ${b}`;
  const ans = eval(expr);

  return {
    q: `print(${expr})`,
    a: Boolean(ans),
    tip: `Compare ${a} com ${b} usando "${op}".`
  };
}

// Gera uma expressão composta com and/or: "(a > b) and (c == d)"
function genCompound() {
  const left = genSimpleInner();
  const right = genSimpleInner();
  const op = pick(["and", "or"]);

  // Avaliação em JS equivalente
  const ans = op === "and" ? (left.ans && right.ans) : (left.ans || right.ans);

  return {
    q: `print(${left.expr} ${op} ${right.expr})`,
    a: Boolean(ans),
    tip: op === "and"
      ? "and: precisa as DUAS partes serem True."
      : "or: basta UMA parte ser True."
  };
}

// Usado pelo compound (não imprime print dentro)
function genSimpleInner() {
  const a = randInt(0, 20);
  const b = randInt(0, 20);
  const op = pick([">", "<", ">=", "<=", "==", "!="]);
  const expr = `(${a} ${op} ${b})`;
  const ans = eval(`${a} ${op} ${b}`);
  return { expr, ans };
}

// Gera "not (a == b)"
function genNot() {
  const inner = genSimpleInner();
  const ans = !inner.ans;
  return {
    q: `print(not ${inner.expr})`,
    a: Boolean(ans),
    tip: "not: inverte o resultado (True vira False e vice-versa)."
  };
}

let current = null;

function nextQuestion() {
  const type = pick(["simple", "simple", "simple", "compound", "not"]); 
  // mais chance de simple pra ficar amigável

  if (type === "simple") current = genSimple();
  if (type === "compound") current = genCompound();
  if (type === "not") current = genNot();

  document.getElementById("question").innerText =
    "O que será impresso?\n\n" + current.q;

  document.getElementById("feedback").innerText = "";
  updateHud();
}

function updateHud() {
  document.getElementById("xp").innerText = xp;

  // se você quiser mostrar streak no HTML depois, já tá pronto aqui:
  const streakEl = document.getElementById("streak");
  const bestEl = document.getElementById("best");
  if (streakEl) streakEl.innerText = streak;
  if (bestEl) bestEl.innerText = bestStreak;
}

function answer(choice) {
  if (!current) return;

  if (choice === current.a) {
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);

    // XP com leve bônus por sequência (dopamina)
    const gain = 10 + Math.min(20, streak * 2); // vai até +30
    xp += gain;

    document.getElementById("feedback").innerText = `🔥 BOA! +${gain} XP (combo ${streak})`;
  } else {
    document.getElementById("feedback").innerText =
      "❌ QUASE! Dica: " + current.tip;

    streak = 0;
  }

  updateHud();
  setTimeout(nextQuestion, 650);
}

// start
nextQuestion();

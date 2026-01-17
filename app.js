// PyArcade — 3 tipos de fase: Saída / Complete / Bugfix
let xp = 0;
let streak = 0;
let bestStreak = 0;

const WORLDS = [
  { name: "Mundo 1: Print & variáveis", key: "print" },
  { name: "Mundo 2: If (decisão)", key: "if" },
  { name: "Mundo 3: Loops (for/range)", key: "loops" },
  { name: "Mundo 4: Listas", key: "lists" },
  { name: "Mundo 5: Funções", key: "funcs" },
];

// Cada item: { type, prompt, code, choices, answerIndex, explain }
const BANK = {
  print: [
    // Saída
    { type:"output", prompt:"O que será impresso?", code:"print(5)", choices:["5","'5'","True"], answerIndex:0, explain:"print() mostra na tela. Aqui ele mostra o número 5." },
    { type:"output", prompt:"O que será impresso?", code:"x = 3\nprint(x)", choices:["3","x","0"], answerIndex:0, explain:"x guarda 3. print(x) mostra o valor guardado." },

    // Complete
    { type:"fill", prompt:"Complete para mostrar na tela:", code:"_____(\"Oi\")", choices:["print","input","len"], answerIndex:0, explain:"print() = mostrar na tela." },
    { type:"fill", prompt:"Complete para guardar um valor:", code:"x ____ 10", choices:["=","==","!="], answerIndex:0, explain:"= guarda (atribui). == compara." },

    // Bugfix
    { type:"bug", prompt:"Qual correção arruma o código?", code:"print(\"Oi\")", choices:["Está correto","Falta )","Falta aspas"], answerIndex:0, explain:"Esse código já está certo 👍" },
    { type:"bug", prompt:"Qual correção arruma o código?", code:"print(\"Oi)", choices:["Falta aspas no final","Falta número","Falta vírgula"], answerIndex:0, explain:"Abriu aspas, tem que fechar aspas." },
  ],

  if: [
    { type:"output", prompt:"O que será impresso?", code:"x = 2\nif x > 1:\n    print(\"sim\")", choices:["sim","não","nada"], answerIndex:0, explain:"Se x>1 for True, ele entra e imprime 'sim'." },
    { type:"output", prompt:"O que será impresso?", code:"x = 0\nif x > 1:\n    print(\"sim\")\nprint(\"fim\")", choices:["fim","sim","sim\\nfim"], answerIndex:0, explain:"x>1 é False, então não imprime 'sim'. Mas imprime 'fim'." },

    { type:"fill", prompt:"Complete a decisão:", code:"if x ____ 10:\n    print(\"ok\")", choices:[">","=","++"], answerIndex:0, explain:"> significa 'maior que'." },
    { type:"fill", prompt:"Complete: quando x for igual a 3", code:"if x ____ 3:\n    print(\"igual\")", choices:["==","=","<"], answerIndex:0, explain:"== compara igualdade (igual a)." },

    { type:"bug", prompt:"Qual correção arruma o código?", code:"if x > 3\n    print(\"ok\")", choices:["Falta ':' no if","Falta ; no print","Falta () no if"], answerIndex:0, explain:"Em Python, if termina com ':'." },
    { type:"bug", prompt:"Qual correção arruma o código?", code:"if x > 3:\nprint(\"ok\")", choices:["Indentar o print","Trocar > por ==","Remover :"], answerIndex:0, explain:"Dentro do if, o print precisa estar indentado (com espaços)." },
  ],

  loops: [
    { type:"output", prompt:"O que será impresso?", code:"for i in range(3):\n    print(i)", choices:["0\\n1\\n2","1\\n2\\n3","0\\n1\\n2\\n3"], answerIndex:0, explain:"range(3) gera 0,1,2." },
    { type:"output", prompt:"O que será impresso?", code:"for i in range(2):\n    print(\"oi\")", choices:["oi\\noi","oi","nada"], answerIndex:0, explain:"Repete 2 vezes, então imprime 2 vezes." },

    { type:"fill", prompt:"Complete para repetir 5 vezes:", code:"for i in _____(5):\n    print(i)", choices:["range","len","print"], answerIndex:0, explain:"range(n) é muito usado para repetir n vezes." },
    { type:"fill", prompt:"Complete para começar em 1 e ir até 3:", code:"for i in range(_____, 4):\n    print(i)", choices:["1","0","5"], answerIndex:0, explain:"range(início, fim) vai até fim-1." },

    { type:"bug", prompt:"Qual correção arruma o código?", code:"for i in range(3)\n    print(i)", choices:["Falta ':' no for","Falta ( no print","Falta vírgula"], answerIndex:0, explain:"for também termina com ':'." },
    { type:"bug", prompt:"Qual correção arruma o código?", code:"for i in range(3):\nprint(i)", choices:["Indentar o print","Trocar range por len","Remover :"], answerIndex:0, explain:"Dentro do for, precisa indentar." },
  ],

  lists: [
    { type:"output", prompt:"O que será impresso?", code:"nums = [1,2,3]\nprint(len(nums))", choices:["3","2","[1,2,3]"], answerIndex:0, explain:"len(lista) = quantidade de itens." },
    { type:"output", prompt:"O que será impresso?", code:"a = [10,20]\nprint(a[0])", choices:["10","20","0"], answerIndex:0, explain:"Índice 0 é o primeiro item." },

    { type:"fill", prompt:"Complete para adicionar 4 na lista:", code:"nums = [1,2,3]\nnums._____(4)", choices:["append","add","push"], answerIndex:0, explain:"append() adiciona no final da lista." },
    { type:"fill", prompt:"Complete para pegar o último item:", code:"a = [10,20,30]\nprint(a[_____])", choices:["-1","3","1"], answerIndex:0, explain:"-1 pega o último item." },

    { type:"bug", prompt:"Qual correção arruma o código?", code:"a = [1,2,3]\nprint(a[3])", choices:["Usar a[2]","Usar a[0]","Usar a[1]"], answerIndex:0, explain:"A lista tem índices 0,1,2. a[3] não existe." },
    { type:"bug", prompt:"Qual correção arruma o código?", code:"nums = [1,2]\nnums.append[3]", choices:["nums.append(3)","nums.add(3)","nums.push(3)"], answerIndex:0, explain:"Em Python, chama função com parênteses: append(3)." },
  ],

  funcs: [
    { type:"output", prompt:"O que será impresso?", code:"def soma(a,b):\n    return a+b\nprint(soma(2,3))", choices:["5","23","soma"], answerIndex:0, explain:"return devolve o resultado. 2+3=5." },
    { type:"output", prompt:"O que será impresso?", code:"def f(x):\n    return x*2\nprint(f(4))", choices:["8","6","44"], answerIndex:0, explain:"x*2 dobra o número." },

    { type:"fill", prompt:"Complete para devolver o valor:", code:"def dobro(x):\n    _____ x*2", choices:["return","print","input"], answerIndex:0, explain:"return devolve um valor da função." },
    { type:"fill", prompt:"Complete para chamar a função:", code:"def oi():\n    print(\"oi\")\n_____()", choices:["oi","print","len"], answerIndex:0, explain:"Para chamar, usa o nome + ()" },

    { type:"bug", prompt:"Qual correção arruma o código?", code:"def soma(a,b)\n    return a+b", choices:["Falta ':'","Falta return","Falta print"], answerIndex:0, explain:"def também termina com ':'." },
    { type:"bug", prompt:"Qual correção arruma o código?", code:"def f(x):\nreturn x*2", choices:["Indentar o return","Trocar return por print","Remover :"], answerIndex:0, explain:"Dentro da função, precisa indentar." },
  ],
};

let worldIndex = 0;
let deck = [];
let pos = 0;

const el = {
  xp: document.getElementById("xp"),
  streak: document.getElementById("streak"),
  best: document.getElementById("best"),
  world: document.getElementById("world"),
  type: document.getElementById("type"),
  level: document.getElementById("level"),
  prompt: document.getElementById("prompt"),
  code: document.getElementById("code"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),
  explain: document.getElementById("explain"),
  btnNext: document.getElementById("btnNext"),
  btnReset: document.getElementById("btnReset"),
};

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function typeLabel(t){
  if(t==="output") return "Saída";
  if(t==="fill") return "Complete";
  if(t==="bug") return "Bugfix";
  return t;
}

function buildDeck(){
  const w = WORLDS[worldIndex];
  const list = BANK[w.key] || [];
  deck = shuffle([...list]);
  pos = 0;
}

function updateHud(){
  el.xp.textContent = xp;
  el.streak.textContent = streak;
  el.best.textContent = bestStreak;

  const w = WORLDS[worldIndex];
  el.world.textContent = `Mundo ${worldIndex+1}`;
  el.level.textContent = `Fase ${Math.min(pos+1, deck.length)}/${deck.length}`;
}

function clearFeedback(){
  el.feedback.textContent = "";
  el.explain.textContent = "";
}

function render(){
  updateHud();
  clearFeedback();
  el.btnNext.disabled = true;
  el.choices.innerHTML = "";

  const item = deck[pos];
  if(!item){
    // mundo concluído
    el.prompt.textContent = "🏁 Mundo concluído!";
    el.code.textContent = WORLDS[worldIndex].name + "\n\nClique em Próxima para ir ao próximo mundo.";
    el.type.textContent = "Fim";
    el.level.textContent = "";
    el.btnNext.disabled = false;
    el.btnNext.textContent = (worldIndex < WORLDS.length-1) ? "Próximo mundo" : "Recomeçar";
    return;
  }

  el.btnNext.textContent = "Próxima";
  el.type.textContent = typeLabel(item.type);
  el.prompt.textContent = item.prompt;
  el.code.textContent = item.code;

  item.choices.forEach((txt, idx)=>{
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = txt;
    b.onclick = ()=> choose(idx);
    el.choices.appendChild(b);
  });
}

function choose(idx){
  const item = deck[pos];
  if(!item) return;

  // trava cliques repetidos
  Array.from(el.choices.children).forEach(btn => btn.disabled = true);

  const correct = idx === item.answerIndex;

  // feedback + marcação visual
  Array.from(el.choices.children).forEach((btn, i)=>{
    if(i === item.answerIndex) btn.classList.add("correct");
    if(i === idx && !correct) btn.classList.add("wrong");
  });

  if(correct){
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);

    const gain = 10 + Math.min(20, streak * 2); // +10 até +30
    xp += gain;

    el.feedback.textContent = `🔥 BOA! +${gain} XP (combo ${streak})`;
    el.explain.textContent = item.explain;
  } else {
    streak = 0;
    el.feedback.textContent = "❌ QUASE! Olha a explicação:";
    el.explain.textContent = item.explain;
  }

  updateHud();
  el.btnNext.disabled = false;
}

function next(){
  const item = deck[pos];

  // se acabou o mundo (item undefined), avançar mundo
  if(!item){
    if(worldIndex < WORLDS.length-1){
      worldIndex += 1;
      buildDeck();
      render();
      return;
    }
    // acabou tudo: reinicia
    worldIndex = 0;
    xp = 0; streak = 0; bestStreak = 0;
    buildDeck();
    render();
    return;
  }

  // avançar fase
  pos += 1;
  render();
}

function resetAll(){
  xp = 0; streak = 0; bestStreak = 0;
  worldIndex = 0;
  buildDeck();
  render();
}

el.btnNext.addEventListener("click", next);
el.btnReset.addEventListener("click", resetAll);

// start
buildDeck();
render();

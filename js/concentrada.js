function initConcentrada(container) {
  container.innerHTML = `
    <h2>Atenção Concentrada</h2>
    <p>Clique em todos os símbolos iguais a: <span id="target"></span></p>
    <button id="startBtn">Iniciar</button>
    <div class="grid hidden" id="grid"></div>
    <div class="score hidden" id="score">
      Certos: <span id="correct">0</span> | Errados: <span id="wrong">0</span>
    </div>
    <button id="checkBtn" class="hidden">Conferir</button>
    <p id="resultMsg"></p>
    <button onclick="showMenu()">⬅️ Voltar ao Menu</button>
  `;

  const symbols = ["▲", "▼", "◀", "▶", "◆", "◇", "●", "○", "■", "□", "✦", "✧", "♥", "♡"];
  const target = symbols[Math.floor(Math.random() * symbols.length)];
  document.getElementById("target").textContent = target;

  let correct = 0;
  let wrong = 0;
  const grid = document.getElementById("grid");

  document.getElementById("startBtn").addEventListener("click", () => {
    grid.innerHTML = "";
    correct = 0;
    wrong = 0;
    document.getElementById("correct").textContent = correct;
    document.getElementById("wrong").textContent = wrong;
    document.getElementById("resultMsg").textContent = "";

    document.getElementById("grid").classList.remove("hidden");
    document.getElementById("score").classList.remove("hidden");
    document.getElementById("checkBtn").classList.remove("hidden");

    for (let i = 0; i < 150; i++) {
      const item = document.createElement("div");
      item.classList.add("item");
      item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      item.addEventListener("click", () => {
        if (item.classList.contains("correct") || item.classList.contains("wrong")) return;

        if (item.textContent === target) {
          correct++;
          item.classList.add("correct");
          document.getElementById("correct").textContent = correct;
        } else {
          wrong++;
          item.classList.add("wrong");
          document.getElementById("wrong").textContent = wrong;
        }
      });

      grid.appendChild(item);
    }
  });

  document.getElementById("checkBtn").addEventListener("click", () => {
    let missed = [...document.querySelectorAll(".item")]
      .filter(el => el.textContent === target && !el.classList.contains("correct"));

    if (missed.length === 0) {
      document.getElementById("resultMsg").textContent = "✅ Você marcou todos os alvos!";
      document.getElementById("resultMsg").style.color = "green";
    } else {
      document.getElementById("resultMsg").textContent = "⚠️ Você deixou de marcar " + missed.length + " alvos.";
      document.getElementById("resultMsg").style.color = "red";
    }
  });
}

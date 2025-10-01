function initAlternada(container) {
  container.innerHTML = `
    <h2>Atenção Alternada</h2>
    <p>Clique apenas nos símbolos iguais ao primeiro símbolo de cada linha.</p>
    <button id="startBtn">Iniciar</button>
    <div class="grid hidden" id="grid"></div>
    <div class="score hidden" id="score">
      Acertos: <span id="correct">0</span> | Erros: <span id="wrong">0</span>
    </div>
    <button id="checkBtn" class="hidden">Conferir</button>
    <p id="resultMsg"></p>
    <button onclick="showMenu()">⬅️ Voltar ao Menu</button>
  `;

  const symbols = ["▲", "▼", "◀", "▶", "◆", "◇", "●", "○", "■", "□", "✦", "✧", "♥", "♡"];
  let correct = 0;
  let wrong = 0;

  document.getElementById("startBtn").addEventListener("click", () => {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    correct = 0;
    wrong = 0;
    document.getElementById("correct").textContent = correct;
    document.getElementById("wrong").textContent = wrong;
    document.getElementById("resultMsg").textContent = "";
    grid.classList.remove("hidden");
    document.getElementById("score").classList.remove("hidden");
    document.getElementById("checkBtn").classList.remove("hidden");

    // Gera 10 linhas de 15 símbolos cada (total 150)
    for (let linha = 0; linha < 10; linha++) {
      const baseSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      for (let col = 0; col < 15; col++) {
        const item = document.createElement("div");
        item.classList.add("item");
        if (col === 0) {
          item.textContent = baseSymbol;
          item.classList.add("base");
          item.style.pointerEvents = "none"; // Torna não clicável
          item.style.opacity = "0.7"; // Visualmente diferente (opcional)
        } else {
          item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
          item.dataset.base = baseSymbol;
          item.dataset.linha = linha;

          item.addEventListener("click", () => {
            if (item.classList.contains("correct") || item.classList.contains("wrong")) return;
            if (item.textContent === item.dataset.base) {
              correct++;
              item.classList.add("correct");
            } else {
              wrong++;
              item.classList.add("wrong");
            }
            document.getElementById("correct").textContent = correct;
            document.getElementById("wrong").textContent = wrong;
          });
        }
        grid.appendChild(item);
      }
    }
  });

  document.getElementById("checkBtn").addEventListener("click", () => {
    // Confere se deixou de marcar algum símbolo igual ao base em cada linha
    let missed = 0;
    const items = document.querySelectorAll(".item");
    for (let linha = 0; linha < 10; linha++) {
      const base = items[linha * 15].textContent;
      for (let col = 1; col < 15; col++) { // começa do 1
        const idx = linha * 15 + col;
        const item = items[idx];
        if (item.textContent === base && !item.classList.contains("correct")) {
          missed++;
        }
      }
    }
    if (missed === 0) {
      document.getElementById("resultMsg").textContent = "✅ Você marcou todos os símbolos corretos!";
      document.getElementById("resultMsg").style.color = "green";
    } else {
      document.getElementById("resultMsg").textContent = `⚠️ Você deixou de marcar ${missed} símbolo(s) correto(s).`;
      document.getElementById("resultMsg").style.color = "red";
    }
  });
}

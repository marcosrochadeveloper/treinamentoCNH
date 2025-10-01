function initDividida(container) {
  container.innerHTML = `
    <h2>Atenção Dividida</h2>
    <p>Clique nos círculos vermelhos e nos quadrados azuis.</p>
    <button id="startBtn">Iniciar</button>
    <div class="grid hidden" id="grid"></div>
    <div class="score hidden" id="score">
      Acertos: <span id="correct">0</span> | Erros: <span id="wrong">0</span>
    </div>
    <button id="checkBtn" class="hidden">Conferir</button>
    <p id="resultMsg"></p>
    <button onclick="showMenu()">⬅️ Voltar ao Menu</button>
  `;

  const shapes = ["circle-red", "circle-blue", "square-red", "square-blue"];
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
    document.getElementById("grid").classList.remove("hidden");
    document.getElementById("score").classList.remove("hidden");
    document.getElementById("checkBtn").classList.remove("hidden");

    for (let i = 0; i < 36; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const item = document.createElement("div");
      item.classList.add("item", shape);

      item.addEventListener("click", () => {
        if (item.classList.contains("correct") || item.classList.contains("wrong")) return;

        if (shape === "circle-red" || shape === "square-blue") {
          correct++;
          item.classList.add("correct");
        } else {
          wrong++;
          item.classList.add("wrong");
        }

        document.getElementById("correct").textContent = correct;
        document.getElementById("wrong").textContent = wrong;
      });

      grid.appendChild(item);
    }
  });

  document.getElementById("checkBtn").addEventListener("click", () => {
    document.getElementById("resultMsg").textContent = "✅ Teste finalizado!";
    document.getElementById("resultMsg").style.color = "green";
  });
}

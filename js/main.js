function showMenu() {
  document.getElementById("menu").style.display = "block";
  document.getElementById("test-container").innerHTML = "";
}

function loadExercise(initFunction) {
  document.getElementById("menu").style.display = "none";
  const container = document.getElementById("test-container");
  container.innerHTML = "";
  initFunction(container);
}

function startConcentrada() {
  loadExercise(initConcentrada);
}

function startAlternada() {
  loadExercise(initAlternada);
}

function startDividida() {
  loadExercise(initDividida);
}

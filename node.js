
const output = document.getElementById("output");


function showMessage(message) {
  output.textContent = message;
}


document.getElementById("allCharacters").addEventListener("click", () => {
  showMessage("🧙 Showing all characters...");
});

document.getElementById("characterById").addEventListener("click", () => {
  const id = prompt("Enter character ID:");
  if (id) showMessage(`🔍 Searching for character with ID: ${id}`);
  else showMessage("❌ No ID entered.");
});

document.getElementById("students").addEventListener("click", () => {
  showMessage("🏫 Showing all Hogwarts students...");
});

document.getElementById("staff").addEventListener("click", () => {
  showMessage("🧑‍🏫 Showing all Hogwarts staff...");
});

document.getElementById("house").addEventListener("click", () => {
  const house = prompt("Enter house name (e.g., Gryffindor):");
  if (house) showMessage(`🏠 Showing characters from ${house}.`);
  else showMessage("❌ No house entered.");
});

document.getElementById("spells").addEventListener("click", () => {
  showMessage("✨ Showing all spells...");
});

output.innerHTML = data

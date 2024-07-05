/** @type {HTMLInputElement} */
const csv_selector = document.getElementById("csv_selector");

/** @type {HTMLTableElement} */
const csv_table = document.getElementById("csv_table");

/** @type {string[][]} */
let csv;

csv_selector.addEventListener("change", () => {
  for (const file of csv_selector.files) {
    const reader = new FileReader();
    reader.readAsText(file, "shift_jis");
    reader.onload = (event) => {
      console.log(event.target.result);
      csv = event.target.result.split("\n").map((row) => row.split(","));
      console.log(csv);
      csv_table.innerHTML = csv.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("");
    };
  }
});

const xlsx_button = document.getElementById("xlsx_button");

xlsx_button.addEventListener("click", () => {
});

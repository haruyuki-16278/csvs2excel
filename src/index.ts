import XLSX from "xlsx";

const csv_selector = document.querySelector(
  "#csv_selector"
) as HTMLInputElement;
const csv_table = document.querySelector("#csv_table") as HTMLTableElement;
const xlsx_button = document.querySelector("#xlsx_button") as HTMLButtonElement;
if (!csv_selector || !csv_table || !xlsx_button) {
  throw new Error("csv_selector or csv_table or xlsx_button not found");
}

let csv: string[][];

csv_selector.addEventListener("change", (event: Event) => {
  if (!csv_selector.files) return;
  for (const file of Array.from(csv_selector.files)) {
    const reader = new FileReader();
    reader.readAsText(file, "shift_jis");
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event.target || typeof event.target?.result !== "string") return;
      console.log(event.target.result);
      csv = event.target.result
        .trimEnd()
        .split("\n")
        .map((row) => row.split(","));
      console.log(csv);
      csv_table.innerHTML = csv
        .map(
          (row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
        )
        .join("");
    };
  }
});

xlsx_button.addEventListener("click", (event) => {
  event.stopPropagation();
  event.preventDefault();
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.table_to_sheet(csv_table),
    "Sheet1"
  );
  XLSX.writeFile(workbook, "test.xlsx");
});

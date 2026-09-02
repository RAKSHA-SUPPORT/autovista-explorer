export type ImportRecord = { make: string; model: string; generation: string; trim: string; year: number; bodyStyle: string; fuelType: string; horsepower: number; summary: string };

export function catalogRowsToCsv(rows: Array<Partial<ImportRecord>>) {
  const headers = ["make", "model", "generation", "trim", "year", "bodyStyle", "fuelType", "horsepower", "summary"];
  const quote = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [headers.join(","), ...rows.map(row => headers.map(header => quote(row[header as keyof ImportRecord])).join(","))].join("\n");
}

export function parseCatalogCsv(text: string): ImportRecord[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"' && quoted && next === '"') { cell += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) { row.push(cell.trim()); cell = ""; }
    else if ((character === "\n" || character === "\r") && !quoted) { if (character === "\r" && next === "\n") index += 1; row.push(cell.trim()); if (row.some(value => value !== "")) rows.push(row); row = []; cell = ""; }
    else cell += character;
  }
  if (cell || row.length) { row.push(cell.trim()); rows.push(row); }
  const headers = rows.shift()?.map(value => value.trim()) ?? [];
  return rows.map(values => { const record = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])); return { ...record, year: Number(record.year), horsepower: Number(record.horsepower) } as ImportRecord; });
}

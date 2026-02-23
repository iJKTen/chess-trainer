export interface Opening {
  name: string;
  color: "white" | "black";
  moves: string[];
}

export async function loadOpenings(): Promise<Opening[]> {
  const data = await import("./openings.json");
  return data.default as Opening[];
}

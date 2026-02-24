export interface Opening {
  name: string;
  color: "white" | "black";
  moves: string[];
}

export async function loadOpenings(): Promise<Opening[]> {
  const res = await fetch("/data/openings.json");
  return res.json();
}

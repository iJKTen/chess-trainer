export interface Opening {
  name: string;
  color: "white" | "black";
  moves: string[];
}

export const openings: Opening[] = [
  {
    name: "italian game",
    color: "white",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"],
  },
  {
    name: "italian game 2",
    color: "black",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"],
  },
  {
    name: "Ponziani 6...Nge7? 7...Na5??",
    color: "white",
    moves: [
      "e4", "e5", "Nf3", "Nc6", "c3", "Bc5", "d4", "exd4",
      "cxd4", "Bb4+", "Nc3", "Nge7", "d5", "Na5", "Qd4", "Bxc3+", "Qxc3",
    ],
  },
];

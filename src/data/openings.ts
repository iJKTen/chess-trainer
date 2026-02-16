export interface Opening {
  name: string;
  color: "white" | "black";
  moves: string[];
}

export const openings: Opening[] = [
  {
    name: "Ponziani 6...Nge7? 7...Na5??",
    color: "white",
    moves: [
      "e4", "e5", "Nf3", "Nc6", "c3", "Bc5", "d4", "exd4",
      "cxd4", "Bb4+", "Nc3", "Nge7", "d5", "Na5", "Qd4", "Bxc3+", "Qxc3",
    ],
  },
  {
    name: "Ponziani 6...Nge7? 7...Nb8??",
    color: "white",
    moves: [
      "e4", "e5", "Nf3", "Nc6", "c3", "Bc5", "d4", "exd4",
      "cxd4", "Bb4+", "Nc3", "Nge7", "d5", "Nb8", "Qd4", "Bxc3+", "Qxc3", "O-O", "Bc4",
    ],
  },
  {
    name: "Ponziani 6...Nf6",
    color: "white",
    moves: [
      "e4", "e5", "Nf3", "Nc6", "c3", "Bc5", "d4", "exd4",
      "cxd4", "Bb4+", "Nc3", "Nf6", "Bd3", "O-O", "e5", "Nd5", "Bxh7+", "Kxh7", "Ng5+", "Kg6", "h4",
      "Nxc3", "h5+", "Kh6", "bxc3", "Bxc3+", "Kf1", "Bxa1", "Qg4", "d6", "Ne6+", "Kh7", "Qxg7#",
    ],
  },
  {
    name: "Ponziani 6...d6?",
    color: "white",
    moves: [
      "e4", "e5", "Nf3", "Nc6", "c3", "Bc5", "d4", "exd4",
      "cxd4", "Bb4+", "Nc3", "d6?", "d5","Ne5??", "Qa4+", "Bd7", "Qxb4", 
    ],
  },
  {
    name: "Ponziani 6...Bxc3+",
    color: "white",
    moves: [
      "e4", "e5", "Nf3", "Nc6", "c3", "Bc5", "d4", "exd4",
      "cxd4", "Bb4+", "Nc3", "Bxc3", "bxc3", "d6", "Bd3",
    ],
  },
  {
    name: "Ponziani 6...d5",
    color: "white",
    moves: [
      "e4", "e5", "Nf3", "Nc6", "c3", "Bc5", "d4", "exd4",
      "cxd4", "Bb4+", "Nc3", "d5", "exd5", "Qxd5", "Be2", "Nf6", "O-O", "Bxc3", "bxc3", "O-O", "Bf4",
    ],
  },
  {
    name: "Ponziani 6...d5 Alternative: 8. Bd3!?",
    color: "white",
    moves: [
      "e4", "e5", "Nf3", "Nc6", "c3", "Bc5", "d4", "exd4",
      "cxd4", "Bb4+", "Nc3", "d5", "exd5", "Qxd5", "Bd3", "Bg4", "O-O", "Bxc3", "bxc3", "Bxf3", "Re1+", "Nge7", "gxf3", "O-O", "Be4",
      "Qh5", "Rb1", 
    ],
  },
  {
    name: "Ponziani 5..Bb6?",
    color: "white",
    moves: [
      "e4", "e5", "Nf3", "Nc6", "c3", "Bc5", "d4", "exd4",
      "cxd4", "Bb6", "Nc3", "d6", "Bb5", "Bd7", "O-O", "Nge7", "Be3", "O-O", "h3",
    ],
  },
];

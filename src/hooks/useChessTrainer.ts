import { useRef, useState } from "react";
import { Chess } from "chess.js";
import type { Move } from "chess.js";
import { openings } from "../data/openings";
import type { Opening } from "../data/openings";
import type { Key } from "@lichess-org/chessground/types";
import { preload, playSound } from "../audio";

function pickRandom(list: Opening[]): Opening {
  return list[Math.floor(Math.random() * list.length)];
}

preload("/move.mp3", "/capture.mp3");

function playMoveSound(capture: boolean) {
  playSound(capture ? "/capture.mp3" : "/move.mp3");
}

function buildLegalMoveMap(chess: Chess): Map<Key, Key[]> {
  const dests = new Map<Key, Key[]>();
  for (const move of chess.moves({ verbose: true })) {
    const from = move.from as Key;
    const existing = dests.get(from) ?? [];
    existing.push(move.to as Key);
    dests.set(from, existing);
  }
  return dests;
}

export function useChessTrainer() {
  const chessRef = useRef(new Chess());
  const [opening, setOpening] = useState(() => pickRandom(openings));
  const [moveIndex, setMoveIndex] = useState(0);
  const [fen, setFen] = useState(chessRef.current.fen());
  const [lastMove, setLastMove] = useState<[Key, Key] | undefined>();
  const [complete, setComplete] = useState(false);

  const isUserTurn = (idx: number) => {
    if (!opening) return false;
    const isWhiteMove = idx % 2 === 0;
    return opening.color === "white" ? isWhiteMove : !isWhiteMove;
  };

  const getLegalMoves = (): Map<Key, Key[]> => {
    return buildLegalMoveMap(chessRef.current);
  };

  const tryMove = (from: Key, to: Key): Move | null => {
    if (!opening) return null;
    const chess = chessRef.current;
    const expected = opening.moves[moveIndex];
    if (!expected) return null;

    const move = chess.move({ from, to, promotion: "q" });
    if (!move) return null;

    if (move.san !== expected) {
      chess.undo();
      return null;
    }

    const newIndex = moveIndex + 1;
    setMoveIndex(newIndex);
    setFen(chess.fen());
    setLastMove([from, to]);
    playMoveSound(move.flags.includes('c') || move.flags.includes('e'));

    if (newIndex >= opening.moves.length) {
      setComplete(true);
    }

    return move;
  };

  const autoPlay = (): Move | null => {
    if (!opening) return null;
    const chess = chessRef.current;
    const expected = opening.moves[moveIndex];
    if (!expected) return null;

    const move = chess.move(expected);
    if (!move) return null;

    const newIndex = moveIndex + 1;
    setMoveIndex(newIndex);
    setFen(chess.fen());
    setLastMove([move.from as Key, move.to as Key]);
    playMoveSound(move.flags.includes('c') || move.flags.includes('e'));

    if (newIndex >= opening.moves.length) {
      setComplete(true);
    }

    return move;
  };

  const replay = () => {
    const chess = new Chess();
    chessRef.current = chess;
    setMoveIndex(0);
    setFen(chess.fen());
    setLastMove(undefined);
    setComplete(false);
  };

  const nextOpening = () => {
    const next = pickRandom(openings);
    const chess = new Chess();
    chessRef.current = chess;
    setOpening(next);
    setMoveIndex(0);
    setFen(chess.fen());
    setLastMove(undefined);
    setComplete(false);
  };

  const userMoveCount = opening
    ? opening.moves.filter((_: string, i: number) => isUserTurn(i)).length
    : 0;
  const completedUserMoves = opening
    ? opening.moves.filter((_: string, i: number) => isUserTurn(i) && i < moveIndex).length
    : 0;

  return {
    opening,
    fen,
    lastMove,
    complete,
    moveIndex,
    isUserTurn,
    getLegalMoves,
    tryMove,
    autoPlay,
    replay,
    nextOpening,
    userMoveCount,
    completedUserMoves,
  };
}

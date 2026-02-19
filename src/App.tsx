import { useEffect, useRef, useState } from "react";
import type { Config } from "@lichess-org/chessground/config";
import type { Key } from "@lichess-org/chessground/types";
import { Board } from "./components/Board";
import type { BoardHandle } from "./components/Board";
import { MoveList } from "./components/MoveList";
import { useChessTrainer } from "./hooks/useChessTrainer";
import { preload, playSound } from "./audio";
import "./App.css";

preload("/error.mp3");

function App() {
  const {
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
  } = useChessTrainer();

  const [announcement, setAnnouncement] = useState("");
  const boardRef = useRef<BoardHandle>(null);

  const announce = (msg: string) => {
    setAnnouncement("");
    requestAnimationFrame(() => setAnnouncement(msg));
  };

  // Auto-play opponent moves with cancellable timeout
  useEffect(() => {
    if (!opening || complete) return;
    if (isUserTurn(moveIndex)) return;

    const timeoutId = setTimeout(() => {
      const move = autoPlay();
      if (move) {
        announce(`Opponent plays ${move.san}`);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [moveIndex, complete, isUserTurn, autoPlay, announce, opening]);

  const handleMove = (from: Key, to: Key) => {
    if (!opening) return;
    const move = tryMove(from, to);
    if (move) {
      announce(move.san);
    } else {
      const turnColor = moveIndex % 2 === 0 ? "white" : "black";
      const api = boardRef.current?.getApi();
      requestAnimationFrame(() => {
        api?.set({
          fen,
          turnColor,
          movable: {
            color: opening.color,
            dests: getLegalMoves(),
          },
          drawable: {
            autoShapes: [
              { orig: from, brush: "red" },
              { orig: to, brush: "red" },
            ],
          },
        });
      });
      setTimeout(() => {
        api?.set({ drawable: { autoShapes: [] } });
      }, 600);
      playSound("/error.mp3");
      announce("Wrong move, try again");
    }
  };

  const groundConfig: Config = {
    fen,
    coordinates: true,
    orientation: opening?.color ?? "white",
    turnColor: moveIndex % 2 === 0 ? "white" : "black",
    lastMove: lastMove ? [lastMove[0], lastMove[1]] : undefined,
    movable: {
      free: false,
      color: opening?.color ?? "white",
      dests:
        opening && isUserTurn(moveIndex) && !complete
          ? getLegalMoves()
          : new Map(),
      events: {
        after: handleMove,
      },
    },
    premovable: { enabled: false },
    draggable: { enabled: true },
    selectable: { enabled: true },
    animation: { enabled: true, duration: 200 },
  };


  return (
    <>
      <header>
        <h1>{opening.name}</h1>
        <p className="color-indicator">
          Playing as {opening.color}
        </p>
      </header>

      <main>
        <div className="board-column">
          <Board ref={boardRef} config={groundConfig} />
          {complete && (
            <div className="complete-actions" role="group" aria-label="Opening complete actions">
              <button className="action-btn" onClick={replay} aria-label="Play this opening again">
                Play Again
              </button>
              <button className="action-btn" onClick={nextOpening} aria-label="Load next opening">
                Next Opening
              </button>
            </div>
          )}
        </div>
        <MoveList moves={opening.moves} moveIndex={moveIndex} />
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>
      </main>
    </>
  );
}

export default App;

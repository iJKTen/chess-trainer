import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Chessground } from "@lichess-org/chessground";
import type { Api } from "@lichess-org/chessground/api";
import type { Config } from "@lichess-org/chessground/config";

import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";

export interface BoardHandle {
  getApi(): Api | null;
}

interface BoardProps {
  config: Config;
}

export const Board = forwardRef<BoardHandle, BoardProps>(
  function Board({ config }, ref) {
    const boardRef = useRef<HTMLDivElement>(null);
    const groundRef = useRef<Api | null>(null);

    useImperativeHandle(ref, () => ({
      getApi: () => groundRef.current,
    }));

    useEffect(() => {
      if (boardRef.current && !groundRef.current) {
        groundRef.current = Chessground(boardRef.current, config);
      }
      return () => {
        groundRef.current?.destroy();
        groundRef.current = null;
      };
      // Only run on mount/unmount
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      groundRef.current?.set(config);
    }, [config]);

    // Recalculate bounds when the board resizes (e.g. iOS address bar collapse
    // changes dvh units), so touch coordinates stay accurate.
    useEffect(() => {
      const el = boardRef.current;
      if (!el) return;
      const observer = new ResizeObserver(() => {
        groundRef.current?.redrawAll();
      });
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={boardRef}
        className="board-wrap"
        role="img"
        aria-label="Chess board"
      />
    );
  },
);

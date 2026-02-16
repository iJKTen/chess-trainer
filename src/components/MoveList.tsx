import { useEffect, useRef } from "react";
import "./MoveList.css";

interface MoveListProps {
  moves: string[];
  moveIndex: number;
}

export function MoveList({ moves, moveIndex }: MoveListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest move
  useEffect(() => {
    const el = listRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [moveIndex]);

  // Group moves into pairs (white, black)
  const rows: { num: number; white: string; black?: string }[] = [];
  for (let i = 0; i < moveIndex; i += 2) {
    rows.push({
      num: Math.floor(i / 2) + 1,
      white: moves[i],
      black: i + 1 < moveIndex ? moves[i + 1] : undefined,
    });
  }

  return (
    <div className="move-list" ref={listRef}>
      {rows.length === 0 && (
        <div className="move-list-empty">Moves will appear here</div>
      )}
      {rows.map((row) => (
        <div className="move-row" key={row.num}>
          <span className="move-num">{row.num}.</span>
          <span
            className={`move-san${
              row.num * 2 - 1 === moveIndex ? " move-active" : ""
            }`}
          >
            {row.white}
          </span>
          {row.black && (
            <span
              className={`move-san${
                row.num * 2 === moveIndex ? " move-active" : ""
              }`}
            >
              {row.black}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

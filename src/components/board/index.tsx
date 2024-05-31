import type { Routine } from "../../models/routine";

import { BoardAxis } from "./board-axis";
import { BoardColumns } from "./board-columns";
import { BoardLabels } from "./board-labels";

interface BoardProps {
  routine: Routine | undefined;
}

export function Board(props: BoardProps) {
  const { routine } = props;

  return (
    <section className="flex-1 flex flex-col bg-background p-4 gap-2">
      <BoardLabels routine={routine} />

      <div className="flex w-full gap-2">
        <BoardAxis />

        <BoardColumns routine={routine} />
      </div>
    </section>
  );
}

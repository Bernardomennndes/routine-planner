import type { Routine } from "../../models/routine";

import { BoardAxis } from "./board-axis";
import { BoardColumns } from "./board-columns";
import { BoardLabels } from "./board-labels";
import { BoardProvider } from "./context";

interface BoardProps {
  routine: Routine | undefined;
}

export function Board(props: BoardProps) {
  const { routine } = props;

  return (
    <BoardProvider>
      <section className="flex-1 flex flex-col p-4 gap-2">
        <BoardLabels routine={routine} />

        <div className="flex w-full gap-2">
          <BoardAxis />

          <div className="w-full relative">
            <BoardColumns routine={routine} />

            <div className="top-0 left-0 -z-10 absolute w-full h-full bg-dot-black/[0.15]">
              <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_80%,black)]"></div>
            </div>
          </div>
        </div>
      </section>
    </BoardProvider>
  );
}

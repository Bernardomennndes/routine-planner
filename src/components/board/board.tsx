import type { Routine } from "../../models/routine";

import { BoardAxis } from "./board-axis";
import { BoardColumns } from "./board-columns";
import { BoardHeader } from "./board-header";
import { BoardTimeTracker } from "./board-time-tracker";
import { BoardProvider } from "./context";

interface BoardProps {
  routine: Routine | undefined;
}

export function Board(props: BoardProps) {
  const { routine } = props;

  return (
    <BoardProvider>
      <section className="flex-1 pl-[40px] flex flex-col relative">
        <div className="py-4 border border-b sticky top-0 backdrop-blur-sm z-50">
          <BoardHeader routine={routine} />
        </div>

        <div className="relative">
          <div className="relative">
            <BoardAxis />
            <BoardTimeTracker />
          </div>

          <BoardColumns routine={routine} />

          <div className="top-0 left-0 -z-10 absolute w-full h-full bg-dot-black/[0.15]">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_95%,black)]"></div>
          </div>
        </div>
      </section>
    </BoardProvider>
  );
}

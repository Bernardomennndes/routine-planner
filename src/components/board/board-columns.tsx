import type { Routine } from "../../models/routine";
import { BoardColumn } from "./board-column";
import { BoardTask } from "./board-task";
import { useBoard } from "./context";

interface BoardColumnsProps {
  routine: Routine | undefined;
}

export function BoardColumns(props: BoardColumnsProps) {
  const { routine } = props;

  const { days } = useBoard();

  return (
    <div className="flex w-full">
      {Array.from({ length: days }, (_, index) => index).map((day) => {
        const daySchedule = routine?.schedule[day] ?? [];

        return (
          <BoardColumn key={day}>
            {daySchedule.map((task) => (
              <BoardTask key={task.start} task={task} />
            ))}
          </BoardColumn>
        );
      })}
    </div>
  );
}

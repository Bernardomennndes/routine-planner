import { useBoard } from "./context";

import { formatDayOfWeek } from "@/lib/format";

import { Plus } from "lucide-react";

interface BoardHeaderProps {
  handleAddNewTask: (day: number) => void;
}

export function BoardHeader(props: BoardHeaderProps) {
  const { handleAddNewTask } = props;

  const {
    settings: {
      dayRange: [rangeStart, rangeEnd],
    },
  } = useBoard();

  return (
    <div className="w-full flex">
      {Array.from(
        { length: rangeEnd - rangeStart + 1 },
        (_, index) => index + rangeStart
      ).map((day) => (
        <div
          key={day}
          className="flex-1 flex justify-center gap-1 items-center text-muted-foreground capitalize text-sm"
        >
          {formatDayOfWeek(day)}

          <button
            onClick={() => {
              handleAddNewTask(day);
            }}
          >
            <Plus size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

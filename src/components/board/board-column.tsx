import { useBoard } from "./context";

interface BoardColumnProps {
  children: React.ReactNode;
}

export function BoardColumn(props: BoardColumnProps) {
  const { children } = props;

  const {
    config: {
      timeRange: [rangeStart, rangeEnd],
      cellHeight,
    },
  } = useBoard();

  const height = (rangeEnd - rangeStart) * cellHeight;

  return (
    <div
      style={{ height }}
      className="flex-1 min-w-[320px] pt-2 first:border-l border-r border-border grid grid-cols-1 grid-rows-[repeat(24,minmax(0,1fr))]"
    >
      {children}
    </div>
  );
}

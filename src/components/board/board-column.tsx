import { useBoard } from "./context";

interface BoardColumnProps {
  children: React.ReactNode;
}

export function BoardColumn(props: BoardColumnProps) {
  const { children } = props;

  const { hours, cellHeight } = useBoard();

  const height = hours * cellHeight;

  return (
    <div
      style={{ height }}
      className="flex-1 pt-2 bg-muted first:border-l border-r  border-border grid grid-cols-1 grid-rows-[repeat(24,minmax(0,1fr))]"
    >
      {children}
    </div>
  );
}

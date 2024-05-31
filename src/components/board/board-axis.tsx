import { useBoard } from "./context";

export function BoardAxis() {
  const { hours, cellHeight } = useBoard();

  return (
    <div className="w-[32px] flex flex-col items-end">
      {Array.from({ length: hours }, (_, index) => index).map((hour) => (
        <span
          key={hour}
          style={{ height: cellHeight, top: -(hour / 2) }}
          className="text-xs text-muted-foreground relative"
        >{`${hour}h -`}</span>
      ))}
    </div>
  );
}

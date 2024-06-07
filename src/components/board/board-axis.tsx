import { useBoard } from "./context";

export function BoardAxis() {
  const {
    settings: {
      timeRange: [rangeStart, rangeEnd],
      cellHeight,
    },
  } = useBoard();

  return (
    <div className="absolute w-full h-full">
      {Array.from(
        { length: rangeEnd - rangeStart + 1 },
        (_, index) => index
      ).map((hour, index) => (
        <div
          key={hour}
          className="h-0 flex items-center gap-1 relative"
          style={{
            top: cellHeight * index,
          }}
        >
          <div
            key={hour}
            className="absolute -left-6 text-xs text-muted-foreground"
          >{`${hour}h`}</div>

          <div className="w-full border-b border-dashed" />
        </div>
      ))}
    </div>
  );
}

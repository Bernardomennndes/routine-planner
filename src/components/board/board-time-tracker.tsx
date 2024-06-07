import React from "react";
import { useBoard } from "./context";

import { getHours, getMinutes } from "date-fns";

function getTrackerPosition(params: { cellHeight: number }) {
  const { cellHeight } = params;

  const currentDate = new Date();

  const hours = getHours(currentDate);
  const minutes = getMinutes(currentDate);

  return Math.floor(cellHeight * (hours + minutes / 60));
}

export function BoardTimeTracker() {
  const {
    settings: { cellHeight },
  } = useBoard();

  const [position, setPosition] = React.useState(() => {
    const nextPosition = getTrackerPosition({ cellHeight });

    return nextPosition;
  });

  React.useEffect(() => {
    setInterval(() => {
      setPosition(() => {
        return getTrackerPosition({ cellHeight });
      });
    }, 60 * 1000);
  }, [cellHeight]);

  return (
    <div className="h-0 w-full relative" style={{ top: position }}>
      <div className="absolute h-2 w-2 rounded-full -left-2 -top-1 bg-red-700" />

      <div className="w-full h-px bg-red-700" />
    </div>
  );
}

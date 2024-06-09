import type { Task } from "@/models/routine";

export function getUnavailableStartTime(tasks: Task[]) {
  return new Set<number>(
    tasks.reduce((previousValue, currentValue) => {
      const taskTimeRange = Array.from(
        {
          length: currentValue.end - currentValue.start,
        },
        (_, index) => index + currentValue.start
      );

      return [...previousValue, ...taskTimeRange];
    }, [] as number[])
  );
}

export function getUnavailableEndTime(tasks: Task[]) {
  return new Set<number>(
    tasks.reduce((previousValue, currentValue) => {
      const taskTimeRange = Array.from(
        {
          length: currentValue.end - currentValue.start,
        },
        (_, index) => index + currentValue.start + 1
      );

      return [...previousValue, ...taskTimeRange];
    }, [] as number[])
  );
}

export function getAvailableStartTime(
  tasks: Task[],
  options: { range: [number, number] }
) {
  const unavailableStartTime = getUnavailableStartTime(tasks);

  const [rangeStart, rangeEnd] = options.range;

  const availableTime = Array.from(
    { length: rangeEnd - rangeStart },
    (_, index) => index + rangeStart
  ).filter((time) => !unavailableStartTime.has(time));

  return new Set<number>(availableTime);
}

export function getAvailableEndTime(
  tasks: Task[],
  options: {
    range: [number, number];
  }
) {
  const unavailableEndTime = getUnavailableEndTime(tasks);

  const [rangeStart, rangeEnd] = options.range;

  const availableTime = Array.from(
    { length: rangeEnd - rangeStart },
    (_, index) => index + rangeStart + 1
  ).filter((time) => !unavailableEndTime.has(time));

  return new Set<number>(availableTime);
}

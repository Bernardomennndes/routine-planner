export type Task = {
  name: string;
  description?: string;
  start: number;
  end: number;
};

export type Routine = {
  schedule: Record<number, Task[]>;
};

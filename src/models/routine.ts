export type Task = {
  name: string;
  description?: string;
  start: number;
  end: number;
};

export type Routine = {
  id: string;
  name: string;
  schedule: Record<number, Task[]>;
};

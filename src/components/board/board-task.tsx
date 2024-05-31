import type { Task } from "../../models/routine";

interface TaskProps {
  task: Task;
}

export function BoardTask(props: TaskProps) {
  const {
    task: { end, name, start, description },
  } = props;

  return (
    <div
      className="p-1"
      style={{ gridRowStart: start + 1, gridRowEnd: end + 1 }}
    >
      <div className="h-full p-3 border border-border rounded-xl shadow-sm bg-background">
        <h6 className="text-xs font-semibold mb-1">{name}</h6>

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

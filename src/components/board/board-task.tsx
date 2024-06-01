import { Trash } from "lucide-react";
import type { Task } from "../../models/routine";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "../ui/alert-dialog";

interface TaskProps {
  task: Task;
  handleDeleteTask: () => void;
}

export function BoardTask(props: TaskProps) {
  const {
    task: { end, name, start, description },
    handleDeleteTask,
  } = props;

  return (
    <div
      className="p-1 group"
      style={{ gridRowStart: start + 1, gridRowEnd: end + 1 }}
    >
      <div className="h-full p-3 border border-border rounded-xl shadow-sm bg-background">
        <div className="flex items-center">
          <h6 className="w-full text-xs font-semibold mb-1">{name}</h6>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive-secondary"
                className="hidden group-hover:inline-flex h-5 w-5 p-0"
              >
                <Trash size={12} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deseja excluir a tarefa?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Isso vai excluir
                  permanentemente a tarefa da sua rotina.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDeleteTask();
                    }}
                  >
                    Excluir
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { taskSchema } from "@/lib/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { z } from "zod";
import { Input } from "../ui/input";
import React from "react";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";

type FormValues = z.infer<typeof taskSchema>;

interface BoardTaskFormProps {
  unavailableTime: {
    start: Set<number> | undefined;
    end: Set<number> | undefined;
  };
  onSubmit: (values: FormValues) => void;
}

export function BoardTaskForm(props: BoardTaskFormProps) {
  const { unavailableTime, onSubmit: onSubmitProp } = props;

  const form = useForm<FormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
    },
  });

  const { end: formEndValue, start: formStartValue } = form.getValues();

  const startTimeRange = React.useMemo(
    () =>
      Array.from(
        {
          length: 24,
        },
        (_, index) => index
      ).map((hour) => ({
        value: hour,
        label: `${hour}h`,
        disabled: unavailableTime.start?.has(hour) || hour >= formEndValue,
      })),
    [unavailableTime, formEndValue]
  );

  const endTimeRange = React.useMemo(
    () =>
      Array.from(
        {
          length: 24,
        },
        (_, index) => index + 1
      ).map((hour) => ({
        value: hour,
        label: `${hour}h`,
        disabled: unavailableTime.end?.has(hour) || hour <= formStartValue,
      })),
    [unavailableTime, formStartValue]
  );

  function onSubmit(values: FormValues) {
    onSubmitProp(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 grid grid-cols-2 gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Nome da Tarefa</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Nome mostrado como o título da atividade
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>
                Descrição{" "}
                <span className="text-xs text-muted-foreground">
                  (opcional)
                </span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Hora de Início</FormLabel>
              <Select
                onValueChange={(value) => form.setValue("start", Number(value))}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário de início" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {startTimeRange.map((time) => (
                    <SelectItem
                      key={time.value}
                      value={String(time.value)}
                      disabled={time.disabled}
                    >
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Hora de Término</FormLabel>
              <Select
                onValueChange={(value) => form.setValue("end", Number(value))}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário de término" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {endTimeRange.map((time) => (
                    <SelectItem
                      key={time.value}
                      value={String(time.value)}
                      disabled={time.disabled}
                    >
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <Button type="submit">Adicionar</Button>
        </div>
      </form>
    </Form>
  );
}

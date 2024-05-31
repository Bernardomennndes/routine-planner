import { format, setDay } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDayOfWeek(day: number) {
  return format(setDay(new Date(), day), "EEEE", {
    locale: ptBR,
  });
}

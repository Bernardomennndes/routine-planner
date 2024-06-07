import { format, setDay } from "date-fns";
import * as locales from "date-fns/locale";

/** Formats the day of week into a labeled name based on their number,
 *  `0` being Sunday and `6` Saturday  */
export function formatDayOfWeek(day: number, locale: keyof typeof locales = 'ptBR') {
  return format(setDay(new Date(), day), "EEEE", {
    locale: locales[locale],
  });
}

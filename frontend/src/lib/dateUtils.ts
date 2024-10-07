import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDateForUX = (isoDate: string, locale = 'fr') => {
  const date = parseISO(isoDate);

  const chosenLocale = locale === 'fr' ? fr : undefined;

  return format(date, 'd MMMM yyyy à HH:mm', { locale: chosenLocale });
};

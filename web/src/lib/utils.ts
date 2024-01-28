import { formatDistanceToNow } from 'date-fns';
import ru from 'date-fns/locale/ru';

export default function timeAgo(dateString: string | null): string {
  if (!dateString) {
    return 'отсутствует';
  }

  const date = new Date(dateString);
  return formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: true,
    locale: ru,
  });
}

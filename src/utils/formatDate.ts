import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

export const formatDay = (date: Date) => {
	return format(date, 'EEE', { locale: pl });
};

export const formatDate = (date: Date) => {
	return format(date, 'dd', { locale: pl });
};

export const formatFullDate = (date: Date) => {
	return format(date, 'EEEE, do MMMM yyyy', { locale: pl });
};

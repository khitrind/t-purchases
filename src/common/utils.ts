import * as moment from 'moment';

export const getCurrentDate = () => {
  const date = Date.now();
  return moment(date).format();
};

export const isDateInPast = (date: Date) => {
  const currentDate = moment.utc();
  return moment.utc(date).isBefore(currentDate);
};

export const formatEventDate = (date: Date | string): string => {
  return moment.utc(date).format('DD-MM-YYYY HH:mm');
};

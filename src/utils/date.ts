export const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export const formatDate = (date: string) => {
  const formatedDate = new Date(date);
  return formatedDate.toLocaleDateString('ru-RU', options);
};

export const dateToISO = (date: string) => {
  const formatedDate = new Date(date);
  return formatedDate.toISOString();
};

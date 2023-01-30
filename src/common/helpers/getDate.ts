export const getDate = (date: Date) => {
  let year = date.getUTCFullYear();
  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  const formatDate = `${year}-${month}-${day}`;

  return formatDate;
};

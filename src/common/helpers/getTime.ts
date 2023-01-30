export const getTime = (date: Date) => {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${hours}:${minutes} ${ampm}`;

  return strTime;
};

export const getMilliseconds = (currentDate: Date, milliseconds: number) => {
  const format = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

  const [hours, minutes] = format.split(':');
  const time = (+hours * 60 * 60 + +minutes * 60) * 1000;

  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const initialDate = new Date(year, month, day).getTime();

  return time + initialDate;
};

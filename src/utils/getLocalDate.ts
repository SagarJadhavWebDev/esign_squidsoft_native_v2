import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const getLocalDate = (date: string) => {
  dayjs.extend(utc);
  const localDate = dayjs(date).utc(true);
  return localDate;
};

export default getLocalDate;

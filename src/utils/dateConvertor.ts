import dayjs from "dayjs";
const dateConverter = (
  type: "dateWithSlash" | "dateWithHypen" | "Time",
  dateString: string
) => {
  function minTwoDigits(n: number) {
    return (n < 10 ? "0" : "") + n;
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = minTwoDigits(date.getDate());
  const withSlashes = [year, month, day].join("/");
  // console.log("withSlashes", withSlashes);
  const withHyphens = [day, month, year].join("-");
  // console.log("withHyphens", withHyphens);
  const formatAMPM = (dateString: any) => {
    const date = new Date(dateString);
    let hours = date?.getHours() as any;
    let minutes = date?.getMinutes() as any;
    const ampm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    hours = minTwoDigits(hours) || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    // console.log("strTime", typeof strTime);
    return strTime;
  };
  switch (type) {
    case "dateWithSlash":
      return withSlashes;
    case "dateWithHypen":
      return withHyphens;
    case "Time":
      return formatAMPM(dateString);
    default:
      return "DATE IS INVALID";
  }
};
function minTwoDigits(n: number) {
  return (n < 10 ? "0" : "") + n;
}
const formatAMPM = (dateString: any) => {
  const date = new Date(dateString);
  let hours = date?.getHours() as any;
  let minutes = date?.getMinutes() as any;
  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = minTwoDigits(hours) || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  // console.log("strTime", typeof strTime);
  return strTime;
};
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const convertDate = (dateString: string, to: "time" | "date" | "datetime") => {
  const date = new Date(dateString);
  // console.log("DATE STRING", date);
  // console.log(date.getMonth());
  const formatedDate = `${minTwoDigits(date.getDate())} ${
    shortMonths[date.getMonth()]
  }, ${date.getFullYear()}`;
  switch (to) {
    case "date":
      return formatedDate;
    case "time":
      return formatAMPM(dateString);
    case "datetime":
      return `${formatedDate} ${formatAMPM(dateString)}`;
  }
};

const getDateDiff = (start: any, end: any) => {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getDate() - date1.getDate();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInTime;
};

// const calcDate = (date1: any, date2: any) => {
//   /*
//    * calcDate() : Calculates the difference between two dates
//    * @date1 : "First Date in the format MM-DD-YYYY"
//    * @date2 : "Second Date in the format MM-DD-YYYY"
//    * return : Array
//    */

//   //new date instance
//   const dt_date1 = new Date(date1);
//   const dt_date2 = new Date(date2);

//   //Get the Timestamp
//   const date1_time_stamp = dt_date1.getTime();
//   const date2_time_stamp = dt_date2.getTime();

//   let calc;

//   //Check which timestamp is greater
//   if (date1_time_stamp > date2_time_stamp) {
//     calc = new Date(date1_time_stamp - date2_time_stamp);
//   } else {
//     calc = new Date(date2_time_stamp - date1_time_stamp);
//   }
//   //Retrieve the date, month and year
//   const calcFormatTmp =
//     calc.getDate() + "-" + (calc.getMonth() + 1) + "-" + calc.getFullYear();
//   //Convert to an array and store
//   const calcFormat: any = calcFormatTmp.split("-");
//   //Subtract each member of our array from the default date
//   const days_passed = Number(Math.abs(calcFormat[0]) - 1);
//   const months_passed = Number(Math.abs(calcFormat[1]) - 1);
//   const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

//   //Set up custom text
//   const yrsTxt = ["year", "years"];
//   const mnthsTxt = ["month", "months"];
//   const daysTxt = ["day", "days"];

//   //Convert to days and sum together
//   const total_days = years_passed * 365 + months_passed * 30.417 + days_passed;
//   const total_secs = total_days * 24 * 60 * 60;
//   const total_mins = total_days * 24 * 60;
//   const total_hours = total_days * 24;
//   const total_weeks = total_days >= 7 ? total_days / 7 : 0;

//   //display result with custom text
//   const result =
//     (years_passed == 1
//       ? years_passed + " " + yrsTxt[0] + " "
//       : years_passed > 1
//       ? years_passed + " " + yrsTxt[1] + " "
//       : "") +
//     (months_passed == 1
//       ? months_passed + " " + mnthsTxt[0]
//       : months_passed > 1
//       ? months_passed + " " + mnthsTxt[1] + " "
//       : "") +
//     (days_passed == 1
//       ? days_passed + " " + daysTxt[0]
//       : days_passed > 1
//       ? days_passed + " " + daysTxt[1]
//       : "");

//   //return the result
//   return {
//     total_days: Math.round(total_days),
//     total_weeks: Math.round(total_weeks),
//     total_hours: Math.round(total_hours),
//     total_minutes: Math.round(total_mins),
//     total_seconds: Math.round(total_secs),
//     result: result.trim(),
//   };
// };
const calcDate = (
  startDate: any,
  endDate: any,
  differenceType: "day" | "month" = "day"
) => {
  const date1 = dayjs(startDate).format("YYYY/MM/DD");
  const date2 = dayjs(endDate).format("YYYY/MM/DD");
  return dayjs(date2).diff(date1, differenceType);
};
export { dateConverter, convertDate, getDateDiff, calcDate };

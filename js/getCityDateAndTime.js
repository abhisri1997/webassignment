import monthMatch from "./monthMatch.js";

/**
 * Takes date and time in string format and return date, time and AM/PM in array format.
 *
 * @param {string} dateTime
 * @return {Array}
 */
export const getCityDateAndTime = (dateTime) => {
  const dateAndTime = dateTime.split(",");

  let date = dateAndTime[0].split("/")[1];
  date = parseInt(date) <= 9 ? 0 + date : date;

  const monthIndex = dateAndTime[0].split("/")[0];
  const month = monthMatch[monthIndex];
  const year = dateAndTime[0].split("/")[2];
  const formattedDate = date + "-" + month + "-" + year;

  const time = dateAndTime[1].trim().split(" ")[0];
  const hours =
    parseInt(time.split(":")[0]) <= 9
      ? 0 + time.split(":")[0]
      : time.split(":")[0];
  const minutes = time.split(":")[1];
  const seconds = time.split(":")[2];
  const formattedTime = hours + ":" + minutes + "-" + seconds;
  const isAM = dateAndTime[1].trim().split(" ")[1] == "AM" ? true : false;

  return [formattedDate, formattedTime, isAM];
};

const momentMJ = require("moment-jalali");

const getPersianDate = (date) => {
    persianMonths = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    let newDate = momentMJ(date);
    let year = newDate.jYear();
    let month = persianMonths[newDate.jMonth()];
    let day = newDate.jDate();
    return `${day} ${month} ${year}`;
  };

  module.exports = {
    getPersianDate
  }
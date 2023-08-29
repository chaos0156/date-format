interface DateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  yyyy: string;
  MM: string;
  dd: string;
  hh: string;
  mm: string;
  ss: string;
}

export function formate(
  date: Date,
  formatter: string | ((dateInfo: DateInfo) => string),
  isPad = false
): string {
  const formatterNormalization = formatterNomalize(formatter);
  return formatterNormalization(getDateInfo(date, isPad));
}

function formatterNomalize(
  formatter: string | ((dateInfo: DateInfo) => string)
): (dateInfo: DateInfo) => string {
  if (typeof formatter === "function") return formatter;
  return (dateInfo: DateInfo) => {
    if (formatter === "date")
      return `${dateInfo.yyyy}-${dateInfo.MM}-${dateInfo.dd}`;
    if (formatter === "datetime")
      return `${dateInfo.yyyy}-${dateInfo.MM}-${dateInfo.dd} ${dateInfo.hh}:${dateInfo.mm}:${dateInfo.ss}`;
    formatter = formatter as string;
    formatter = formatter.replace(/yyyy/, dateInfo.yyyy);
    formatter = formatter.replace(/MM/, dateInfo.MM);
    formatter = formatter.replace(/dd/, dateInfo.dd);
    formatter = formatter.replace(/hh/, dateInfo.hh);
    formatter = formatter.replace(/mm/, dateInfo.mm);
    formatter = formatter.replace(/ss/, dateInfo.ss);
    formatter = formatter.replace(/-pad/, "");
    return formatter;
  };
}

function getDateInfo(date: Date, isPad = false): DateInfo {
  const getPadString = (num: number) =>
    isPad ? num.toString().padStart(2, "0") : num.toString();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    yyyy: date.getFullYear().toString(),
    MM: getPadString(date.getMonth() + 1),
    dd: getPadString(date.getDate()),
    hh: getPadString(date.getHours()),
    mm: getPadString(date.getMinutes()),
    ss: getPadString(date.getSeconds()),
  };
}

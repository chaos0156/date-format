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
  if (!date) return "";
  if (typeof formatter === "string") {
    return getDateFromString(date, formatter, isPad);
  }
  if (typeof formatter === "function") {
    return getDateFromFunc(date, formatter, isPad);
  }
  return "";
}

function getDateInfo(date: Date, isPad = false): DateInfo {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const yyyy = `${year}`;
  let MM = `${month}`;
  let dd = `${day}`;
  let hh = `${hour}`;
  let mm = `${minute}`;
  let ss = `${second}`;
  if (isPad) {
    MM = month < 10 ? `0${MM}` : `${MM}`;
    dd = day < 10 ? `0${dd}` : `${dd}`;
    hh = hour < 10 ? `0${hh}` : `${hh}`;
    mm = minute < 10 ? `0${mm}` : `${mm}`;
    ss = second < 10 ? `0${ss}` : `${ss}`;
  }
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    yyyy,
    MM,
    dd,
    hh,
    mm,
    ss,
  };
}

function getDateFromString(
  date: Date,
  formatter: string,
  isPad: boolean
): string {
  const { yyyy, MM, dd, hh, mm, ss } = getDateInfo(date, isPad);
  if (formatter.includes("datetime")) {
    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
  }
  if (formatter.includes("date")) {
    return `${yyyy}-${MM}-${dd}`;
  }
  formatter = formatter.replace(/yyyy/, yyyy);
  formatter = formatter.replace(/MM/, MM);
  formatter = formatter.replace(/dd/, dd);
  formatter = formatter.replace(/-pad/, "");
  formatter = formatter.replace(/hh/, hh);
  formatter = formatter.replace(/mm/, mm);
  formatter = formatter.replace(/ss/, ss);
  return formatter;
}

function getDateFromFunc(
  date: Date,
  formatter: (dateInfo: DateInfo) => string,
  isPad: boolean
): string {
  return formatter(getDateInfo(date, isPad));
}

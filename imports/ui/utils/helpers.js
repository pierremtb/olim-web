export const Matcher = {
  // 'on monday' => ['monday']
  onWeekDayRegEx: /( on (monday|tuesday|wednesday|thursday|friday|saturday|sunday))|(on (monday|tuesday|wednesday|thursday|friday|saturday|sunday) )/i,

  // 'at 8pm' => ['8', 'pm']
  atHourAmPm: /( at ([1-9]|1[0-2])(am|pm))|(at ([1-9]|1[0-2])(am|pm) )/i,

  // 'at 20:56' => ['20', '56']
  atHourDoublePoint: /( at (00|[0-1][1-9]|2[0-3]):(00|[0-5][0-9]|5))|(at (00|[0-1][1-9]|2[0-3]):(00|[0-5][0-9]|5) )/i,

  // 'do this tomorrow' | 'tomorrow do this' => ['tomorrow']
  todayOrTomorrowOrAfterTomorrow: / (today|tomorrow|the day after tomorrow)|(today|tomorrow|the day after tomorrow) /i,
};

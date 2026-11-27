// Dates are handled as "YYYY-MM-DD" strings in Lagos time, so a night never
// slips a day because of the visitor's own timezone.
const DAY = 86400000;
const keyFmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" });
const short = new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", timeZone: "UTC" });
const long = new Intl.DateTimeFormat("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const weekday = new Intl.DateTimeFormat("en-NG", { weekday: "short", timeZone: "UTC" });

const toUtc = (key) => Date.parse(`${key}T00:00:00Z`);

export const todayKey = () => keyFmt.format(new Date());
export const addDays = (key, n) => new Date(toUtc(key) + n * DAY).toISOString().slice(0, 10);
export const nightsBetween = (a, b) => Math.round((toUtc(b) - toUtc(a)) / DAY);
export const formatShort = (key) => short.format(toUtc(key));
export const formatLong = (key) => long.format(toUtc(key));
export const formatWeekday = (key) => weekday.format(toUtc(key));
export const isValidKey = (key) => /^\d{4}-\d{2}-\d{2}$/.test(key ?? "") && !Number.isNaN(toUtc(key));

// Do two stays [a1, a2) and [b1, b2) share a night?
export const overlaps = (a1, a2, b1, b2) => a1 < b2 && b1 < a2;

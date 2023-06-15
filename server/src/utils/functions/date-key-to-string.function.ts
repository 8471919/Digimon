import { DateKeyToString } from '../types/date-to-string.type';

export function dateKeyToString<T extends object>(
  target: T,
): DateKeyToString<T> {
  try {
    const res = Object.entries(target).reduce((acc, [key, value]) => {
      if (value === null) {
        return { ...acc, [key]: null };
      }

      if (value instanceof Date) {
        return { ...acc, [key]: value.toISOString() };
      }

      if (typeof value === 'object') {
        return { ...acc, [key]: dateKeyToString(value) };
      }

      return { ...acc, [key]: value };
    }, {}) as DateKeyToString<T>;

    return res;
  } catch (err) {
    console.log(err);
    throw new Error('dateKeyToString function is wrong');
  }
}

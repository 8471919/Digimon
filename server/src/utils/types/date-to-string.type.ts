type DateToString<T> = T extends Date ? string : T;

export type DateKeyToString<T extends object> = {
  [P in keyof T]: DateToString<T[P]> extends T[P]
    ? T[P] extends object
      ? DateKeyToString<T[P]>
      : T[P]
    : DateToString<T[P]>;
};

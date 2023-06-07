export type TypeToSelect<T extends object> = {
  [P in keyof T]: true;
};

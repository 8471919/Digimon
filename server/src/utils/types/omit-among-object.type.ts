export type OmitAmongObject<T extends object, K extends object> = {
  [P in keyof T as P extends keyof K ? never : P]: T[P];
};

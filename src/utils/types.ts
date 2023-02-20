export type NonEmpty<T extends Record<string, unknown>> = T extends Record<
  string,
  never
>
  ? never
  : T

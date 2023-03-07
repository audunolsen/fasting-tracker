import * as H from "hotscript"

/** Retrieve undefined fields and make them optional */
export type OptionalFields<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]?: T[K]
}

/** Retrieve all required fields */
export type RequiredFields<T> = Omit<T, keyof OptionalFields<T>>

/** Combine noth optional and required fields */
export type MakeOptional<T> = OptionalFields<T> & RequiredFields<T>

/** Flatten the language-server's display type  */
export type Flatten<T> = { [K in keyof T]: T[K] } & {}

/** `boolean: true` if type argument has no keys */
export type IsEmpty<T> = H.Pipe<T, [H.Objects.Keys, H.Booleans.Equals<never>]>

/** `boolean: true` if there are any present keys */
export type HasKeys<T> = H.Pipe<T, [H.Objects.Keys, H.Booleans.NotEqual<never>]>

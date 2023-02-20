export default function merge<T extends object, K extends keyof T>(
  value1: T,
  value2: Pick<T, K>
): T {
  return { ...value1, ...value2 }
}

const value = {
  foo: "foo",
  bar: 42,
}

// function mergeCB<T extends object, K extends keyof T>(
//   value1: T,
//   value2: (prev: T) => Pick<T, K>
// ): T {
//   return { ...value1, ...value2(value1) }
// }

export function mergeCB<T extends object, K extends keyof T>(
  value1: T,
  value2: Pick<T, K> | ((prev: T) => Pick<T, K>)
): T {
  return {
    ...value1,
    ...(typeof value2 === "function" ? value2(value1) : value2),
  }
}

// merge(value, () => ({ fuck: "" })) // ok
// merge(value, { foo: "bar" }) // ok
// merge(value, { bar: undefined }) // ok
// merge(value, { bar: 666 }) // ok
// merge(value, { foo: "", bar: undefined }) // ok
// merge(value, { foo: "", bar: 666 }) // ok

// // // merge(value, { foo: undefined }) // ng

// mergeCB(value, (p) => ({})) // ok
// mergeCB(value, (p) => ({ foo: "bar" })) // ok
// mergeCB(value, (p) => ({ bar: undefined })) // ok
// mergeCB(value, (p) => ({ bar: 666 })) // ok
// mergeCB(value, (p) => ({ foo: "", bar: undefined })) // ok
// mergeCB(value, (p) => ({ foo: "", bar: 666 })) // ok

// mergeCB(value, {}) // ok
// mergeCB(value, { foo: "bar" }) // ok
// mergeCB(value, { bar: undefined }) // ok
// mergeCB(value, { bar: 666 }) // ok
// mergeCB(value, { foo: "", bar: undefined }) // ok
// mergeCB(value, { foo: "", bar: 666 }) // ok

// // mergeCB(value, { foo: undefined }) // ng

/**
 * Util for working w/ promises allowing for better type narrowing & more sync-looking, non try-catch code
 *
 * ```
 * res = await someAsyncFunc(…).catch(coerceError)
 *
 * if (res instanceof Error) {
 *  // ts narrows res as Error inside clause
 *
 *   handleError(res) // do some error handling
 *  return
 * }
 * // res is now type narrowed as the succesful response type
 * ```
 */
export default function coerceError(error: unknown) {
  if (error instanceof Error) {
    return error
  }
  /*
    While any expression can be thrown, anything other than the Error class
    or a class which inheriths it is generally considered a bad practice 
  */
  return new Error(JSON.stringify(error))
}

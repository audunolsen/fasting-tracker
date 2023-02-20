import { useEffect } from "react"

/**
 * Does not provide cleanup. Use for when async/await is needed and/or
 * if you have lint rules screaming to put any invariant-variables in the
 * dep array which negates useEffect's usage as a lifecycle hook
 */
export default function useMount(cb: () => void) {
  useEffect(() => {
    cb()
  }, [])
}

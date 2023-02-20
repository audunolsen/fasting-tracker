import * as React from "react"

export default function useActiveElement() {
  const [active, setActive] = React.useState<Element | null>()

  function handleFocusIn() {
    setActive(document.activeElement)
  }

  function handleFocusOut() {
    setActive(null)
  }

  React.useEffect(() => {
    setActive(document.activeElement)

    document.addEventListener("focusin", handleFocusIn)
    document.addEventListener("focusout", handleFocusOut)

    return () => {
      document.removeEventListener("focusin", handleFocusIn)
      document.addEventListener("focusout", handleFocusOut)
    }
  }, [])

  return active
}

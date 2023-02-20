import * as React from "react"
import { parsePhoneNumberFromString as parseNumber } from "libphonenumber-js"
import type { ChangeEvent, FormEvent } from "react"
import type { CountryCode } from "libphonenumber-js"
import { useActiveElement } from "~/hooks"
import { Props, Handle } from "./types"
import { dispatchChangeEvent } from "./utils"
import styles from "./styles.module.css"

// TODO: ideally this should be IP's country of origin
const defaultCountry: CountryCode = "NO"

export default React.forwardRef<Handle, Props>(function PhoneInput(props, ref) {
  const id = React.useId()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const isFocused = useActiveElement() == inputRef.current
  const [value, setValue] = React.useState(props.value ?? "")

  const [country, isValid] = React.useMemo(() => {
    const parsed = parseNumber(value, defaultCountry)
    return [parsed?.country ?? defaultCountry, !!parsed?.isValid()]
  }, [value])

  React.useImperativeHandle(
    ref,
    () => ({
      element: inputRef.current,

      get e164() {
        const parsed = parseNumber(inputRef.current?.value ?? "", country)
        return parsed?.isValid() ? parsed.number : null
      },
    }),
    [country]
  )

  function onBeforeInput(e: FormEvent<HTMLInputElement> & { data: string }) {
    /*
      Dissalow any non e164 characters, but allow characters used
      for number formatting (dashes, spaces and parenthesis). This
      allows for typing/pasting of formatted numbers. These are of course
      stripped from the valid internationalized e164 number
      exposed through the ref handle.
    */

    const validChars = /^[\+\s\d-\(\)]*$/

    if (e.data && !validChars.test(e.data)) {
      e?.preventDefault()
      return
    }

    props.onBeforeInput?.(e)
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    props.onChange?.(e)
  }

  React.useEffect(() => {
    const value = inputRef.current?.value ?? ""
    const parsed = parseNumber(value, defaultCountry)
    const formatted = `${parsed?.formatInternational()} (${parsed?.country})`

    const raw = parsed?.isValid()
      ? parsed?.number ?? ""
      : value.replaceAll(" ", "")

    dispatchChangeEvent(
      inputRef.current,
      !isFocused && parsed?.isValid() ? formatted : raw
    )
  }, [isFocused])

  React.useEffect(() => {
    inputRef.current?.setCustomValidity(
      !isValid ? props.invalidMessage ?? "Invalid phone number" : ""
    )
  }, [isValid, props.invalidMessage])

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{props.label}</label>
      <input
        {...{ id, ...props }}
        className={styles.input}
        type="tel"
        onChange={onChange}
        onBeforeInput={onBeforeInput}
        ref={inputRef}
      />
    </div>
  )
})

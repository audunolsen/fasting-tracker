import type { FormEvent, ChangeEvent } from "react"
import { useRef, useCallback, useEffect, useId } from "react"
import { debounce } from "lodash-es"
import { useStateObject } from "~hooks"
import { assertElement, cn } from "~utils"
import styles from "./styles.module.scss"
import { Props } from "./types"

/**
 * Component extending native Input element
 *
 * Allows for full control over error messages/styling.
 * Set validation reporting strategy which defaults to native browser behaviour.
 *
 * Uses native validation attributs & `customValidationCheck`
 *
 * For external error handling (e.g. server error like username taken), use
 * `error` and optionally `submitWhenError`
 *
 * Todo: improve description
 */
export default function Input({
  label,
  invalidText,
  customValidityCheck,

  // TODO: prop name change validationReportingStartegy (?)
  // if debounce include onBlur logic
  validationStrategy = "default",
  delay = 1500,

  error,
  submitWhenError = true, // change name and default value?

  ...props
}: Props) {
  const id = useId()
  const ref = useRef<HTMLInputElement>(null)

  const [validity, setValidity] = useStateObject({
    isValid: true,
    message: "" as string | undefined,
  })

  const debouncedOnchange = useCallback(
    debounce((input: HTMLInputElement) => {
      if (validationStrategy !== "debounced") return
      input.reportValidity()
    }, delay),
    [validationStrategy, delay]
  )

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(e)
    debouncedOnchange(e.target)

    e.target.setCustomValidity(
      checkCustomValidation(e.target)(customValidityCheck) ? "" : "invalid"
    )

    setValidity(null, e.target.validity.valid)
  }

  useEffect(() => {
    const clearExistingError =
      ref.current?.validity.customError &&
      checkCustomValidation(ref.current)(customValidityCheck)

    if (error && !submitWhenError) {
      ref.current?.setCustomValidity("invalid")
      ref.current?.reportValidity()
    } else if (clearExistingError) {
      ref.current.setCustomValidity("")
    }

    setValidity(null, ref.current?.validity.valid)
  }, [error, submitWhenError])

  function handleInvalid(e: FormEvent<HTMLInputElement>) {
    e.preventDefault()
    props.onInvalid?.(e)

    assertElement(HTMLInputElement, e.target)

    setValidity({
      isValid: false,
      message:
        typeof invalidText === "function"
          ? invalidText(e.target.validity)
          : invalidText,
    })
  }

  const errorAppearance = !validity.isValid || error
  const displayErrorMessage = (!validity.isValid && validity.message) || error

  return (
    <div className={cn(styles.wrapper)}>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        id={id}
        ref={ref}
        onChange={handleChange}
        onInvalid={handleInvalid}
        className={cn(
          styles.input,
          errorAppearance && styles.invalid,
          props.className
        )}
      />
      {displayErrorMessage && (
        <span className={cn(styles.invalidText)}>
          {error || validity.message}
        </span>
      )}
    </div>
  )
}

function checkCustomValidation(input: HTMLInputElement) {
  const empty = !input.value
  const notRequired = !input.required

  return (check?: (value: string) => boolean) =>
    (empty && notRequired) || (check?.(input.value) ?? true)
}

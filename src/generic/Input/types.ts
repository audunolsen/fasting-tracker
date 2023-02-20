import type { ReactNode, ComponentProps } from "react"

interface BaseProps extends ComponentProps<"input"> {
  id?: never
  label: ReactNode

  // for internal validity handling
  invalidText?: string | ((validity: ValidityState) => string)
  customValidityCheck?: (value: string) => boolean

  // for external error handling (e.g. server errors like username taken)
  error?: ReactNode
  submitWhenError?: boolean
}

interface PropsWithDefault extends BaseProps {
  validationStrategy?: "default"
  delay?: never
}

interface PropsWithDebounced extends BaseProps {
  validationStrategy: "debounced"
  delay?: number
}

export type Props = PropsWithDefault | PropsWithDebounced

export type Validity<V = ValidityState> = Partial<{
  -readonly [P in keyof V]: V[P]
}>

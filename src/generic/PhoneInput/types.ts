import type { ComponentProps } from 'react'
import type { E164Number } from 'libphonenumber-js/types'

type NativeProps = Omit<ComponentProps<'input'>, 'id' | 'type'>

interface BaseProps extends NativeProps {
  label?: string
  invalidMessage?: string
}

interface PropsWithValue extends BaseProps {
  value?: string
  defaultValue?: never
}

interface PropsWithDefault extends BaseProps {
  defaultValue?: string
  value?: never
}

// Allow only value OR defaultValue to avoid React
// controlled/uncontrolled warnings at runtime
export type Props = PropsWithValue | PropsWithDefault

export interface Handle {
  element: HTMLInputElement | null
  e164: E164Number | null
}

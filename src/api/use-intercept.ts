import axios from "axios"
import { ZodError } from "zod"
import { useMount } from "~hooks"

export default function useIntercept() {
  useMount(() => {
    axios.interceptors.response.use(undefined, (error) => {
      console.error(
        ...(error instanceof ZodError
          ? ["Axios schema-drift:", error]
          : [error])
      )

      return Promise.reject(error)
    })
  })
}

/**
 * syntactic sugar for retrieving form fields
 *
 * write `data.field` instead of `data.get('field')?.toString() ?? ''`
 */

export default function formFields(form: HTMLFormElement): Record<any, string> {
  const data = new FormData(form)
  const proxy = new Proxy(
    {},
    {
      get({}, path: string) {
        // console.log(data.getAll("wife"))
        return data.get(path)?.toString() ?? ""
      },
    }
  )

  return proxy
}

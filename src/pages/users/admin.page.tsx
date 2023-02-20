import definePageConfig from "~router/define-page-config"

export default function Admin() {
  return (
    <div>
      You're in the admin page…
      <br />
      You shouldn't be here
    </div>
  )
}

export const config = definePageConfig({})

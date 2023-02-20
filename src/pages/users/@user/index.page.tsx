import { Outlet, useParams } from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function User() {
  let { user } = useParams()

  return (
    <div>
      Your profile — {user}
      <br />
      <Outlet />
    </div>
  )
}

export const config = definePageConfig({})

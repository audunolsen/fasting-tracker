import { Outlet } from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function Users() {
  return (
    <div>
      Hello world from User(s!)-page
      <br />
      <Outlet />
    </div>
  )
}

export const config = definePageConfig({})

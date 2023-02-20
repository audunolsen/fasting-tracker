import { Outlet } from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function Friends() {
  return (
    <div>
      Here's your friend page
      <br />
      <Outlet />
    </div>
  )
}

export const config = definePageConfig({})

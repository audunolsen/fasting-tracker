import definePageConfig from "~router/define-page-config"
import { Outlet } from "react-router-dom"

export default function Projects() {
  return (
    <div>
      Project overview
      <br />
      <Outlet />
    </div>
  )
}

export const config = definePageConfig({})

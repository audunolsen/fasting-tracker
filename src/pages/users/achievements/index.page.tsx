import { Outlet, useParams } from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function Achievements() {
  return (
    <>
      <div>Achievements!!!</div>
      <Outlet />
    </>
  )
}

export const config = definePageConfig({})

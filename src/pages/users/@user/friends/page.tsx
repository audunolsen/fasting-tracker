import { Outlet, useParams } from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function User() {
  const { user } = useParams()

  return (
    <>
      <h2>These are your firends</h2>
      <Outlet />
    </>
  )
}

export const config = definePageConfig({})

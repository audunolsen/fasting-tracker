import { Outlet, useParams } from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function FriendsLayoutWrapper() {
  const { user } = useParams()

  return (
    <>
      <h2>FriendsLayoutWrapper</h2>
      <Outlet />
    </>
  )
}

export const config = definePageConfig({
  // path: null,
})

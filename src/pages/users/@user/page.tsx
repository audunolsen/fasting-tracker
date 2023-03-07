import { Suspense } from "react"
import { Outlet, useParams } from "react-router-dom"
import { useSnapshot } from "valtio"
import definePageConfig from "~router/define-page-config"
import { usersState } from "../page"

export default function User() {
  const { user } = useParams()
  const snap = useSnapshot(usersState)

  return (
    <>
      <h2>
        Hello {user}!! {snap.post}
      </h2>
      <Outlet />
    </>
  )
}

export const config = definePageConfig({})

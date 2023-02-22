import { Navigate, Outlet, useLoaderData } from "react-router-dom"
import { Show } from "~control-flow"
import definePageConfig from "./define-page-config"
import { Auth } from "./types"

interface Props {
  auth: Auth
  redirectPath?: string
}

/**
 * Hmmmmm WIP
 *
 * This doesn't actually do any auth access handling,
 * it just ensures renderings is deferred until login status is resolved
 */
export default function AuthHandler() {
  // const loggedIn = useLoaderData()

  return (
    <>
      <div>Login handler</div>

      <Show when={true} fallback={"Waiting for auth"}>
        <Outlet />
      </Show>

      {/* {auth === "awaiting" && <div>LOADING AUTH…</div>}
      {auth === true && <Outlet />}
      {!auth && <Navigate to={redirectPath} />} */}
    </>
  )
}

export const authConfig = definePageConfig({
  // loader: () => new Promise((res) => setTimeout(() => res(true), 2000)),
})

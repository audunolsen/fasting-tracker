import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { proxy } from "valtio"
import { useMount } from "~hooks"

export const usersState = proxy({
  post: new Promise<string>((res) => setTimeout(() => res("Pokemon!!"), 5000)),
})

export default function Users() {
  useMount(async () => {
    const users = await usersState.post

    console.log("USERS!!!", users)
  })

  return (
    <>
      <Test />
      <h1>Hello from users pageee Lorem ipsum dolor</h1>
      <Suspense fallback="Loading valtio store">
        <Outlet />
      </Suspense>
    </>
  )
}

function Test() {
  return <>Sup 4</>
}

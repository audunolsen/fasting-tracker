import { Outlet } from "react-router-dom"

export default function Users() {
  return (
    <>
      <h1>Hello from users page</h1>
      <Outlet />
    </>
  )
}

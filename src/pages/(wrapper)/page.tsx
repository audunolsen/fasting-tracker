import { Outlet } from "react-router-dom"

export default function Wrapper() {
  return (
    <>
      <h1>Pathless layout "wrapper"</h1>
      <Outlet />
    </>
  )
}

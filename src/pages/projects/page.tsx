import { Outlet } from "react-router-dom"

export default function Projects() {
  return (
    <div>
      <span style={{ color: "red" }}>projects/page.tsx</span>
      <br />
      Project overview
      <br />
      <br />
      <Outlet />
    </div>
  )
}

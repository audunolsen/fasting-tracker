import { Outlet } from "react-router-dom"

export default function SettingsAdminLayout() {
  return (
    <>
      Admin pathless layout ( "admin" should NOT appear in the url )
      <Outlet />
    </>
  )
}

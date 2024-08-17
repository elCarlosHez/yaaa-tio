import { Outlet } from "react-router-dom"
import { MenuBar } from "../components/AppBar"

export const AppBarLayout = () => {
  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  )
}
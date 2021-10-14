import { NextPage } from "next"
import React, { ReactElement } from "react"
import { AuthenticatedLayout, DialogLayout } from "src/layouts"
import DashboardDialog from "src/components/dashboard/DashboardDialog"
import Menu from "src/components/menu/Menu"

const DashboardPage: NextPage = (): ReactElement => {
  return (
    <>
      <Menu/>
      <DashboardDialog/>
    </>
  )
}

export default AuthenticatedLayout(DialogLayout(DashboardPage))

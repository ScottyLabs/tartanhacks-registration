import { NextPage } from "next"
import React, { ReactElement } from "react"
import { DialogLayout } from "src/layouts"
import DashboardDialog from "src/components/dashboard/DashboardDialog"
import Burger from "src/components/burger/Burger"

const DashboardPage: NextPage = (): ReactElement => {
  return (
    <>
      <Burger/>
      <DashboardDialog/>
    </>
  )
}

export default DialogLayout(DashboardPage)

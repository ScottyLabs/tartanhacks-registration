import { NextPage } from "next"
import React, { ReactElement } from "react"
import AuthenticationDialog from "src/components/auth/AuthenticationDialog"
import { DialogLayout } from "src/layouts"

const LoginPage: NextPage = (): ReactElement => {
  return (
    <>
      <AuthenticationDialog registration={false} />
    </>
  )
}

export default DialogLayout(LoginPage)

import { NextPage } from "next"
import React, { ReactElement } from "react"
import AuthenticationDialog from "src/components/auth/AuthenticationDialog"
import { BaseLayout } from "src/layouts"

const LoginPage: NextPage = (): ReactElement => {
  return (
    <>
      <AuthenticationDialog registration={false} />
    </>
  )
}

export default BaseLayout(LoginPage)

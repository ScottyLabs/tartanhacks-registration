import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { ReactElement, useEffect } from "react"

const Home: NextPage = (): ReactElement => {
  const router = useRouter()

  useEffect(() => {
    window.localStorage.removeItem("accessToken")

    router.push("/login")
  }, [])

  return <></>
}

export default Home

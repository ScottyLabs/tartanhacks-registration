import type { NextPage } from "next"
import { useEffect } from "react"

const Home: NextPage = () => {
  // TODO: Perform check for authentication
  useEffect(() => {
    window.history.pushState(null, "", "/login")
    window.location.reload()
  }, [])

  return <></>
}

export default Home

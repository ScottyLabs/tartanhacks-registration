import React, {
    ReactElement,
    FunctionComponent,
    useEffect,
    useState
  } from "react"
  import { useSelector } from "react-redux"
  import { useRouter } from "next/dist/client/router"
  import { RootState } from "types/RootState"
  
  /**
   * Layout to hide content that requires authentication.
   * This automatically redirects to the login page if it cannot successfully
   * login the user using the stored login token in the browser
   */
  const AdminLayout = (Page: FunctionComponent) => (): ReactElement => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const currentUser = useSelector((state: RootState) => state?.accounts?.data)
  
    useEffect(() => {
      const loginWithToken = async () => {
        setLoading(true)
        if (currentUser.admin === false) {
          router.push("/login")
        }
        setLoading(false)
      }
      loginWithToken()
    }, [currentUser])
  
    if (loading || currentUser == null) {
      return <></>
    }
  
    return <Page />
  }
  
  export default AdminLayout
  
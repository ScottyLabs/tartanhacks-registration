import React, {
  ReactElement,
  FunctionComponent,
  useEffect,
  useState
} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/dist/client/router"
import { RootState } from "types/RootState"
import actions from "src/actions"

/**
 * Layout to hide content from users that already have a team
 */
const TeamlessLayout = (Page: FunctionComponent) => (): ReactElement => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state?.accounts?.data)

  useEffect(() => {
    const checkForTeam = async () => {
      console.log(currentUser)
      setLoading(true)
      try {
        const ownTeam = await dispatch(actions.user.getOwnTeam())
        router.push("/teams/details/" + ownTeam.data._id)
      } finally {
        setLoading(false)
      }
    }
    checkForTeam()
  }, [currentUser._id])

  if (loading || currentUser == null) {
    return <></>
  }

  return <Page />
}

export default TeamlessLayout

import { makeStyles } from "@material-ui/core"
import { NextPage } from "next"
import { ReactElement } from "react"
import DashboardDialog from "src/components/dashboard/DashboardDialog"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import Menu from "src/components/menu/Menu"
import { AuthenticatedLayout } from "src/layouts"

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}))

const Home: NextPage = (): ReactElement => {
  const classes = useStyles()
  return (
    <>
      <WaveBackground />
      <Menu />
      <div>
        <ScottyLabsHeader />
        <div className={classes.dialog}>
          <DashboardDialog />
        </div>
      </div>
    </>
  )
}

export default AuthenticatedLayout(Home)

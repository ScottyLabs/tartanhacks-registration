import { makeStyles, Modal } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import { ApplicationStatus } from "enums/ApplicationStatus"
import { ReactElement, useState } from "react"
import { useSelector } from "react-redux"
import getApplicationStatus from "src/util/getApplicationStatus"
import { RootState } from "types/RootState"
import BurgerMenu from "../design/BurgerMenu"
import MenuItem from "./MenuItem"
import MenuLine from "./MenuLine"

const useStyles = makeStyles((theme) => ({
  burgerLine: {
    width: "3rem",
    height: "0.25rem",
    backgroundColor: `${theme.palette.primary.main}`,
    borderRadius: "10px",
    position: "relative",
    marginBottom: "2px"
  },
  burgerWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: "3%",
    marginRight: "3%",
    cursor: "pointer",
    padding: "0",
    zIndex: 2000,
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      marginTop: "5%",
      marginRight: "5%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      marginTop: "8%",
      marginRight: "5%"
    }
  },
  burger: {
    height: "3rem",
    width: "3rem",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      height: "3rem",
      width: "3rem"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      height: "2rem",
      width: "2rem"
    }
  },
  menuWrapper: {
    position: "absolute",
    top: "0",
    width: "100%"
  },
  menuBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    padding: "1em",
    background: `${theme.palette.primary.main}`,
    boxShadow: "0px 4px 4px rgba(219, 121, 52, 0.5)",
    borderRadius: "10px",
    position: "absolute",
    top: "8em",
    right: "5em",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "50%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "60%"
    }
  },
  menuLine: {
    position: "relative",
    width: "100%",
    height: "7px"
  },
  menuBurgerContainer: {
    position: "absolute",
    top: "0",
    left: "0"
  }
}))

const Menu = (): ReactElement => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [open, setOpen] = useState(false)
  const handleSwitch = () => setOpen(!open)
  const handleClose = () => setOpen(false)

  const status =
    useSelector((state: RootState) => state?.user?.data?.status) ?? {}
  const isAdmin = useSelector(
    (state: RootState) => state?.accounts?.data?.admin
  )
  const applicationStatus = getApplicationStatus(status)

  return (
    <div className={classes.menuBurgerContainer}>
      <div className={classes.burgerWrapper}>
        <BurgerMenu className={classes.burger} onClick={handleSwitch} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.menuWrapper}>
          <div className={classes.menuBox}>
            <MenuItem text="HOME" url="/" />
            <MenuLine />
            {applicationStatus === ApplicationStatus.VERIFIED ? (
              <>
                <MenuItem text="APPLY" url="/apply" />
                <MenuLine />
              </>
            ) : null}
            {applicationStatus === ApplicationStatus.APPLIED ? (
              <>
                <MenuItem text="APPLICATION" url="/apply" />
                <MenuLine />
              </>
            ) : null}
            {applicationStatus === ApplicationStatus.ADMITTED ? (
              <>
                <MenuItem text="CONFIRM" url="/confirmation" />
                <MenuLine />
              </>
            ) : null}
            {applicationStatus === ApplicationStatus.CONFIRMED ? (
              <>
                <MenuItem text="TEAM" url="/teams" />
                <MenuLine />
                <MenuItem text="MESSAGES" url="/messages" />
                <MenuLine />
              </>
            ) : null}
            {isAdmin ? (
              <>
                <MenuItem text="ADMIN" url="/admin" />
                <MenuLine />
              </>
            ) : null}
            <MenuItem text="LOGOUT" url="/logout" />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Menu

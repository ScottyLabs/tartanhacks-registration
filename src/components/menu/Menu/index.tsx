import { Modal } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import { ApplicationStatus } from "enums/ApplicationStatus"
import { ReactElement, useState } from "react"
import { useSelector } from "react-redux"
import getApplicationStatus from "src/util/getApplicationStatus"
import { RootState } from "types/RootState"
import BurgerMenu from "../../design/BurgerMenu"
import MenuItem from "../MenuItem"
import MenuLine from "../MenuLine"
import styles from "./index.module.scss"

const Menu = (): ReactElement => {
  const theme = useTheme()
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
    <div className={styles.menuBurgerContainer}>
      <div className={styles.burgerWrapper}>
        <BurgerMenu className={styles.burger} onClick={handleSwitch} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className={styles.menuWrapper}>
          <div className={styles.menuBox}>
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

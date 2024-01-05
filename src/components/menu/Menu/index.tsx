import { Modal } from "@mui/material"
import { Status } from "enums/Status"
import { DateTime } from "luxon"
import { ReactElement, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "types/RootState"
import BurgerMenu from "../../design/BurgerMenu"
import styles from "./index.module.scss"
import MenuItem from "./MenuItem"
import MenuLine from "./MenuLine"

const Menu = (): ReactElement => {
  const [open, setOpen] = useState(false)
  const handleSwitch = () => setOpen(!open)
  const handleClose = () => setOpen(false)

  const status =
    useSelector((state: RootState) => state?.accounts?.data?.status) ??
    Status.UNVERIFIED
  const isAdmin = useSelector(
    (state: RootState) => state?.accounts?.data?.admin
  )

  const confirmTime = useSelector(
    (state: RootState) => state?.settings?.confirmTime
  )
  const confirmTimeDt = DateTime.fromJSDate(confirmTime)
  const curDt = DateTime.now()

  const isLate = curDt > confirmTimeDt

  return (
    <div className={styles.menuBurgerContainer}>
      <div className={styles.burgerWrapper}>
        <BurgerMenu className={styles.burger} onClick={handleSwitch} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className={styles.menuWrapper}>
          <div className={styles.menuBox}>
            <MenuItem text="HOME" url="/" id={0} />
            <MenuLine />
            {status === Status.VERIFIED ? (
              <>
                <MenuItem text="APPLY" url="/apply" id={1} />
                <MenuLine />
              </>
            ) : null}
            {status === Status.COMPLETED_PROFILE ? (
              <>
                <MenuItem text="EDIT APPLICATION" url="/apply" id={1} />
                <MenuLine />
              </>
            ) : null}
            {status === Status.ADMITTED ? (
              <>
                <MenuItem text="CONFIRM" url="/confirmation" id={1} />
                <MenuLine />
              </>
            ) : null}
            {isAdmin || status === Status.CONFIRMED ? (
              <>
                <MenuItem text="TEAM" url="/teams" id={1} />
                <MenuLine />
                <MenuItem text="MESSAGES" url="/messages" id={2} />
                <MenuLine />
              </>
            ) : null}
            {isAdmin ? (
              <>
                <MenuItem text="ADMIN" url="/admin" id={1} />
                <MenuLine />
              </>
            ) : null}
            <MenuItem text="LOGOUT" url="/logout" id={3} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Menu

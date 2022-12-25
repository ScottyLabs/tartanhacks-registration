import { Modal } from "@mui/material"
import { Status } from "enums/Status"
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
            {status === Status.VERIFIED ? (
              <>
                <MenuItem text="APPLY" url="/apply" />
                <MenuLine />
              </>
            ) : null}
            {status === Status.COMPLETED_PROFILE ? (
              <>
                <MenuItem text="APPLICATION" url="/apply" />
                <MenuLine />
              </>
            ) : null}
            {status === Status.ADMITTED ? (
              <>
                <MenuItem text="CONFIRM" url="/confirmation" />
                <MenuLine />
              </>
            ) : null}
            {isAdmin || status === Status.CONFIRMED ? (
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

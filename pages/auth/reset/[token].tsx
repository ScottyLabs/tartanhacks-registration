import { useRouter } from "next/router"
import PasswordResetDialog from "src/components/auth/PasswordResetDialog"
import WaveHeader from "src/components/design/WaveHeader"
import styles from "styles/Auth.module.scss"

const PasswordResetPage = () => {
  const router = useRouter()
  const { token } = router.query

  return (
    <div>
      <WaveHeader variant="dark" />
      <div className={styles.dialog}>
        <PasswordResetDialog token={token as string} />
      </div>
    </div>
  )
}

export default PasswordResetPage

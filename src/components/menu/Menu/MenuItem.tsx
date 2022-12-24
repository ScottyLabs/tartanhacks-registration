import { Link, Typography } from "@material-ui/core"
import NextLink from "next/link"
import { ReactElement } from "react"
import styles from "./index.module.scss"

const MenuItem = ({
  text,
  url
}: {
  text: string
  url: string
}): ReactElement => {
  return (
    <NextLink href={url} passHref>
      <Link className={styles.link}>
        <div className={styles.menuItem}>
          <Typography variant="h5">{text}</Typography>
        </div>
      </Link>
    </NextLink>
  )
}

export default MenuItem

import { Link, makeStyles, Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import { ReactElement } from "react"
import NextLink from "next/link"

const useStyles = makeStyles((theme) => ({
  link: {
    "&:hover": {
      textDecoration: "none",
      filter: "brightness(85%)",
      cursor: "pointer"
    },
    color: "white",
    width: "100%"
  },
  menuItem: {
    textAlign: "center",
    padding: "2em"
  }
}))

const MenuItem = ({
  text,
  url
}: {
  text: string
  url: string
}): ReactElement => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <NextLink href={url} passHref>
      <Link className={classes.link}>
        <div className={classes.menuItem}>
          <Typography variant="h5">{text}</Typography>
        </div>
      </Link>
    </NextLink>
  )
}

export default MenuItem

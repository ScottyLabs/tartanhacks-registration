import { Link, makeStyles, Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import { ReactElement } from "react"

const useStyles = makeStyles((theme) => ({
  menuLine: {
    position: "relative",
    width: "422px",
    height: "7px"
  }
}))

const MenuLine = (): ReactElement => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <svg className={classes.menuLine} viewBox="0 0 422 7">
      <line
        x1="3.5"
        y1="3.5"
        x2="418.5"
        y2="3.5"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default MenuLine

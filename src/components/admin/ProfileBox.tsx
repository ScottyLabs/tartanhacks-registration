import {
  makeStyles,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core"
import { withThemeCreator } from "@material-ui/styles"
import React, { ReactElement } from "react"

const useStyles = makeStyles((theme) => ({
  box: {
    background: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    height: "50%",
    overflow: "scroll",
    justifyContent: "center",
    padding: "1em",
    borderRadius: "25px",
  },
  cell: {
    alignItems: "right"
  }
}))

interface Profile {
  confirmation?: string;
}

const ProfileBox = ({
  profile
}: {
  profile: Profile
}): ReactElement => {
  const classes = useStyles()

  if (Object.keys(profile).length == 0) {
    return (
      <div className={classes.box}>No profile found</div>
    )
  } else {
    const confString: string = JSON.stringify(profile["confirmation" as keyof Profile])
    profile["confirmation" as keyof Profile] = confString
    const rows = Object.keys(profile).map(function (key) {
      return { field: key, value: profile[key as keyof Profile] };
    });

    return (
      <div className={classes.box}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.field}
                >
                  <TableCell component="th" scope="row">
                    {row.field}
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

export default ProfileBox

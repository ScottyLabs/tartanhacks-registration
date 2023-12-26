import { Snackbar } from "@mui/material"
import { Alert } from "@mui/material"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import WaveFooter from "src/components/design/WaveFooter"
import WaveHeader from "src/components/design/WaveHeader"
import Menu from "src/components/menu/Menu"
import MessagesDialog from "src/components/teams/messages/MessagesDialog"
import { AuthenticatedLayout } from "src/layouts"
import { RootState } from "types/RootState"

const Messages = () => {
  const errorMessage = useSelector((state: RootState) => state?.requests?.error)
  const [notify, setNotify] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  return (
    <>
      <Menu />
      <WaveHeader variant="light" />
      <div>
        <WaveFooter />
        <MessagesDialog setSuccessMessage={setSuccessMessage} />
        <Snackbar
          open={notify != ""}
          autoHideDuration={5000}
          onClose={(e) => setNotify("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity={notify === "error" ? "error" : "success"}>
            {notify === "error" ? errorMessage : successMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default AuthenticatedLayout(Messages)

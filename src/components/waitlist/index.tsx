import { Alert } from "@mui/material"

export default function WaitlistAlert({completedProfile} : {completedProfile: boolean}) {
  return completedProfile ? (
    <Alert
      severity="error"
      style={{
        marginTop: "20px"
      }}
    > 
      Unfortunately, due to overwhelming demand, we have reached our capacity
      for TartanHacks 2024. We will process the waitlist and let you know by
      February 3rd, 10pm EST.
    </Alert>
  ) : (
    <Alert
      severity="error"
      style={{
        marginTop: "20px"
      }}
    >
      Unfortunately, due to overwhelming demand, we have reached our capacity
      for TartanHacks 2024. If you&apos;d like to be placed on a waitlist,
      please complete the registration process.
    </Alert>
  )
}

import { ApplicationStatus } from "enums/ApplicationStatus"

export default ({
  confirmed,
  admitted,
  completedProfile,
  verified
}: {
  confirmed?: boolean
  admitted?: boolean
  completedProfile?: boolean
  verified?: boolean
}): ApplicationStatus => {
  if (confirmed) {
    return ApplicationStatus.CONFIRMED
  } else if (admitted) {
    return ApplicationStatus.ADMITTED
  } else if (admitted === false) {
    return ApplicationStatus.REJECTED
  } else if (completedProfile) {
    return ApplicationStatus.APPLIED
  } else if (verified) {
    return ApplicationStatus.VERIFIED
  } else {
    return ApplicationStatus.UNVERIFIED
  }
}

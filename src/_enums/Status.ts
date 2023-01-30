export enum Status {
  UNVERIFIED = "UNVERIFIED",
  VERIFIED = "VERIFIED",
  COMPLETED_PROFILE = "COMPLETED_PROFILE",
  ADMITTED = "ADMITTED",
  REJECTED = "REJECTED",
  CONFIRMED = "CONFIRMED",
  DECLINED = "DECLINED"
}

/**
 * Returns a more user-friendly string representation of a Status entry
 */
export function statusToString(status: Status): string {
  //TODO change to "APPLIED"
  if (status === Status.COMPLETED_PROFILE) {
    return "WAITLISTED"
  } else {
    return status
  }
}

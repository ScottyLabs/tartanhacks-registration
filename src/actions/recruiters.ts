import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const create = (
  sponsorId: string,
  email: string,
  firstName: string,
  lastName: string
): DispatchAction => ({
  type: DispatchActionType.RECRUITER_CREATE,
  useAPI: true,
  request: {
    path: "/recruiter",
    method: "POST",
    body: {
      sponsorId,
      email,
      firstName,
      lastName
    }
  },
  status: RequestStatus.PENDING
})

import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const userRequests = (userId: string): DispatchAction => ({
  type: DispatchActionType.USER_REQUESTS,
  useAPI: true,
  request: {
    path: "/requests/user/" + userId,
    method: "GET"
  },
  status: RequestStatus.PENDING
})

import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const getStatus = (email: string, password: string): DispatchAction => ({
  type: DispatchActionType.USER_STATUS,
  useAPI: true,
  request: {
    path: "/user/status",
    method: "GET",
  },
  status: RequestStatus.PENDING
})

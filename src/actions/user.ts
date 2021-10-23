import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const getStatus = (id: string): DispatchAction => ({
  type: DispatchActionType.USER_STATUS,
  useAPI: true,
  request: {
    path: `/user/status/${id}`,
    method: "GET",
  },
  status: RequestStatus.PENDING
})

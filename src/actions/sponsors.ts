import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const list = (): DispatchAction => ({
  type: DispatchActionType.SPONSORS_LIST,
  useAPI: true,
  request: {
    path: "/sponsors",
    method: "GET"
  },
  status: RequestStatus.PENDING
})

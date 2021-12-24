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

export const create = (sponsorName: string): DispatchAction => ({
  type: DispatchActionType.SPONSORS_CREATE,
  useAPI: true,
  request: {
    path: "/sponsor",
    method: "POST",
    body: {
      name: sponsorName
    }
  },
  status: RequestStatus.PENDING
})

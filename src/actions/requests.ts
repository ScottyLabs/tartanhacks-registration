import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const curUserRequests = (): DispatchAction => ({
  type: DispatchActionType.CURRENT_USER_REQUESTS,
  useAPI: true,
  request: {
    path: "/requests/user/",
    method: "GET"
  },
  status: RequestStatus.PENDING
})

export const acceptRequest = (requestId: string): DispatchAction => ({
  type: DispatchActionType.REQUEST_ACCEPT,
  useAPI: true,
  request: {
    path: "/requests/accept/" + requestId,
    method: "POST"
  },
  status: RequestStatus.PENDING
})

export const declineRequest = (requestId: string): DispatchAction => ({
  type: DispatchActionType.REQUEST_DECLINE,
  useAPI: true,
  request: {
    path: "/requests/decline/" + requestId,
    method: "POST"
  },
  status: RequestStatus.PENDING
})

export const cancelRequest = (requestId: string): DispatchAction => ({
  type: DispatchActionType.REQUEST_CANCEL,
  useAPI: true,
  request: {
    path: "/requests/cancel/" + requestId,
    method: "POST"
  },
  status: RequestStatus.PENDING
})

export const openRequest = (requestId: string): DispatchAction => ({
  type: DispatchActionType.REQUEST_OPEN,
  useAPI: true,
  request: {
    path: "/requests/open/" + requestId,
    method: "PATCH"
  },
  status: RequestStatus.PENDING
})

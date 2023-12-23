import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const getOpenTime = (): DispatchAction => ({
  type: DispatchActionType.SETTINGS_OPEN_TIME,
  useAPI: true,
  request: {
    path: "/settings/time/open",
    method: "GET",
    body: {}
  },
  status: RequestStatus.PENDING
})

export const getCloseTime = (): DispatchAction => ({
  type: DispatchActionType.SETTINGS_CLOSE_TIME,
  useAPI: true,
  request: {
    path: "/settings/time/close",
    method: "GET",
    body: {}
  },
  status: RequestStatus.PENDING
})

export const getConfirmTime = (): DispatchAction => ({
  type: DispatchActionType.SETTINGS_CONFIRM_TIME,
  useAPI: true,
  request: {
    path: "/settings/time/confirm",
    method: "GET",
    body: {}
  },
  status: RequestStatus.PENDING
})

export const getWaitlistStatus = (): DispatchAction => ({
  type: DispatchActionType.WAITLIST_STATUS,
  useAPI: true,
  request: {
    path: "/settings/waitlist",
    method: "GET",
    body: {}
  },
  status: RequestStatus.PENDING
})

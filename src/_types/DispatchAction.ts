import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "src/_enums/RequestStatus"
import { APIRequest } from "./APIRequest"
export type LocalDispatchAction = {
  type: DispatchActionType
  useAPI: false
  status: RequestStatus
  data?: any
}

export type RemoteDispatchAction = {
  type: DispatchActionType
  useAPI: true
  // request fields required if using API
  request: APIRequest
  status: RequestStatus
  data?: any
}

export type DispatchAction = LocalDispatchAction | RemoteDispatchAction

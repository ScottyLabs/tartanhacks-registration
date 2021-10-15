import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "src/_enums/RequestStatus"
import { APIRequest } from "./APIRequest"

export type DispatchAction =
  | {
      type: DispatchActionType
      [data: string]: any
      useAPI: false
    }
  | {
      type: DispatchActionType
      [data: string]: any
      useAPI: true
      // request fields required if using API
      request: APIRequest
      status: RequestStatus
    }

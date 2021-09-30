import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const register = (email: string, password: string): DispatchAction => ({
  type: DispatchActionType.REQUEST_REGISTER,
  useAPI: true,
  request: {
    path: "/auth/register",
    method: "POST",
    body: { email, password }
  },
  status: RequestStatus.PENDING
})

export const login = (email?: string, password?: string): DispatchAction => ({
  type: DispatchActionType.REQUEST_LOGIN,
  useAPI: true,
  request: {
    path: "/auth/login",
    method: "POST",
    body: { email, password }
  },
  status: RequestStatus.PENDING
})

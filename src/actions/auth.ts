import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const register = (email: string, password: string): DispatchAction => ({
  type: DispatchActionType.AUTH_REGISTER,
  useAPI: true,
  request: {
    path: "/auth/register",
    method: "POST",
    body: { email, password }
  },
  status: RequestStatus.PENDING
})

export const verify = (token: string): DispatchAction => ({
  type: DispatchActionType.AUTH_VERIFY,
  useAPI: true,
  request: {
    path: "/auth/verify/" + token,
    method: "GET",
    body: { token }
  }, 
  status: RequestStatus.PENDING
});

export const login = (email?: string, password?: string): DispatchAction => ({
  type: DispatchActionType.AUTH_LOGIN,
  useAPI: true,
  request: {
    path: "/auth/login",
    method: "POST",
    body: { email, password }
  },
  status: RequestStatus.PENDING
})

export const loginWithToken = (): DispatchAction => ({
  type: DispatchActionType.AUTH_LOGIN_TOKEN,
  useAPI: true,
  request: {
    path: "/auth/login",
    method: "POST"
  },
  status: RequestStatus.PENDING
})

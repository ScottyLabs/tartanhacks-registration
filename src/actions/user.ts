import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const getOwnTeam = (): DispatchAction => ({
  type: DispatchActionType.USER_GET_TEAM,
  useAPI: true,
  request: {
    path: "/user/team",
    method: "GET",
    body: {}
  },
  status: RequestStatus.PENDING
})
export const getStatus = (id: string): DispatchAction => ({
  type: DispatchActionType.USER_STATUS,
  useAPI: true,
  request: {
    path: `/users/${id}/status/`,
    method: "GET"
  },
  status: RequestStatus.PENDING
})
export const getProfile = (id: string): DispatchAction => ({
  type: DispatchActionType.USER_PROFILE,
  useAPI: true,
  request: {
    path: `/users/${id}/profile/`,
    method: "GET"
  },
  status: RequestStatus.PENDING
})

export const getUsers = (): DispatchAction => ({
  type: DispatchActionType.GET_USERS,
  useAPI: true,
  request: {
    path: "/users",
    method: "GET"
  },
  status: RequestStatus.PENDING
})

export const getParticipants = (): DispatchAction => ({
  type: DispatchActionType.GET_PARTICIPANTS,
  useAPI: true,
  request: {
    path: "/participants",
    method: "GET"
  },
  status: RequestStatus.PENDING
})

export const admitUser = (id: string): DispatchAction => ({
  type: DispatchActionType.ADMIT_USER,
  useAPI: true,
  request: {
    path: `/users/${id}/admit/`,
    method: "POST"
  },
  status: RequestStatus.PENDING
})

export const rejectUser = (id: string): DispatchAction => ({
  type: DispatchActionType.REJECT_USER,
  useAPI: true,
  request: {
    path: `/users/${id}/reject/`,
    method: "POST"
  },
  status: RequestStatus.PENDING
})

export const admitAll = (): DispatchAction => ({
  type: DispatchActionType.ADMIT_ALL,
  useAPI: true,
  request: {
    path: "/users/admit/all",
    method: "POST"
  },
  status: RequestStatus.PENDING
})

export const rejectAll = (): DispatchAction => ({
  type: DispatchActionType.REJECT_ALL,
  useAPI: true,
  request: {
    path: "/users/reject/all",
    method: "POST"
  },
  status: RequestStatus.PENDING
})

export const confirm = (
  signatureLiability: boolean,
  signaturePhotoRelease: boolean,
  signatureCodeOfConduct: boolean,
  mlhCodeOfConduct: boolean,
  mlhEventLogistics: boolean,
  mlhPromotional: boolean
): DispatchAction => ({
  type: DispatchActionType.USER_CONFIRM,
  useAPI: true,
  request: {
    path: "/user/confirmation",
    method: "PUT",
    body: {
      signatureLiability,
      signaturePhotoRelease,
      signatureCodeOfConduct,
      mlhCodeOfConduct,
      mlhEventLogistics,
      mlhPromotional
    }
  },
  status: RequestStatus.PENDING
})

export const declineAcceptance = (): DispatchAction => ({
  type: DispatchActionType.USER_DECLINE_ACCEPTANCE,
  useAPI: true,
  request: {
    path: "/user/decline",
    method: "PUT"
  },
  status: RequestStatus.PENDING
})

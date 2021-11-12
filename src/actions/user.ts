import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"


export const getOwnTeam = (): DispatchAction => ({
    type: DispatchActionType.USER_GET_TEAM,
    useAPI: true,
    request: {
      path: "/user/team",
      method: "GET",
      body: { }
    },
    status: RequestStatus.PENDING
  })
export const getStatus = (id: string): DispatchAction => ({
  type: DispatchActionType.USER_STATUS,
  useAPI: true,
  request: {
    path: `/user/status/${id}`,
    method: "GET"
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

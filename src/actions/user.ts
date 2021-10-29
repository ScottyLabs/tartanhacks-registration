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
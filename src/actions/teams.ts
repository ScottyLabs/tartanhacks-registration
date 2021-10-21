import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const viewTeams = (): DispatchAction => ({
  type: DispatchActionType.TEAMS_VIEW,
  useAPI: true,
  request: {
    path: "/teams",
    method: "GET"
  },
  status: RequestStatus.PENDING
})
  
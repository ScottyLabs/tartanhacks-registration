import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchAction } from "types/DispatchAction"

export const uploadResume = (file: File): DispatchAction => ({
  type: DispatchActionType.APPLICATION_UPLOAD_RESUME,
  useAPI: true,
  request: {
    path: "/user/resume",
    method: "FILE",
    body: file
  },
  status: RequestStatus.PENDING
})

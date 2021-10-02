import { RequestStatus } from "enums/RequestStatus"

export interface RootState {
  auth: {
    data: any
    status: RequestStatus
  }
}

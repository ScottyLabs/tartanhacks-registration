import { RequestStatus } from "enums/RequestStatus"

export interface RootState {
  accounts: {
    data: any
    status: RequestStatus
  },
  sponsors: {
    data: any,
    status: RequestStatus
  }
}

import { RequestStatus } from "enums/RequestStatus"

export interface RootState {
  accounts: {
    data: any
    status: RequestStatus
    error: string
  },
  teams: {
    data: any
    status: RequestStatus
    error: string
  },
  user: {
    data: any
    status: RequestStatus
    error: string
  }
}

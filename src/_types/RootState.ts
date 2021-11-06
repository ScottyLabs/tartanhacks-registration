import { RequestStatus } from "enums/RequestStatus"

export interface RootState {
  accounts: {
    data: any
    status: RequestStatus
    error: string
  }
  sponsors: {
    data: any
    status: RequestStatus
    error: string
  }
  application: {
    status: RequestStatus
    error: string
    resume: any
    basic: {
      validate?: boolean
      data?: any
    }
    essay: {
      validate?: boolean
      data?: any
    }
    experience: {
      validate?: boolean
      data?: any
    }
    logistics: {
      validate?: boolean
      data?: any
    }
    portfolio: {
      validate?: boolean
      data?: any
    }
    school: {
      validate?: boolean
      data?: any
    }
    workAuth: {
      validate?: boolean
      data?: any
    }
  }
}

import { RequestStatus } from "enums/RequestStatus"
import {
  BasicFields,
  EssayFields,
  ExperienceFields,
  LogisticsFields,
  PortfolioFields,
  SchoolFields,
  WorkAuthorizationFields
} from "./ApplicationForm"

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
  user: {
    data: {
      status: {
        verified?: boolean
        completedProfile?: boolean
        admitted?: boolean
        confirmed?: boolean
      }
    }
    status: RequestStatus
    error: string
  }
  application: {
    status: RequestStatus
    error: string
    resume: string
    basic: BasicFields
    essay: EssayFields
    experience: ExperienceFields
    logistics: LogisticsFields
    portfolio: PortfolioFields
    school: SchoolFields
    workAuth: WorkAuthorizationFields
  }
}

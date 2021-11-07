import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import {
  BasicFields,
  EssayFields,
  ExperienceFields,
  LogisticsFields,
  PortfolioFields,
  SchoolFields,
  WorkAuthorizationFields
} from "types/ApplicationFields"
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

export const saveBasic = (data: BasicFields): DispatchAction => ({
  type: DispatchActionType.APPLICATION_SAVE_BASIC,
  useAPI: false,
  status: RequestStatus.PENDING,
  data
})

export const saveEssay = (data: EssayFields): DispatchAction => ({
  type: DispatchActionType.APPLICATION_SAVE_ESSAY,
  useAPI: false,
  status: RequestStatus.PENDING,
  data
})

export const saveExperience = (data: ExperienceFields): DispatchAction => ({
  type: DispatchActionType.APPLICATION_SAVE_EXPERIENCE,
  useAPI: false,
  status: RequestStatus.PENDING,
  data
})

export const saveLogistics = (data: LogisticsFields): DispatchAction => ({
  type: DispatchActionType.APPLICATION_SAVE_LOGISTICS,
  useAPI: false,
  status: RequestStatus.PENDING,
  data
})

export const savePortfolio = (data: PortfolioFields): DispatchAction => ({
  type: DispatchActionType.APPLICATION_SAVE_PORTFOLIO,
  useAPI: false,
  status: RequestStatus.PENDING,
  data
})

export const errorMissingResume = (): DispatchAction => ({
  type: DispatchActionType.APPLICATION_MISSING_RESUME,
  useAPI: false,
  status: RequestStatus.ERROR,
  data: "Missing resume!"
})

export const saveSchool = (data: SchoolFields): DispatchAction => ({
  type: DispatchActionType.APPLICATION_SAVE_SCHOOL,
  useAPI: false,
  status: RequestStatus.PENDING,
  data
})

export const saveWorkAuth = (
  data: WorkAuthorizationFields
): DispatchAction => ({
  type: DispatchActionType.APPLICATION_SAVE_WORK_AUTH,
  useAPI: false,
  status: RequestStatus.PENDING,
  data
})

import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import {
  ApplicationForm,
  BasicFields,
  EssayFields,
  ExperienceFields,
  LogisticsFields,
  PortfolioFields,
  SchoolFields,
  WorkAuthorizationFields
} from "types/ApplicationForm"
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

export const errorMissingResume = (): DispatchAction => ({
  type: DispatchActionType.APPLICATION_MISSING_RESUME,
  useAPI: false,
  status: RequestStatus.ERROR,
  data: "Missing resume!"
})

export const submitForm = (body: ApplicationForm): DispatchAction => ({
  type: DispatchActionType.APPLICATION_SUBMIT_FORM,
  useAPI: true,
  request: {
    path: "/user/profile",
    method: "PUT",
    body
  },
  status: RequestStatus.PENDING
})

export const checkDisplayName = (displayName: string): DispatchAction => ({
  type: DispatchActionType.APPLICATION_DISPLAY_NAME_AVAILABLE,
  useAPI: true,
  status: RequestStatus.PENDING,
  request: {
    path: "/user/name/available",
    method: "POST",
    body: { name: displayName }
  }
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

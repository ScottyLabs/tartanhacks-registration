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

export const validateBasic = (validate: boolean): DispatchAction => ({
  type: DispatchActionType.APPLICATION_VALIDATE_BASIC,
  useAPI: false,
  status: RequestStatus.PENDING,
  data: validate
})

export const validateEssay = (validate: boolean): DispatchAction => ({
  type: DispatchActionType.APPLICATION_VALIDATE_ESSAY,
  useAPI: false,
  status: RequestStatus.PENDING,
  data: validate
})

export const validateExperience = (validate: boolean): DispatchAction => ({
  type: DispatchActionType.APPLICATION_VALIDATE_EXPERIENCE,
  useAPI: false,
  status: RequestStatus.PENDING,
  data: validate
})

export const validateLogistics = (validate: boolean): DispatchAction => ({
  type: DispatchActionType.APPLICATION_VALIDATE_LOGISTICS,
  useAPI: false,
  status: RequestStatus.PENDING,
  data: validate
})

export const validatePortfolio = (validate: boolean): DispatchAction => ({
  type: DispatchActionType.APPLICATION_VALIDATE_PORTFOLIO,
  useAPI: false,
  status: RequestStatus.PENDING,
  data: validate
})

export const validateSchool = (validate: boolean): DispatchAction => ({
  type: DispatchActionType.APPLICATION_VALIDATE_SCHOOL,
  useAPI: false,
  status: RequestStatus.PENDING,
  data: validate
})

export const validateWorkAuth = (validate: boolean): DispatchAction => ({
  type: DispatchActionType.APPLICATION_VALIDATE_WORK_AUTH,
  useAPI: false,
  status: RequestStatus.PENDING,
  data: validate
})

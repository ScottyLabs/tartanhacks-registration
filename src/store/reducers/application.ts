import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { combineReducers } from "redux"
import { DispatchAction } from "types/DispatchAction"

const resume = (state = {}, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_UPLOAD_RESUME:
      if (action.status == RequestStatus.SUCCESS) {
        return action.data
      }
  }
  return state
}

const basic = (
  state: { validate?: boolean; data?: any } = {},
  action: DispatchAction
) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_VALIDATE_BASIC:
      state.validate = action.data
      break

    case DispatchActionType.APPLICATION_SAVE_BASIC:
      state.data = action.data
      break
  }
  return state
}

const essay = (
  state: { validate?: boolean; data?: any } = {},
  action: DispatchAction
) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_VALIDATE_ESSAY:
      state.validate = action.data
      break

    case DispatchActionType.APPLICATION_SAVE_ESSAY:
      state.data = action.data
      break
  }
  return state
}

const experience = (
  state: { validate?: boolean; data?: any } = {},
  action: DispatchAction
) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_VALIDATE_EXPERIENCE:
      state.validate = action.data
      break

    case DispatchActionType.APPLICATION_SAVE_EXPERIENCE:
      state.data = action.data
      break
  }
  return state
}

const logistics = (
  state: { validate?: boolean; data?: any } = {},
  action: DispatchAction
) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_VALIDATE_LOGISTICS:
      state.validate = action.data
      break

    case DispatchActionType.APPLICATION_SAVE_LOGISTICS:
      state.data = action.data
      break
  }
  return state
}

const portfolio = (
  state: { validate?: boolean; data?: any } = {},
  action: DispatchAction
) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_VALIDATE_PORTFOLIO:
      state.validate = action.data
      break

    case DispatchActionType.APPLICATION_SAVE_PORTFOLIO:
      state.data = action.data
      break
  }
  return state
}

const school = (
  state: { validate?: boolean; data?: any } = {},
  action: DispatchAction
) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_VALIDATE_SCHOOL:
      state.validate = action.data
      break

    case DispatchActionType.APPLICATION_SAVE_SCHOOL:
      state.data = action.data
      break
  }
  return state
}

const workAuth = (
  state: { validate?: boolean; data?: any } = {},
  action: DispatchAction
) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_VALIDATE_WORK_AUTH:
      state.validate = action.data
      break

    case DispatchActionType.APPLICATION_SAVE_WORK_AUTH:
      state.data = action.data
      break
  }
  return state
}

const status = (state = null, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_UPLOAD_RESUME:
    case DispatchActionType.APPLICATION_VALIDATE_BASIC:
    case DispatchActionType.APPLICATION_VALIDATE_ESSAY:
    case DispatchActionType.APPLICATION_VALIDATE_EXPERIENCE:
    case DispatchActionType.APPLICATION_VALIDATE_LOGISTICS:
    case DispatchActionType.APPLICATION_VALIDATE_PORTFOLIO:
    case DispatchActionType.APPLICATION_VALIDATE_SCHOOL:
    case DispatchActionType.APPLICATION_VALIDATE_WORK_AUTH:
    case DispatchActionType.APPLICATION_SAVE_BASIC:
    case DispatchActionType.APPLICATION_SAVE_ESSAY:
    case DispatchActionType.APPLICATION_SAVE_EXPERIENCE:
    case DispatchActionType.APPLICATION_SAVE_LOGISTICS:
    case DispatchActionType.APPLICATION_SAVE_PORTFOLIO:
    case DispatchActionType.APPLICATION_SAVE_SCHOOL:
    case DispatchActionType.APPLICATION_SAVE_WORK_AUTH:
      return action.status
  }
  return state
}

const error = (state = null, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_UPLOAD_RESUME:
    case DispatchActionType.APPLICATION_VALIDATE_BASIC:
    case DispatchActionType.APPLICATION_VALIDATE_ESSAY:
    case DispatchActionType.APPLICATION_VALIDATE_EXPERIENCE:
    case DispatchActionType.APPLICATION_VALIDATE_LOGISTICS:
    case DispatchActionType.APPLICATION_VALIDATE_PORTFOLIO:
    case DispatchActionType.APPLICATION_VALIDATE_SCHOOL:
    case DispatchActionType.APPLICATION_VALIDATE_WORK_AUTH:
    case DispatchActionType.APPLICATION_SAVE_BASIC:
    case DispatchActionType.APPLICATION_SAVE_ESSAY:
    case DispatchActionType.APPLICATION_SAVE_EXPERIENCE:
    case DispatchActionType.APPLICATION_SAVE_LOGISTICS:
    case DispatchActionType.APPLICATION_SAVE_PORTFOLIO:
    case DispatchActionType.APPLICATION_SAVE_SCHOOL:
    case DispatchActionType.APPLICATION_SAVE_WORK_AUTH:
      if (action.status == RequestStatus.ERROR) {
        return action.data
      }
  }
  return state
}

export default combineReducers({
  resume,
  error,
  status,
  basic,
  essay,
  experience,
  logistics,
  portfolio,
  school,
  workAuth
})

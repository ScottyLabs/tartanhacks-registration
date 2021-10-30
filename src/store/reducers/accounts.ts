import { combineReducers } from "redux"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchActionType } from "enums/DispatchActionType"
import { DispatchAction } from "types/DispatchAction"

const data = (state = {}, action: DispatchAction) => {
  switch (action.type) {
  case DispatchActionType.AUTH_LOGIN:
  case DispatchActionType.AUTH_REGISTER:
  case DispatchActionType.AUTH_LOGIN_TOKEN:
  case DispatchActionType.AUTH_VERIFY:
    if (action.status == RequestStatus.SUCCESS) {
      if (action.data.token) {
        window.localStorage.setItem("accessToken", action.data.token)
      }
      return action.data
    }
  }
  return state
}

const status = (state = null, action: DispatchAction) => {
  switch (action.type) {
  case DispatchActionType.AUTH_LOGIN:
  case DispatchActionType.AUTH_REGISTER:
  case DispatchActionType.AUTH_LOGIN_TOKEN:
  case DispatchActionType.AUTH_VERIFY:
    return { status: action.status, message: action.data }
  }
  return state
}

export default combineReducers({
  data,
  status
})

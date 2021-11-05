import { combineReducers } from "redux"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchActionType } from "enums/DispatchActionType"
import { DispatchAction } from "types/DispatchAction"

const data = (state = {}, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.USER_GET_TEAM:
      if (action.status == RequestStatus.SUCCESS) {
        return action.data
      }
  }
  return state
}

const error = (state = {}, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.USER_GET_TEAM:
      if (action.status == RequestStatus.ERROR) {
        return action.data
      }
  }
  return state
}

const status = (state = null, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.USER_GET_TEAM:
      return action.status
  }
  return state
}

export default combineReducers({
  data,
  error,
  status
})

import { combineReducers } from "redux"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchActionType } from "enums/DispatchActionType"
import { DispatchAction } from "types/DispatchAction"

const data = (state: any = {}, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.USER_STATUS:
      if (action.status == RequestStatus.SUCCESS) {
        state.status = action.data
      }
  }
  return state
}

const error = (state = null, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.USER_STATUS:
      if (action.status == RequestStatus.ERROR) {
        return action.data
      }
  }
  return state
}

const status = (state = null, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.USER_STATUS:
      return action.status
  }
  return state
}

export default combineReducers({
  data,
  error,
  status
})

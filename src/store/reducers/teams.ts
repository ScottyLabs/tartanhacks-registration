import { combineReducers } from "redux"
import { RequestStatus } from "enums/RequestStatus"
import { DispatchActionType } from "enums/DispatchActionType"
import { DispatchAction } from "types/DispatchAction"

const data = (state = {}, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.TEAMS_VIEW:
    case DispatchActionType.TEAM_CREATE:
    case DispatchActionType.TEAM_INFO:
    case DispatchActionType.TEAM_INVITE_BY_EMAIL:
    case DispatchActionType.TEAM_JOIN:
    case DispatchActionType.TEAM_LEAVE:
    case DispatchActionType.TEAM_EDIT:
      if (action.status == RequestStatus.SUCCESS) {
        return action.data
      }
  }
  return state
}

const error = (state = {}, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.TEAMS_VIEW:
    case DispatchActionType.TEAM_CREATE:
    case DispatchActionType.TEAM_INFO:
    case DispatchActionType.TEAM_INVITE_BY_EMAIL:
    case DispatchActionType.TEAM_JOIN:
    case DispatchActionType.TEAM_LEAVE:
    case DispatchActionType.TEAM_EDIT:
      if (action.status == RequestStatus.ERROR) {
        return action.data
      }
  }
  return state
}

const status = (state = null, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.TEAMS_VIEW:
    case DispatchActionType.TEAM_CREATE:
    case DispatchActionType.TEAM_INFO:
    case DispatchActionType.TEAM_INVITE_BY_EMAIL:
    case DispatchActionType.TEAM_JOIN:
    case DispatchActionType.TEAM_LEAVE:
    case DispatchActionType.TEAM_EDIT:
      return action.status
  }
  return state
}

export default combineReducers({
  data,
  error,
  status
})

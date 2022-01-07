import { combineReducers } from "redux"
import accounts from "./accounts"
import teams from "./teams"
import sponsors from "./sponsors"
import application from "./application"
import user from "./user"
import settings from "./settings"
import requests from "./requests"
import analytics from "./analytics"

export default combineReducers({
  accounts,
  teams,
  sponsors,
  application,
  user,
  settings,
  requests,
  analytics
})

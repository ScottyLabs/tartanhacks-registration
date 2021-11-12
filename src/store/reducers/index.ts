import { combineReducers } from "redux"
import accounts from "./accounts"
import teams from "./teams"
import sponsors from "./sponsors"
import application from "./application"
import user from "./user"

export default combineReducers({
  accounts,
  teams,
  sponsors,
  application,
  user
})

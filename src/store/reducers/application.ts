import { DispatchActionType } from "enums/DispatchActionType"
import { RequestStatus } from "enums/RequestStatus"
import { combineReducers } from "redux"
import {
  BasicFields,
  EssayFields,
  ExperienceFields,
  LogisticsFields,
  PortfolioFields,
  SchoolFields,
  WorkAuthorizationFields
} from "types/ApplicationForm"
import { DispatchAction } from "types/DispatchAction"

const fetchedProfile = (state = false, action: DispatchAction) => {
  if (
    action.type === DispatchActionType.APPLICATION_GET_PROFILE &&
    action.status == RequestStatus.SUCCESS
  ) {
    state = true
  }
  return state
}

const resume = (state = {}, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_UPLOAD_RESUME:
      if (action.status == RequestStatus.SUCCESS) {
        return action.data
      }
  }
  return state
}

const basic = (state: BasicFields | null = null, action: DispatchAction) => {
  if (action.type === DispatchActionType.APPLICATION_SAVE_BASIC) {
    state = action.data
  } else if (action.type === DispatchActionType.APPLICATION_GET_PROFILE) {
    if (action?.data) {
      const { data } = action
      if (data) {
        const {
          displayName,
          firstName,
          lastName,
          gender,
          genderOther,
          ethnicity,
          ethnicityOther,
          age,
          middleName
        } = data as BasicFields
        state = {
          displayName,
          firstName,
          lastName,
          gender,
          genderOther,
          ethnicity,
          ethnicityOther,
          age,
          middleName
        }
      }
    }
  }
  return state
}

const essays = (state: EssayFields | null = null, action: DispatchAction) => {
  if (action.type === DispatchActionType.APPLICATION_SAVE_ESSAY) {
    state = action.data
  } else if (action.type === DispatchActionType.APPLICATION_GET_PROFILE) {
    if (action?.data) {
      const { data } = action
      if (data.essays) {
        state = { essays: data.essays }
      }
    }
  }
  return state
}

const experience = (
  state: ExperienceFields | null = null,
  action: DispatchAction
) => {
  if (action.type === DispatchActionType.APPLICATION_SAVE_EXPERIENCE) {
    state = action.data
  } else if (action.type === DispatchActionType.APPLICATION_GET_PROFILE) {
    if (action?.data) {
      const { data } = action
      if (data) {
        const {
          courses,
          programmingLanguages,
          hackathonExperience,
          otherSkills
        } = data as ExperienceFields
        state = {
          courses,
          programmingLanguages,
          hackathonExperience,
          otherSkills
        }
      }
    }
  }
  return state
}

const logistics = (
  state: LogisticsFields | null = null,
  action: DispatchAction
) => {
  if (action.type === DispatchActionType.APPLICATION_SAVE_LOGISTICS) {
    state = action.data
  } else if (action.type === DispatchActionType.APPLICATION_GET_PROFILE) {
    if (action?.data) {
      const { data } = action
      if (data) {
        const {
          dietaryRestrictions,
          shirtSize,
          wantsHardware,
          address,
          region,
          phoneNumber,
          attendingPhysically,
          notes
        } = data as LogisticsFields
        state = {
          dietaryRestrictions,
          shirtSize,
          wantsHardware,
          address,
          region,
          phoneNumber,
          attendingPhysically,
          notes
        }
      }
    }
  }
  return state
}

const portfolio = (
  state: PortfolioFields | null = null,
  action: DispatchAction
) => {
  if (action.type === DispatchActionType.APPLICATION_SAVE_PORTFOLIO) {
    state = action.data
  } else if (action.type === DispatchActionType.APPLICATION_GET_PROFILE) {
    if (action?.data) {
      const { data } = action
      if (data) {
        const { github, resume, design, website } = data
        state = { github, resume, design, website }
      }
    }
  }
  return state
}

const school = (state: SchoolFields | null = null, action: DispatchAction) => {
  if (action.type === DispatchActionType.APPLICATION_SAVE_SCHOOL) {
    state = action.data
  } else if (action.type === DispatchActionType.APPLICATION_GET_PROFILE) {
    if (action?.data) {
      const { data } = action
      if (data) {
        const { school, college, graduationYear, major } = data
        state = { school, college, graduationYear, major }
      }
    }
  }
  return state
}

const workAuth = (
  state: WorkAuthorizationFields | null = null,
  action: DispatchAction
) => {
  if (action.type === DispatchActionType.APPLICATION_SAVE_WORK_AUTH) {
    state = action.data
  } else if (action.type === DispatchActionType.APPLICATION_GET_PROFILE) {
    if (action?.data) {
      const { data } = action
      if (data) {
        const { workPermission, workLocation, sponsorRanking } = data
        state = { workPermission, workLocation, sponsorRanking }
      }
    }
  }
  return state
}

const status = (state = null, action: DispatchAction) => {
  switch (action.type) {
    case DispatchActionType.APPLICATION_UPLOAD_RESUME:
    case DispatchActionType.APPLICATION_MISSING_RESUME:
    case DispatchActionType.APPLICATION_SUBMIT_FORM:
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
    case DispatchActionType.APPLICATION_MISSING_RESUME:
    case DispatchActionType.APPLICATION_SUBMIT_FORM:
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
  fetchedProfile,
  resume,
  error,
  status,
  basic,
  essays,
  experience,
  logistics,
  portfolio,
  school,
  workAuth
})

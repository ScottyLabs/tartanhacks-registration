  import { DispatchActionType } from "enums/DispatchActionType"
  import { RequestStatus } from "enums/RequestStatus"
  import { DispatchAction } from "types/DispatchAction"

export const viewTeams = (): DispatchAction => ({
  type: DispatchActionType.TEAMS_VIEW,
  useAPI: true,
  request: {
    path: "/teams",
    method: "GET"
  },
  status: RequestStatus.PENDING
})

export const joinTeamRequest = (id: string): DispatchAction => ({
  type: DispatchActionType.TEAM_JOIN,
  useAPI: true,
  request: {
    path: `/team/join/${id}`,
    method: "POST",
    body: { id }
  },
  status: RequestStatus.PENDING
})

export const getTeamInfo = (teamId: string): DispatchAction => ({
  type: DispatchActionType.TEAM_INFO,
  useAPI: true,
  request: {
    path: `/team/${teamId}`,
    method: "GET",
    body: { teamId }
  },
  status: RequestStatus.PENDING
})

export const leaveTeam = (): DispatchAction => ({
  type: DispatchActionType.TEAM_LEAVE,
  useAPI: true,
  request: {
    path: `/team/leave`,
    method: "POST",
    body: { }
  },
  status: RequestStatus.PENDING
})
  
export const createTeam = (name: string, description: string): DispatchAction => ({
  type: DispatchActionType.TEAM_CREATE,
  useAPI: true,
  request: {
    path: `/team/`,
    method: "POST",
    body: { name, description }
  },
  status: RequestStatus.PENDING
})

export const inviteByEmail = (email: string): DispatchAction => ({
  type: DispatchActionType.TEAM_INVITE_BY_EMAIL,
  useAPI: true,
  request: {
    path: `/team/invite`,
    method: "POST",
    body: { email }
  },
  status: RequestStatus.PENDING
})

export const editTeamInfo = (name?: string, description?: string, visible?: boolean): DispatchAction => ({
  type: DispatchActionType.TEAM_EDIT,
  useAPI: true,
  request: {
    path: `/team/`,
    method: "PATCH",
    body: { name, description, visible }
  },
  status: RequestStatus.PENDING
})
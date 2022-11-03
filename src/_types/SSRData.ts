import { Team } from "./Team"

export type SSRData<T> = {
  props: {
    data?: T
  }
}
export type SSRDataAuth<T> = {
  props: {
    isAuth: boolean
    data?: T
  }
}

export type TeamData = {
  isInTeam?: boolean
  ownTeam?: Team
  teams?: Array<Team>
}

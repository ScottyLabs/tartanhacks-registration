import { Participant } from "./Participant"
import { Team, TeamMember } from "./Team"

/**
 * return type of getServerSideProps for pages that don't require authentication
 */
export type SSRData<T> = {
  props: {
    data?: T
  }
}

/**
 * return type of getServerSideProps for pages that require authentication
 */
export type SSRDataAuth<T> = {
  props: {
    isAuth: boolean
    data?: T
  }
}

/**
 * Data fetched during SSR on /teams
 */
export type TeamData = {
  isInTeam?: boolean
  ownTeam?: Team
  teams?: Array<Team>
}
/**
 * Data fetched during SSR on /teamInfo
 */
export type TeamInfoData = {
  teamInfo?: Team
  isCaptain?: boolean
  user?: Participant
  isOwnTeam?: boolean
}


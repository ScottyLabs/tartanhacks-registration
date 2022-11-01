import createFetcher from "src/util/fetcher"
import useSWR from "swr"
import { Participant } from "../_types/Participant"

export interface UseParticipantHookResult {
  participant: Participant
  isLoading: boolean
  error: any
}

export default function useParticipant(id: string) {
  const { data, error } = useSWR(
    "/auth/login",
    createFetcher<Participant>("post")
  )

  return {
    participant: data,
    isLoading: !error && !data,
    error
  }
}

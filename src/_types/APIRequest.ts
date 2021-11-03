export interface APIRequest {
  path: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "FILE"
  body?: any
}

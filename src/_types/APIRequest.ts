export interface APIRequest {
  path: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "FILE"
  body?: any
}

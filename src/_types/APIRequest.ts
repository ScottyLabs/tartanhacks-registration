export interface APIRequest {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}

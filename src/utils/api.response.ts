export interface ApiResponse<T = null> {
  data?: T
  message: string
  status: number
}

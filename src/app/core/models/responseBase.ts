export interface ResponseBase<T> {
  data: T
  statusCode: number
  message: string
}

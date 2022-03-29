// service统一出口
import BYRequest from './request/index copy'
import { BASE_URL, TIME_OUT } from './request/config'

const byRequest = new BYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default byRequest

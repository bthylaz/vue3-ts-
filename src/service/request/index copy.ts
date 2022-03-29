import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'

class BYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.instance.interceptors?.responseInterceptorCatch
    )

    //全局的拦截器
    this.instance.interceptors.request.use(
      () => {},
      () => {}
    )
    this.instance.interceptors.response.use(
      () => {},
      () => {}
    )
  }
  //单独请求的拦截器
  request(config: HYRequestConfig) {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}
export default BYRequest

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface BYRequestInterceptor {
  requestInterceptor?: () => {}
}
export interface BYRequestConfig extends AxiosRequestConfig {
  interceptor?: BYRequestInterceptor
}

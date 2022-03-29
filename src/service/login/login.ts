import byRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './types'
enum LoginApi {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  LoginUserMenus = '/role/'
}
export function accountLoginRequest(account: IAccount) {
  return byRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return byRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
    showLoading: false
  })
}
export function requestUserMenusByRoleId(id: number) {
  return byRequest.get<IDataType>({
    url: LoginApi.LoginUserMenus + id + '/menu',
    showLoading: false
  })
}

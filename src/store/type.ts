import { ILoginState } from './login/types'
import { ISystemState } from './main/system/type'
export interface IRootState {
  name: string
  age: number
}
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}
export type IStoreType = IRootWithModule & IRootState

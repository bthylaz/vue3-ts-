import byRequest from '../../index'
import { IDataType } from '@/service/login/types'
export function getPageListData(url: string, queryInfo: any) {
  return byRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

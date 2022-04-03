import byRequest from '../../index'
import { IDataType } from '@/service/login/types'
export function getPageListData(url: string, queryInfo: any) {
  return byRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return byRequest.delete<IDataType>({
    url
  })
}
export function createPageData(url: string, newData: any) {
  return byRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return byRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}

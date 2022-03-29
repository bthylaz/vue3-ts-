type category = 'input' | 'password' | 'datepicker' | 'select'
export interface IFormItem {
  field: string //字段
  type: category
  rules?: any[]
  label: string
  placeholder?: any
  options?: any[]
  otherOptions?: any
}
export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout: any
}

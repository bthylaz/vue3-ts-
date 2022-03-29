import axios from 'axios'

axios.get('').then((res) => {
  console.log(res.data)
})
axios.get('', { params: { name: 'coderwhy' } }).then((res) => {})
axios.post('', { data: { password: 'xxx' } }).then((res) => {})

axios.defaults.baseURL = ''
axios.defaults.timeout = 1000
axios.interceptors.request.use(
  (config) => {},
  (err) => {}
)

axios.interceptors.response.use(
  (data) => {},
  (err) => {}
)

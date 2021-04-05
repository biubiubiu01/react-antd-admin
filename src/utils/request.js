import axios from 'axios'
import { message } from 'antd'
import qs from 'qs'
import { getCache } from '@/utils/session'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000, // 请求超时时间
})

//请求
service.interceptors.request.use((config) => {
  const token = getCache('TOKEN')
  if (token) {
    config.headers['authorization'] = token
  }
  return config
})

//响应
service.interceptors.response.use((response) => {
  const data = response.data
  if (data.code === 200) {
    return Promise.resolve(response)
  } else {
    message.error(response.data.message || '')
    return Promise.reject(response)
  }
})

let http = {}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

http.get = function (url, params = null) {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params })
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e.data.message || '')
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

http.post = function (url, params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, qs.stringify(params))
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e.data.message || '')
      })
  })
}

export default http

import Taro from '@tarojs/taro'
import { BASE_URL } from '@/config/env'
// import { isLogin, logout, getToken } from '@/utils/auth'

interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  count?: number
}

// 请求拦截器
const requestInterceptor = (options: any) => {
  // 添加token到请求头
  // const token = getToken()
  // if (token) {
  //   options.header = {
  //     ...options.header,
  //     'Authorization': `Bearer ${token}`
  //   }
  // }
  return options
}

// 响应拦截器
const responseInterceptor = (res: Taro.request.SuccessCallbackResult<ApiResponse<any>>) => {
  const { data } = res
  
  // 根据success字段判断请求是否成功
  if (!data.success) {
    // 如果是token过期或未登录
    // if (data.message === '未登录' || data.message === 'token过期') {
    //   // logout()
    //   Taro.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
    //   // 可以跳转到登录页
    //   // Taro.redirectTo({ url: '/pages/profile/index' })
    // } else {
    //   Taro.showToast({ title: data.message || '请求失败', icon: 'none' })
    // }
    return Promise.reject(data)
  }
  
  return data
}

export function request<T>(options: {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: any
}) {
  // 请求拦截
  const requestOptions = requestInterceptor({
    url: BASE_URL + options.url,
    method: options.method || 'GET',
    data: options.data,
    header: options.header
  })
  
  return Taro.request<ApiResponse<T>>(requestOptions)
    .then(responseInterceptor)
    .catch(err => {
      console.error('请求错误:', err)
      Taro.showToast({ title: '网络请求失败', icon: 'none' })
      return Promise.reject(err)
    })
}

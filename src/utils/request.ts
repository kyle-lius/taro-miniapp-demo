import Taro from '@tarojs/taro'
import { BASE_URL } from '@/config/env'

interface ApiResponse<T> {
  data: T
  success: boolean
  count?: number
}

export function request<T>(options: {
  url: string
  method?: 'GET' | 'POST'
  data?: any
}) {
  return Taro.request<ApiResponse<T>>({
    url: BASE_URL + options.url,
    method: options.method || 'GET',
    data: options.data
  }).then(res => {
    if (!res.data.success) {
      Taro.showToast({ title: '请求失败', icon: 'none' })
      return Promise.reject(res.data)
    }
    return res.data
  })
}

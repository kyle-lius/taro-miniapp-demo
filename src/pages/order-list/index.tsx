import { View, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { request } from '@/utils/request'
import './index.scss'

interface Order {
  id: number
  receiverName: string
  receiverPhone: string
  shippingAddress: string
  totalPrice: number
  status: string
  createTime: string
}

const statusColorMap: Record<string, string> = {
  已创建: '#409EFF',
  已支付: '#67C23A',
  已取消: '#F56C6C'
}


export default function OrderList() {
  const [list, setList] = useState<Order[]>([])

  useEffect(() => {
    request<Order[]>({
      url: '/api/order/all',
      data: { userId: 1 }
    }).then(res => setList(res.data))
  }, [])

  return (
    <View className='order-list'>
      {list.map(item => (
        <View className='order-card' key={item.id}>
          <Text className='order-id'>订单号：{item.id}</Text>

          <View className='order-row'>
            <Text>收货人</Text>
            <Text>{item.receiverName}</Text>
          </View>

          <View className='order-row'>
            <Text>订单金额</Text>
            <Text className='amount'>￥{item.totalPrice}</Text>
          </View>

          <View className='order-row'>
            <Text
              className='status'
              style={{ color: statusColorMap[item.status] || '#666' }}
            >
              {item.status}
            </Text>
          </View>

          <Text className='time'>{item.createTime}</Text>
        </View>
      ))}
    </View>
  )
}

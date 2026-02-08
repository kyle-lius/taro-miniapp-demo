import {View, Text, Image} from '@tarojs/components'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import {useState, useEffect} from 'react'
import {request} from '@/utils/request'
import './index.scss'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  imageUrl: string | null
}

const DEFAULT_IMAGE =
  'https://via.placeholder.com/300x300.png?text=No+Image'

export default function ProductList() {
  const [list, setList] = useState<Product[]>([])

  // 加载产品数据
  const loadData = async () => {
    try {
      const res = await request<Product[]>({
        url: '/api/product/all',
        method: 'GET'
      })
      setList(res.data)
    } catch (error) {
      Taro.showToast({
        title: '加载失败',
        icon: 'none'
      })
    } finally {
      // 停止下拉刷新
      Taro.stopPullDownRefresh()
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // 处理下拉刷新
  usePullDownRefresh(() => {
    loadData()
  })

  const goDetail = (id: number) => {
    Taro.navigateTo({
      url: `/pages/product-detail/index?id=${id}`
    })
  }

  return (
      <View className='product-grid'>
        {list.map(item => (
          <View
            className='product-card'
            key={item.id}
            onClick={() => goDetail(item.id)}
          >
            <Image
              className='product-image'
              src={item.imageUrl || DEFAULT_IMAGE}
              mode='aspectFill'
            />

            <View className='product-info'>
              <Text className='name'>{item.name}</Text>
              <Text className='price'>￥{item.price}</Text>
            </View>
          </View>
        ))}
      </View>
  )
}

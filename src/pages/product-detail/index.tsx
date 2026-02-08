import {View, Text, Image, Button, Input} from '@tarojs/components'
import Taro, {useRouter} from '@tarojs/taro'
import {useEffect, useState} from 'react'
import {request} from '@/utils/request'
import {validatePhone} from '@/utils/validators'
import './index.scss'

interface ProductDetail {
  id: number
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string | null
}

const DEFAULT_IMAGE =
  'https://via.placeholder.com/600x600.png?text=No+Image'

export default function ProductDetail() {
  const {params} = useRouter()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const [receiverName, setReceiverName] = useState('')
  const [receiverPhone, setReceiverPhone] = useState('')
  const [address, setAddress] = useState('')
  const [quantity, setQuantity] = useState(1)


  useEffect(() => {
    request<ProductDetail>({
      url: `/api/product/${params.id}`,
      method: 'GET'
    }).then(res => setProduct(res.data))
  }, [])

  const openBuyPopup = () => {
    setShowPopup(true)
  }

  const submitOrder = async () => {
    if (!receiverName || !receiverPhone || !address) {
      Taro.showToast({title: '请填写完整信息', icon: 'none'})
      return
    }

    // 验证手机号码
    if (!validatePhone(receiverPhone)) {
      Taro.showToast({title: '请输入正确的手机号码', icon: 'none'})
      return
    }

    try {
      await request({
        url: '/api/order/create',
        method: 'POST',
        data: {
          userId: 1, // 先写死
          shippingAddress: address,
          receiverName,
          receiverPhone,
          items: [
            {
              productId: product.id,
              quantity
            }
          ]
        }
      })

      Taro.showToast({title: '下单成功', icon: 'success'})

      setShowPopup(false)

      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/order-list/index'
        })
      }, 800)
    } catch (e) {
      Taro.showToast({title: '下单失败', icon: 'none'})
    }
  }


  if (!product) return <View />

  return (
    <>
      <View className='detail-page'>
        <Image
          className='cover'
          src={product.imageUrl || DEFAULT_IMAGE}
          mode='aspectFill'
        />

        {/* 基础信息区 */}
        <View className='product-info'>
          <Text className='title'>{product.name}</Text>

          <View className='meta'>
            <Text className='stock'>库存：{product.stock}</Text>
            <Text className='price'>¥{product.price}</Text>
          </View>
        </View>

        {/* 详情描述区（单独一行 / 独立模块） */}
        <View className='desc-section'>
          <Text className='desc-title'>商品详情</Text>
          <View>
            <Text className='desc-content'>
              {product.description}
            </Text>
          </View>

        </View>

        {/* 购买按钮 */}
        <View className='buy-bar'>
          <Button className='buy-btn' onClick={openBuyPopup}>
            立即购买
          </Button>
        </View>
      </View>

      {showPopup && (
        <View className='popup-mask' onClick={() => setShowPopup(false)}>
          <View className='popup' onClick={(e) => e.stopPropagation()}>
            <Text className='popup-title'>确认订单</Text>

            {/* 商品信息 */}
            <View className='order-product'>
              <Image
                className='order-image'
                src={product.imageUrl || DEFAULT_IMAGE}
              />
              <View className='order-info'>
                <Text className='order-name'>{product.name}</Text>
                <Text className='order-price'>￥{product.price}</Text>
              </View>
              <View className='quantity-box'>
                <Text className='label'>购买数量</Text>

                <View className='stepper'>
                  <View
                    className={`btn ${quantity === 1 ? 'disabled' : ''}`}
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </View>

                  <Text className='num'>{quantity}</Text>

                  <View
                    className='btn'
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </View>
                </View>
              </View>
            </View>

            {/* 收货信息 */}
            <View className='form'>
              <Text className='label'>收货信息</Text>

              <Input
                className='input'
                placeholder='收货人姓名'
                value={receiverName}
                onInput={e => setReceiverName(e.detail.value)}
              />

              <Input
                className={`input ${!validatePhone(receiverPhone) && receiverPhone ? 'error' : ''}`}
                placeholder='手机号'
                type='number'
                value={receiverPhone}
                maxlength={11}
                onInput={e => {
                  const value = e.detail.value;
                  // 只允许输入数字
                  const numericValue = value.replace(/\D/g, '');
                  // 限制最多11位数字
                  const finalValue = numericValue.slice(0, 11);
                  setReceiverPhone(finalValue);
                }}
              />

              <Input
                className='textarea'
                placeholder='详细收货地址'
                value={address}
                onInput={e => setAddress(e.detail.value)}
              />
            </View>

            {/* 操作按钮 */}
            <View className='popup-actions'>
              <Button className='confirm-btn' onClick={submitOrder}>
                确认购买
              </Button>
            </View>
          </View>
        </View>
      )}
    </>
  )

}

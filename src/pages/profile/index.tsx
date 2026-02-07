import { View, Text } from '@tarojs/components'

export default function Profile() {
  // 临时写死，后面可以接登录接口
  const user = {
    username: 'test_user',
    email: 'test@mail.com',
    phone: '13888888888'
  }

  return (
    <View className='page'>
      <Text className='page-title'>我的</Text>

      <View className='card'>
        <View className='item'>
          <Text className='label'>用户名:</Text>
          <Text className='value'>{user.username}</Text>
        </View>

        <View className='item'>
          <Text className='label'>邮箱:</Text>
          <Text className='value'>{user.email}</Text>
        </View>

        <View className='item'>
          <Text className='label'>手机号:</Text>
          <Text className='value'>{user.phone}</Text>
        </View>
      </View>
    </View>
  )
}

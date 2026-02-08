export default {
  pages: [
    'pages/product-list/index',
    'pages/index/index',

    'pages/product-detail/index',
    'pages/order-list/index',
    'pages/profile/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro App',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#666',
    selectedColor: '#e64340',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/product-list/index',
        text: '产品'
      },
      {
        pagePath: 'pages/order-list/index',
        text: '订单'
      // },
      // {
      //   pagePath: 'pages/profile/index',
      //   text: '我'
      }
    ]
  }
}

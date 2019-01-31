Page({
  data: {
    copyright: '© 2004-2017 pusudo.com. All rights reserved.',
    links: [
      // { text: '底部链接', url: '../../list/demo/index' },
      // { text: '底部链接', url: '../../card/demo/index' },
    ],
    gridItems: [
      {
        icon: '../../images/grid_appointment.png',
        text: '注册ISV',
        desc: '',
        path: '/pages/services/appointment/appointment'
      },
      {
        icon: '../../images/grid_recharge.png',
        text: '录入停车场',
        desc: '',
        path: '/pages/services/recharge/recharge'
      },
      {
        icon: '../../images/grid_ahead.png',
        text: '车辆驶入',
        desc: '',
      },
      {
        icon: '../../images/grid_settle.png',
        text: '车辆驶出',
        desc: '',
      },
      {
        icon: '../../images/grid_appointment_record.png',
        text: '停车记录',
        desc: '',
        path: '/pages/my/appointment/appointment'
      }
    ]
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '小小停车场',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});

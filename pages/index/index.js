Page({
  data: {
    copyright: '© 2004-2017 pusudo.com. All rights reserved.',
    links: [
      // { text: '底部链接', url: '../../list/demo/index' },
      // { text: '底部链接', url: '../../card/demo/index' },
    ],
    parkings: [
      {
        thumb: '/icons/parking.png',                //  缩略图，图片地址
        arrow: true,                                //  是否带剪头
        align: 'middle',                            //  子元素垂直对齐，可选top,middle,bottom	
        title: '点滴停车场',
        brief: '停车场地址',
        extra: '额外信息'
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
  onTapAddParking() {
    console.log('onListItemClick');
    my.navigateTo({
      url: '/pages/parking/settings/settings'
    });

  },
  onListItemClick() {
    console.log('onListItemClick');
    my.navigateTo({
      url: '/pages/parking/operator/operator'
    });
  }
});

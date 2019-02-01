import __PARKING_SERVICE__ from '../../interface/parking.service';

Page({
  data: {
    copyright: '© 2004-2017 pusudo.com. All rights reserved.',
    links: [
      // { text: '底部链接', url: '../../list/demo/index' },
      // { text: '底部链接', url: '../../card/demo/index' },
    ],
    parkings: []
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    __PARKING_SERVICE__.getParkings({}, (res) => {
      console.info(res);
      if (res.data.code === 0) {
        this.data.parkings = res.data.data.map(item => {
          // item.thumb = '/icons/parking.png';                //  缩略图，图片地址
          item.thumb = '';
          item.arrow = true;                                //  是否带剪头
          item.align = 'middle';                            //  子元素垂直对齐，可选top,middle,bottom	
          return item;
        })
        this.setData({
          parkings: this.data.parkings
        })
      }
    })
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
    my.navigateTo({
      url: '/pages/parking/settings/settings'
    });

  },
  onListItemClick(evt) {
    my.navigateTo({
      url: '/pages/parking/operator/operator?parking=' + JSON.stringify(evt.target.dataset.parking)
    });
  }
});

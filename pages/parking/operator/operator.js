Page({
  data: {
    itemsPerRow: 3,
    gridItems: [
      {
        icon: '/icons/in.png',
        text: '驶入',
        desc: '模拟车辆驶入停车场'
      },
      {
        icon: '/icons/out.png',
        text: '驶出',
        desc: '模拟车辆驶出停车场'
      },
      {
        icon: '/icons/order.png',
        text: '订单',
        desc: '查询车辆进出记录',
      },
      {
        icon: '/icons/setting.png',
        text: '车场配置',
        desc: '',
      }
    ]
  },
  parking: null,
  operators: [],
  onLoad(query) {
    // console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.parking = JSON.parse(query.parking);
    this.operators.push(this.onVehicleEnter);
    this.operators.push(this.onVehicleExit);
    this.operators.push(this.onQueryOrders);
    this.operators.push(this.onTapParkingSettings);
  },
  onGridItemClick(evt) {
    this.operators[evt.detail.index](this);
  },
  onVehicleEnter(caller) {
    console.log('onVehicleEnter');
    console.log(caller.parking);
    my.navigateTo({
      url: '/pages/parking/vehicle/vehicle?direction=enter&parkingId=' + caller.parking._id
    });
  },
  onVehicleExit(caller) {
    console.log('onVehicleExit');
    my.navigateTo({
      url: '/pages/parking/vehicle/vehicle?direction=exit'
    });
  },
  onQueryOrders(caller) {
    console.log('onQueryOrders');
  },
  onTapParkingSettings(caller) {
    console.log('onTapParkingSettings');
  }
});

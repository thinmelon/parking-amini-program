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
    ],
    inputs: [
      {
        value: '闽',
        style: "",
        focus: false
      },
      {
        value: '',
        style: "border: 1px solid #108ee9;",
        focus: true
      },
      {
        value: '',
        style: "",
        focus: false
      },
      {
        value: '',
        style: "",
        focus: false
      },
      {
        value: '',
        style: "",
        focus: false
      },
      {
        value: '',
        style: "",
        focus: false
      },
      {
        value: '',
        style: "",
        focus: false
      },
      {
        value: '',
        style: "",
        focus: false
      },
      '', '', '', '', '', '', ''],
    carNumber: ''
  },
  operators: [],
  onLoad() {
    for (let i = 0; i < 7; i++) {

    }
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
    caller.setData({
      modalOpened: true
    });
  },
  onVehicleExit(caller) {
    console.log('onVehicleExit');
  },
  onQueryOrders(caller) {
    console.log('onQueryOrders');
  },
  onTapParkingSettings(caller) {
    console.log('onTapParkingSettings');
  },
  onModalClick() {
    console.log(this.data.inputs);
  },
  onModalClose() {
    this.setData({
      modalOpened: false
    })
  },
  bindKeyInput(evt) {
    console.log(evt);
    this.data.inputs[evt.currentTarget.dataset.index] = evt.detail.value;
  }
});

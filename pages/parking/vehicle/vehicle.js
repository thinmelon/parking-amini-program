import __PARKING_SERVICE__ from '../../../interface/parking.service';

Page({
  data: {
    inputs: [],
    carNumber: '',
    btnText: ''
  },
  focusPos: 1,                      //  初始聚焦的位置为第一个元素
  maxLength: 8,                     //  车牌号的最大长度
  parkingId: '',                    //  停车场ID
  onLoad(options) {
    console.log(options)
    for (let i = 0; i < this.maxLength; i++) {
      this.data.inputs.push({
        value: '',
        placeholder: '',
        style: "",
        focus: false
      })
    }
    this.data.inputs[0].value = '闽';      //  默认为福建省内的车牌
    this.data.inputs[this.focusPos].style = 'border: 1px solid #108ee9;';
    this.data.inputs[this.focusPos].focus = true;
    this.data.inputs[this.maxLength - 1].placeholder = '新';
    options.direction === 'enter' ? this.data.btnText = '入场' : this.data.btnText = '出场';
    this.parkingId = options.parkingId;
  },
  //  修改输入框的样式
  changeInputStyle(index) {
    this.data.inputs[this.focusPos].style = '';
    this.data.inputs[this.focusPos].focus = false;
    this.focusPos = index;
    this.data.inputs[this.focusPos].style = 'border: 1px solid #108ee9;';
    this.data.inputs[this.focusPos].focus = true;
  },
  //  实时显示车牌号
  updateCarNumber() {
    let carNumber = '';
    this.data.inputs.map(item => {
      carNumber += item.value;
    });
    this.data.carNumber = carNumber;
  },
  //  聚焦时触发，event.detail = {value: value}
  onInputFocus(evt) {
    this.changeInputStyle(evt.currentTarget.dataset.index);
    this.setData({
      inputs: this.data.inputs
    })
  },
  //  绑定input输入事件
  bindKeyInput(evt) {
    this.data.inputs[evt.currentTarget.dataset.index].value = evt.detail.value;
    this.updateCarNumber();
    if (evt.detail.value && evt.currentTarget.dataset.index + 1 < this.maxLength) {
      this.changeInputStyle(evt.currentTarget.dataset.index + 1);
    }
    this.setData({
      inputs: this.data.inputs,
      carNumber: this.data.carNumber
    });
  },
  onTapVehicle(evt) {
    console.log('=====  onTapVehicleEnter =====');
    console.log(evt);
    __PARKING_SERVICE__.syncParkingEnterInfo({
      parking_id: this.parkingId,
      car_number: this.data.carNumber
    }, (res) => {
      console.log(res);
      if (res.data.code === 0) {
        my.navigateBack({

        });
      }
    })
  }
});

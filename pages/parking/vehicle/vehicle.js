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
        console.log('==== onLoad ====');
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
        //  设置导航栏文字及样式
        my.setNavigationBar({
            title: this.data.btnText
        });
        this.parkingId = options.parkingId;
    },
    onReady() {
        // 页面加载完成
        console.log('==== onReady ====');
    },
    onShow() {
        // 页面显示
        console.log('==== onShow ====');
    },
    onHide() {
        // 页面隐藏
        console.log('==== onHide ====');
    },
    onUnload() {
        // 页面被关闭
        console.log('==== onUnload ====');
        this.data.inputs = [];
        this.data.carNumber = '';
    },
    onTitleClick() {
        // 标题被点击
        console.log('==== onTitleClick ====');
    },
    onPullDownRefresh() {
        // 页面被下拉
        console.log('==== onPullDownRefresh ====');
    },
    onReachBottom() {
        // 页面被拉到底部
        console.log('==== onReachBottom ====');
    },
    onShareAppMessage() {
        // 返回自定义分享信息
        console.log('==== onShareAppMessage ====');
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
        console.log('=====  onTapVehicle =====');
        console.log(evt);
        console.log(this.parkingId);
        console.log(this.data.btnText);
        if (this.data.btnText === '入场') {
            __PARKING_SERVICE__.syncParkingEnterInfo({
                parking_id: this.parkingId,
                car_number: this.data.carNumber
            }, (res) => {
                console.log(res);
                this.resultHandler(res);
            })
        } else {
            __PARKING_SERVICE__.syncParkingExitInfo({
                parking_id: this.parkingId,
                car_number: this.data.carNumber
            }, (res) => {
                console.log(res);
                this.resultHandler(res);
            })
        }
    },
    resultHandler(res) {
        if (res.data.code === 0) {
            my.showToast({
                type: 'success',
                content: '成功',
                duration: 3000,
                success: () => {
                    my.navigateBack({});
                }
            });
        } else if (res.data.code === "40004") {
            my.showToast({
                type: 'fail',
                content: res.data.subMsg,
                duration: 3000
            });
        } else {
            my.showToast({
                type: 'fail',
                content: res.data.msg,
                duration: 3000
            });
        }

    }
});

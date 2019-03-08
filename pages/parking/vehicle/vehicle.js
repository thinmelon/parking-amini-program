import __PARKING_SERVICE__ from '../../../interface/parking.service';

Page({
    data: {
        provinces: [
            "京", "津", "渝", "沪", "冀", "晋", "辽", "吉", "黑", "苏",
            "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "粤", "琼",
            "川", "贵", "云", "陕", "甘", "青", "蒙", "桂", "宁", "新",
            "藏", "使", "领", "警", "学", "港", "澳"
        ],
        province: '闽',
        carNumber: '',
        btnText: ''
    },
    parkingId: '',                    //  停车场ID
    onLoad(options) {
        console.log('==== onLoad ====');
        console.log(options)
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
    bindPickerChange(evt) {
        const province = this.data.provinces[evt.detail.value];
        this.setData({
            province: province,
            carNumber: province + this.data.carNumber.substr(1)
        });
    },
    //  绑定input输入事件
    bindKeyInput(evt) {
        this.setData({
            carNumber: (this.data.province + evt.detail.value.trim()).toUpperCase()
        });
    },
    //  模拟驶入驶出操作
    onTapVehicle(evt) {
        if (__PARKING_SERVICE__.checkCarNumberValidity(this.data.carNumber)) {
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
        } else {
            this.resultHandler({
                data: {
                    msg: '请输入正确的车牌号'
                }
            });
        }

    },
    //  结果处理
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

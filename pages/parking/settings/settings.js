import __PARKING_SERVICE__ from '../../../interface/parking.service';

Page({
    data: {
        //  表示选择了 range 中的第几个（下标从 0 开始）
        parkingTypeIndex: 0,
        parkingTypes: [
            {
                id: 1,
                name: '居民小区'
            },
            {
                id: 2,
                name: '商圈停车场'
            },
            {
                id: 3,
                name: '路侧停车'
            },
            {
                id: 4,
                name: '公园景点'
            },
            {
                id: 5,
                name: '商务楼宇'
            },
            {
                id: 7,
                name: '交通枢纽'
            },
            {
                id: 8,
                name: '市政设施'
            },
            {
                id: 6,
                name: '其他'
            }
        ],
        payTypeIndex: 0,
        payTypes: [
            {
                id: 1,
                name: '支付宝在线缴费'
            },
            {
                id: 2,
                name: '支付宝代扣缴费'
            },
            {
                id: 3,
                name: '当面付'
            }
        ],
        copyright: '© 2016-2019 点滴软件 All rights reserved.',
        parking: null
    },
    onLoad(query) {
        // console.log('==== onLoad ====', query);
        if (query && query.parking) {
            this.data.parking = JSON.parse(query.parking);
            // console.log(this.data.parking);
            this.setData({
                parkingTypeIndex: parseInt(this.data.parking.parkingLotType) - 1,
                payTypeIndex: parseInt(this.data.parking.payType) - 1
            });

        }
    },
    onUnload() {
        // 页面被关闭
        // console.log('==== onUnload ====');
        this.clearFormData();
        this.data.parking = null;
    },
    //  停车场类型
    bindParkingTypeChanged(e) {
        this.setData({
            parkingTypeIndex: e.detail.value,
        });
    },
    //  支付类型
    bindPayTypeChanged(e) {
        this.setData({
            payTypeIndex: e.detail.value,
        });
    },
    formSubmit(e) {
        // console.log('form发生了submit事件，携带数据为：', e.detail.value);
        if (this.data.parking && this.data.parking._id) {
            console.log('Parking ID: ', this.data.parking._id);
            __PARKING_SERVICE__.updateParkingLotInfo({
                parking_id: this.data.parking._id,
                agent_id: e.detail.value.agent_id,
                mchnt_id: e.detail.value.mchnt_id,
                parking_address: e.detail.value.parking_address,
                parking_fee_description: e.detail.value.parking_fee_description,
                parking_lot_type: e.detail.value.parking_lot_type + 1,
                parking_mobile: e.detail.value.parking_mobile,
                parking_name: e.detail.value.parking_name,
                parking_poiid: e.detail.value.parking_poiid,
                pay_type: e.detail.value.pay_type + 1,
                shopingmall_id: e.detail.value.shopingmall_id,
                time_out: e.detail.value.time_out
            }, (res) => {
                this.resultHandler(res);
            });
        } else {
            __PARKING_SERVICE__.createParkingLotInfo({
                agent_id: e.detail.value.agent_id,
                mchnt_id: e.detail.value.mchnt_id,
                parking_address: e.detail.value.parking_address,
                parking_fee_description: e.detail.value.parking_fee_description,
                parking_lot_type: e.detail.value.parking_lot_type + 1,
                parking_mobile: e.detail.value.parking_mobile,
                parking_name: e.detail.value.parking_name,
                parking_poiid: e.detail.value.parking_poiid,
                pay_type: e.detail.value.pay_type + 1,
                shopingmall_id: e.detail.value.shopingmall_id,
                time_out: e.detail.value.time_out
            }, (res) => {
                this.resultHandler(res);
            });
        }
    },
    formReset(e) {
        this.clearFormData();
        this.setData({
            parking: this.data.parking
        })
    },
    clearFormData() {
        if (this.data.parking) {
            this.data.parking.parkingPoiid = '';
            this.data.parking.parkingName = '';
            this.data.parking.parkingAddress = '';
            this.data.parking.shopingmallId = '';
            this.data.parking.parkingFeeDescription = '';
            this.data.parking.parkingMobile = '';
            this.data.parking.timeOut = '';
            this.data.parking.agentId = '';
            this.data.parking.mchntId = '';
        }
    },
    resultHandler(res) {
        console.log(res);
        if (res.data.code === 0) {
            my.showToast({
                type: 'success',
                content: '成功',
                duration: 3000,
                success: () => {
                    // my.navigateBack({});
                    my.reLaunch({
                        url: '/pages/index/index'
                    })
                }
            });
        } else if (res.data.code === "40004") {
            my.showToast({
                type: 'fail',
                content: res.data.subMsg,
                duration: 3000
            });
        }
    }
});

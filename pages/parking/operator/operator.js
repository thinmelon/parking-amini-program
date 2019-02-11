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
                desc: '更新停车场信息',
            },
            {
                icon: '/icons/ditu.png',
                text: 'POI',
                desc: '高德地图唯一标识',
            }
        ]
    },
    parking: null,
    operators: [],
    onLoad(query) {
        console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
        this.parking = JSON.parse(query.parking);
        //  设置导航栏文字及样式
        my.setNavigationBar({
            title: this.parking.parkingName
        });
        this.operators.push(this.onVehicleEnter);
        this.operators.push(this.onVehicleExit);
        this.operators.push(this.onQueryOrders);
        this.operators.push(this.onTapParkingSettings);
        this.operators.push(this.onTapPoi);
    },
    onGridItemClick(evt) {
        this.operators[evt.detail.index](this);
    },
    onVehicleEnter(caller) {
        my.navigateTo({
            url: '/pages/parking/vehicle/vehicle?direction=enter&parkingId=' + caller.parking._id
        });
    },
    onVehicleExit(caller) {
        my.navigateTo({
            url: '/pages/parking/vehicle/vehicle?direction=exit&parkingId=' + caller.parking._id
        });
    },
    onQueryOrders(caller) {
    },
    onTapParkingSettings(caller) {
        my.navigateTo({
            url: '/pages/parking/settings/settings?parking=' + JSON.stringify(caller.parking)
        });
    },
    onTapPoi(caller) {
        my.navigateTo({
            url: '/pages/parking/poi/poi'
        });
    }
});

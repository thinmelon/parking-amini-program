import __PARKING_SERVICE__ from '../../../interface/parking.service';

Page({
    data: {
        records: []
    },
    parkingId: '',
    offset: 0,
    amountPerTime: 10,
    carNumber: '',
    onLoad(query) {
        console.log('==== onLoad ====', query);
        this.parkingId = query.parkingId;
        this.queryRecords(this.parkingId, this.offset, this.amountPerTime, this.carNumber);
    },
    onUnload() {
        // 页面被关闭
        console.log('==== onUnload ====');
        this.data.records = [];
        this.offset = 0;
    },
    onReachBottom(e) {
        // 页面被拉到底部
        console.log('==== onReachBottom ====', this.offset);
        this.queryRecords(this.parkingId, this.offset, this.amountPerTime, this.carNumber);
    },
    onSearchBarSubmit(e) {
        console.log(e)
        if (e && e.trim()) {
            //  搜索时初始化相关参数，并清空record数组
            this.data.records = [];
            this.offset = 0;
            this.carNumber = e;
            this.queryRecords(this.parkingId, this.offset, this.amountPerTime, this.carNumber);
        }
    },
    queryRecords(parkingId, offset, amount, carNumber) {
        let params = {
            parkingId: parkingId,
            offset: offset,
            amount: amount
        };
        if (carNumber) params.carNumber = encodeURIComponent(carNumber);
        __PARKING_SERVICE__.queryRecords(params, res => {
            console.log(res);
            if (res.data.code === 0) {
                res.data.data.map(item => {
                    // item.thumb = '/icons/parking.png';                //  缩略图，图片地址
                    item.thumb = '';
                    item.arrow = true;                                  //  是否带剪头
                    item.align = 'middle';                              //  子元素垂直对齐，可选top,middle,bottom	
                    this.data.records.push(item)
                });
                this.offset = this.data.records.length;
                this.setData({
                    records: this.data.records
                })
            }
        })
    }
});

import __AMAP_SERVICE__ from '../../../interface/amap.service';
import __OPEN_ALIPAY_API__ from '../../../interface/open.alipay.api';

Page({
    data: {
        scale: 15,
        longitude: 0,
        latitude: 0,
        mapStyle: 'height: 300px;',
        listStyle: 'top: 300px;',
        pois: []
    },
    focusPoiIndex: 0,
    mapContext: null,
    onLoad() {
        __OPEN_ALIPAY_API__.getStorage({
            key: '__WINDOW__'
        }).then(res => {
            if (res.success) {
                console.log(res);
                this.setData({
                    mapStyle: 'height: ' + res.data.windowWidth + 'px;',
                    listStyle: 'top: ' + res.data.windowWidth + 'px;'
                })
            }
        })
        __AMAP_SERVICE__.searchPoiKeyword({}, res => {
            console.log(res);
            if (res.data.infocode === '10000') {
                const pois = res.data.pois.map(item => {
                    // item.thumb = '/icons/parking.png';                //  缩略图，图片地址
                    item.thumb = '';
                    item.arrow = true;                                  //  是否带剪头
                    item.align = 'middle';                              //  子元素垂直对齐，可选top,middle,bottom	
                    const location = item.location.split(',');          //  POI经纬度
                    item.iconPath = "/icons/marker.png";
                    item.latitude = location[1];
                    item.longitude = location[0];
                    item.width = 32;
                    item.height = 32;
                    item.title = item.name;
                    item.customCallout = {
                        "type": 0,
                        "descList": [{
                            "desc": "POIID: " + item.id,
                            "descColor": "#fff"
                        }],
                        "isShow": 0
                    }
                    return item;
                })
                if (pois.length > 0) {
                    pois[this.focusPoiIndex].customCallout.isShow = 1;
                    this.setData({
                        pois: pois,
                        longitude: pois[this.focusPoiIndex].longitude,                //  默认marker数组中第一个元素
                        latitude: pois[this.focusPoiIndex].latitude
                    })
                }

            }
        })
    },
    onReady(e) {
        // 使用 my.createMapContext 获取 map 上下文
        this.mapContext = my.createMapContext('map');
        this.mapContext.showsCompass({ isShowsCompass: 0 });
    },
    onCalloutTap(e) {
        console.log(e)
        __OPEN_ALIPAY_API__.setStorage({
            key: '__POIID__',
            data: e.markerId
        })
            .then(() => {
                return new Promise((resolve, reject) => {
                    resolve({
                        type: 'success',
                        content: '成功'
                    });
                })
            })
            .then(__OPEN_ALIPAY_API__.showToast)
            .then(__OPEN_ALIPAY_API__.navigateBack)
            .then(() => {
                // console.log(res);
            })
            .catch(err => {
                console.error(err);
            })
    },
    onListItemClick(e) {
        //  取消显示先前的marker
        this.data.pois[this.focusPoiIndex].customCallout.isShow = 0;
        this.focusPoiIndex = e.index;
        //  根据停车场的index，将其设置为当前的marker
        this.data.pois[this.focusPoiIndex].customCallout.isShow = 1;
        this.setData({
            pois: this.data.pois,
            longitude: e.target.dataset.poi.longitude,
            latitude: e.target.dataset.poi.latitude
        });
    }
});

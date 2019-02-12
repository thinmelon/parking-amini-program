import __AMAP_SERVICE__ from '../../../interface/amap.service';
import __OPEN_ALIPAY_API__ from '../../../interface/open.alipay.api';

Page({
    data: {
        scale: 15,                          //  缩放范围
        longitude: 0,                       //  中心点
        latitude: 0,
        mapStyle: 'height: 300px;',         //  地图样式
        listStyle: 'top: 300px;',           //  搜索列表样式
        pois: []                            //  POI数组
    },
    keywords: '',                           //  搜索关键词
    focusPoiIndex: 0,                       //  当前搜索列表索引
    mapContext: null,                       //  地图控件上下文
    count: 0,                               //  返回结果总数
    offset: 10,                             //  单次返回条数
    currentPage: 1,                         //  当前页
    searchBarHeight: 44,
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
        });
        //  搜索关键词 - 停车场
        this.searchPoiKeyword('停车场', this.offset, this.currentPage);
    },
    onReady(e) {
        // 使用 my.createMapContext 获取 map 上下文
        this.mapContext = my.createMapContext('map');
        if (this.mapContext.showsCompass) this.mapContext.showsCompass({ isShowsCompass: 0 });
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
    },
    onReachBottom(e) {
        // 页面被拉到底部
        console.log('==== onReachBottom ====', this.keywords, this.count, this.currentPage);
        if (this.count > this.currentPage * this.offset) {
            this.searchPoiKeyword(this.keywords, this.offset, ++this.currentPage);
        }
    },
    onSearchBarSubmit(e) {
        console.log(e)
        if (e && e.trim()) {
            //  搜索时初始化相关参数，并清空POI数组
            this.currentPage = 1;
            this.focusPoiIndex = 0;
            this.data.pois = [];
            this.searchPoiKeyword(e, this.offset, this.currentPage);
        }
    },
    searchPoiKeyword(keywords, offset, page) {
        this.keywords = keywords;
        __AMAP_SERVICE__.searchPoiKeyword({
            keywords: encodeURIComponent(keywords),
            offset: offset,
            page: page
        }, res => {
            console.log(res);
            if (res.data.infocode === '10000' && parseInt(res.data.count) > 0) {
                this.count = res.data.count;
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
                    this.data.pois.push(item);
                    return item;
                })
                if (this.data.pois.length > 0) {
                    this.data.pois[this.focusPoiIndex].customCallout.isShow = 1;                  //  默认marker返回结果中第一个元素
                    this.setData({
                        pois: this.data.pois,
                        longitude: this.data.pois[this.focusPoiIndex].longitude,                  //  以返回结果中第一个元素为中心
                        latitude: this.data.pois[this.focusPoiIndex].latitude
                    })
                }

            } else {
                my.showToast({
                    type: 'fail',
                    content: '查无结果'
                });
            }
        })
    }
});

import __OPEN_ALIPAY_API__ from './interface/open.alipay.api';

App({
    onLaunch(options) {
        // 第一次打开
        // options.query == {number:1}
        // console.info('App onLaunch');
        __OPEN_ALIPAY_API__
            .getSystemInfo()
            .then(info => {
                // console.log(info);
                return new Promise((resolve, reject) => {
                    resolve({
                        key: '__WINDOW__',
                        data: {
                            windowHeight: info.windowHeight,
                            windowWidth: info.windowWidth
                        }
                    });
                })
            })
            .then(__OPEN_ALIPAY_API__.setStorage)
            .then(res => {
                // console.log(res);
            })
    },
    onShow(options) {
        // 从后台被 scheme 重新打开
        // options.query == {number:1}
    },
});

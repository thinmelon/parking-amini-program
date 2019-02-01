import __OPEN_ALIPAY_API__ from './open.alipay.api';

const __PARKING_ENTERINFO_SYNC__ = 'https://www.pusudo.cn/parking/enterinfo';

function syncParkingEnterInfo(request) {
    __OPEN_ALIPAY_API__.httpRequest(
        __PARKING_ENTERINFO_SYNC__,
        'POST',
        {
            parking_id: request.parking_id,
            car_number: request.car_number
        }
    ).then(res => {
        console.log(res);
    }).catch(err => {
        console.error(err);
    })
}

module.exports = {
    syncParkingEnterInfo: syncParkingEnterInfo
}
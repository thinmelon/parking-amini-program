import __OPEN_ALIPAY_API__ from './open.alipay.api';
// import __UTIL__ from 'util';

// const __ENVIRONMENT__ = 'DEVELOPMENT';
const __ENVIRONMENT__ = 'PRODUCT';
const __DEV_APP_ID__ = '2016092100559091';
const __PRO_APP_ID__ = '2019012263122350';
const __PROVIDER_ID__ = '2088221729274411';

/**
 * API
 */
const __GET_PARKINGS__ = 'https://www.pusudo.cn/parking/lotinfo';
const __NEW_PARKINGS__ = 'https://www.pusudo.cn/parking/lotinfo';
const __SET_PARKINGS__ = 'https://www.pusudo.cn/parking/parking';
const __PARKING_ENTERINFO_SYNC__ = 'https://www.pusudo.cn/parking/enterinfo';
const __PARKING_EXITINFO_SYNC__ = 'https://www.pusudo.cn/parking/exitinfo'
const __GET_RECORDS__ = 'https://www.pusudo.cn/parking/record';

/**
 * 获取所有已录入的车场信息
 * 
 * @param {*} request 
 * @param {*} response 
 */
function getParkings(request, response) {
    __OPEN_ALIPAY_API__.httpRequest(
        __GET_PARKINGS__,
        'GET',
        {}
    ).then(res => {
        response(res);
    }).catch(err => {
        console.error(err);
    })
}

/**
 * 获取所有出入场信息
 * 
 * @param {*} request 
 * @param {*} response 
 */
function queryRecords(request, response) {
    __OPEN_ALIPAY_API__.httpRequest(
        request.carNumber ?
            __GET_RECORDS__ + '?parkingId=' + request.parkingId + '&carNumber=' + request.carNumber + '&offset=' + request.offset + '&amount=' + request.amount + '&dumb=' :
            __GET_RECORDS__ + '?parkingId=' + request.parkingId + '&offset=' + request.offset + '&amount=' + request.amount + '&dumb=',
        'GET',
        {}
    ).then(res => {
        response(res);
    }).catch(err => {
        console.error(err);
    })
}

/**
 * 录入停车场信息
 * @param {*} request 
 * @param {*} response 
 */
function createParkingLotInfo(request, response) {
    __OPEN_ALIPAY_API__.httpRequest(
        __NEW_PARKINGS__,
        'POST',
        {
            appid: __ENVIRONMENT__ === 'PRODUCT' ? __PRO_APP_ID__ : __DEV_APP_ID__,
            parking_poiid: request.parking_poiid,
            parking_name: request.parking_name,
            parking_address: request.parking_address,
            parking_lot_type: request.parking_lot_type,
            pay_type: request.pay_type,
            shopingmall_id: request.shopingmall_id,
            parking_fee_description: request.parking_fee_description,
            parking_mobile: request.parking_mobile,
            time_out: request.time_out,
            agent_id: request.agent_id || __PROVIDER_ID__,
            mchnt_id: request.mchnt_id
        }
    ).then(res => {
        response(res);
    }).catch(err => {
        console.error(err);
    })
}

/**
 * 更新停车场信息
 * @param {*} request 
 * @param {*} response 
 */
function updateParkingLotInfo(request, response) {
    console.log('===  updateParkingLotInfo  ===');
    __OPEN_ALIPAY_API__.httpRequest(
        __SET_PARKINGS__,
        'POST',
        {
            appid: __ENVIRONMENT__ === 'PRODUCT' ? __PRO_APP_ID__ : __DEV_APP_ID__,
            // parking_id: __ENVIRONMENT__ === 'PRODUCT' ? request.parking_id : 'PI1548815183729110614',
            // parking_poiid: __ENVIRONMENT__ === 'PRODUCT' ? request.parking_poiid : 'B0FFH4W12J',
            parking_id: request.parking_id,
            parking_poiid: request.parking_poiid,
            parking_name: request.parking_name,
            parking_address: request.parking_address,
            parking_lot_type: request.parking_lot_type,
            pay_type: request.pay_type,
            shopingmall_id: request.shopingmall_id,
            parking_fee_description: request.parking_fee_description,
            parking_mobile: request.parking_mobile,
            time_out: request.time_out,
            agent_id: request.agent_id || __PROVIDER_ID__,
            mchnt_id: request.mchnt_id
        }
    ).then(res => {
        response(res);
    }).catch(err => {
        console.error(err);
    })
}

/**
 * 同步车辆进入
 * 
 * @param {*} request 
 * @param {*} response 
 */
function syncParkingEnterInfo(request, response) {
    __OPEN_ALIPAY_API__.httpRequest(
        __PARKING_ENTERINFO_SYNC__,
        'POST',
        {
            appid: __ENVIRONMENT__ === 'PRODUCT' ? __PRO_APP_ID__ : __DEV_APP_ID__,
            parking_id: request.parking_id,
            car_number: request.car_number
        }
    ).then(res => {
        response(res);
    }).catch(err => {
        console.error(err);
    })
}

/**
 * 同步车辆驶出
 * 
 * @param {*} request 
 * @param {*} response 
 */
function syncParkingExitInfo(request, response) {
    __OPEN_ALIPAY_API__.httpRequest(
        __PARKING_EXITINFO_SYNC__,
        'POST',
        {
            appid: __ENVIRONMENT__ === 'PRODUCT' ? __PRO_APP_ID__ : __DEV_APP_ID__,
            parking_id: request.parking_id,
            car_number: request.car_number
        }
    ).then(res => {
        response(res);
    }).catch(err => {
        console.error(err);
    })
}

function checkCarNumberValidity(carNumber) {
    return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(carNumber);
}

module.exports = {
    getParkings: getParkings,
    queryRecords: queryRecords,
    createParkingLotInfo: createParkingLotInfo,
    updateParkingLotInfo: updateParkingLotInfo,
    syncParkingEnterInfo: syncParkingEnterInfo,
    syncParkingExitInfo: syncParkingExitInfo,
    checkCarNumberValidity: checkCarNumberValidity
}
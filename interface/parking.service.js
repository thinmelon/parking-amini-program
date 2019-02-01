import __OPEN_ALIPAY_API__ from './open.alipay.api';
const __APP_ID__ = '2019012263122350';
/**
 * API
 */
const __GET_PARKINGS__ = 'https://www.pusudo.cn/parking/lotinfo';
const __PARKING_ENTERINFO_SYNC__ = 'https://www.pusudo.cn/parking/enterinfo';

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
      appid: __APP_ID__,
      parking_id: request.parking_id,
      car_number: request.car_number
    }
  ).then(res => {
    response(res);
  }).catch(err => {
    console.error(err);
  })
}

module.exports = {
  getParkings: getParkings,
  syncParkingEnterInfo: syncParkingEnterInfo
}
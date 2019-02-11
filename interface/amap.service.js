import __OPEN_ALIPAY_API__ from './open.alipay.api';
import __UTIL__ from 'util';

/**
 * 高德开放平台 https://lbs.amap.com/dev/key/app
 * Key名称：   小小停车场_蚂蚁金服停车缴费
 * 绑定服务：   Web服务
 */
const __AMAP_KEY__ = '63cadc302a5cacdd7db68db7a9139815';
const __ADCODE__ = {
    'PUTIAN': 350300,
    'TOWN': 350301,
    'CHENXIANG': 350302,
    'HANJIANG': 350303,
    'LICHENG': 350304,
    'XIUYU': 350305,
    'XIANYOU': 350322
}
const __DEFAULT_TYPE__ = '150900';      //  查询POI类型     分类代码 或 汉字（若用汉字，请严格按照附件之中的汉字填写）
const __DEFAULT_OFFSET__ = 10;  //  每页记录数据     强烈建议不超过25，若超过25可能造成访问报错
const __DEFAULT_PAGE__ = 1;     //  当前页数        最大翻页数100

/**
 * API
 */
const __KEYWORD_POI_SEARCH__ = 'https://restapi.amap.com/v3/place/text?keywords=%s&types=%s&city=%s&output=%s&offset=%s&page=%s&key=%s&extensions=%s';

/**
 * 关键字搜索
 * 
 * @param {*} request 
 * @param {*} response 
 */
function searchPoiKeyword(request, response) {
    __OPEN_ALIPAY_API__.httpRequest(
        __UTIL__.format(__KEYWORD_POI_SEARCH__,
            request.keywords || encodeURIComponent('停车场'),
            request.type || __DEFAULT_TYPE__,
            request.adcode || __ADCODE__.PUTIAN,
            'JSON',
            request.offset || __DEFAULT_OFFSET__,
            request.page || __DEFAULT_PAGE__,
            __AMAP_KEY__,
            request.extensions || 'base'),
        'GET',
        {}
    ).then(res => {
        response(res);
    }).catch(err => {
        console.error(err);
    })
}

module.exports = {
    searchPoiKeyword: searchPoiKeyword
}
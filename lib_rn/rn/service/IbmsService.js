import Config from '../configs/config'
import {send, getSend, uploadImage} from './BaseService'
import {hostV, getHost} from '../configs/config'


//获取ibms项目列表
export const getCompanys = (name) => {
    var api = '/building/info/'
    console.log(name)
    // return getSend(getHost + api + name)
    return send(getHost + api + name, '', 'GET')
}
// 获取ibms功能列表
export const getAppList = (communityID) => {
    var api = '/building/subsys/'
    // return getSend(getHost + api + communityID)
    return send(getHost + api + communityID, '', 'GET')
}
// 应用首页请求数据方法
export const getAppItemList = () => {
    var api = '/app/items'
    return send(hostV + api)
}
// 轮播图请求数据
export const getBanner = () => {
    var api = '/app/broadcastnew'
    return send(hostV + api)
}
//获取告警通知分类
export const getQueryConditionList = () => {
    var api = '/alarmDetailInfo/queryCondition/all/'
    return getSend(getHost + api)
}
//工单处理分类
export const getWorkOrderState = () => {
    var api = '/workorder/getWorkOrderState/'
    return getSend(getHost + api)
}
//获取告警通知列表
export const getAlarmQueryList = (buildingID, levelID, childID, cateID, page_number, ONE_PAGE_COUNT) => {
    var api = '/alarmDetailInfo/alarmQuery/'
    return getSend(getHost + api + buildingID + '/' + levelID + '/' + childID + '/' + cateID + '/' + page_number + '/' + ONE_PAGE_COUNT)
}
// 工单详情数据
export const getWorkOrderDetail = (workorderId) => {
    var api = '/workorder/getWorkOrderDetail/'
    return getSend(getHost + api + workorderId)
}
//获取工单列表
export const getWorkOrderList = (officeID,state,page_number,ONE_PAGE_COUNT) => {
    var api = '/workorder/getWorkOrderList/'
    return getSend(getHost + api + officeID + '/'+state+ '/' + page_number + '/' + ONE_PAGE_COUNT)
}

export const getControl = (type, communityID) => {
    var api;
    {
        type == '0' ? (
            api = '/camera/list/'
        ) : (
            api = '/access/info/'
        )
    }
    console.log(getHost + api + communityID)
    return send(getHost + api + communityID, '', 'GET')
    // return getSend(getHost + api + communityID)
}
//提交工单处理
export const setDealwithOrder = data => {
    var api = '/apps/workorder/dealOrder/'
    return send(getHost + api + data);
}
//上传附件
export const uploadAccessory = imgPath => {
    return uploadImage(imgPath);
}


export const getAlarmNoticeDetail = (noticeID) => {

    var api = '/alarmDetailInfo/alarmInfo/'
    return getSend(getHost + api + noticeID)

}


export const markErrorRequest = (noticeID) => {

    var api = '/workorder/deleteAlarm/'
    return getSend(getHost + api + noticeID)
}

export const creatOrderRequest = (name, noticeID) => {
    noticeID = '382303eebfd447988e16aa29ce01aaeb';
    var api = '/workorder/createOrder/'
    return getSend(getHost + api + name + '/' + noticeID)
}

export default {
    getCompanys,
    getAppList,
    getAppItemList,
    getBanner,
    getWorkOrderDetail,
    getControl,
    setDealwithOrder,
    uploadAccessory,
    getQueryConditionList,
    getAlarmQueryList,
    getAlarmNoticeDetail,
    markErrorRequest,
    creatOrderRequest,
    getWorkOrderState,
    getWorkOrderList
}

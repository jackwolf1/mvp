import { observable, computed, action, transaction, toJS, runInAction } from 'mobx';
import BaseStore from './BaseStore';
import IbmsService, { getAppList, getAppItemList, getWorkOrderDetail, getAlarmNoticeDetail, creatOrderRequest, markErrorRequest } from '../service/IbmsService';

class IbmsStore extends BaseStore {

    @observable companyList = [];
    @observable appList = [];
    @observable appListData = {};
    @observable appItemList = []; //应用首页数据
    @observable banner = []; //banner数据
    @observable controlList = []; //视频门禁监控列表数据
    @observable notifit = {}; //首页通告栏数据
    @observable queryConditionList = []; //告警通知分类数据
    @observable alarmQueryList = []; //告警通知列表
    @observable workOrderState = []; //工单处理
    @observable workOrderList = []; //工单处理列表
    @observable workOrderDetail = {};//工作订单详情
    @observable alarmDetailInfo = {};//告警详情
    @observable responseObject = {};//误报详情
    @observable OrderObject = {}; // 生成告警详情

    @observable orderId;
    @observable name

    uploadpicList = []//上传图片列表

    @action
    getCompanys(name) {
        return IbmsService.getCompanys(name).then(data => {
            this.companyList = data.data.list
            // console.log(data.data.list)
        })
    }
    @action
    getAppList(communityID) {
        return IbmsService.getAppList(communityID).then(data => {
            this.appList = data.data.sysMap;
            this.appListData = data.data
            // console.log(data.data)
        })
    }
    @action
    getQueryConditionList() {
        return IbmsService.getQueryConditionList().then(data => {
            this.queryConditionList = data.data.list
            // console.log(data.data.application)
        })
    }
    @action
    getWorkOrderState() {
        return IbmsService.getWorkOrderState().then(data => {
            this.workOrderState = data.data.list
        })
    }
    @action
    getAlarmQueryList(buildingID,levelID,childID,cateID,page_number,ONE_PAGE_COUNT) {
        return IbmsService.getAlarmQueryList(buildingID,levelID,childID,cateID,page_number,ONE_PAGE_COUNT).then(data => {
            this.alarmQueryList = data.data.list
            // console.log(data.data.application)
        })
    }
    @action
    getWorkOrderList(officeID,state,page_number,ONE_PAGE_COUNT) {
        return IbmsService.getWorkOrderList(officeID,state,page_number,ONE_PAGE_COUNT).then(data => {
            this.workOrderList = data.data.list
            // console.log(data.data.application)
        })
    }
    @action
    getAppItemList() {
        return IbmsService.getAppItemList().then(data => {
            this.appItemList = [];
            this.appItemList = data.data.application
            this.notifit = data.data
            // console.log('测试用的'+data)
        })
    }
    @action
    getAppBanner() {
        return IbmsService.getBanner().then(data => {
            this.banner = data.data
            // console.log(data)
        })
    }

    @action
    getWorkOrderDetail(workorderId) {
        return IbmsService.getWorkOrderDetail(workorderId).then(data => {
            this.workOrderDetail = data.data;
            // console.log(data.data)
        })
    }

    @action
    getControlList(type, communityID) {
        return IbmsService.getControl(type, communityID).then(data => {
            this.controlList = data.data.list
            // console.log(data.data.list)
        })
    }
    /**
     * 告警详情
     *
     * @param {any} noticeID
     * @returns
     * @memberof IbmsStore
     */
    @action
    getDealwithOrder(value) {
        const promise = IbmsService.setDealwithOrder(super.setPost(value));
        promise.then(data => {
            this.workOrderDetail = data

        })
        return promise;
    }
    @action
    getAlarmNoticeDetail(noticeID) {

        const that = this;
        return IbmsService.getAlarmNoticeDetail(noticeID).then(data => {

            that.alarmDetailInfo = data['data'];


        })
    }
    /**
     * 告警请求
     *
     * @param {any} noticeID
     * @returns
     * @memberof IbmsStore
     */
    @action
    creatOrderRequest(name, noticeID) {

        return IbmsService.creatOrderRequest(name, noticeID).then(data => {
            this.OrderObject = data;
        })
    }
    /**
     * 标为误报
     *
     * @param {any} noticeID
     * @returns
     * @memberof IbmsStore
     */
    @action
    markErrorRequest(noticeID) {
        const that = this;
        return IbmsService.markErrorRequest(noticeID)
            .then(data => {

                that.responseObject = data;
                // console.log(this.responseObject)
            })
    }
    /**
     * 提交工单处理
     *
     * @param {any} noticeID
     * @returns
     * @memberof IbmsStore
     */
    @action
    setDealwithOrder(value) {
        const promise = IbmsService.setDealwithOrder(super.setPost(value));
        promise.then(data => {
            resolve(data.data)
        })
        return promise;
    }
    @action
    uploadImage(callback) {

        let promiseList = []
        this.uploadpicList.map(item => {
            promiseList.push(IbmsService.uploadAccessory(item))
        })
        let picValueList = []

        Promise.all(promiseList).then(datas => {

            datas.map(data => {
                picValueList.push(data.data.value)
            })

            callback(picValueList.join(','))
        }).catch(err => {
            console.log(err)
        })

    }
}
const store = new IbmsStore();
export default store;
export { store };
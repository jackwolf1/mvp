import { View,Text,StyleSheet,Dimensions} from 'react-native';
import React, { Component } from 'react';
import ibmsStore from "../../stores/ImbsStore";
import Modal from 'antd-mobile/lib/modal';
import Toast from 'antd-mobile/lib/toast';

var WIDTH = Dimensions.get('window').width;


const DataArray = [
  {
    data: [{ name: "设备名称" },
    { name: "子系统" }
    ], key: '1'
  },

  {
    data: [{ 'name': "告警级别" },
    { name: "告警名称" },
    { name: "告警类别" }], key: '2'
  },

  {
    data: [{ name: "告警次数" },
    { name: "首次发生时间" },
    { name: "末次发生时间" }], key: '3'
  }

]

export {DataArray};
export class NoticeDetailItemA extends Component{

    constructor(props){
        super(props);
        this._changeColorR = this._changeColorR.bind(this);
        this._changeText = this._changeText.bind(this);
    }

    render(){

        return(
            <View style={styles.itemStyle}>
            <Text style={styles.leftTextStyle}>{this.props.item.name}</Text>
            <Text style={[styles.rightStyle, { color: this._changeColorR(this.props.item.name, this.props.alarmDetailInfo) }]} 
            numberOfLines={1} ellipsizeMode='tail'>
              {this._changeText(this.props.item.name)}
            </Text>
          </View>
        );
    }

    _changeColorR(name, DetailModel) {
        switch (name) {
          case '告警级别':
            {
              switch (DetailModel.alarmLevel) {
                case '1':
                  return '#e65d4a'
                  break;
                case '2':
                  return '#fd9220'
                  break;
                case '3':
                  return '#fd9220'
                  break;
                default:
                  return '#e65d4a'
                  break;
              }
            }
            return '#e65d4a'
          case '告警次数':
            return '#e65d4a'
          default:
            break
        }
      }
    
      _changeText(DetailName) {
    
        let detailModel = ibmsStore.alarmDetailInfo;
    
        switch (DetailName) {
          case "设备名称":
            return (`${detailModel.alarmCategoryName}`)
            break;
          case "子系统":
            return (`${detailModel.alarmSubSystemName}`)
            break;
          case "告警级别":
            return (`${detailModel.alarmLevel}`)
            break;
          case "告警名称":
            return (`${detailModel.alarmName}`)
            break;
          case "告警类别":
            return (`${detailModel.alarmLevelName}`)
            break;
          case "告警次数":
            return (`${detailModel.alarmCount}`)
            break;
          case "首次发生时间":
            return (`${detailModel.alarmFirstOccureTime}`)
            break;
          case "末次发生时间":
            return (`${detailModel.alarmLastOccureTime}`)
            break;
          default:
            return DetailName
            break;
        }
      }

};
export default class bottomView extends Component{

  constructor(props) {
    super(props);
    this.GaoJingAlert = this.GaoJingAlert.bind(this);
    this.WuBaoAlert = this.WuBaoAlert.bind(this);

    
  }   

    render(){
        return(
            <View>
            <View style={styles.bottomStyle}>
              <View style={styles.buttonView}>
                <Text style={{ color: "#1f8fdf" }} onPress={this.GaoJingAlert} >生产工单 </Text>
              </View>
              <View style={styles.buttonView}>
                <Text style={{ color: "#b2b2b2" }} onPress={this.WuBaoAlert}>标记为误报 </Text>
              </View>
            </View>
          </View>
        );
    }

    /**
   * 告警弹窗
   * 
   * @memberof NoticeDetail
   */
  GaoJingAlert() {

    console.log(this.props.communityID);

    Modal.alert('生成告警单？', '', [
      { text: '取消', style: { color: 'rgb(252,38,41)' } },
      { text: '创建', onPress: () => this._creatOrderReques(this.props.communityID) },
    ])

  }

  /**
   * 生成告警订单
   * 
   * @param {any} e 
   * @memberof NoticeDetail
   */
  _creatOrderReques(noticeID) {

    storage.load({
      key: 'userInfo',
      autoSync: true,
      syncInBackground: true,

    }).then(ret => {
      console.log(ret.userName);

      ibmsStore.creatOrderRequest(ret.userName, noticeID).then(
        (data) => {
          let resData = ibmsStore.OrderObject;
          console.log(ibmsStore.OrderObject);

          if (resData.code === '200') {
            this.props.navigationA.goBack()

          } else {
            Toast.info(resData.msg);
          }
        }
      )

    })

  }

  /**
   * 误报弹窗
   * 
   * @memberof NoticeDetail
   */
  WuBaoAlert() {

    Modal.alert('确认标记为误报？', '', [
      { text: '取消', style: { color: 'rgb(252,38,41)' } },
      { text: '确定', onPress: () => this.markErrorRequest() },
    ])
  }

  /**
   * 误报请求
   * 
   * @memberof NoticeDetail
   */
  markErrorRequest() {
    ibmsStore.markErrorRequest(this.props.communityID).then(
      (data) => {

        let resData = ibmsStore.responseObject;
        console.log(ibmsStore.responseObject);

        if (resData.code === '200') {
          this.props.navigationA.goBack()

        } else {
          Toast.info(resData.msg);
        }
      }
    )
  }
};

export function  separator() {

    return(
        <View style={{ height: 0.5, backgroundColor: '#dddddd' }} />
    );
}

export function sectionCompHe(){
    return (
        <View style={{ height: 10, width: WIDTH, backgroundColor: '#eeeeee' }}/>
        // </View>
    );
}
const styles = StyleSheet.create({

    bottomStyle: {

        height: 50,
        width: WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
      },
      buttonView: {
    
        flex: 0.5,
        borderColor: '#dddddd',
        borderWidth: 0.25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white'
    
      },

    itemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 64, backgroundColor: 'white'
      },
      leftTextStyle: {

        fontSize: 16,
        marginLeft: 16,
        flex: 0.4
    
      },
      rightStyle: {
      
        marginRight: 12,
        fontSize: 16,
        color: '#B2B2B2',
        flex: 0.6,
        textAlign: 'right',
    
      },
      // rightTextStyle:{
      //   numberOfLines:1,
      //   ellipsizeMode:'tail'

      // }
});

// export default  detailItem;
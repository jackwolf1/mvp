/**
 * Android适配工具类
 * @type {{}}
 */
import { Dimensions } from 'react-native';

var AutoUtil = {};

const designWidth = 375;

const designHeight = 667;

AutoUtil.getWidth = (width) => {

    let screenWidth = Dimensions.get('window').width;

    return (screenWidth * width) / designWidth;

}

AutoUtil.getHeight = (height) => {

    let screenHeight = Dimensions.get('window').height;

    return (screenHeight * height) / designHeight;

}
// 获取当前设备屏幕宽度
AutoUtil.screenWidth = () => {
    return Dimensions.get('window').width;
}
// 获取当前设备屏幕高度
AutoUtil.screenHeight = () => {
    return Dimensions.get('window').height;
}


export default AutoUtil;
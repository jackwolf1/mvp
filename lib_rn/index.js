import { AppRegistry } from 'react-native';

import App from './rn/SwiperPage';
import IBMS from './rn/layouts/ibms/IBMSCompanyList';
import IBMSDealwithOrder from './rn/layouts/ibms/IBMSDealwithOrder';
import { YellowBox } from 'react-native';
//隐藏黄色警告
YellowBox.ignoreWarnings([
    'Warning',
    'Module',
    '[mobx.array]',
    'Class',
    'Possible',
    'RCT',
    'Task'
]);
//每个功能模块的入口文件全部在这里注册，应用首页独立出来，其他对应模块各自对应一个控制器
AppRegistry.registerComponent('RN_TFHelper', () => App);
AppRegistry.registerComponent('IBMS', () => IBMS);
AppRegistry.registerComponent('IBMSDealwithOrder', () => IBMSDealwithOrder);

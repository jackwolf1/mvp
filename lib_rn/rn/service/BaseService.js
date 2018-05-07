import Config from '../configs/config'
import { Alert } from 'react-native';
import storage from './LocationService'

//请求参数的封装
let params = function (data) {
  let temp = []
  for (var key in data) {
    temp.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
  }
  return temp.join('&')
}


//发送数据请求
export function send(url, data, method = 'POST', noParam = false) {


  return new Promise((resolve, reject) => {
    //获取登录信息
    storage.load({
      key: 'loginState',
      // key: 'userInfo',//集成后使用该关键字获取所需token
      autoSync: false
    }).then(loginState => {
      //获取到登录信息，设置选项
      let option = {
        method: method,
        headers: {
          // 'Content-Type': 'application/json'
          // 'Accept': 'application/json'
        }
      }
      if (method.toUpperCase() === 'POST') {
        option.headers['Authorization'] = `Bearer ${loginState.token}`
        option.headers['Client'] = loginState.chient
        // option.headers['Client'] = loginState.client //集成后开启此项，删除上一行
        option.headers['Edition'] = loginState.edition
      }
      if (noParam) {
        option.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
        option.body = data
      } else {
        if (method.toUpperCase() === 'POST') {
          option.headers['Accept'] = 'application/json'
          option.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
        }
        if (data) {
          if (method.toUpperCase() === 'POST') {
            option.body = params(data)
          } else {
            url += '?' + params(data)
          }
        }
      }
      return option
    }).then(option => {
      //请求接口
      fetch(url, option)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            //判断是否有效
            response.json().then(function (json) {
              if (json.code == Config.Error_1023 || json.code == 1003 || json.code == 1020 || json.code == 10001) {
                reject(json)
              } else {
                //获取接口正确
                resolve(json)
              }
            })
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
    }).catch(err => {
      reject(err)
    })
  })

}

//上传图片
export function uploadImage(imgPath) {
  return new Promise((resolve, reject) => {
    let url = Config.uploadURL + 'mobile/upload-file'
    let formData = new FormData();
    formData.append("type", "img")

    let list = imgPath.split('/')
    let file = { uri: imgPath, type: 'multipart/form-data', name: list[list.length - 1] };   //这里的key(uri和type和name)不能改变,
    formData.append("file", file);   //这里的files就是后台需要的key

    storage.load({
      key: 'loginState',
      // key: 'userInfo',//集成后使用该关键字获取所需token
      autoSync: false
    }).then(loginState => {
      formData.append("token", loginState.token);
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }).then(response => {
        if (response.status >= 200 && response.status < 300) {
          //判断是否有效
          response.json().then(function (json) {
            if (json.code == Config.Error_1023 || json.code == 1003 || json.code == 1020 || json.code == 10001) {
              reject(json)
            } else {
              //获取接口正确
              resolve(json)
            }
          })
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })

    }).catch(err => {
      reject(err)
    })
  })
}

//发送数据请求(get)
export function getSend(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',//如果为GET方式，则不要添加body，否则会出错    GET/POST
      header: {//请求头
        // Authorization: 'Bearer 1af74981f7a75339b6bba52506e77387b7fe235d',
        // Edition: 100,
        // Client: 'ios'
      },
      // body:{//请求参数
      // 'key1':'value1',
      // 'key2':'value2'
      // }
    })
      .then((response) => response.json())//将数据转成json,也可以转成 response.text、response.html
      .then((responseJson) => {//获取转化后的数据responseJson、responseText、responseHtml
        /*return responseJson.movies; */
        resolve(responseJson)
      }).catch((error) => {
        reject(error)
      });
  })
}

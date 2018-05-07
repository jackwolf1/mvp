// 项目名称
export const projectName = 'BIM移动助手'

// 列表分页limit
export const limit = 8

//令牌无效
export const Error_1023 = 1023;
//异地登录
export const Error_1003 = 1003;
//token失效
export const Error_1020 = 1020;
//强制更新
export const Error_10001 = 10001;

// 开发模式下临时使用的token
export const chient = 'ios'
export const edition = '1000'
export const token = '14345dc8e5f7bd415f277108c23cb25ae1dca57e'

export const V = 'v_304'

// 接口host
export const host = (() => {
  // return 'https://api2.tfhulian.com/' 
  return 'https://testapi.tfhulian.com'
})()
export const hostV = (() => {
  return host + "/" + V
})()
export const uploadURL = (() => {
  return "https://testfile.tfhulian.com/";
})()
//ibms接口
export const getHost = (() => {
  return 'http://60.30.241.10:3010/IBMS_Server/apps'
})()



export default {
  host,
  hostV,
  getHost,
  uploadURL,
  projectName,
  limit,
  Error_1023,
  Error_1003,
  Error_1020,
  Error_10001,
}

//对于axios进行二次封装
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

//1.利用axios对象的方法create,去创建一个axios实例
//2.request就是axios,只不过稍微配置一下
const request = axios.create({
  //配置对象
  //基础路径，发请求的时候，路径中会出现api
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: "H5" }
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {

  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  });
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {

  // 2xx 范围内的状态码都会触发该函数。     
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    //给错误提示,Toast默认是单例模式，后面的Toast调用了，会将前一个Toast效果覆盖
    //同时只能存在一个Toast
    Toast(res.message)
    //抛出一个错误的promise
    return Promise.reject(res.message)
  }
  //正确情况，直接走业务核心逻辑，清除loading效果
  Toast.clear()
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request
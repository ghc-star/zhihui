import request from "../utils/request";

//获取收货地址
export const getAddressList = () => {
  return request.get('/address/list')
}

//添加收货地址
export const AddressList = (name, phone, region) => {
  return request.post('/address/add', {
    form: {
      name,
      phone,
      region
    }
  })
}
import request from "../utils/request";

//订单结算
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

//提交订单
export const submitCart = (mode, obj) => {
  return request.post('/checkout/submit', {
    couponId: 0,  //优惠卷id
    delivery: 10, //物流方式
    isUsePoints: 0,  //是否使用积分
    mode,
    payType: 1, //余额支付
    remark: '请尽快发货',
    ...obj
  })
}


//订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
import request from "../utils/request";
export const getProList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}
//商品详情
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
//获取商品评论
export const getProComments = (goodsId) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit: 3
    }
  })
}


'use strict'
import axios from 'axios'
import store from '@store'
import { LOGOUT } from '@store/type'
import Vue from 'vue'

export const prefixUrl =
  process.env.NODE_ENV === 'production' ? 'https://hxapi.axccn.cn' : '/api'
export const logoUrl = prefixUrl + '/content/img/logo.png'
export const base = axios.create({
  baseURL: prefixUrl,
  headers: {
    platform: 'weixin',
    uuid: ''
  }
})

/**
 * 拦截器
 * 错误统一处理
 */
base.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      if (
        response.data.code === 201 ||
        response.data.code === 202 ||
        response.data.code === 203
      ) {
        store.commit(LOGOUT)
      } else {
        Vue.toasted.show(response.data.msg)
      }
    }
    return response.data
  },
  () => {
    Vue.toasted.show(`服务器繁忙，请稍后再试`)
  }
)

/**
 ******************************************** 基础数据相关接口 ********************************************
 */
// 数组字典列表
export const getDictionaryList = code =>
  base.get(`/Base/GetDictionaryList?code=${code}`)
// 系统参数值
export const getParamValue = code =>
  base.get(`/Base/GetParamValue?code=${code}`)
// 获取车型列表
export const getCarTypeList = form => base.post('/Base/GetCarTypeList', form)
// 获取省市区列表
export const getRegionList = () => base.get(`/Base/GetRegionList`)
// 获取App扩展模块列表
export const getAppModuleList = () => base.get('/Base/GetAppModuleList')
/**
 ******************************************** 基础数据相关接口 ********************************************
 */

/**
 ******************************************** 图片上传相关接口 ********************************************
 */
// 上传资源
export const uploadFile = form => base.post('/UploadFile/Upload', form)
// 移除上传资源
export const removeFile = form => base.post('/UploadFile/Remove', form)
/**
 ******************************************** 图片上传相关接口 ********************************************
 */

/**
 ******************************************** 城市相关接口（当前未使用） ********************************************
 */
export const getCityList = () => base.get('/Region/GetCityList')

export const getCurrentCity = () => base.get('/Region/GetCurrentCity')

export const getTownList = id => base.get(`/Region/GetTownList?region_id=${id}`)

export const getRegionId = (province, city) =>
  base.get(`/Region/GetRegionId?province=${province}&city=${city}`)

/**
 ******************************************** 城市相关接口 ********************************************
 */

/**
 ******************************************** 反馈相关接口 ********************************************
 */
// 添加反馈
export const submitFeedBack = form =>
  base.post(`/FeedBack/FeedBack/SubmitFeedBack`, form)
/**
 ******************************************** 商品评价相关接口 ********************************************
 */

/**
 ******************************************** 用户相关接口 ********************************************
 */
// 发送短信验证码
export const sendSms = (mobile, type) =>
  base.post(`/User/User/SendSms?mobile=${mobile}&log_type=${type}`)
// 用户注册
export const regist = form => base.post(`/User/User/Regist`, form)
// 用户登录
export const login = form => base.post(`/User/User/Login`, form)
// 用户关联登录
export const relationLogin = form => base.post(`/User/User/RelationLogin`, form)
// 退出登录
export const logout = () => base.post('/User/User/LoginOut')
// 修改密码
export const updatePwd = form => base.post(`/User/User/UpdatePwd`, form)
// 修改用户信息
export const updateUser = form => base.post('/User/User/UpdateUser', form)
// 绑定用户
export const bind = form => base.post(`/User/User/BindUser`, form)
// 获取用户信息
export const getUser = () => base.get('/User/User/GetUserInfo')
// 检查是否已绑定三方用户
export const checkBind = (openid, type) =>
  base.get(`/User/User/CheckBind?openid=${openid}&type=${type}`)
// 获取账号等级列表集合
export const getlevellist = () =>
  base.get('/AccountLevel/AccountLevel/GetLevelList')
// 获取用户消费积分记录列表
export const getuserjifenrecord = form =>
  base.post('/points/points/GetIntegralRecord', form)
// 获取用户返利记录
export const getbackpricerecord = form =>
  base.post('/RebateRecord/RebateRecord/GetRebatRecordList', form)
// 根据邀请码查询用户信息
export const getUserEn = invitationcode =>
  base.post('/User/User/GetUserEn', invitationcode)
// 根据用户编号获取用户信息
export const getUserEntity = userid =>
  base.get(`/User/User/GetUserEntity?user_id=${userid}`)
/**
 ******************************************** 用户相关接口 ********************************************
 */

/**
 ******************************************** 用户收款账户接口 ********************************************
 */
// 获取用户收款账户列表
export const getPaymenAccountList = (userid, usertype) =>
  base.get(
    `/Payment/PaymentAccount/GetPaymentAccountList?userid=${userid}&usertype=${usertype}`
  )
// 添加用户收款账户
export const SubmitPaymentAccount = form =>
  base.post('/api/RebateInfo/SubmitPaymentAccount', form)
/**
 ******************************************** 用户收款账户接口 ********************************************
 */

/**
 ******************************************** 用户提现业务接口 ********************************************
 */
// 添加用户提现申请
export const SubmitPutForward = form =>
  base.post('/User/UserPutForward/SubmitPutForward', form)

export const GetPutForwardList = () =>
  base.get('/User/UserPutForward/GetPutForwardList')
/**
 ******************************************** 用户提现业务接口 ********************************************
 */

/**
 ******************************************** 商品分类相关接口 ********************************************
 */
// 获取商品一级、二级、三级类目集合
export const getCategoryListForLayer123 = () =>
  base.get(`/Goods/GoodsCategory/GetCategoryListForLayer123`)
// 获取商品一级类目集合
export const getCategoryListForLayers1 = () =>
  base.get(`/Goods/GoodsCategory/GetCategoryListForLayers1`)
// 获取商品二级、三级类目集合
export const getCategoryListForLayers23 = parentid =>
  base.get(
    `/Goods/GoodsCategory/GetCategoryListForLayers23?parent_id=${parentid}`
  )
/**
 ******************************************** 商品分类相关接口 ********************************************
 */

/**
 ******************************************** 商品相关接口 ********************************************
 */
// 获取商品列表--(使用场景：分类商品列表，全局商品搜索结果)
export const getGoodsList = form => base.post(`/Goods/Goods/GetGoodsList`, form)
// 获取商品筛选条件-(使用场景：分类商品列表)
export const getGoodsListFilters = form =>
  base.post(`/Goods/Goods/GetGoodsListFilters`, form)
// 获取套餐商品列表--(使用场景：套餐详情，套餐商品列表)
export const getGoodsListForPackage = form =>
  base.post(`/Goods/Goods/GetGoodsListForPackage`, form)
// 获取套餐商品列表--(使用场景：我的优惠券)
export const getGoodsListForCoupon = form =>
  base.post(`/Goods/Goods/GetGoodsListForCoupon`, form)
// 获取标签商品列表--(使用场景：首页，商品详情)
export const getGoodsListForTag = form =>
  base.post(`/Goods/Goods/GetGoodsListForTag`, form)
// 获取商品基本信息-(使用场景：商品详情)
export const getGoodsDetail = (id, lng, lat) =>
  base.get(`/Goods/Goods/GetGoodsDetail?goods_id=${id}`)
// 获取商品描述-(使用场景：商品详情)
export const getGoodsMobileDesc = id =>
  base.get(`/Goods/Goods/GetGoodsMobileDesc?goods_id=${id}`)
// 获取商品产品参数-(使用场景：商品详情)
export const getGoodsParamDesc = id =>
  base.get(`/Goods/Goods/GetGoodsParamDesc?goods_id=${id}`)
// 获取商品售后服务-(使用场景：商品详情)
export const getGoodsOtherDesc = id =>
  base.get(`/Goods/Goods/GetGoodsOtherDesc?goods_id=${id}`)
// 获取商品相册图片-(使用场景：商品详情)
export const getGoodsImageList = id =>
  base.get(`/Goods/Goods/GetGoodsImageList?goods_id=${id}`)
// 获取商品Sku和规格属性-(使用场景：商品详情)
export const getGoodsSkuSpecList = id =>
  base.get(`/Goods/Goods/GetGoodsSkuSpecList?goods_id=${id}`)
/**
 ******************************************** 商品相关接口 ********************************************
 */

/**
 ******************************************** 积分专区商品相关接口 ********************************************
 */
// 获取积分专区商品列表--（使用场景：分类商品列表，全局商品搜索结果）
export const getGoodsPointsList = form =>
  base.post(`/Goods/Goods/getGoodsPointsList`, form)
// 获取积分商品基本信息-(使用场景：积分商品详情)
export const getGoodsPointsDetail = (id, lng, lat, userlevelid) =>
  base.get(
    `/Goods/Goods/GetGoodsPointsDetail?goods_id=${id}&userlevelid=${userlevelid}`
  )
// 获取商品描述-(使用场景：商品详情)
export const getGoodsPointsMobileDesc = id =>
  base.get(`/Goods/Goods/GetGoodsPointsMobileDesc?goods_id=${id}`)
// 获取商品产品参数-(使用场景：商品详情)
export const getGoodsPointsParamDesc = id =>
  base.get(`/Goods/Goods/GetGoodsPointsParamDesc?goods_id=${id}`)
// 获取商品售后服务-(使用场景：商品详情)
export const getGoodsPointsOtherDesc = id =>
  base.get(`/Goods/Goods/GetGoodsPointsOtherDesc?goods_id=${id}`)
/**
 ******************************************** 积分专区商品相关接口 ********************************************
 */

/**
 ******************************************** 商品评价相关接口 ********************************************
 */
// 添加评价
export const submitEvaluate = form =>
  base.post(`/Goods/GoodsEvaluate/SubmitEvaluate`, form)
// 获取商品评价分组列表
export const getEvaluateGroupList = id =>
  base.get(`/Goods/GoodsEvaluate/GetEvaluateGroupList?goods_id=${id}`)
// 获取商品评价列表
export const getEvaluateList = form =>
  base.post(`/Goods/GoodsEvaluate/GetEvaluateList`, form)
/**
 ******************************************** 商品评价相关接口 ********************************************
 */

/**
 ******************************************** 商品购物车相关接口 ********************************************
 */
// 商品加入购物车
export const addShoppingCart = form =>
  base.post('/Goods/ShoppingCart/AddShoppingCart', form)
// 更新购物车商品购买数量
export const updateShoppingCartGoodsNum = form =>
  base.post('/Goods/ShoppingCart/UpdateShoppingCartGoodsNum', form)
// 购物车移除商品
export const deleteShoppingCartGoods = form =>
  base.post('/Goods/ShoppingCart/DeleteShoppingCart', form)
// 获取我的购物车商品列表
export const getShoppingCartList = () =>
  base.get('/Goods/ShoppingCart/GetShoppingCartList')
/**
 ******************************************** 商品购物车相关接口 ********************************************
 */

/**
 ******************************************** 收货地址相关接口 ********************************************
 */
// 添加收货地址-(使用场景：收货地址管理)
export const submitAddress = form =>
  base.post('/Address/Deliveryaddress/SubmitAddress', form)
// 删除收货地址-(使用场景：收货地址管理)
export const deleteAddress = id =>
  base.post(
    '/Address/Deliveryaddress/DeleteAddress',
    `delivery_addressid=${id}`
  )
// 设置我的默认收货地址-(使用场景：收货地址管理, 收货地址添加, 收货地址修改)
export const setDefaultAddress = id =>
  base.post(
    '/Address/Deliveryaddress/SetDefaultAddress',
    `delivery_addressid=${id}`
  )
// 我的地址列表-(使用场景：收货地址管理)
export const getAddressList = () =>
  base.get('/Address/Deliveryaddress/GetAddressList')
// 获取我的默认收货地址-(使用场景：确认订单)
export const getDefaultAddress = () =>
  base.get('/Address/Deliveryaddress/GetDefaultAddress')
// 获取收货地址-(使用场景：收货地址修改)
export const getAddress = id =>
  base.get(`/Address/Deliveryaddress/GetAddress?delivery_addressid=${id}`)
/**
 ******************************************** 收货地址相关接口 ********************************************
 */

/**
 ******************************************** 我的爱车相关接口 ********************************************
 */
// 添加收货地址-(使用场景：收货地址管理)
export const submitCar = form => base.post('/Car/Car/SubmitCar', form)
// 删除收货地址-(使用场景：收货地址管理)
export const deleteCar = id => base.post('/Car/Car/DeleteCar', `car_id=${id}`)
// 设置我的默认收货地址-(使用场景：收货地址管理, 收货地址添加, 收货地址修改)
export const setDefaultCar = id =>
  base.post('/Car/Car/SetDefaultCar', `car_id=${id}`)
// 我的地址列表-(使用场景：收货地址管理)
export const getCarList = () => base.get('/Car/Car/GetCarList')
// 获取我的默认收货地址-(使用场景：确认订单)
export const getDefaultCar = () => base.get('/Car/Car/GetDefaultCar')
// 获取收货地址-(使用场景：收货地址修改)
export const getCar = id => base.get(`/Car/Car/GetCar?car_id=${id}`)
/**
 ******************************************** 我的爱车相关接口 ********************************************
 */

/**
 ******************************************** 商家相关接口 ********************************************
 */
// 商家详情基本信息（适用场景：商家详情）
export const getSellerDetail = id =>
  base.get(`/Seller/Seller/GetSellerDetail?seller_id=${id}`)
// 商家介绍
export const getSellerIntroduction = id =>
  base.get(`/Seller/Seller/GetSellerIntroduction?seller_id=${id}`)
// 商家列表
export const getSellerList = form =>
  base.post(`/Seller/Seller/GetSellerList`, form)
// 商家员工
export const getSellerEmployeeList = id =>
  base.get(`/Seller/Seller/GetSellerEmployeeList?seller_id=${id}`)
// 商家类型列表
export const getSellerTypeList = () =>
  base.get(`/Seller/Seller/GetSellerTypeList`)
// 注册商家（适用场景：商家入驻）
export const sellerRegister = form =>
  base.post(`/Seller/Seller/SellerRegister`, form)
// 获取商家注册信息(适用场景：商家入驻)
export const getSellerRegisterDetail = form =>
  base.get(`/Seller/Seller/GetSellerRegisterDetail`)
// 商家店铺列表
export const getSellerShopList = form =>
  base.post(`/Seller/Seller/GetSellerShopList`, form)
// 获取套餐商家列表--(使用场景：套餐详情，套餐商家列表)
export const getSellerListForPackage = form =>
  base.post(`/Seller/Seller/GetSellerListForPackage`, form)
/**
 ******************************************** 商家相关接口 ********************************************
 */

/**
 ******************************************** 消息通知相关接口 ********************************************
 */
// 获取消息分类列表
export const getMessageCategoryList = () =>
  base.get('/Message/Message/GetMessageCategoryList')
// 获取消息列表
export const getMessageList = form =>
  base.post(`/Message/Message/GetMessageList`, form)
/**
 ******************************************** 消息通知相关接口 ********************************************
 */

/**
 ******************************************** 收藏关注相关接口 ********************************************
 */
// 是否已经被我收藏-(使用场景：商品详情，店铺首页，套餐详情)
export const isCollection = form =>
  base.post(`/Collection/Collection/IsCollection`, form)
// 添加或删除我的收藏-(使用场景：商品详情，店铺首页，套餐详情)
export const submitCollection = form =>
  base.post(`/Collection/Collection/SubmitCollection`, form)
// 取消我的收藏
export const cancelCollection = form =>
  base.post(`/Collection/Collection/CancelCollection`, form)
// 我的商品收藏列表-(使用场景：商品收藏)
export const getCollectionGoodsList = form =>
  base.post(`/Collection/Collection/GetCollectionGoodsList`, form)
// 我的店铺列表-(使用场景：店铺收藏)
export const getCollectionSellerList = form =>
  base.post(`/Collection/Collection/GetCollectionSellerList`, form)
// 我的套餐列表-(使用场景：套餐收藏)
export const getCollectionPackageList = form =>
  base.post(`/Collection/Collection/GetCollectionPackageList`, form)
/**
 ******************************************** 收藏关注相关接口 ********************************************
 */

/**
 ******************************************** 促销活动相关接口 ********************************************
 */
// 商品参与的促销活动-(使用场景：商品详情)
export const getActivityListForGoods = id =>
  base.get(`/Promotion/Activity/GetActivityListForGoods?goodsid=${id}`)

/**
 ******************************************** 促销活动相关接口 ********************************************
 */

/**
 ******************************************** 优惠券相关接口 ********************************************
 */
// 优惠券详情-（使用场景：分享使用）
export const getCouponDetail = id =>
  base.get(`/Coupon/Coupon/GetCouponDetail?coupon_id=${id}`)
// 优惠券列表
export const getCouponList = form =>
  base.post(`/Coupon/Coupon/GetCouponList`, form)
/**
 ******************************************** 优惠券相关接口 ********************************************
 */

/**
 ******************************************** 优惠券订单相关接口 ********************************************
 */
// 我的优惠券订单列表
export const getCouponOrderList = form =>
  base.post(`/Coupon/CouponOrder/GetCouponOrderList`, form)
// 添加优惠券订单-（使用场景：商品详情）
export const addCouponOrder = form =>
  base.post(`/Coupon/CouponOrder/AddCouponOrder`, form)
/**
 ******************************************** 优惠券订单相关接口 ********************************************
 */

/**
 ******************************************** 套餐相关接口 ********************************************
 */
// 套餐列表-(使用场景：套餐列表)
export const getPackageList = form =>
  base.post(`/Package/Package/GetPackageList`, form)
// 套餐列表-(使用场景：店铺首页)
export const getSellerPackageList = form =>
  base.post(`/Package/Package/GetSellerPackageList`, form)
// 套餐列表-(使用场景：商品详情)
export const getGoodsPackageList = form =>
  base.post(`/Package/Package/GetGoodsPackageList`, form)
// 套餐列表的筛选条件-(使用场景：套餐列表)
export const getPackageListFilters = () =>
  base.get(`/Package/Package/GetPackageListFilters`)
// 获取套餐详情-(使用场景：套餐详情)
export const getPackageDetail = (id, lng, lat) =>
  base.get(`/Package/Package/GetPackageDetail?package_id=${id}`)
// 获取套餐描述-(使用场景：套餐详情)
export const getPackageDesc = id =>
  base.get(`/Package/Package/GetPackageDesc?package_id=${id}`)
/**
 ******************************************** 套餐相关接口 ********************************************
 */

/**
 ******************************************** 套餐订单相关接口 ********************************************
 */
// 我的套餐列表-(使用场景：个人中心)
export const getPackageOrderList = form =>
  base.post(`/Package/PackageOrder/GetPackageOrderList`, form)
// 创建套餐订单--(使用场景：套餐详情)
export const addPackageOrder = form =>
  base.post('/Package/PackageOrder/AddPackageOrder', form)
// 删除套餐订单-(使用场景：我的套餐)
export const deletePackageOrder = form =>
  base.post(`/Package/PackageOrder/DeletePackageOrder`, form)
// 我的套餐使用记录-(使用场景：个人中心-我的套餐)
export const getPackageOrderRecordsList = form =>
  base.post(`/Package/PackageOrderRecords/GetPackageOrderRecordsList`, form)
// 创建套餐订单的现金支付
export const createPackageCashPay = form =>
  base.post('/Package/PackageOrderPay/CreateCashPay', form)
/**
 ******************************************** 套餐订单相关接口 ********************************************
 */

/**
 ******************************************** 商品订单相关接口 ********************************************
 */
// 我的商品订单-(使用场景：我的)
export const getOrderList = form => base.post(`/Order/Order/GetOrderList`, form)
// 查看我的商品订单详情
export const getOrderDetail = id =>
  base.get(`/Order/Order/GetOrderDetail?order_id=${id}`)
// 查看我的订单的商品
export const getOrderGoodsDetail = id =>
  base.get(`/Order/Order/GetOrderGoodsDetail?details_id=${id}`)
// 创建商品订单-(使用场景：确认订单)
export const addOrder = form => base.post(`/Order/Order/AddOrder`, form)
// 创建积分商品订单
export const pointsaddOrder = form =>
  base.post(`/Order/Order/PointsAddOrder`, form)
// 创建扫码支付订单
export const sweepaddOrder = form =>
  base.post(`/User/SweepCodePay/CreateCashPay`, form)
// 删除订单
export const deleteOrder = form => base.post(`/Order/Order/DeleteOrder`, form)
// 取消订单
export const cancelOrder = form => base.post(`/Order/Order/CancelOrder`, form)
// 确认订单
export const confirmOrder = form => base.post(`/Order/Order/ConfirmOrder`, form)
// 查看我的订单商品的服务人员
export const getOrderEmployeeList = form =>
  base.post(`/Order/Order/GetOrderEmployeeList`, form)
// 获取订单中商家店铺的运费列表
export const getOrderFreightFeeList = form =>
  base.post(`/Order/Order/GetOrderFreightFeeList`, form)
// 获取积分商品订单中商家店铺的运费列表
export const getLevelOrderFreightFeeList = form =>
  base.post(`/Order/Order/GetLevelOrderFreightFeeList`, form)
// 获取订单中商家店铺的上门费列表
export const getOrderIndoorFeeList = form =>
  base.post(`/Order/Order/GetOrderIndoorFeeList`, form)
// 获取订单中商家店铺的上门费列表 积分商品
export const getLevelOrderIndoorFeeList = form =>
  base.post(`/Order/Order/GetLevelOrderIndoorFeeList`, form)
// 获取订单中商家店铺的可用快递公司列表
export const getOrderExpressList = form =>
  base.post(`/Order/Order/GetOrderExpressList`, form)
// 获取订单中商家店铺的可用快递公司列表 积分商品
export const getLevelOrderExpressList = form =>
  base.post(`/Order/Order/GetLevelOrderExpressList`, form)
// 获取订单商品中可以使用的预约时段列表
export const getOrderTimelotList = form =>
  base.post(`/Order/Order/GetOrderTimelotList`, form)
// 获取订单商品中可以使用的优惠券列表
export const getOrderCouponList = form =>
  base.post(`/Order/Order/GetOrderCouponList`, form)
// 获取订单商品中可以使用的套餐列表
export const getOrderPackageList = form =>
  base.post(`/Order/Order/GetOrderPackageList`, form)
/**
 ******************************************** 商品订单相关接口 ********************************************
 */

/**
 ******************************************** 商品售后相关接口 ********************************************
 */
// 提交售后申请
export const addRefund = form => base.post('/Order/Refund/SubmitRefund', form)
// 我的售后商品-(使用场景：我的)
export const getRefundList = form =>
  base.post(`/Order/Refund/GetRefundList`, form)
// 查看我的商品订单详情
export const getRefundDetail = id =>
  base.get(`/Order/Refund/GetRefundDetail?details_id=${id}`)
/**
 ******************************************** 商品售后相关接口 ********************************************
 */

/**
 ******************************************** 支付相关接口 ********************************************
 */
// 创建商品或套餐订单的现金支付
export const createGoodsCashPay = form =>
  base.post('/Order/OrderPay/CreateCashPay', form)
// 创建积分商品订单的现金支付
export const createPointsGoodsCashPay = form =>
  base.post('/Order/LevelOrderPay/CreateCashPay', form)
// 创建商品订单的套餐支付
export const createGoodsOtherPay = form =>
  base.post('/Order/OrderPay/CreateOtherPay', form)
// 创建扫码现金支付
export const createSweepCodePay = form =>
  base.post('/User/SweepCodePay/CreateCashPay', form)
/**
 ******************************************** 支付相关接口 ********************************************
 */

/**
 ******************************************** 微信授权相关接口 ********************************************
 */
// 获取微信静默授权url
export const getWxAuthorizeUrl = redirectUrl =>
  base.get(`/Wechat/GetWxAuthorizeUrl?redirect_url=${redirectUrl}`)
// 获取微信非静默授权url
export const getWxAuthorizeUserinfoUrl = redirectUrl =>
  base.get(`/Wechat/GetWxAuthorizeUserinfoUrl?redirect_url=${redirectUrl}`)
// 获取微信接口调用参数
export const getJsApiParams = url =>
  base.get(`/Wechat/GetJsApiParams?url=${url}`)
// 获取微信用户openid
export const getOpenId = code => base.get(`/Wechat/GetOpenId?code=${code}`)
/**
 ******************************************** 微信授权相关接口 ********************************************
 */

/**
 ******************************************** 浏览记录相关接口 ********************************************
 */
// 商品浏览历史记录
export const getBrowseList = (
  page = 1,
  rows = 10,
  sord = 'asc',
  sidx = 'create_time'
) =>
  base.get(
    `/Browse/BrowseLog/browseList?page=${page}&rows=${rows}&sord=${sord}&sidx=${sidx}`
  )
// 商品、套餐、店铺搜索历史记录
export const getKeywordsList = form =>
  base.post(`/Browse/SearchHistory/GetList`, form)
/**
 ******************************************** 浏览记录相关接口 ********************************************
 */

/**
 ******************************************** 内容相关接口 ********************************************
 */
// 获取内容频道的一级分类列表
export const getArticleCategoryList = (code = 'news', parentid = 0) =>
  base.get(
    `/Article/Article/GetArticleCategoryList?channel_code=${code}&parent_id=${parentid}`
  )
// 获取内容列表
export const getArticleList = form =>
  base.post('/Article/Article/GetArticleList', form)
// 获取指定数量的内容列表
export const getArticleTopList = top =>
  base.get(
    `/Article/Article/GetArticleTopList?top=${top}&channel_code=news&category_code=ctt`
  )
// 获取内容详情
export const getArticleDetail = id =>
  base.get(`/Article/Article/GetArticleDetail?article_id=${id}`)
// 获取内容详情
export const getArticleDetailByCode = code =>
  base.get(`/Article/Article/GetArticleDetailByCode?article_code=${code}`)
// 获取内容字段列表
export const getArticleFieldList = code =>
  base.get(`/Article/Article/GetArticleFieldList?channel_code=${code}`)
// 获取我的内容列表
export const getMyArticleList = form =>
  base.post('/Article/Article/GetMyArticleList', form)
// 添加内容-(使用场景：收货地址管理)
export const submitArticle = form =>
  base.post(`/Article/Article/SubmitArticle`, form)
// 删除收货地址-(使用场景：收货地址管理)
export const deleteArticle = id =>
  base.post('/Article/Article/DeleteArticle', `article_id=${id}`)
/**
 ******************************************** 内容相关接口 ********************************************
 */

/**
 ******************************************** 广告相关接口 ********************************************
 */
export const getAdTopList = (id, top) =>
  base.get(`/AD/AD/GetAdTopList?ap_id=${id}&top=${top}`)
/**
 ******************************************** 广告相关接口 ********************************************
 */

/**
 ******************************************** 优惠券相关接口 ********************************************
 */
// 车贴广告详情
export const getCarAdvDetail = id =>
  base.get(`/CarAdv/CarAdv/GetCarAdvDetail?adv_id=${id}`)
// 车贴广告列表
export const getCarAdvList = form =>
  base.post(`/CarAdv/CarAdv/GetCarAdvList`, form)
// 获取车贴广告相册图片-(使用场景：车贴广告详情)
export const getCarAdvImageList = id =>
  base.get(`/CarAdv/CarAdv/GetCarAdvImageList?adv_id=${id}`)
// 车贴广告商家列表
export const getCarAdvApplySellerList = form =>
  base.post(`/CarAdv/CarAdvSeller/GetCarAdvApplySellerList`, form)
// 车贴广告用户申请
export const getCarAdvApplyUserList = form =>
  base.post(`/CarAdv/CarAdvUser/GetCarAdvApplyUserList`, form)
// 车贴广告用户申请
export const submitCarAdvApply = form =>
  base.post(`/CarAdv/CarAdvUser/Submit`, form)
// 车贴广告申请详情
export const getCarAdvApplyUserDetail = id =>
  base.get(`/CarAdv/CarAdvUser/GetCarAdvApplyUserDetail?apply_user_id=${id}`)
// 删除车贴广告申请
export const deleteCarAdvApply = form =>
  base.post('/CarAdv/CarAdvUser/Delete', form)
// 退出车贴广告申请
export const exitCarAdvApply = form =>
  base.post('/CarAdv/CarAdvUser/Exit', form)
// 车贴广告图片发布
export const submitSuperviseRecord = form =>
  base.post(`/CarAdv/CarAdvUser/SubmitSuperviseRecord`, form)
// 车贴广告图片列表
export const getCarAdvApplyUserRecordList = form =>
  base.post(`/CarAdv/CarAdvUser/GetCarAdvApplyUserRecordList`, form)
/**
 ******************************************** 优惠券相关接口 ********************************************
 */

/**
 ******************************************** 高德地图相关接口 ********************************************
 */
export const AMapWebApiKey = '1b96245959c5e118c80f4e363833b345'
export const AMapJsApiKey = '4817e3646dbcb231982e852429e2020a'
export const AMapBase = axios.create({
  baseURL: 'https://restapi.amap.com/v3',
  headers: {}
})

/*
 * 高德地图相关请求
 */
export const getGeocode = (address, city) =>
  AMapBase.get(
    `/geocode/geo?key=${AMapWebApiKey}&address=${address}&city=${city}`
  )

export const getCity = location =>
  axios.get(
    `https://restapi.amap.com/v3/geocode/regeo?key=${AMapWebApiKey}&location=${location}`
  )
/**
 ******************************************** 高德地图相关接口 ********************************************
 */

/**
 ******************************************** 会员升级积分订单相关接口 ********************************************
 */
// 添加会员升级订单
export const addAccountLevelOrder = form =>
  base.post(`/AccountLevel/AccountLevel/AddOrder`, form)
// 会员升级支付接口
export const payAccountLevelOrder = form =>
  base.post(`/User/UserLevelPay/CreateCashPay`, form)
// 查询当前用户的上下级关系用户的手机号，来作用于判定用户输入邀请码时的验证。
export const GetUpAndDown = mobile =>
  base.get(`/user/user/GetUpAndDown?mobile=${mobile}`)
// 通过用户手机号查询用户信息，作用于获取用户的邀请码
export const GetEntityByMobile = mobile =>
  base.get(`/user/user/GetEntityByMobile?mobile=${mobile}`)
// 通过当前用户的上级邀请码查询上级用户信息，获取手机号（上级为用户）
export const GetEntityByUseryqm = yqm =>
  base.get(`/user/user/GetEntityByUseryqm?yqm=${yqm}`)
// 通过当前用户的上级邀请码查询上级用户信息，获取手机号（上级为商家）
export const GetEntityBySelleryqm = yqm =>
  base.get(`/user/user/GetEntityBySelleryqm?yqm=${yqm}`)
/**
 ******************************************** 会员升级积分订单相关接口 ********************************************
 */

/**
 ******************************************** 高级会员升级申请业务接口 ********************************************
 */
// 提交高级会员升级提交（联系人+联系电话）
export const submitUpgradeApplication = form =>
  base.post(`/AccountLevel/AccountLevel/AddUpgradeApplication`, form)
// 验证用户是否提交过高级会员升级申请
export const isUpgradeApplication = () =>
  base.get('/AccountLevel/AccountLevel/isUpgradeApplication')
// 上传高级会员升级的支付凭证
export const UpdataUpgradeApplication = form =>
  base.post(`/AccountLevel/AccountLevel/UpdataUpgradeApplication`, form)
// 获取用户当前用户会员等级
export const GetUserLevelAccount = userid =>
  base.post(`/User/User/GetUserLevelAccount?userid=${userid}`)
/**
 ******************************************** 高级会员升级申请业务接口 ********************************************
 */

/**
 ******************************************** 后台管理财务接口 ********************************************
 */

// 获取商家每月营业额列表
export const getYMList = id =>
  base.get(`/api/Finance/GetYMList?seller_id=${id}`)
// 获取商家每年营业额列表
export const getYList = (id, year) =>
  base.get(`/api/Finance/GetYList?seller_id=${id}&year=${year}`)
// 获取结算清单
export const FetchFinancialList = (id, page, rows, status) =>
  base.post(
    `/api/Finance/FinancialList?seller_id=${id}&page=${page}&rows=${rows}&settlement_status=${status}&settlement_source_type=-1`
  )

// 获取结算清单
export const FetchFinancialListByTime = (id, page, rows, status) =>
  base.post(
    `/api/Finance/FinancialList?seller_id=${id}&page=${page}&rows=${rows}&settlement_status=${status}&settlement_source_type=-1`
  )
/**
店铺信息
 */
// 获取店铺信息
export const getSellerInfo = id =>
  base.get(`/api/SellerInfo/GetSellerInfo?user_id=${id}`)
// 修改店铺信息
export const updateSellerInfo = form =>
  base.post('/api/SellerInfo/UpdateSellerInfo', form)
// 获取商家等级列表
export const getSellerLevelList = id =>
  base.get(`/api/SellerInfo/GetSellerLevelList`)
// 创建支付
export const createCashPay = (price, sellerId, levelId) =>
  base.post(
    `/api/SellerInfo/CreateCashPay?price=${price}&seller_id=${sellerId}&levelId=${levelId}`
  )
/**
订单
 */
// 我的商品订单
export const GetOrderList = (id, page, rows, status) =>
  base.post(
    `/api/Order/GetOrderList?userId=${id}&page=${page}&rows=${rows}&status=${status}`
  )
// 获取订单详情
export const GetOrderDetail = orderId =>
  base.post(`/api/Order/GetOrderDetail?order_id=${orderId}`)
/**
返利
 */

// 获取用户返利信息列表
export const getRebateInfo = userId =>
  base.get(`api/RebateInfo/GetRebateInfo?user_id=${userId}`)
// 获取返利提现账户列表
export const GetPayMentaListGET = (userId, type) =>
  base.get(`api/RebateInfo/GetPayMentaList?user_id=${userId}&usertype=${type}`)
// 添加体现账号接口
export const submitPaymentAccount = (entity, userId) => {
  base.post(
    `api/RebateInfo/SubmitPaymentAccount?entity=${entity}&user_id=${userId}`
  )
}
// 获取用户提现记录
export const GetList = (userId, isputforward) =>
  base.get(
    `/api/RebateInfo/GetList?userid=${userId}&is_putforward=${isputforward}`
  )

/**
发布商品
 */
// 分页获取商品列表
export const GetGoodsList = (page, row, keyword, sellerId, auditStatus) =>
  base.post(
    `/api/Goods/GetGridJson?page=${page}&row=${row}&keyword=${keyword}&seller_id=${sellerId}&audit_status=${auditStatus} }`
  )
// 获取商品分类列表
export const getGoodsCategoryList = () =>
  base.get(`/api/Goods/GetGoodsCategoryList`)
// 获取商品分类列表
export const getGoodsBrandList = categoryId =>
  base.post(`/api/Goods/GetGoodsBrandList?category_id=${categoryId}`)
// 获取商品
export const getFormJson = goodsID =>
  base.post(`/api/Goods/GetFormJson?goodsID=${goodsID}`)
// 发布商品
export const submitForm = (goodsEntity, keyValue, sellerId, userId) =>
  base.post(
    `/api/Goods/SubmitForm?goodsEntity=${goodsEntity}&keyValue=${keyValue}&sellerId=${sellerId}&userId=${userId}`
  )
// 删除商品
export const delectForm = keyValue =>
  base.post(`/api/Goods/DelectForm?keyValue=${keyValue}`)

/**
订单
 */
// 获取用户提现记录
// export const GetList = (userId, isputforward) =>
//   base.get(`/api/RebateInfo/GetList?userid=${userId}&is_putforward=${isputforward}`)
// 获取订单详情
// export const GetOrderDetail = (orderId) =>
//   base.post(`/api/Order/GetOrderDetail?order_id=${orderId}`)
/**
套餐
 */
// 获取商家或联营列表接口
export const GetSellerPackageList = (
  page,
  rows,
  keyword,
  sellerId,
  packageType,
  auditStatus,
  consumptionTypes
) =>
  base.post(
    `/api/SellerPackage/GetGridJson?page=${page}&rows=${rows}&keyword=${keyword}&seller_id=${sellerId}&package_type=${packageType}&audit_status=${auditStatus}&consumption_types=${consumptionTypes}`
  )

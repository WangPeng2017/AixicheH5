'use strict'
// 我的、设置
const my = () => import('@views/user')
const mySetting = () => import('@views/user/setting')
const myComplaints = () => import('@views/user/setting/complaints')
const myrelategreement = () => import('@views/user/setting/relategreement')
const myUpdate = () => import('@views/user/update')
const mymember = () => import('@views/user/member')
const mycheckmem = () => import('@views/user/member/checkmem')
const myhighmember = () => import('@views/user/member/Highmember')
// 积分详情
const myjifenpage = () => import('@views/user/jifenpage')
// 返现详情
const mybackpricepage = () => import('@views/user/backpricepage')
const myquickpay = () => import('@views/user/quickpay')
const paySuccess = () => import('@views/user/paySuccess')
const paycamera = () => import('@views/user/quickpay/camera')
const myinvite = () => import('@views/user/invite')
const myrecivemoney = () => import('@views/user/quickpay/recivemoney')
// 提现页面
const myimmediately = () => import('@views/user/backpricepage/immediately')
const myaddweixinuser = () => import('@views/user/backpricepage/addweixinuser')
const myaddCard = () => import('@views/user/backpricepage/addCard')
const myrecord = () => import('@views/user/backpricepage/record')
const myWithdrawalsuccess = () => import('@views/user/backpricepage/Withdrawalsuccess')
// 收藏、关注、历史记录
const myCollectionGoods = () => import('@views/user/collection/goods')
const myCollectionPackage = () => import('@views/user/collection/package')
const myCollectionSeller = () => import('@views/user/collection/seller')
const myHistory = () => import('@views/user/history')
// 卡券
const myCoupon = () => import('@views/user/coupon')
const myPackage = () => import('@views/user/package')
const myPackageUseLog = () => import('@views/user/package/useLog')
// 评论
const myEvaluate = () => import('@views/user/evaluate')
const myEvaluateForm = () => import('@views/user/evaluate/form')
const myEvaluateDetail = () => import('@views/user/evaluate/detail')
// 订单
const myOrder = () => import('@views/user/order')
const myOrderDetail = () => import('@views/user/order/detail')
// 售后
const myRefund = () => import('@views/user/refund')
const myRefundDetail = () => import('@views/user/refund/detail')
const myRefundForm = () => import('@views/user/refund/form')
// 收货地址
const myAddress = () => import('@views/user/address')
const myAddressForm = () => import('@views/user/address/form')
// 我的爱车
const myCar = () => import('@views/user/car')
const myCarForm = () => import('@views/user/car/form')
// 求职
const myJob = () => import('@views/user/job')
const myJobForm = () => import('@views/user/job/form')
// 租车
const myRentcar = () => import('@views/user/rentcar')
const myRentcarForm = () => import('@views/user/rentcar/form')
// 二手车
const myUsedcar = () => import('@views/user/usedcar')
const myUsedcarForm = () => import('@views/user/usedcar/form')
// 转让
const myTransfer = () => import('@views/user/transfer')
const myTransferForm = () => import('@views/user/transfer/form')
export default [
  {
    path: '/my',
    component: my,
    meta: {
      title: '我的'
    }
  }, {
    path: '/mySetting',
    component: mySetting,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myComplaints',
    component: myComplaints,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myrelategreement',
    component: myrelategreement,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myUpdate',
    component: myUpdate,
    meta: {
      isLogin: true
    }
  }, {
    path: '/mymember',
    component: mymember,
    meta: {
      isLogin: true
    }
  }, {
    path: '/mycheckmem',
    component: mycheckmem,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myhighmember',
    component: myhighmember,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myjifenpage',
    component: myjifenpage,
    meta: {
      isLogin: true
    }
  }, {
    path: '/mybackpricepage',
    component: mybackpricepage,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myquickpay',
    component: myquickpay,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myrecivemoney',
    component: myrecivemoney,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myimmediately',
    component: myimmediately,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myaddCard',
    component: myaddCard,
    meta: {
      title: '提现'
    }
  }, {
    path: '/myaddweixinuser',
    component: myaddweixinuser,
    meta: {
      title: '提现'
    }
  }, {
    path: '/myrecord',
    component: myrecord,
    meta: {
      title: '提现记录'
    }
  }, {
    path: '/myWithdrawalsuccess/:price/:charge/:actual',
    component: myWithdrawalsuccess,
    meta: {
      title: '提现成功'
    }
  }, {
    path: '/paySuccess/:id/:price',
    component: paySuccess,
    meta: {
      title: '支付成功'
    }
  }, {
    path: '/paycamera',
    component: paycamera,
    meta: {
      title: '扫描付款码'
    }
  }, {
    path: '/myinvite',
    component: myinvite,
    meta: {
      title: '邀请'
    }
  }, {
    path: '/myCollectionGoods',
    component: myCollectionGoods,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myCollectionPackage',
    component: myCollectionPackage,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myCollectionSeller',
    component: myCollectionSeller,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myHistory',
    component: myHistory,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myCoupon',
    component: myCoupon,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myPackage',
    component: myPackage,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myPackageUseLog/:id',
    component: myPackageUseLog,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myAddress',
    component: myAddress,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myAddressForm/:id?',
    component: myAddressForm,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myCar',
    component: myCar,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myCarForm/:id?',
    component: myCarForm,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myRefundAdd/:id',
    component: myRefundForm,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myRefund',
    component: myRefund,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myRefundDetail/:id',
    component: myRefundDetail,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myEvaluateDetail/:id',
    component: myEvaluateDetail,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myEvaluate',
    component: myEvaluate,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myEvaluateAdd/:id',
    component: myEvaluateForm,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myOrder',
    component: myOrder,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myOrderDetail/:id',
    component: myOrderDetail,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myJob',
    component: myJob,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myJobForm/:id?',
    component: myJobForm,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myRentcar',
    component: myRentcar,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myRentcarForm/:id?',
    component: myRentcarForm,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myUsedcar',
    component: myUsedcar,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myUsedcarForm/:id?',
    component: myUsedcarForm,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myTransfer',
    component: myTransfer,
    meta: {
      isLogin: true
    }
  }, {
    path: '/myTransferForm/:id?',
    component: myTransferForm,
    meta: {
      isLogin: true
    }
  }
]

let Routers = [
  {
    path: '/main',
    name: 'main',
    component: () => import('Views/backstage/Main')
  }
]

const publishGoods = [
  {
    path: '/main/publishgoods',
    name: 'publishGoods',
    component: () => import('Views/backstage/publishGoods/publishGoods')
  },
  {
    path: '/main/publishgoods/chooseClassify1',
    name: 'chooseClassify1',
    component: () => import('Views/backstage/publishGoods/chooseClassify1')
  },
  {
    path: '/main/publishgoods/chooseClassify1/chooseClassify2',
    name: 'chooseClassify2',
    component: () => import('Views/backstage/publishGoods/chooseClassify2')
  },
  {
    path: '/main/publishgoods/chooseClassify1/chooseClassify2/chooseClassify3',
    name: 'chooseClassify3',
    component: () => import('Views/backstage/publishGoods/chooseClassify3')
  },
  {
    path:
      '/main/publishgoods/chooseClassify1/chooseClassify2/chooseClassify3/addGoods',
    name: 'addGoods',
    component: () => import('Views/backstage/publishGoods/addGoods')
  },
  {
    path:
      '/main/publishgoods/chooseClassify1/chooseClassify2/chooseClassify3/addGoods/goodsDetail',
    name: 'goodsDetail',
    component: () => import('Views/backstage/publishGoods/goodsDetail')
  }
]

const inform = [
  {
    path: '/main/inform',
    name: 'inform',
    component: () => import('Views/backstage/inform/inform')
  },
  {
    path: '/main/inform/detail',
    name: 'informDetail',
    component: () => import('Views/backstage/inform/informDetail')
  }
]

const order = [
  {
    path: '/main/order',
    name: 'order',
    component: () => import('Views/backstage/order/order')
  },
  {
    path: '/main/order/detail1',
    name: 'orderDetail1',
    component: () => import('Views/backstage/order/orderDetail1')
  },
  {
    path: '/main/order/detail2',
    name: 'orderDetail2',
    component: () => import('Views/backstage/order/orderDetail2')
  }
]

const rebate = [
  {
    path: '/main/rebate',
    name: 'rebate',
    component: () => import('Views/backstage/rebate/rebate')
  },
  {
    path: '/main/rebate/flList',
    name: 'flList',
    component: () => import('Views/backstage/rebate/flList')
  },
  {
    path: '/main/rebate/flList/flDetail',
    name: 'flDetail',
    component: () => import('Views/backstage/rebate/flDetail')
  },
  {
    path: '/main/rebate/getMoney',
    name: 'getMoney',
    component: () => import('Views/backstage/rebate/getMoney')
  },
  {
    path: '/main/rebate/getMoney/txList',
    name: 'txList',
    component: () => import('Views/backstage/rebate/txList')
  },
  {
    path: '/main/rebate/getMoney/addWXAccount',
    name: 'addWXAccount',
    component: () => import('Views/backstage/rebate/addWXAccount')
  },
  {
    path: '/main/rebate/getMoney/addBankAccount',
    name: 'addBankAccount',
    component: () => import('Views/backstage/rebate/addBankAccount')
  },
  {
    path: '/main/rebate/getMoney/getMoneySuccess',
    name: 'getMoneySuccess',
    component: () => import('Views/backstage/rebate/getMoneySuccess')
  }
]

const erweima = [
  {
    path: '/main/erweima',
    name: 'erweima',
    component: () => import('Views/backstage/erweima/erweima')
  }
]

const publishJob = [
  {
    path: '/main/publishJob',
    name: 'publishJob',
    component: () => import('Views/backstage/publishJob/publishJob')
  },
  {
    path: '/main/publishJob/addJobCondition',
    name: 'addJobCondition',
    component: () => import('Views/backstage/publishJob/addJobCondition')
  },
  {
    path: '/main/publishJob/addJobCondition/addJobMsg',
    name: 'addJobMsg',
    component: () => import('Views/backstage/publishJob/addJobMsg')
  },
  {
    path: '/main/publishJob/addJobCondition/addJobMsg/jobDetail',
    name: 'jobDetail',
    component: () => import('Views/backstage/publishJob/jobDetail')
  }
]

const combo = [
  {
    path: '/main/combo',
    name: 'combo',
    component: () => import('Views/backstage/combo/combo')
  },
  {
    path: '/main/combo/comboSJ',
    name: 'comboSJ',
    component: () => import('Views/backstage/combo/comboSJ')
  },
  {
    path: '/main/combo/comboSJ/addSJCard',
    name: 'addSJCard',
    component: () => import('Views/backstage/combo/addSJCard')
  },
  {
    path: '/main/combo/comboSJ/addSJCard/addGoodsFWCard',
    name: 'addGoodsFWCard',
    component: () => import('Views/backstage/combo/addGoodsFWCard')
  },
  {
    path: '/main/combo/comboSJ/addSJCard/addGoodsFWCard/sureSJCardDetail',
    name: 'sureSJCardDetail',
    component: () => import('Views/backstage/combo/sureSJCardDetail')
  },
  {
    path: '/main/combo/publishFWCard',
    name: 'publishFWCard',
    component: () => import('Views/backstage/combo/publishFWCard')
  },
  {
    path: '/main/combo/publishFWCard/ffList',
    name: 'ffList',
    component: () => import('Views/backstage/combo/ffList')
  },
  {
    path: '/main/combo/publishFWCard/hyList',
    name: 'hyList',
    component: () => import('Views/backstage/combo/hyList')
  },
  {
    path: '/main/combo/publishFWCard/ffList/comboDetail',
    name: 'comboDetail',
    component: () => import('Views/backstage/combo/comboDetail')
  },
  {
    path: '/main/combo/publishFWCard/publishFWDetail',
    name: 'publishFWDetail',
    component: () => import('Views/backstage/combo/publishFWDetail')
  },
  {
    path: '/main/combo/comboSJ/addSJCard/addGoodsGWCard',
    name: 'addGoodsGWCard',
    component: () => import('Views/backstage/combo/addGoodsGWCard')
  },
  {
    path: '/main/combo/publishGWCard',
    name: 'publishGWCard',
    component: () => import('Views/backstage/combo/publishGWCard')
  }
]

const comboLY = [
  {
    path: '/main/combo/comboLY',
    name: 'comboLY',
    component: () => import('Views/backstage/combo/comboLY')
  },
  {
    path: '/main/combo/comboLY/joinGWCard',
    name: 'joinGWCard',
    component: () => import('Views/backstage/combo/joinGWCard')
  },
  {
    path: '/main/combo/comboLY/joinFWCard',
    name: 'joinFWCard',
    component: () => import('Views/backstage/combo/joinFWCard')
  },
  {
    path: '/main/combo/comboLY/joinFWCard/addGoodsLYGWCard',
    name: 'addGoodsLYGWCard',
    component: () => import('Views/backstage/combo/addGoodsLYGWCard')
  },
  {
    path: '/main/combo/comboLY/joinFWCard/addGoodsLYGWCard/sureLYCardDetail',
    name: 'sureLYCardDetail',
    component: () => import('Views/backstage/combo/sureLYCardDetail')
  }
]

const finance = [
  {
    path: '/main/finance',
    name: 'finance',
    component: () => import('Views/backstage/finance/finance')
  },
  {
    path: '/main/finance/zdDetail',
    name: 'zdDetail',
    component: () => import('Views/backstage/finance/zdDetail')
  },
  {
    path: '/main/finance/jsDetail',
    name: 'jsDetail',
    component: () => import('Views/backstage/finance/jsDetail')
  }
]

const shop = [
  {
    path: '/main/shop',
    name: 'shop',
    component: () => import('Views/backstage/shop/shop')
  },
  {
    path: '/main/shop/updMSG',
    name: 'updMSG',
    component: () => import('Views/backstage/shop/updMSG')
  },
  {
    path: '/main/shop/upLevel',
    name: 'upLevel',
    component: () => import('Views/backstage/shop/upLevel')
  },
  {
    path: '/main/shop/upLevel/sure',
    name: 'sure',
    component: () => import('Views/backstage/shop/sure')
  },
  {
    path: '/main/shop/upLevel/sure/paySuccess',
    name: 'paySuccess',
    component: () => import('Views/backstage/shop/paySuccess')
  }
]

const offlinePay = [
  {
    path: '/main/offlinePay',
    name: 'offlinePay',
    component: () => import('Views/backstage/offlinePay/offlinePay')
  }
]

export default [
  ...Routers,
  ...publishGoods,
  ...inform,
  ...order,
  ...rebate,
  ...finance,
  ...erweima,
  ...publishJob,
  ...combo,
  ...comboLY,
  ...shop,
  ...offlinePay
]

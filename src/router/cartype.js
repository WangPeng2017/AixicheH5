'use strict'

import listForBrand from '@views/cartype/list'
import listForSeries from '@views/cartype/listForSeries'
import listForSpec from '@views/cartype/listForSpec'

export default [
  {
    path: '/cartypeListForBrand',
    component: listForBrand,
    meta: {
      title: '品牌'
    }
  }, {
    path: '/cartypeListForSeries/:pid/:pname',
    component: listForSeries,
    meta: {
      title: '车系'
    }
  }, {
    path: '/cartypeListForSpec/:pid/:pname',
    component: listForSpec,
    meta: {
      title: '车型'
    }
  }
]

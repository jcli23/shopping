import Vue from 'vue'
import VueRouter from 'vue-router'
import my_order from '../views/my_order/My_order.vue'
import address from '../views/address/Address.vue'
import evaluate from '../views/evaluate/Evaluate.vue'
import evaluationdetails from '../views/evaluationdetails/Evaluationdetails.vue'
import addressEdit from '../views/addressEdit/AddressEdit.vue'
import commodity_details from '../views/commodity_details/Commodity_details.vue'
import evaluation_center from '../views/evaluation_center/Evaluation_center.vue'
import location from '../views/location/Location.vue'
import login_registration from '../views/login_registration/Login_registration.vue'
import merchandise_collection from '../views/merchandise_collection/Merchandise_collection.vue'
import order_settlement from '../views/order_settlement/Order_settlement.vue'
import personal_data from '../views/personal_data/Personal_data.vue'
import recently_browse from '../views/recently_browse/Recently_browse.vue'
import bottom from '../views/bottom/Bottom.vue'
import collection from '../views/collection/Collection.vue'

// import mall from '../views/bottom/mall/Mall.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/mall"
  },
  {
    path:'/',
    name:'bottom',
    component:bottom,
  },
  {
    path:'/commodity_details',
    name:'commodity_details',
    component:commodity_details,
  },
  {
    path:'/my_order',
    name:'my_order',
    component:my_order,
  },
  {
    path:'/personal_data',
    name:'personal_data',
    component:personal_data,
  },
  {
    path:'/order_settlement',
    name:'order_settlement',
    component:order_settlement,
  },
  {
    path:'/evaluationdetails',
    name:'evaluationdetails',
    component:evaluationdetails,
  },
  {
    path:'/evaluation_center',
    name:'evaluation_center',
    component:evaluation_center,

  },
  {
    path:'/recently_browse',
    name:'recently_browse',
    component:recently_browse,
  },
  {
    path:'/location',
    name:'location',
    component:location,
  },
  {
    path:'/merchandise_collection',
    name:'merchandise_collection',
    component:merchandise_collection,
  },
  {
    path:'/login_registration',
    name:'login_registration',
    component:login_registration,
  },
  {
    path:'/evaluate',
    name:'evaluate',
    component:evaluate,
  },
  {
    path:'/address',
    name:'address',
    component:address,
  },
  {
    path:'/addressEdit',
    name:'addressEdit',
    component:addressEdit,
  },
  {
    path:'/collection',
    name:'collection',
    component:collection,
  },
  {
    path:'/bottom',
    name:'bottom',
    component:bottom,
  },
  {
    path:'/mall',
    component:bottom,
    children:[
      {
        path:"",
        name:"mall",
        component:()=>import('../views/bottom/mall/Mall.vue'),
      }
    ]
  },
  {
    path:'/classification',
    component:bottom,
    children:[
      {
        path:"",
        name:"classification",
        component:()=>import('../views/bottom/classification/Classification.vue'),
      }
    ]
  },
  {
    path:'/shopping_cart',
    component:bottom,
    children:[
      {
        path:"",
        name:"shopping_cart",
        component:()=>import('../views/bottom/shopping_cart/Shopping_cart.vue'),
      }
    ]
  },
  {
    path:'/my',
    component:bottom,
    children:[
      {
        path:"",
        name:"my",
        component:()=>import('../views/bottom/my/My.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to)=>{
//   document.title=to.meta.title
// });

export default router

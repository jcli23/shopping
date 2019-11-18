<template>
  <div>
    <div class="top">购物车</div>
    <div v-if="user">
      <div v-if="data.length!==0">
        <div class="order">
          <div class="choose">
            <div @click="chooseAll">       <!--全选和取消全选 -->
              <div v-if="checkedAll===false" class="checkbox">
                <img src="../../../../public/images/box.png" alt="">
                <div>全选</div>
              </div>
              <div v-else class="checkbox">
                <img src="../../../../public/images/boxchoose.png" alt="" >
                <div>取消全选</div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="total">
              <div>合计:</div>            <!--结算总和 -->
              <div class="price">￥{{total.toFixed(1)}} </div>
            </div>
            <div class="title">请确认订单</div>
          </div>
        </div>
        <div class="next">
          <van-button type="danger" class="button1" @click="del">删除</van-button>
          <van-button type="warning" class="button2" @click="Settlement">去结算</van-button>
        </div>
        <div v-for="(item,index) in data" :key="index" class="commodity">
          <div class="choose">
            <div @click="choose(item,item.cid)">     <!--未勾选和已勾选图标不同 -->
              <div v-if="item.check===false" class="checkbox">
                <img src="../../../../public/images/box.png" alt="">
              </div>
              <div v-else class="checkbox">
                <img src="../../../../public/images/boxchoose.png" alt="" >
              </div>
            </div>
          </div>
          <div class="img">                 <!--需要结算的商品信息 -->
            <img :src=item.image_path alt="">
          </div>
          <div class="right">
            <div class="name">{{item.name}}</div>
            <div class="bottom">
              <div class="price">￥{{(item.present_price*item.count).toFixed(1)}}</div>
              <div class="icon">
                <div>
                  <img src="../../../../public/images/reduce.png" alt="" @click="reduce(item)">
                </div>
                <div>{{item.count}}</div>
                <div>
                  <img src="../../../../public/images/add.png" alt="" @click="add(item)">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="blank"></div>
      </div>
      <div v-else class="shoppingnone">           <!--购物车为空时，显示购物车没有商品 -->
        <div class="cart">
          <div class="cart_box">
            <img src="../../../../public/images/cartred.png" alt="">
          </div>
        </div>
        <div class="text">你的购物车还是空空的哦</div>
        <van-button round type="default" class="button" @click="goto">去购物</van-button>
      </div>
    </div>
    <div v-else class="loginout">                <!--未登录时的界面 -->
      <div class="Slogan">请~你还没有登录噢~</div>
      <van-button round type="info" class="button" @click="gologin">立即登录</van-button>
    </div>
  </div>
  
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "Shopping_cart",
    components: {},
    props: {},
    data() {
      return {
        id: "",               //商品ID
        data:[],              //接收加入过购物车的商品所有信息
        user:null,            //用来定义用户信息
        checkedAll: false,     //全选开关
        checked:false,         //单选开关
        cid:[],                //装勾选过得序列号
        checkeddata:[]         //装勾选的商品
      }
    },
    methods: {
      async getCard(){                //获取购物车信息
        try {
          let res=await this.$api.getCard();
          this.data=res.shopList
          console.log(this.data);
        }catch (e) {
          console.log(e);
        }
      },
      goto(){
        this.$router.push('/mall')     //购物车无商品，跳转商城页面
      },
      async reduce(item){
        item.count-=1                       //提交上传
        try {
          let res=await this.$api.editCart(
              item.count,
              item._id,
              item.present_price
          );
          if(res.code===200){
            Toast('商品数减少');
          }
        }catch (e) {
          console.log(e);
        }
      },
      async del(){                              //删除购物车的商品
        try {
          let res=await this.$api.deleteShop(this.cid);
          if(res.code===200){
            Toast('删除成功');
            this.getCard()
          }
        }catch (e) {
          console.log(e);
        }
      },
      Settlement(){                      //跳转订单结算，并把选择结算的商品数据传过去
        this.data.map(item=>{
          if(item.check){
            this.checkeddata.push(item)
          }

        })
        this.$router.push({name:'order_settlement',query:{checkeddata:this.checkeddata}})
      },
      async add(item){                  //添加购买数量
        item.count+=1
        try {
          let res=await this.$api.editCart(
              item.count,
              item._id,
              item.present_price
          );
          if(res.code===200){
            Toast('商品数增加');
          }
        }catch (e) {
          console.log(e);
        }
      },
      chooseAll(){                          //全选按钮相应的操作
        this.checkedAll=!this.checkedAll
        if(this.checkedAll===false){
          this.cid=[]
          this.checked=false
        }else {
          this.checked=true
        }
        this.data.map(item=>{
          item.check=this.checkedAll
          if (item.check){
            this.cid.push(item.cid)
          }
        })
      },
      choose(item,id){                      //单选按钮的相应操作
        item.check=!item.check
        if(item.check){
          this.checked=true
          this.cid.push(item.cid)
        }else{
          this.cid=this.cid.filter(cid=>{
            return cid !==id
          })
        }
        this.checkedAll=this.data.every(item=>{
          return item.check===true
        })
        this.checked=!this.data.every(item=>{
          return item.check===false
        })
      },
      gologin(){                                       //未登录时跳转登录
        this.$router.push("/login_registration")
      }
    },
    mounted() {
      this.getCard()
      this.user = JSON.parse(localStorage.user)
    },
    created() {

    },
    filters: {},
    computed: {
      total () {
       let total=0;                     //计算总价
       this.data.map(item=>{
          if(item.check){
            total+=(item.present_price*item.count)
          }
       });
       return total;
      }
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .top{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #f2f2f2;
    font-size: 16px;
    display: flex;
    z-index: 2001;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: white;
    top: 0;
  }
  .shoppingnone{
    margin-top: 100px;
    .cart{
      width: 100%;
      height: 150px;
      line-height: 150px;
      display: flex;
      justify-content: center;
      .cart_box{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .text{
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
    .button{
      width: 40%;
      margin-left: 30%;
      margin-top: 20px;
    }
  }
  .loginout{
    width: 100%;
    .Slogan{
      font-size: 16px;
      width: 100%;
      color: #666666;
      text-align: center;
      margin: 100px 0 40px 0;
    }
    .button{
      width: 70%;
      margin-left: 15%;
    }
  }
  .order{
    width: 100%;
    height: 60px;
    top: 40px;
    background: white;
    z-index: 2000;
    display: flex;
    position: fixed;
    border-bottom: 1px solid #f2f2f2;
    .choose{
      width: 57%;
      margin-left: 3%;
      height: 20px;
      margin-top: 20px;
      .checkbox{
        display: flex;
        align-items: center;
        img{
          width: 20px;
          height: 20px;
        }
      }
    }
    .right{
      width: 37%;
      height: 60px;
      .total{
        height: 30px;
        line-height: 30px;
        display: flex;
        .price{
          color: red;
        }
      }
      .title{
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .next{
    width: 100%;
    display: flex;
    height: 55px;
    margin-top: 100px;
    .button1{
      width: 100px;
      margin-left: 40%;
      margin-top: 5px;
    }
    .button2{
      width: 100px;
      margin-left: 3%;
      margin-top: 5px;
    }
  }
  .commodity{
    width: 100%;
    height: 120px;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    align-items: center;
    .choose{
      width: 7%;
      margin-left: 3%;
      .checkbox{
        display: flex;
        align-items: center;
        img{
          width: 20px;
          height: 20px;
        }
      }
    }
    .img{
      width: 90px;
      height: 90px;
      margin-left: 10px;
      img{
        width: 90px;
        height: 90px;
        border: 1px solid #f2f2f2;
      }
    }
    .right{
      width: 55%;
      height: 90px;
      margin-left: 20px;
      .name{
        color: red;
        height: 45px;

      }
    }
    .bottom{
      display: flex;
      height: 45px;
      align-items: center;
      .price{
        color: red;
        width: 100px;
      }
      .icon{
        display: flex;
        align-items: center;
        width: 200px;
        justify-content: space-around;
        img{
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .blank{
    height: 100px;
  }
</style>

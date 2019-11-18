<template>
  <div class="main">
    <div class="top">
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">订单结算</div>
    </div>
    <div class="address">
      <div v-if="addresschoose===undefined && defaultAdd !==null">
        <div  class="title">
          <div class="left">
            <img src="../../../public/images/addressicon.png" alt="">
          </div>
          <div class="center">
            <div class="top2">
              <div>收货人:{{defaultAdd.name}}</div>
              <div>{{defaultAdd.tel}}</div>
            </div>
            <div class="center2">收货地址:{{defaultAdd.address}}</div>
            <div class="bottom">(收货不便时，可选择免费待收货服务)</div>
          </div>
          <div class="right" @click="add('/address')">
            <img src="../../../public/images/jiantou_right.png" alt="">
          </div>
        </div>
      </div>
      <div v-else-if="addresschoose!==undefined && defaultAdd !==null">
        <div  class="title">
          <div class="left">
            <img src="../../../public/images/addressicon.png" alt="">
          </div>
          <div class="center">
            <div class="top2">
              <div>收货人:{{addresschoose.name}}</div>
              <div>{{addresschoose.tel}}</div>
            </div>
            <div class="center2">收货地址:{{addresschoose.address}}</div>
            <div class="bottom">(收货不便时，可选择免费待收货服务)</div>
          </div>
          <div class="right" @click="addto(addresschoose.id)">
            <img src="../../../public/images/jiantou_right.png" alt="">
          </div>
        </div>
      </div>
      <div v-else-if="addresschoose!==undefined && defaultAdd===null">
        <div  class="title">
          <div class="left">
            <img src="../../../public/images/addressicon.png" alt="">
          </div>
          <div class="center">
            <div class="top2">
              <div>收货人:{{addresschoose.name}}</div>
              <div>{{addresschoose.tel}}</div>
            </div>
            <div class="center2">收货地址:{{addresschoose.address}}</div>
            <div class="bottom">(收货不便时，可选择免费待收货服务)</div>
          </div>
          <div class="right" @click="addto(addresschoose.id)">
            <img src="../../../public/images/jiantou_right.png" alt="">
          </div>
        </div>
      </div>
      <div v-else>
        <div class="add_address" @click="add('/address')">点击添加收货地址</div>
      </div>
    </div>
    <div class="img">
      <img src="../../../public/images/caitiao.jpg" alt="">
    </div>
    <div class="cart">
      <div ></div>
      <div v-for="(item,index) in checkeddata" :key="index">
        <div class="box">
          <div class="mallbox">
            <div class="img2">
              <img :src=item.image_path alt="">
            </div>
            <div class="right">
              <div class="name">{{item.name}}</div>
              <div class="next">
                <div class="price">￥{{item.present_price}}</div>
                <div class="count">x{{item.count}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <van-submit-bar
            :price=total*100
            button-text="提交订单"
            @submit="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "Order_settlement",
    components: {},
    props: {},
    data() {
      return {
        user:null,
        active: 1,
        checkeddata:[],      //选择结算的
        addresschoose:{},    //地址选择
        defaultAdd:{},         //添加默认地址
        total:0,
        count: 0,            //家购买数量
        id:[],
        idDirect: false
      }
    },
    methods: {
      back(){
        this.$router.push('/shopping_cart')
      },
      add(path) {                    //添加地址，跳转地址页面
        this.$router.push(path);
      },
      addto(id) {
        this.$router.push({ name: "address", query: { id: id } });
      },
      async onSubmit(){              //结算
        try {
          let res=await this.$api.placeOrder({
            address: this.defaultAdd.address,
            tel: this.defaultAdd.tel,
            orderId: this.id,
            totalPrice: this.total,
            count: this.count,
            idDirect: this.idDirect
          });
          if(res.code===200){
            Toast(res.msg);
          }
        }catch (e) {
          console.log(e);
        }
      },
      async getDefaultAddress(){         //获取默认地址
        try {
          let res=await this.$api.getDefaultAddress();
          this.defaultAdd=res.defaultAdd
          // console.log(this.defaultAdd,5);
        }catch (e) {
          console.log(e);
        }
      },
    },
    mounted() {
      this.getDefaultAddress()
      this.addresschoose=this.$route.query.addresschoose     //选择的地址
      // console.log(this.addresschoose,3);
      this.checkeddata=this.$route.query.checkeddata        //选择的商品
      console.log(this.checkeddata,4);
      this.checkeddata.map(item=>{
        if(item.idDirect){
          this.idDirect =true
          this.total+=(item.present_price*item.count)
          // console.log(this.total);
          this.count += item.count;
          console.log(this.count,1);
          this.id.push(item.id);
          console.log(this.id,2);
        }else{
          this.total+=(item.present_price*item.count)      //计算总价
          // console.log(this.total);
          this.count += item.count;
          console.log(this.count,1);
        }
      });
      this.checkeddata.map(item => {
        this.id.push(item.cid);
      });
    },
    created() {

    },
    filters: {},
    computed: {
      userInfo(){
        return this.$store.state.userInfo
      },
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .top{
    width: 100%;
    height: 40px;
    background: white;
    display: flex;
    top: 0;
    z-index: 2000;
    border-bottom: 1px solid #f2f2f2;
    position: fixed;
    .icon{
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .title{
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      margin-left: 30%;
    }
  }
  .address{
    width: 100%;
    height: 130px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .add_address{
      width: 200px;
      height: 50px;
      line-height: 50px;
      color: #666666;
      text-align: center;
    }
    .title{
      width: 390px;
      height: 130px;
      display: flex;
      .left{
        width: 15%;
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .center{
        width: 75%;
        height: 130px;
        position: relative;
        .top2{
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .center2{
          margin-top: 20px;
          font-size: 12px;
        }
        .bottom{
          color: darkorange;
          position: absolute;
          bottom: 0;
        }
      }
      .right{
        width: 10%;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .img{
    width: 100%;
    height: 5px;
    img{
      width: 100%;
      height: 5px;
    }
  }
  .cart{
    width: 100%;
    margin-top: 10px;
    .box{
      width: 100%;
      height: 130px;
      border-bottom: 1px solid #f2f2f2;
      .mallbox{
        width: 100%;
        height: 110px;
        margin-top: 15px;
        display: flex;
        .img2{
          height: 108px;
          width: 108px;
          margin-left: 20px;
          border: 1px solid #f2f2f2;
          img{
            height: 108px;
            width: 108px;
          }
        }
        .right{
          height: 110px;
          width: 210px;
          margin-left: 20px;
          .name{
            height: 50px;
            width: 100%;
            color: red;
          }
          .next{
            display: flex;
            height: 60px;
            justify-content: space-between;
            .price{
              color: red;
            }
          }
        }
      }
    }
  }

</style>

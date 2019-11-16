<template>
  <div class="main">
    <div v-if="user">
      <div class="top">
        <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
        <div class="title">我的订单</div>
      </div>
      <van-tabs v-model="active" class="table_head">
        <van-tab title="全部" >
          1
        </van-tab>
        <van-tab title="待支付">2</van-tab>
        <van-tab title="待发货">3</van-tab>
        <van-tab title="待收货">4</van-tab>
        <van-tab title="已完成">
          <div class="bigbox">
            <div class="boxmain" v-for="(item,index) in list" :key="index">
              <div class="number">
                <div>订单编号:{{item.order_id}}</div>
                <div class="over">交易完成</div>
              </div>
              <div class="order">
                <div class="everyorder" v-for="(content,index) in item.order_list" :key="index">
                  <div class="mallbox">
                    <div class="shoppingimg">
                      <img :src=content.image_path alt="">
                    </div>
                    <div class="name">{{content.name}}</div>
                    <div class="right">
                      <div class="price">￥{{content.mallPrice}}</div>
                      <div class="count">x{{content.count}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order_bottom">
                <div>创建时间:{{item.add_time}}</div>
                <div>收货地址:{{item.address}}</div>
                <div>共{{item.order_list.length}}件商品 合计:{{item.mallPrice}}</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div v-else>
      <div class="top">
        <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
        <div class="title">我的订单</div>
      </div>
      <van-tabs v-model="active" class="table_head">
        <van-tab title="全部" >
          <div class="loginout">
            <div class="title">请先登录噢~~~</div>
          </div>
        </van-tab>
        <van-tab title="待支付">
          <div class="loginout">
            <div class="title">请先登录噢~~~</div>
          </div>
        </van-tab>
        <van-tab title="待发货">
          <div class="loginout">
            <div class="title">请先登录噢~~~</div>
          </div>
        </van-tab>
        <van-tab title="待收货">
          <div class="loginout">
            <div class="title">请先登录噢~~~</div>
          </div>
        </van-tab>
        <van-tab title="已完成">
          <div class="loginout">
            <div class="title">请先登录噢~~~</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "My_order",
    components: {},
    props: {},
    data() {
      return {
        user:null,
        active: 1,
        list:[],
        sum:0,
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      async getMyOrder(){
        try {
          let res=await this.$api.getMyOrder();
          this.list=res.list
          console.log(this.list,1);
        }catch (e) {
          console.log(e);
        }
      },
    },
    mounted() {
      this.user = JSON.parse(localStorage.user);
      this.getMyOrder()
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
  .main{
    background: #f2f2f2;
    .top{
      width: 100%;
      height: 40px;
      background: white;
      display: flex;
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
    .table_head{
      top:40px;
      width: 100%;
      .loginout{
        width: 100%;
        height: 600px;
        background: #f2f2f2;
        text-align: center;
        position: absolute;
        .title{
          font-size: 15px;
          color: #666666;
          margin-top: 100px;
        }
      }
      .bigbox{
        background: #f2f2f2;
        .boxmain{
          width: 94%;
          margin: 10px 3% ;
          background: white;
          border: 1px solid #cccccc;
          border-radius: 10px;
          .number{
            display: flex;
            border-bottom: 1px solid #f2f2f2;
            height: 40px;
            justify-content: space-between;
            align-items: center;
            .over{
              color: #f56723;
            }
          }
          .order{
            width: 100%;
            border-bottom: 1px solid #cccccc;
            .everyorder{
              width: 94%;
              height: 90px;
              padding: 10px 3%;
              .mallbox{
                width: 100%;
                height: 90px;
                display: flex;
                .shoppingimg{
                  width: 88px;
                  height: 88px;
                  border: 1px solid #f2f2f2;
                  img{
                    width: 88px;
                    height: 88px;
                  }
                }
                .name{
                  font-size: 12px;
                  width: 200px;
                  padding-left: 10px;
                }
                .right{
                  width: 50px;
                  .price{
                    font-size: 12px;
                    height: 20px;
                  }
                  .count{
                    font-size: 12px;
                    height: 20px;
                  }
                }
              }
            }
          }
          .order_bottom{
            height: 70px;
            width: 100%;
            div{
              padding: 0 3%;
              width: 94%;
              height: 20px;
              text-align: end;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div>
    <div class="Commodity_recommendation">
      <div class="top">
        <div>商品推荐</div>      <!-- 顶部 -->
      </div>
      <div class="warp" ref="wrapper">
        <!-- better-scroll 只处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。-->
        <ul class="cont">
          <li v-for="(item,index) in data.recommend" :key="index">
            <div class="box">
              <img :src=item.image alt="index" class="img">
            </div>
            <div class="top">{{item.goodsName}}</div>
            <div class="center">
              <div class="font1">￥{{item.price}}</div>
              <div class="font2">￥{{item.mallPrice}}</div>
            </div>
            <div class="bottom">
              <div class="cart"><img src="../../public/images/cart.png" alt=""></div>
              <div class="look" @click="details(item.goodsId)">查看详情</div>
            </div>
          </li>
        </ul>
        <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
      </div>
    </div>
  </div>
  
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "scroll",
    components: {

    },
    props: {},
    data() {
      return {
        scroll:'',
        data:{}
      }
    },
    methods: {
      async recommend(){
        try {                          //导航栏商品详情信息
          let res=await this.$api.recommend();
          this.data=res.data;
          console.log(this.data);
        }catch (e) {
          console.log(e);
        }
      },
      details(id) {                  //详情信息点击跳转详情页面
        this.$router.push({ name: "commodity_details", query: { id: id } })
      }
    },
    mounted() {
      this.$nextTick(()=>{
        new BScroll(this.$refs.wrapper,{
          startX:0,
          click:true,                   //滚动效果
          scrollX:true,
        })
      })
      this.recommend();
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .Commodity_recommendation{
    background: white;
    width: 100%;
    .top{
      display: flex;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #f2f2f2;
      div{
        margin-left: 5%;
      }
    }
    .warp{
      display: flex;
      overflow: hidden;
      .cont{
        display: flex;
        flex: 1;
        li{
          border: 1px solid #f2f2f2;
          .box{
            height:90px;
            .img{
              width: 120px;
              height: 90px;
            }
          }
          .top{
            margin: 5px;
            width: 120px;
            font-size: 12px;
            color: #333333;
            height: 25px;
            line-height: 25px;
            overflow: hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
          }
          .center{
            width: 100%;
            height: 30px;
            display: flex;
            .font1{
              font-size: 14px;
            }
            .font2{
              font-size: 10px;
              color: #666666;
              text-decoration:line-through;
            }
          }
        }
        .bottom{
          display: flex;
          width: 80%;
          height: 30px;
          margin: 0 10%;
          border-radius: 10px;
          .cart{
            width: 25%;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: gold;
            border-radius: 10px 0px 0 10px;
          }
          .look{
            width: 75%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: white;
            background: red;
            border-radius: 0 10px 10px 0;
          }
        }
      }
    }
  }
</style>

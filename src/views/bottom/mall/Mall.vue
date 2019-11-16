<template>
  <div class="main">
    <div class="top">
      <!--定位栏-->
      <div class="city" @click="local">
        <div class="citys">{{city}}</div>
        <div class="jiantou"><img src="../../../../public/images/xiajiantou.png" alt="下箭头"></div>
      </div>
      <!--搜索栏-->
      <div class="search"><search></search></div>
    </div>
    <!--轮播图-->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in data.slides" :key="index">
        <img :src=item.image alt="index" class="img">
      </van-swipe-item>
    </van-swipe>
    <!--导航栏-->
    <div class="Navigation">
      <div class="Navigation-box1">
        <div class="navigation">
          <div :key="index" class="box" v-for="(item,index) in data.category">
            <div @click="todetails(item,index)"><img :src=item.image alt="index" class="img"></div>
            <div class="font">{{item.mallCategoryName}}</div>
          </div>
        </div>
      </div>
      <div class="Navigation-box2">
        <img :src=data.advertesPicture.PICTURE_ADDRESS alt="index" class="img">
      </div>
    </div>
    <!--商品推荐滚动组件-->
    <div><scroll></scroll></div>
    <!--休闲食品推荐栏-->
    <div class="floor1">
      <div class="top">
        <div class="box">1F</div>
        <div class="font">{{data.floorName.floor1}}</div>
      </div>
      <div class="main">
        <div class="top">
          <div class="left">
            <img :src=floor1[0].image alt="" v-if="floor1[0]" @click="details(floor1[0].goodsId)">
          </div>
          <div class="right">
            <img :src=floor1[1].image alt="" v-if="floor1[1]" @click="details(floor1[1].goodsId)">
            <img :src=floor1[2].image alt="" v-if="floor1[2]" @click="details(floor1[2].goodsId)">
          </div>
        </div>
        <div class="bottom">
          <img :src=floor1[3].image alt="" v-if="floor1[3]" @click="details(floor1[3].goodsId)">
          <img :src=floor1[4].image alt="" v-if="floor1[4]" @click="details(floor1[4].goodsId)">
        </div>
      </div>
    </div>
    <!--新鲜水果推荐栏-->
    <div class="floor2">
      <div class="top">
        <div class="box">2F</div>
        <div class="font">{{data.floorName.floor2}}</div>
      </div>
      <div class="main">
        <div class="top">
          <div class="left">
            <img :src=floor2[0].image alt="" v-if="floor2[0]" @click="details(floor2[0].goodsId)">
          </div>
          <div class="right">
            <img :src=floor2[1].image alt="" v-if="floor2[1]" @click="details(floor2[1].goodsId)">
            <img :src=floor2[2].image alt="" v-if="floor2[2]" @click="details(floor2[2].goodsId)">
          </div>
        </div>
        <div class="bottom">
          <img :src=floor2[3].image alt="" v-if="floor2[3]" @click="details(floor2[3].goodsId)">
          <img :src=floor2[4].image alt="" v-if="floor2[4]" @click="details(floor2[4].goodsId)">
        </div>
      </div>
    </div>
    <!--营养奶品推荐栏-->
    <div class="floor3">
      <div class="top">
        <div class="box">3F</div>
        <div class="font">{{data.floorName.floor3}}</div>
      </div>
      <div class="main">
        <div class="top">
          <div class="left">
            <img :src=floor3[0].image alt="" v-if="floor3[0]" @click="details(floor3[0].goodsId)">
          </div>
          <div class="right">
            <img :src=floor3[1].image alt="" v-if="floor3[1]" @click="details(floor3[1].goodsId)">
            <img :src=floor3[2].image alt="" v-if="floor3[2]" @click="details(floor3[2].goodsId)">
          </div>
        </div>
        <div class="bottom">
          <img :src=floor3[3].image alt="" v-if="floor3[3]" @click="details(floor3[3].goodsId)">
          <img :src=floor3[4].image alt="" v-if="floor3[4]" @click="details(floor3[4].goodsId)">
        </div>
      </div>
    </div>
    <!--热销商品-->
    <div class="hot">
      <div class="top">热销商品</div>
      <div class="main">
        <div v-for="(item,index) in data.hotGoods" :key="index" class="box">
          <img :src=item.image alt="" @click="details(item.goodsId)">
          <div class="top">{{item.name}}</div>
          <div class="center">
            <div class="font1">￥{{item.price}}</div>
            <div class="font2">￥{{item.mallPrice}}</div>
          </div>
        </div>
      </div>
      <div class="none">~没有了~</div>
    </div>
  </div>
</template>

<script>
  import search from '../../../components/Search'
  import scroll from '../../../components/Scroll'
  export default {
    name: "Mall",
    components: {
      scroll,
      search
    },
    props: {},
    data() {
      return {
        city:'',   //用来装定位城市
        data:{},   //接受首页数据
        floor1:[],
        floor2:[],
        floor3:[],
      }
    },
    methods: {
      async recommend(){
        try {                            //获取首页全部数据
          let res=await this.$api.recommend();
          this.data=res.data;
          this.floor1=this.data.floor1
          this.floor2=this.data.floor2
          this.floor3=this.data.floor3
          this.$store.state.category=res.data.category    //存入state，分类页要用
          this.$store.state.bxMallSubDto=res.data.category[0].bxMallSubDto     //存入state，分类页要用
          console.log(this.data);
        }catch (e) {
          console.log(e);
        }
      },
      todetails(item,index){               //导航栏跳转分类页面及传参
        this.$router.push({name:'classification',query:{data:item,sum:index}})
      },
      details(id) {                        //所有商品及商品图片，点击可跳转商品详情浏览页面
        this.$router.push({ name: "commodity_details", query: { id: id } })
      },
      local(){
        this.$router.push('/location')
      }
    },
    mounted() {
      this.recommend();
      let _this=this                                      //高德地图定位
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          // data是具体的定位信息
          _this.city=data.addressComponent.city        //让定位城市赋值
          _this.$store.state.city=data.addressComponent.city     //定位城市传入state，城市列表有用
          console.log(data);
        }

        function onError (data) {
          // 定位出错
          console.log(data);
        }
      })
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
  .main{
    background: #f2f2f2;
    .top{
      display: flex;
      width: 100%;
      height: 40px;
      align-items: center;
      background: #f2f2f2;
      .city{
        display: flex;
        width: 25%;
        justify-content: center;
        .citys{
          font-size: 12px;
        }
        .jiantou{

        }
      }
      .search{
        width: 75%;
      }
    }
    .img{
      width: 100%;
    }
    .Navigation{
      width: 100%;
      height: 155px;
      .Navigation-box1{
        width: 100%;
        height: 100px;
        .navigation{
          width: 94%;
          height: 90px;
          margin: 10px 3% 0 3%;
          background: white;
          border-radius: 10px;
          display: flex;
          box-shadow: 5px 5px 3px #888888;
          .box{
            width: 16%;
            margin: 5px 2%;
            text-align: center;
            .img{
              width: 75%;
              margin-top: 15%;
            }
            .font{
              font-size: 12px;
              margin-top: 15%;
            }
          }
        }
      }
      .Navigation-box2{
        width: 100%;
        height: 55px;
        .img{
        }
      }
    }
    .floor1{
      width: 100%;
      .top{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: red;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .font{
          font-size: 18px;
          color: red;
        }
      }
      .main{
        width: 100%;
        height: 300px;
        .top{
          width: 100%;
          height: 200px;
          display: flex;
          .left{
            width: 50%;
            height: 200px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .right{
            width: 50%;
            height: 200px;
            img{
              width: 100%;
              height: 50%;
            }
          }
        }
        .bottom{
          width: 100%;
          height: 100px;
          display: flex;
          img{
            width: 50%;
            height: 100px;
          }
        }
      }
    }
    .floor2{
      width: 100%;
      .top{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: red;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .font{
          font-size: 18px;
          color: red;
        }
      }
      .main{
        width: 100%;
        height: 300px;
        .top{
          width: 100%;
          height: 200px;
          display: flex;
          .left{
            width: 50%;
            height: 200px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .right{
            width: 50%;
            height: 200px;
            img{
              width: 100%;
              height: 50%;
            }
          }
        }
        .bottom{
          width: 100%;
          height: 100px;
          display: flex;
          img{
            width: 50%;
            height: 100px;
          }
        }
      }
    }
    .floor3{
      width: 100%;
      .top{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: red;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .font{
          font-size: 18px;
          color: red;
        }
      }
      .main{
        width: 100%;
        height: 300px;
        .top{
          width: 100%;
          height: 200px;
          display: flex;
          .left{
            width: 50%;
            height: 200px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .right{
            width: 50%;
            height: 200px;
            img{
              width: 100%;
              height: 50%;
            }
          }
        }
        .bottom{
          width: 100%;
          height: 100px;
          display: flex;
          img{
            width: 50%;
            height: 100px;
          }
        }
      }
    }
    .hot{
      width: 100%;
      .top{
        width: 100%;
        height: 50px;
        background: #f2f2f2;
        font-size: 18px;
        color: red;
        text-align: center;
        line-height: 50px;
      }
      .main{
        display: flex;
        flex-wrap: wrap;
        .box{
          width: 49%;
          height: 245px;
          background: white;
          border: 1px solid #f2f2f2;
          img{
            width:100%;
            height: 180px;
          }
          .top{
            margin: 5px;
            width: 160px;
            font-size: 14px;
            color: red;
            background: white;
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
              margin-left: 20px;
              font-size: 14px;
              color: red;
            }
            .font2{
              font-size: 10px;
              color: #666666;
              text-decoration:line-through;
            }
          }
        }
      }
      .none{
        background: #f2f2f2;
        width: 100%;
        height: 80px;
        font-size: 20px;
        color: #666666;
        line-height: 80px;
        text-align: center;
        padding-bottom: 50px;
      }
    }
  }
</style>

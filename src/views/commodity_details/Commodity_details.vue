<template>
  <div>
    <div class="back"><img src="../../../public/images/jiantou_white.png" alt="" @click="back"></div>
    <div class="scroll">
      <van-swipe :autoplay="3000" indicator-color="white" @change="onChange">
        <van-swipe-item><img :src=data.image_path alt="" @click="big()"></van-swipe-item>
        <van-swipe-item><img :src=data.image_path alt="" @click="big()"></van-swipe-item>
        <div class="custom-indicator" slot="indicator">
          {{ current + 1 }}/2
        </div>
      </van-swipe>
    </div>
    <div class="introduce">
      <div class="name">{{data.name}}</div>
      <div class="price">{{data.present_price}}</div>
    </div>
    <div class="business">
      <div class="text1">运费：{{data.__v}}</div>
      <div class="text2">剩余:{{data.amount}}</div>
      <div class="text3" v-if="color===0">
        <div class="text">收藏</div>
        <div class="img" @click="collection(data)"><img src="../../../public/images/heart.png" alt="" @click="changecolor"></div>
      </div>
      <div v-else class="text3">
        <div class="text">取消收藏</div>
        <div class="img" @click="cancelCollection(data.id)">
          <img src="../../../public/images/heart_red.png" alt="" @click="changecolor">
        </div>
      </div>
    </div>
    <div class="store">
      <div class="left">
        <div class="one"><van-icon name="shop-o" /></div>
        <div class="two">有赞的店</div>
        <div class="three">官方</div>
      </div>
      <div class="right">
        <div class="one">进入店铺</div>
        <div class="img"><img src="../../../public/images/jiantou_right.png" alt=""></div>
      </div>
    </div>
    <div>
      <van-tabs>
        <van-tab title="商品详情">
          <div v-html=data.detail></div>
          <div class="white"></div>
        </van-tab>
        <van-tab title="商品评论">
          <div v-if="listover.comment.length===0">
            暂无评论
          </div>
          <div v-else v-for="(item,index) in listover.comment" :key="index" class="evaluate">
            <div class="evaluate_box">
              <div class="avatar">
                <img :src=user.avatar alt="" class="avatar_img">
              </div>
              <div class="center">
                <div class="nickname">
                  <div v-if="item.anonymous===false">{{user.nickname}}</div>
                  <div v-else>匿名用户</div>
                </div>
                <div class="star">
                  <van-rate
                      v-model=item.rate
                      :size="20"
                      color="#ee0a24"
                      void-icon="star"
                      void-color="#eee"
                  />
                </div>
              </div>
              <div class="right">
                <div class="time">{{item.comment_time}}</div>
              </div>
            </div>
            <div class="title">评论: {{item.content}}</div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="white"></div>
    </div>
    <div class="bottom">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服"  />
        <van-goods-action-icon icon="cart-o" text="购物车" :info=count @click="push" />
        <van-goods-action-button type="warning" text="加入购物车"  @click="addShop" />
        <van-goods-action-button type="danger" text="立即购买" @click="showPopup" />
        <van-popup v-model="show"
                   position="bottom"
                   :style="{ height: '40%' }">
          <div class="eject_top">
            <div class="left">
              <img :src=data.image_path alt="">
            </div>
            <div class="center">
              <div class="name">{{data.name}}</div>
              <div class="price">￥ {{data.present_price}}</div>
            </div>
            <div class="button" @click="out">
              <van-icon name="close" />
            </div>
          </div>
          <div class="eject_center">
            <div class="left">
              <div class="sum">购买数量:</div>
              <div class="bottom2">
                <div class="total">剩余{{data.amount}}件</div>
                <div class="everyone">每人限购50件</div>
              </div>
            </div>
            <div class="right">
              <van-stepper v-model="value" />
            </div>
          </div>
          <div class="end">
            <van-button type="danger" class="button" @click="purchase(data)">立即购买</van-button>
          </div>
        </van-popup>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import { ImagePreview } from 'vant';
  export default {
    name: "Commodity_details",
    components: {

    },
    props: {},
    data() {
      return {
        current:0,
        id: "",
        color:0,
        show: false,
        page:1,
        user:{},
        data:{},
        value: 1,
        count:0,
        recentlyhistroy:'',
        listover:{}
      }
    },
    methods: {
      unshift(){
        if(this.user){
          let datalist=JSON.parse(localStorage.getItem(this.recentlyhistroy))
          if(datalist.length===0) {
            datalist.unshift(this.data)
          }else {
            datalist.map((item,index)=>{
              if(item.id===this.data.id){
                datalist.splice(index,1)
              }
            })
            datalist.unshift(this.data)
          }
          localStorage.setItem(this.recentlyhistroy,JSON.stringify(datalist))
        }
      },
      async goodOne(){
        try {
          let res=await this.$api.goodOne(this.id,this.page);
          this.data=res.goods.goodsOne;
          this.unshift()
          this.listover=res.goods
          console.log(this.listover,4);
          console.log(this.data,3);
        }catch (e) {
          console.log(e);
        }
      },
      purchase(item){
        this.$set(item,"idDirect",true)
        this.$set(item,"count",this.value)
        let list= []
        list.push(item)
        this.$router.push({name:'order_settlement',query:{checkeddata:list}})
      },
      async isCollection(){
        try {
          let res=await this.$api.isCollection(this.id);
          this.color=res.isCollection
        }catch (e) {
          console.log(e);
        }
      },
      async collection(){
        try {
          let res=await this.$api.collection(this.data);
          if(res.code===200){
            Toast(res.msg);
          }else{
            Toast(res.msg);
          }
        }catch (e) {
          console.log(e);
        }
      },
      out(){
        this.show=!this.show
      },
      async cancelCollection(id){
        try {
          let res=await this.$api.cancelCollection(id);
          if(res.code===200){
            Toast(res.msg);
          }else{
            Toast(res.msg);
          }
        }catch (e) {
          console.log(e);
        }
      },
      push(){
        this.$router.push("/shopping_cart")
      },
      async addShop(){
        this.count+=1
        try{
          let res=await this.$api.addShop(this.data.id);
          if(res.code===200){
            Toast(res.msg);
          }else{
            Toast(res.msg);
          }
        }catch (e) {
          console.log(e);
        }
      },
      showPopup() {
        this.show = true;
      },
      onChange(index) {
        this.current = index;
      },
      back(){
        this.$router.push('/mall')   //点击返回上一个操作页面
      },
      big(){
         ImagePreview([
           this.data.image,
           this.data.image
        ]);
      },
      changecolor(){
        if(this.color===1){
          this.color=0
        }else {
          this.color=1
        }
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      this.goodOne()
      this.user = JSON.parse(localStorage.user).nickname
      console.log(this.user,6);
      this.recentlyhistroy=this.user+"recentlyhistroy"
      let recently=JSON.parse(localStorage.getItem(this.recentlyhistroy))
      if(recently===null){
        localStorage.setItem(this.recentlyhistroy,JSON.stringify([]))
      }
      this.isCollection()
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
  .red{
    background: red;
  }
  .back{
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #7d7e80;
    border-radius: 50%;
    position: fixed;
    z-index: 1000;
    top: 15px;
    left: 15px;
    img{
      width: 70%;
      height: 70%;
    }
  }
  .scroll{
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
    img{
      width: 100%;
    }
    .custom-indicator{
      position: absolute;
      right: 10px;
      top: 350px;
      width: 40px;
      height: 20px;
      background: lightgray;
      line-height: 20px;
      text-align: center;
      border-radius: 5px;
      color: white;
    }
  }
  .introduce{
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #f2f2f2;
    .name{
      height: 30px;
      line-height: 30px;
      width: 95%;
      margin-left: 5%;
    }
    .price{
      height: 30px;
      width: 95%;
      margin-left: 5%;
      color: red;
    }
  }
  .business{
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    .text1{
      width: 30%;
      margin-left: 5%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #666666;
    }
    .text2{
      width: 30%;
      margin-left: 5%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #666666;
    }
    .text3{
      width: 35%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #666666;
      display: flex;
      .text{
        width: 80px;
        text-align: end;
      }
      .img{
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 20px;
          height: 20px;
        }

      }
    }
  }
  .store{
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    .left{
      width: 65%;
      display: flex;
      margin-left: 5%;
      .one{
        height: 25px;
        line-height: 25px;
      }
      .two{
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        margin-left: 3%;
      }
      .three{
        margin-left: 3%;
        width: 40px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 14px;
        color: white;
        background: red;
        border-radius: 5px;
      }
    }
    .right{
      width: 35%;
      display: flex;
      align-items: center;
      justify-content: center;
      .one{
        font-size: 14px;
      }
      .img{
        margin-left: 3%;
        text-align: center;
        img{
          width: 15px;
          height: 15px;
        }
      }
    }
  }
  .evaluate{
    width: 94%;
    height: 250px;
    margin: 10px 3%;
    background: #FFFFF4;
    border-radius: 20px;
    .evaluate_box{
      width: 100%;
      height: 90px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #333333;
      .avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #00b4ce;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        .avatar_img{
          height: 25px;
          width: 25px;
        }
      }
      .center{
        width: 40%;
        height: 90px;
        margin-left: 10px;
        .nickname{
          height: 45px;
          line-height: 45px;
        }
        .star{
          height: 45px;
        }
      }
      .time{
        font-size: 12px;
        margin-left: 10px;
        height: 45px;
        width: 150px;
      }
    }
    .title{
      width: 100%;
      height: 100px;
    }
  }
  .white{
    width: 100%;
    height: 60px;
    background: white;
  }
  .eject_top{
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #c8c9cc;
    display: flex;
    .left{
      width: 78px;
      height: 78px;
      border: 1px solid #c8c9cc;
      position: fixed;
      bottom: 200px;
      left: 20px;
      background: white;
      z-index: 2000;
      img{
        width: 78px;
        height: 78px;
      }
    }
    .center{
      width: 60%;
      height: 80px;
      margin-left: 30%;
      .name{
        height: 30px;
        line-height: 30px;
      }
      .price{
        margin-top: 10px;
        color: red;
      }
    }
    .button{
      margin: 10px;
    }
  }
  .eject_center{
    width: 100%;
    height: 80px;
    display: flex;
    border-bottom: 1px solid #c8c9cc;
    .left{
      width: 60%;
      margin-left: 5%;
      height: 80px;
      .sum{
        margin-top: 20px;
        height: 15px;
      }
      .bottom2{
        display: flex;
        margin-top: 10px;
        height: 40px;
        .total{
          font-size: 12px;
          color: gray;
        }
        .everyone{
          color: red;
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
    .right{
      margin-top: 20px;
    }
  }
  .end{
    width: 100%;
    position: absolute;
    bottom: 0;
    .button{
      width: 100%;
    }
  }
  .bottom{
    width: 100%;
    height: 50px;
    display: flex;
    position: fixed;
    background: white;
    bottom: 0;
    .one{
      width: 15%;
      .img{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 25px;
          height: 20px;
        }
      }
      .text{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333333;
      }
    }
    .two{
      width: 15%;
      .img{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 25px;
          height: 20px;
        }
      }
      .text{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333333;
      }
    }
    .three{
      width: 35%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      background: orangered;
    }
    .four{
      width: 35%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      background: red;
    }
  }
</style>

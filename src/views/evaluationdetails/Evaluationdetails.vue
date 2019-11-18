<template>
  <div>
    <div class="top">              <!--顶部 -->
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">评价详情</div>
    </div>
    <div class="content">
      <div class="persoal">
        <div class="photo_box">
          <img :src=user.avatar alt="" class="img">
        </div>
        <div class="center">
          <div class="nickname">
            <div v-if="list.anonymous===false">{{user.nickname}}</div>
            <div v-else>匿名用户</div>
          </div>
          <div class="star">
            <van-rate
                v-model=list.rate
                :size="20"
                color="#ee0a24"
                void-icon="star"
                void-color="#eee"
            />
          </div>
        </div>
        <div class="time">{{list.comment_time}}</div>
      </div>
      <div class="content_title">评价类容: {{list.content}}</div>
    </div>
    <div v-for="(item,index) in list.goods" :key="index" class="goods">
      <img :src=item.image_path alt="" class="photo">
      <div class="title">{{item.name}}</div>
      <div class="cart_box">
        <img src="../../../public/images/cartred.png" alt="" class="cart">
      </div>
    </div>
    <div class="bottom">
      <van-button type="primary" class="button" @click="goback">返回</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Evaluationdetails",
    components: {},
    props: {},
    data() {
      return {
        user:{},
        list:[],
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      goback(){
        this.$router.go(-1)
      }
    },
    mounted() {
      this.list = this.$route.query.item       //接受评价过的商品
      console.log(this.list,3);
      this.user = JSON.parse(localStorage.user)   //拿到用户信息
      console.log(this.user);
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
  .top{
    width: 100%;
    height: 40px;
    background: white;
    display: flex;
    top: 0;
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
  .content{
    width: 100%;
    height: 130px;
    margin-top: 40px;
    border-bottom: 1px solid #f2f2f2;
    .persoal{
      width: 94%;
      height: 90px;
      padding: 5px 3%;
      display: flex;
      align-items: center;
      .photo_box{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #fff7cc;
        .img{
          width: 50px;
          height: 50px;
        }
      }
      .center{
        height: 70px;
        width: 120px;
        margin-left: 20px;
        .nickname{
          font-size: 14px;
        }
        .star{
          margin-top: 20px;
        }
      }
      .time{
        width: 150px;
        text-align: center;
        font-size: 12px;
      }
    }
    .content_title{
      width: 90%;
      margin-left: 10px;
    }
  }
  .goods{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    .photo{
      width: 60px;
      height: 60px;
      margin-left: 10px;
    }
    .title{
      height: 70px;
      margin-top: 10px;
      margin-left: 10px;
      width: 50%;
    }
    .cart_box{
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: #ffe6e2;
      margin-left: 40px;
      .cart{
        width: 30px;
        height: 30px;
      }
    }
  }
  .bottom{
    width: 100%;
    position: absolute;
    bottom: 0;
    .button{
      width: 100%;
    }
  }
</style>

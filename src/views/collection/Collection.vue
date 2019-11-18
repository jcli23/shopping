<template>
  <div>
    <div v-if="user">
      <div class="top">                <!--登录时，顶部 -->
        <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
        <div class="title">我的收藏</div>
      </div>
    </div>
    <div v-else>                      <!--未登录时 -->
      <div class="top">
        <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
        <div class="title">我的收藏</div>
      </div>
      <div class="loginout">
        <div class="title">请先登录噢~~~</div>
      </div>
    </div>
    <div v-for="(item,index) in list" :key="index">       <!--购物过收藏的商品 -->
      <div class="box">
        <div class="img"><img :src=item.image_path alt=""></div>
        <div class="center">
          <div class="name">{{item.name}}</div>
          <div class="price">￥ {{item.present_price}}</div>
        </div>
        <div class="button" @click="cancelCollection(item.cid)">
          <van-icon name="close" />
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Collection",
    components: {},
    props: {},
    data() {
      return {
        user:null,
        list:[]
      }
    },
    methods: {
      back(){
        this.$router.go(-1)          //返回上一步操作
      },
      async getCollection(){          //获取收藏过得商品信息
        try {
          let res=await this.$api.getCollection();
          console.log(res,1);
          this.list=res.data.list
        }catch (e) {
          console.log(e);
        }
      },
      async cancelCollection(id){          //取消收藏
        try {
          let res=await this.$api.cancelCollection(id);
          if(res.code===200){
            this.getCollection()
          }
        }catch (e) {
          console.log(e);
        }
      },
    },
    mounted() {
      this.user = JSON.parse(localStorage.user)   //本地拿到用户信息
      this.getCollection()
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
  .loginout{
    width: 100%;
    height: 630px;
    background: #f2f2f2;
    text-align: center;
    position: absolute;
    top: 40px;
    .title{
      font-size: 15px;
      color: #666666;
      margin-top: 100px;
    }
  }
  .box{
    width: 100%;
    height: 100px;
    display: flex;
    position: relative;
    margin-top: 40px;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    .img{
      width: 80px;
      height: 80px;
      margin: 5px 0 0 10px;
      border: 1px solid #f2f2f2;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 60px;
        height: 60px;
      }
    }
    .center{
      width: 50%;
      height: 90px;
      margin-left: 20px;
      .name{
        height: 40px;
        line-height: 40px;
      }
      .price{
        height: 40px;
        line-height: 40px;
        color: red;
      }
    }
    .button{
      position: absolute;
      bottom: 10px;
      right: 20px;
    }
  }
</style>

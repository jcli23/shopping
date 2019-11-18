<template>
  <div>
    <div class="top">            <!--顶部-->
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">最近浏览</div>
    </div>
    <div class="next">               <!--浏览过的商品展示-->
      <div v-for="(item,index) in datalist" :key="index" class="every">
        <div class="img" @click="details(item.id)"><img :src=item.image_path alt=""></div>
        <div class="right">
          <div class="name" v-html=item.name></div>
          <div class="price">
            <div class="old">￥{{item.orl_price}}</div>
            <div class="new">￥{{item.present_price}}</div>
          </div>
        </div>
        <div class="icon" @click="del(index)"><van-icon name="close" /></div>    <!--删除浏览历史-->
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Recently_browse",
    components: {},
    props: {},
    data() {
      return {
        user:'',
        recentlyhistroy:'',        //装浏览历史的商品信息
        datalist:[]
      }
    },
    methods: {
      back(){                        //返回我的
        this.$router.push('/my')
      },
      details(id) {                //点击商品，查看详情页
        this.$router.push({ name: "commodity_details", query: { id: id } })
      },
      del(index){                //商城单个浏览的商品信息
        this.datalist.splice(index,1)
        localStorage.setItem(this.recentlyhistroy,JSON.stringify(this.datalist))
      }
    },
    mounted() {
      this.user = JSON.parse(localStorage.user).nickname
      this.recentlyhistroy=this.user+"recentlyhistroy"
      let history=JSON.parse(localStorage.getItem(this.recentlyhistroy))
      if(history){
        this.datalist=history
      }
    },
    created() {

    },
    filters: {},
    computed: {

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
  .next{
    margin-top: 40px;
    .every{
      width: 100%;
      height: 110px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      .img{
        width: 88px;
        height: 88px;
        margin-left: 3%;
        border: 1px solid #f2f2f2;
        img{
          width: 88px;
          height: 88px;
        }
      }
      .right{
        width: 220px;
        height: 90px;
        margin-left: 20px;
        .name{
          font-size: 13px;
          height: 40px;
          margin-top: 15px;
        }
        .price{
          height: 40px;
          display: flex;
          align-items: center;
          .old{
            font-size: 16px;
            color: red;
          }
          .new{
            font-size: 13px;
            text-decoration:line-through;
            margin-left: 10px;
          }
        }
      }
      .icon{
        width: 20px;
        height: 90px;
        display: flex;
        align-items: flex-end;
      }
    }
  }
</style>

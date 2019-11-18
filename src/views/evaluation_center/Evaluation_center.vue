<template>
  <div>
    <div class="top">                   <!--顶部-->
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">评价中心</div>
    </div>
    <div class="img">
      <img src="../../../public/images/evaluate.jpg" alt="">
    </div>
    <div class="main">                 <!--未评价部分-->
      <van-tabs class="button">
        <van-tab title="待评价">
          <div>
            <div class="box" v-for="(item,index) in list" :key="index">
              <img :src=item.image_path alt="" class="photo">
              <div class="title">{{item.name}}</div>
              <div class="goto" @click="goto(item)">
                <img src="../../../public/images/messagered.png" alt="" class="messagered">
                <div>评价晒单</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已评价">               <!--已评价部分-->
          <div>
            <div v-for="(item,index) in listover" :key="index">
              <div v-for="(content,index) in item.goods" :key="index" class="box">
                <img :src=content.image_path alt="" class="photo">
                <div class="title">{{content.name}}</div>
                <div class="goto2" @click="goto2(item)">
                  <img src="../../../public/images/serach.png" alt="" class="messagered">
                  <div>查看评价</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Evaluation_center",
    components: {},
    props: {},
    data() {
      return {
        list:[],             //装完成交易的商品
        listover:[],          //装评论完成的商品
      }
    },
    methods: {                         //查询待评价
      async tobeEvaluated(){
        try {
          let res=await this.$api.tobeEvaluated();
          this.list=res.data.list
          // console.log(this.list,1);
        }catch (e) {
          console.log(e);
        }
      },
      async alreadyEvaluated(){             //查询已评价
        try {
          let res=await this.$api.alreadyEvaluated();
          this.listover=res.data.list
          console.log(this.listover,2);
        }catch (e) {
          console.log(e);
        }
      },

      back(){                                //返回我的页面
        this.$router.push('/my')
      },
      goto(item){                            //跳转评价页面
        this.$router.push({name:'evaluate',query:{item:item}})
      },
      goto2(item){                           //跳转查看评价页面
        this.$router.push({name:'evaluationdetails',query:{item:item}})
      }
    },
    mounted() {
      this.tobeEvaluated()
      this.alreadyEvaluated()
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
  .img{
    width: 100%;
    img{
      width: 100%;
    }
  }
  .main{
    position: absolute;
    width: 100%;
    top: 190px;
    .button{
      width: 85%;
      margin-left: 7.5%;
      .box{
        height: 100px;
        width: 100%;
        display: flex;
        position: relative;
        border-bottom: 1px solid #f2f2f2;
        .photo{
          width: 80px;
          height: 80px;
          margin-top: 15px;
        }
        .title{
          margin-top: 30px;
          font-size: 13px;
          padding-left: 10px;
        }
        .goto{
          width: 80px;
          position: absolute;
          height: 20px;
          display: flex;
          bottom: 5px;
          right: -10px;
          align-items: center;
          border: 1px solid red;
          border-radius: 10px;
          .messagered{
            width: 12px;
            height: 12px;
            margin-left: 10px;
          }
          div{
            font-size: 10px;
            margin-left: 5px;
            color: red;
          }
        }
        .goto2{
          width: 80px;
          position: absolute;
          height: 20px;
          display: flex;
          bottom: 5px;
          right: -10px;
          align-items: center;
          border: 1px solid gray;
          border-radius: 10px;
          .messagered{
            width: 12px;
            height: 12px;
            margin-left: 10px;
          }
          div{
            font-size: 10px;
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>

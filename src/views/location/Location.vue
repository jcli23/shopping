<template>
  <div class="location">
    <div class="top">
      <div @click="back" class="click">
        <img src="../../../public/images/jiantou_left.png" alt="">
      </div>
      <div class="title">城市列表</div>
    </div>
    <van-search class="input" placeholder="请输入搜索关键词" v-model="value" />
    <div v-if="value===''">
      <div class="now_city">当前城市</div>
      <div class="city_title">
        <div>{{get}}</div>
      </div>
      <div class="now_city">热门城市</div>
      <div class="hotcity">
        <div class="top1">
          <div>北京</div>
          <div>上海</div>
          <div>杭州</div>
        </div>
        <div class="bottom">
          <div>重庆</div>
          <div>成都</div>
          <div>厦门</div>
        </div>
      </div>
      <van-index-bar>
        <div v-for="(item,index) in city" :key="index">
          <van-index-anchor :index="index" />
          <div v-for="cities in item" :key="cities.id">
            <van-cell :title=cities.name />
          </div>
        </div>
      </van-index-bar>
    </div>
    <div v-if="value !==''">
        <div v-for="(item,index) in arr" :key="index">
          <div class="search_result">
            <div>{{item.name}}</div>
          </div>
        </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Location",
    components: {

    },
    props: {},
    data() {
      return {
        value: '',      //同步输入框搜索值
        city:{},          //装城市列表
        arr:[],         //装过滤的城市列表
      }
    },
    methods: {
      back(){
        this.$router.push('/mall')    //返回商城
      },
    },
    mounted() {
      this.city=this.$city.data.cities       //城市列表
      console.log(this.city);

    },
    created() {

    },
    filters: {},
    computed: {
      get(){
        return this.$store.state.city      //获取当前城市
      }
    },
    watch: {
      value (val) {              //搜索
        // 说明输入框有值
        if (val.trim() !== '') {
          if (val.charCodeAt(0)>=65 && val.charCodeAt(0)<=90) {
            val=val.toLowerCase();
          }
          for (let i in this.city) {
              this.arr=this.arr.concat(
                  this.city[i].filter(item=>{
                    return JSON.stringify(item.name).includes(val) || JSON.stringify(item.spell).includes(val)
                  })
              )
          }
        }else {
          this.arr = [];    //没有搜索的时候，让arr直接赋值为tableData的内容，然后循环
        }
      }
    },
    directives: {}
  }
</script>

<style scoped lang="scss">
  .location{
    background: #f2f2f2;
    .top{
      width: 100%;
      height: 50px;
      display: flex;
      background: white;
      align-items: center;
      border-bottom: 1px solid lightgray;
      .click{
        display: flex;
        margin-left: 10px;
      }
      .title{
        margin-left: 120px;
      }
    }
    .input{
      background: white;
    }
    .now_city{
      padding: 10px 0 10px 5%;
      font-size: 14px;
    }
    .city_title{
      width: 100%;
      height: 45px;
      background: white;
      display: flex;
      align-items: center;
      div{
        border: 1px solid gray;
        width: 100px;
        margin: 5%;
        height: 25px;
        text-align: center;
        line-height: 25px;
        font-size: 14px;
      }
    }
    .hotcity{
      width: 100%;
      height: 95px;
      background: white;
      .top1{
        display: flex;
        justify-content: space-around;
         div{
           border: 1px solid gray;
           width: 100px;
           margin: 15px 0;
           height: 25px;
           text-align: center;
           line-height: 25px;
           font-size: 14px;
         }
      }
      .bottom{
        display: flex;
        justify-content: space-around;
        div{
          border: 1px solid gray;
          width: 100px;
          height: 25px;
          text-align: center;
          line-height: 25px;
          font-size: 14px;
        }
      }
    }
    .search_result{
      width: 100%;
      height: 44px;
      background: white;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      div{
        margin-left: 5%;
      }
    }
  }

</style>

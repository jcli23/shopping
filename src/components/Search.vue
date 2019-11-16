<template>
  <div>
    <div class="main">
      <div class="search">
        <div class="searchicon"><van-icon name="search" /></div>
        <input type="text" placeholder="请输入搜索关键字" class="input" v-model="value" @click="showPopup">
        <van-popup v-model="show"
                   position="bottom"
                   :duration=0
                   :overlay="false"
                   :style="{ height: '94%',width:'100%' }">   <!-- 搜索弹出层 -->
          <div v-if="value !== ''">         <!-- 当搜索时，获取搜索列表，渲染出来 -->
            <div v-for="(item,index) in list" :key="index" class="every" @click="details(item.id)">
              <div class="img"><img :src=item.image_path alt=""></div>
              <div class="right">
                <div class="name" v-html=item.name></div>
                <div class="price">
                  <div class="old">￥{{item.orl_price}}</div>
                  <div class="new">￥{{item.present_price}}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="historyList.length !== 0 && user" class="history">   <!-- 当有搜索历史，没有搜索时，登录的用户搜索历史渲染出来 -->
            <div class="top">
              <div>搜索历史</div>
              <van-icon name="delete" @click="del" />
            </div>
            <div class="button">
              <van-button
                  round
                  color="#9999CC"
                  size="mini"
                  v-for="(item, index) in historyList"
                  :key="index"
              >
                {{ item }}
              </van-button>
            </div>
          </div>
          <!--  暂无搜索历史  -->
          <div v-else class="noHave">暂无搜索历史</div>    <!-- 没有登录或无搜索历史 -->
        </van-popup>
      </div>
      <div class="cancel" v-if="this.show===true" @click="goback">取消</div> <!-- 有弹出层。即搜索时，改为取消退出搜索按钮 -->
      <div v-else class="cancel">搜索</div>        <!-- 没有搜索时，显示为搜索按钮 -->
    </div>
  </div>
  
</template>

<script>
  import { Dialog } from "vant";
  export default {
    name: "Search",
    components: {},
    props: {},
    data() {
      return {
        value:'',         //绑定搜索栏的值
        show: false,         //搜索栏弹出层开关
        user:{},            //登录时装用户信息，也可判断是否为登录状态
        list:[],             //装搜索结果的商品信息数组
        historyList: [],         //接收本地存储的历史搜索
        historyName: ""         //历史搜索取名
      }
    },
    methods: {
      async search(){
        if(this.value)
        try {                        //获取搜索信息相对应的的商品并装值给list然后搜索关键字高亮显示
          let res=await this.$api.search(this.value,1);
          this.list=res.data.list
          this.list.map(item=>{
            let arr=item.name.split(this.value)
            item.name=arr.join('<span style="color:red">' + this.value + '</span>')
          })
          console.log(this.list);
        }catch (e) {
          console.log(e);
        }
      },
      details(id) {
        this.$router.push({ name: "commodity_details", query: { id: id } })  //点击商品跳转详情页
        if (this.user) {
          if (this.historyList.indexOf(this.value) === -1 && this.value !== "") {
            this.historyList.push(this.value);        //如果用户登录，且无相同搜索，则添加历史搜索
          }
          localStorage.setItem(
              this.historyName,
              JSON.stringify(this.historyList )    //创建本地搜索历史记录
          );
        }
      },
      goback(){
        this.show=!this.show        //点取消，关闭搜索弹出层，并且搜索栏文字清空
        this.value=''
      },
      del() {
        Dialog.confirm({
          message: "是否删除搜索历史"         //删除搜索历史
        })
            .then(() => {
              this.historyList = [];
              localStorage.removeItem(this.historyName);
            })
            .catch(() => {
              // on cancel
            });
      },
      showPopup() {
        this.show = true;          //弹出层
      }
    },
    mounted() {
      this.user = JSON.parse(localStorage.user)      //从本地获取用户名信息
      this.search()
      this.historyName = this.user.nickname + "history";    //创建对应用户名的历史搜索
      let history = JSON.parse(localStorage.getItem(this.historyName));
      if (history) {
        this.historyList = history;
      }
      console.log(this.historyList);
    },
    created() {

    },
    filters: {},
    computed: {

    },
    watch: {
      value (val) {
        // 说明输入框有值
        if (val.trim() !== '') {
          this.search()          //输入框有值，获取相应商品信息
        }
      }
    },
    directives: {}
  }
</script>

<style scoped lang="scss">
  .main{
    display: flex;
    align-items: center;
    .search{
      width: 70%;
      height: 30px;
      display: flex;
      border-radius: 5px;
      background: white;
      .searchicon{
        width: 15%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .input{
        border: none;
      }
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
          width: 240px;
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
      }
      .history {
        .top {
          display: flex;
          padding: 10px;
          justify-content: space-between;
        }
        .button {
          padding: 10px;
        }
      }
      /*  暂无搜索历史*/
      .noHave {
        padding: 10px;
        text-align: center;
        margin-top: 100px;
      }
    }
    .cancel{
      width: 30%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666666;
    }
  }

</style>

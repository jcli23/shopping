<template>
  <div>
    <div class="top">会员中心</div>
    <div class="center">
      <div v-if="flag && user">    <!-- 登录时的显示 -->
        <div class="photo">
          <img :src=user.avatar alt="">
        </div>
        <div class="name">欢迎您：{{user.nickname}}</div>
        <div class="text" @click="Out">退出登录</div>    <!-- 退出登录 -->
        <img src="../../../../public/images/shezhi.png" alt="" class="img"  @click="showPopup">
        <van-popup v-model="show1" closeable
                   close-icon="arrow-left"
                   close-icon-position="top-left"
                   :style="{ height: '100%',width:'100%' }">     <!-- 点击可修改个人资料 -->
          <div class="data">个人资料</div>
          <div class="data_name">
            <div>github</div>
          </div>
          <div class="head">
            <div class="text1">头像</div>
            <div class="head_photo"><img :src=user.avatar alt=""></div>
            <div class="icon1"><img src="../../../../public/images/jiantou_right.png" alt=""></div>
          </div>
          <!-- 个人信息的修改或编辑 -->
          <van-field
              v-model=user.username
              clearable
              disabled
              label="用户名"
          />
          <van-field
              v-model=user.nickname
              clearable
              label="昵称"
          />
          <van-field
              v-model=user.gender
              clearable
              label="性别"
          />
          <van-field
              clearable
              v-model=email
              value="请输入邮箱"
              label="邮箱"
          />
          <van-field
              v-model="showtime"
              label="出生年月"
              @click="showPopup1"
        />
          <van-popup v-model="show2"
             position="bottom"
             :style="{ height: '50%',width:'100%' }">
            <van-datetime-picker
                v-model='time'
                @cancel="back"
                @confirm="onchange"
                type="date"
            />
          </van-popup>
          <div><van-button type="primary" class="button" @click="saveUser">保存</van-button></div>
          <div><van-button type="default" class="button" @click="cancel">取消</van-button></div>
        </van-popup>
      </div>
      <div v-else>                <!-- 未登录时 -->
        <div class="photo">
          <img src="../../../../public/images/timg1.gif" alt="">
        </div>
        <div class="name"></div>
        <div class="text" @click="go">登录/注册</div>
      </div>
    </div>
    <div v-if="flag && user" class="transaction">           <!-- 登录时跳转的内容 -->
      <div class="box" @click="Forward">
        <img src="../../../../public/images/fukuan.png" alt="">
        <div>代付款</div>
      </div>
      <div class="box" @click="Forward">
        <img src="../../../../public/images/fahuo.png" alt="">
        <div>代发货</div>
      </div>
      <div class="box" @click="Forward">
        <img src="../../../../public/images/shouhuo.png" alt="">
        <div>代收货</div>
      </div>
      <div class="boxcount" @click="Forwardgoto">
        <img src="../../../../public/images/pingjia.png" alt="">
        <div class="it">评价</div>
        <div class="count">{{listover.length}}</div>
      </div>
      <div class="box" @click="Forward">
        <img src="../../../../public/images/yiwancheng.png" alt="">
        <div>已完成</div>
      </div>
    </div>
    <div v-else class="transaction">               <!-- 未登录时点击服务项都为去登录注册 -->
      <div class="box" @click="Forward">
        <img src="../../../../public/images/fukuan.png" alt="">
        <div>代付款</div>
      </div>
      <div class="box" @click="Forward">
        <img src="../../../../public/images/fahuo.png" alt="">
        <div>代发货</div>
      </div>
      <div class="box" @click="Forward">
        <img src="../../../../public/images/shouhuo.png" alt="">
        <div>代收货</div>
      </div>
      <div class="box" @click="Forward">
        <img src="../../../../public/images/pingjia.png" alt="">
        <div>评价</div>
      </div>
      <div class="box" @click="Forward">
        <img src="../../../../public/images/yiwancheng.png" alt="">
        <div>已完成</div>
      </div>
    </div>
    <div v-if="flag && user">            <!-- 登录时的服务按钮 -->
      <div class="row">
        <img src="../../../../public/images/yiwancheng.png" alt="" class="icon">
        <div>全部订单</div>
        <img src="../../../../public/images/jiantou_right.png" alt="" class="icon2">
      </div>
      <div class="row" @click="Merchandise">
        <img src="../../../../public/images/yishoucang.png" alt="" class="icon">
        <div>收藏商品</div>
        <img src="../../../../public/images/jiantou_right.png" alt="" class="icon2">
      </div>
      <div class="row" @click="address">
        <img src="../../../../public/images/address.png" alt="" class="icon">
        <div>地址管理</div>
        <img src="../../../../public/images/jiantou_right.png" alt="" class="icon2">
      </div>
      <div class="row" @click="recently">
        <img src="../../../../public/images/liulan.png" alt="" class="icon">
        <div>最近浏览</div>
        <img src="../../../../public/images/jiantou_right.png" alt="" class="icon2">
      </div>
    </div>
    <div v-else>                <!-- 未登录时一样，但跳转无内容，为去登录注册 -->
      <div class="row">
        <img src="../../../../public/images/yiwancheng.png" alt="" class="icon">
        <div>全部订单</div>
        <img src="../../../../public/images/jiantou_right.png" alt="" class="icon2">
      </div>
      <div class="row" @click="Merchandise">
        <img src="../../../../public/images/yishoucang.png" alt="" class="icon">
        <div>收藏商品</div>
        <img src="../../../../public/images/jiantou_right.png" alt="" class="icon2">
      </div>
      <div class="row" @click="address">
        <img src="../../../../public/images/address.png" alt="" class="icon">
        <div>地址管理</div>
        <img src="../../../../public/images/jiantou_right.png" alt="" class="icon2">
      </div>
      <div class="row">
        <img src="../../../../public/images/liulan.png" alt="" class="icon">
        <div>最近浏览</div>
        <img src="../../../../public/images/jiantou_right.png" alt="" class="icon2">
      </div>
    </div>
  </div>
  
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "My",
    components: {},
    props: {},
    data() {
      return {
        data:{
          name:''
        },
        currentDate: new Date(),
        flag: true,
        user: null,
        show1: false,
        show2: false,
        time:'',
        year:'',
        month:'',
        day:'',
        email:'',
        showtime:"",
        listover:[]
      }
    },
    methods: {
      Forward(){
        this.$router.push('/my_order')   //跳转我的订单
      },
      Forwardgoto(){
        this.$router.push('/evaluation_center')   //跳转评论中心
      },
      Merchandise(){
        this.$router.push('/collection')    //跳转我的收藏
      },
      address(){
        this.$router.push('/address')     //跳转地址列表
      },
      recently(){
        this.$router.push('/recently_browse')    //跳转最近浏览
      },
      onchange(value){
        this.showtime=this.$dayjs(value).format("YYYY年MM月DD日")
        this.year=Number(this.showtime.slice(0,4))
        this.month=Number(this.showtime.slice(5,7))     //修改地址后，将时间年月份分别取出
        this.day=Number(this.showtime.slice(8,10))
        this.show2=!this.show2
      },
      async sendid(){
        try {
          let res =await this.$api.user();    //获取用户信息
          console.log(res);
          if (res.code === 200) {
            this.$store.state.userInfo=res.userInfo
          }else{
            Toast(res.msg);
          }
        }catch (e) {
          console.log(e);
        }
      },
      async alreadyEvaluated(){
        try {
          let res=await this.$api.alreadyEvaluated();    //获取已评价数据
          this.listover=res.data.list
          console.log(this.listover,2);
        }catch (e) {
          console.log(e);
        }
      },
      async saveUser(){
        try {
          let res = await this.$api.saveUser(         //修改保存用户信息
              {
                gender:this.user.gender,
                year:this.year,
                month:this.month,
                day:this.day,
                id:this.userInfo._id,
                nickname:this.user.nickname,
              });
          if (res.code === 200) {
            Toast(res.msg);
            this.show1=!this.show1
            this.$store.state.userInfo=res.user
          }else{
            Toast(res.msg);
          }
        }catch (e) {
          console.log(e);
        }
      },
      cancel(){
        this.show1=!this.show1            //取消修改退出修改页面
      },
      back(){
        this.show2=!this.show2            //退出修改时间
      },
      go(){
        this.$router.push('/login_registration')    //未登录时点击登录注册跳转页面
      },
      async Out(){
        try {
          let res = await this.$api.loginOut();      //退出登录
          console.log(res);
          if (res.code === 0) {
            localStorage.removeItem('user')
            this.flag = false
            Toast(res.msg);
          }else{
            Toast(res.msg);
          }
        }catch (e) {
          console.log(e);
        }
      },
      showPopup() {
        this.show1 = true;
      },
      showPopup1() {
        this.show2 = true;
      },

    },
    mounted() {
      this.user = JSON.parse(localStorage.user)      //获取用户信息
      this.time=this.$dayjs().year(this.user.year).month(this.user.month).date(this.user.day);   //转换时间显示格式
      this.showtime=this.$dayjs(this.time).format("YYYY年MM月DD日");
      this.sendid()
      this.alreadyEvaluated()
    },
    created() {

    },
    filters: {},
    computed: {
      username(){
        return this.$store.state.username       //用户名
      },
      userInfo(){
        return this.$store.state.userInfo   //用户信息
      },
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
    text-align: center;
    line-height: 40px;
  }
  .center{
    width: 100%;
    height: 220px;
    background: #ce272d;
    text-align: center;
    position: relative;
    .img{
      position: absolute;
      top: 10px;
      right: 10px;
      width: 20px;
    }
    .photo{
      position: relative;
      width: 80px;
      height: 80px;
      border: 1px solid gold;
      border-radius: 50%;
      margin-left: 50%;
      left: -40px;
      top:20px;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .name{
      height: 40px;
      margin-top: 40px;
      font-size: 18px;
      color: white;
    }
    .text{
      font-size: 14px;
      color: white;
      margin-top: 10px;
    }
    .data{
      width: 100%;
      height: 40px;
      background: white;
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
    }
    .data_name{
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: white;
      border-bottom: 1px solid #f2f2f2;
      div{
        width: 30px;
        margin-left: 5%;
        font-size: 20px;
      }
    }
    .head{
      width: 100%;
      height: 70px;
      display: flex;
      .text1{
        width: 50px;
        height: 70px;
        line-height: 70px;
        margin-left: 5%;
      }
      .head_photo{
        width: 70px;
        height: 70px;
        margin-left: 50%;
        img{
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
      .icon1{
        height: 70px;
        display: flex;
        align-items: center;
        img{
          width: 15px;
          height: 15px;
        }
      }
    }
    .button{
      width: 250px;
      margin-top: 10px;
    }
  }
  .transaction{
    width: 100%;
    height: 80px;
    display: flex;
    background: white;
    border-bottom: 1px solid #f2f2f2;
    .box{
      flex: 1;
      text-align: center;
      img{
        width: 30px;
        height: 30px;
        margin-top: 10px;
      }
      div{
        font-size: 14px;
        margin-top: 10px;
        color: #333333;
      }
    }
    .boxcount{
      flex: 1;
      text-align: center;
      position: relative;
      img{
        width: 30px;
        height: 30px;
        margin-top: 10px;
      }
      .it{
        font-size: 14px;
        margin-top: 10px;
        color: #333333;
      }
      .count{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: red;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        position: absolute;
        top: 5px;
        right: 15px;
      }

    }
  }
  .row{
    width: 100%;
    height: 50px;
    background: white;
    display: flex;
    align-items: center;
    .icon{
      width: 20px;
      height: 20px;
      margin-left: 5%;
    }
    div{
      font-size: 15px;
      margin-left: 3%;
      color: #333333;
    }
    .icon2{
      width: 15px;
      height: 15px;
      margin-left: 60%;
    }
  }
</style>

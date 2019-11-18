<template>
  <div>
    <div class="back"><img src="../../../public/images/jiantou_white.png" alt="" @click="back"></div>
    <div class="background">
      <div class="box">
        <div class="top">
          <div>登录/注册</div>
        </div>
        <van-cell-group>
          <van-field
              v-model="username"
              required
              clearable
              label="用户名"
              right-icon="question-o"
              placeholder="请输入用户名"
              @click-right-icon="$toast('question')">
          </van-field>
          <van-field
              v-model="password"
              type="password"
              label="密码"
              placeholder="请输入密码"
              required>
          </van-field>
          <div class="yanzhen">
            <van-field
                v-model="Code"
                required
                clearable
                label="验证码"
                placeholder="请输入验证码"
            >
            </van-field>
            <div class="photo" v-html="code" @click="replaceVerify"></div>
          </div>
        </van-cell-group>
        <div class="button">
          <div class="login" @click="login">登录</div>
          <div class="register" @click="register">注册</div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import axios from "axios";
  import { Toast } from 'vant';
  export default {
    name: "Login_registration",
    components: {
    },
    props: {},
    data() {
      return {
        code:'',          //二维码
        Code:'',          //输入的二维码值
        password:'',     //密码
        username:''      //用户名
      }
    },
    methods: {
      back(){                     //返回
        this.$router.go(-1)
      },
      gerAverify(){                 //随机获取二维码
        axios.get(`api/verify?mt=${Math.random()}`).then(res=>{
          this.code=res.data;
        })
      },
      replaceVerify(){            //换二维码
        axios.get(`api/verify?mt=${Math.random()}`).then(res=>{
          this.code=res.data;
        })
      },
      async register(){          //注册
        try {
          let res = await this.$api.register(
              this.username,
              this.password,
              this.Code
          );
          console.log(res);
          if (res.code === 200) {
            Toast(res.msg);
            this.$router.go(-1);
            this.$store.state.userInfo=res.userInfo
          }else{
            Toast(res.msg);
            this.replaceVerify()
            // this.username=''
            // this.password=''
            this.Code=''
          }
        }catch (e) {
          console.log(e);
        }
      },
      async login(){          //登录
        try {
          let res = await this.$api.login(
              this.username,
              this.password,
              this.Code
          );
          console.log(res);
          if (res.code === 200) {
            console.log(res)
            Toast(res.msg);
            this.$router.go(-1);
            localStorage.setItem('user', JSON.stringify(res.userInfo))
            this.$store.state.userInfo=res.userInfo
            this.$store.state.username=this.username
          }else{
            Toast(res.msg);
            this.replaceVerify()
            // this.username=''
            // this.password=''
            this.Code=''
          }
        }catch (e) {
          console.log(e);
        }
      },


    },
    mounted() {
      this.gerAverify()
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
  .back{
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    z-index: 1000;
    justify-content: center;
    background: #7d7e80;
    border-radius: 50%;
    position: fixed;
    top: 15px;
    left: 15px;
    img{
      width: 70%;
      height: 70%;
    }
  }
  .background{
    background: url("../../../public/images/timg.gif");
    background-size: 100% 100%;
    height: 660px;
    width: 100%;
    position: absolute;
    .box{
      width: 90%;
      border-radius: 10px;
      height: 300px;
      background: white;
      opacity: 0.5;
      margin-left: 5%;
      margin-top: 200px;
      .top{
        width: 100%;
        height: 45px;
        div{
          height: 45px;
          line-height: 45px;
          margin-left: 5%;
          font-size: 18px;
        }
      }
      .yanzhen{
        display: flex;
        .photo{
          width: 150px;
        }
      }
      .button{
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        .login{
          width: 100px;
          height: 40px;
          display: flex;
          border-radius: 10px;
          justify-content: center;
          align-items: center;
          color: white;
          background: #42b983;
          margin-left: 5%;
        }
        .register{
          width: 100px;
          height: 40px;
          display: flex;
          border-radius: 10px;
          justify-content: center;
          align-items: center;
          color: white;
          margin-left: 5%;
          background: red;
        }
      }
    }

  }

</style>

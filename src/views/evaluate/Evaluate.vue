<template>
  <div>
    <div class="top">              <!--顶部 -->
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">评价中心</div>
    </div>
    <div class="score">
      <img :src=list.image_path alt="" class="img">
      <div class="value">
        <div class="text">商品评分</div>
        <div class="star">
          <van-rate
              v-model="value"
              :size="25"
              color="#ee0a24"
              void-icon="star"
              void-color="#eee"
          />
        </div>
      </div>
    </div>
    <van-cell-group>
      <van-field
          v-model="message"
          rows="5"
          type="textarea"
          placeholder="说说你的购买感受吧~~"
          show-word-limit
          class="textarea"
      />
    </van-cell-group>
    <div class="upload">
      <van-uploader :after-read="afterRead" class="upload_photo" />
    </div>
    <div class="anonymous">
      <div class="anonymous_button">
        <van-checkbox v-model="checked" @click="check"> 匿名评价</van-checkbox>
      </div>
    </div>
    <div class="onsubmit">
      <van-button type="primary" class="submit" @click="submit">提交</van-button>
    </div>
  </div>
  
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "Evaluate",
    components: {},
    props: {},
    data() {
      return {
        checked: false,          //判断是否匿名
        value: 0,                //评分值
        list:{},                 //需要评论的商品
        message:''                //装输入的评论内容
      }
    },
    methods: {
      back(){
        this.$router.go(-1)         //返回上一步操作
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file);
      },
      check(){
        this.checked=!this.checked        //是否匿名
      },
      async submit(){                  //提交评论
        try {
          let res=await this.$api.comment({
            id: this.list.cid,
            rate: this.value,
            content: this.message,
            anonymous: this.checked,
            _id: this.list._id,
            order_id:this.list.order_id,
            image:[]
          });
          if(res.code===200){
            Toast(res.msg);
            this.$router.push('/evaluation_center')
          }
        }catch (e) {
          console.log(e);
        }
      },
    },
    mounted() {
      this.list = this.$route.query.item
      // console.log(this.list,1);
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
  .score{
    width: 100%;
    height: 100px;
    background: white;
    margin-top: 40px;
    display: flex;
    .img{
      width: 90px;
      height: 90px;
      margin-top: 10px;
      margin-left: 20px;
    }
    .value{
      width: 220px;
      height: 100px;
      margin-left: 30px;
      .text{
        height: 30px;
        line-height: 30px;
        margin-top: 10px;
      }
      .star{
        margin-top: 20px;
      }
    }
  }
  .textarea{
    background: #f2f2f2;
    border: none;
  }
  .upload{
    width: 100%;
    height: 100px;
    background: #f2f2f2;
    .upload_photo{
      margin: 10px 0 0 20px;
    }
  }
  .anonymous{
    width: 100%;
    height: 40px;
    .anonymous_button{
      margin: 10px 0 0 20px;
    }
  }
  .onsubmit{
    width: 100%;
    .submit{
      width: 90%;
      margin-left: 5%;
    }
  }

</style>

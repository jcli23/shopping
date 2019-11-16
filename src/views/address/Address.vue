<template>
  <div>
    <div class="top">
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">地址列表</div>
    </div>                   <!-- 头部 -->
    <div v-if="list.length===0">            <!-- 地址没有创建国，暂无地址 -->
      <div class="none">暂无收货地址~~</div>
      <van-button type="danger" class="button" @click="onAdd">新增地址</van-button>   <!-- 新增地址按钮 -->
    </div>
    <div class="list" v-else>     <!-- 地址列表 -->
      <van-address-list
          v-model="chosenAddressId"
          :list="list"
          @add="onAdd"
          @edit="onEdit"
          @select="sendselect"
      />
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Address",
    components: {},
    props: {},
    data() {
      return {
        chosenAddressId: '',      //装选择地址ID
        list: [],                //装所有地址
      }
    },
    methods: {
      back(){
        this.$router.push('/order_settlement')     //选择地址，返回结算页面
      },
      async getAddress(){
        try {
          let res=await this.$api.getAddress();      //获取地址
          if(res.code===200){
            res.address.map(item=>{
              item.address=`${item.city}${item.county}${item.addressDetail}`   //地址拼接
            })
            this.list=res.address
            let id=0;
            console.log(this.list);
            this.list.map(item=>{
              id+=1;
              this.$set(item,"id",id.toString())    //在地址信息里创建id，用来判断
            })
          }
        }catch (e) {
          console.log(e);
        }
      },
      sendselect(item){
        this.chosenAddressId=item.id                  //重新选择地址时，将地址id和信息传过去，并返回结算
        console.log(this.chosenAddressId,1);
        this.$router.push({name:'order_settlement',query:{addresschoose:item}})
      },
      onAdd() {
        this.$router.push('/addressEdit')      //新增地址跳转地址编辑
      },
      onEdit(item){
        this.$router.push({name:'addressEdit',query:{info:item}})    //修改地址跳转地址编辑，并传此地址的详细信息，用来地址默认信息
      }
    },
    mounted() {
      this.getAddress()
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
    z-index: 2000;
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
  .none{
    font-size: 18px;
    width: 50%;
    text-align: center;
    color: #666666;
    position: relative;
    top: 150px;
    left: 25%;
  }
  .button{
    width: 100%;
    height: 55px;
    position: absolute;
    bottom: 0;
  }
  .list{
    position: relative;
    top: 40px;
  }
</style>

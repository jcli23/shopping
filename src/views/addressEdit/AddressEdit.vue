<template>
  <div>
    <div class="top">     <!-- 头部 -->
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">编辑地址</div>
    </div>
    <div class="list">      <!-- 地址编辑 -->
      <van-address-edit
          :area-list="area"
          :address-info="info"
          show-postal
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
          @change-default="sendDefault"
      />
    </div>
  </div>
  
</template>

<script>
  import { Toast } from 'vant';
  import area from '../../http/area'
  export default {
    name: "AddressEdit",
    components: {},
    props: {},
    data() {
      return {
        area,
        info:{},
        searchResult: [],
        address:''
      }
    },
    methods: {
      back(){
        this.$router.go(-1)   //返回上一级操作页面
      },
      async sendDefault(value){
        if(this.info!==undefined) {
          if (value) {
            try {
              let res = await this.$api.setDefaultAddress(this.info.uid);   //默认地址
              if (res.code === 200) {
                Toast(res.msg)
              } else {
                Toast(res.msg)
              }
            }catch (e) {
              console.log(e);
            }
          }
        }
      },
      async onSave(content){
        this.address=content.province+content.city+content.county+content.addressDetail;   //地址拼接
        this.$set(content,"address",this.address);      //将拼接的完整地址，存入到信息里
        this.info===undefined ? "":this.$set(content,"id",this.info._id)      //如果地址有值，在内容里新建一个id
        // content.item=this.item ? this.item._id:undefined
        try {
          let res=await this.$api.postAddress({...content});    //修改的地址信息直接存入库
          if (res.code===200){
            Toast(res.msg);
            console.log(res,1);
            this.$router.go(-1)
          }else {
            Toast(res.msg);
          }
        }catch (e) {
          console.log(e);
        }
      },
      async onDelete() {
        try {
          let res=await this.$api.deleteAddress(this.info._id);  //通过id删除单条地址信息
          if (res.code===200){
            Toast(res.msg);
            this.$router.go(-1)
          }else {
            Toast(res.msg);
          }
        }catch (e) {
          console.log(e);
        }
      },
    },
    mounted() {
      this.info = this.$route.query.info    //接收传来的地址信息
      console.log(this.info,2);
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
  .list{
    position: relative;
    top: 40px;
  }
</style>

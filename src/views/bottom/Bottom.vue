<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home-o" @click="go('/mall')">商城</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" @click="go('/classification')">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" @click="go('/shopping_cart')">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="go('/my')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: "Bottom",
    components: {

    },
    props: {},
    data() {
      return {
        value:'',
        active: 0,
        city:''
      }
    },
    methods: {
      go(path){
        this.$router.push(path)
      },
    },
    mounted() {

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

</style>

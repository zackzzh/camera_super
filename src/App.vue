<template>
  <div id="app">
    <t-header v-if="show"></t-header>
    <router-view />
    <div class="chat">
      <a href="tencent://message/?uin=983259423&Site=sc.chinaz.com&Menu=yes" class="chat-child">
        <i class="iconfont icon-wodekefu"></i>
        <div>{{$t('productDetail.onlineService')}}</div>
      </a>
    </div>
    <el-footer style="height:330px;">
      <c-footer></c-footer>
    </el-footer>
  </div>
</template>
<script>
  import theader from "@/components/common/theader.vue";
  import cfooter from "@/components/common/cfooter.vue";
  import {
    mapState,
    mapActions,
    mapGetters
  } from "vuex";
  export default {
    name: "App",
    data() {
      return {
        show: false,
        showF: false
      }
    },
    components: {
      "t-header": theader,
      "c-footer": cfooter
    },
    created: function () {
      this.getRate();
      let index = this.$route.path.indexOf('login');
      let footer = this.$route.path.indexOf('about');
      if (index > 0) {
        this.show = false;
      } else {
        this.show = true;
      }
      if (footer > 0) {
        this.showF = false;
      } else {
        this.showF = true;
      }
    },
    methods: {
      ...mapActions("common", ['getRate']),
      // checkInstalled() {
      //   // if (new ActiveXObject("TimwpDll.TimwpCheck")) {
      //   //   alert('you')
      //   // } else {
      //   //   alert('no')
      //   // }
      // }
    },
    watch: { //监听路由变化
      $route(to, from) {
        let index = to.path.indexOf('login');
        let footer = to.path.indexOf('about');
        if (index > 0) {
          this.show = false;
        } else {
          this.show = true;
        }
        if (footer > 0) {
          this.showF = false;
        } else {
          this.showF = true;
        }
      }

    }

  };

</script>

<style>
  body,
  html {
    margin: 0px;
    padding: 0px;
    top: 0px !important;
  }

  .goog-te-banner-frame {
    visibility: hidden !important;
  }

  .el-header {
    background: #fff;
    padding: 0px;
  }

  .chat {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 86px;
    height: 86px;
    margin: auto;
    background: #EEEDED;
    border-radius: 50%;
  }

  .chat a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 86px;
    text-align: center;
    text-decoration: none;
    color: #101010;
    font-size: 12px;
  }

  .chat a .icon-wodekefu {
    font-size: 40px;
    color: #09C6CE;
  }

  .el-footer {
    display: flex;
    padding: 0px !important;
  }

  .el-container {
    width: 1200px;
    margin: 0 auto;
    min-height: 517px;
    display: inherit !important;
  }

  #app {
    position: relative;
    background: #f8f8f8;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>

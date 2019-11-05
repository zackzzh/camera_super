<template>
  <div class="headerall">
    <div class="header">
      <div class="logo" @click="$go('/')">
        <img src="../../assets/images/logo.png" alt>
        <div>{{$t('header.logoNmae')}}</div>
      </div>
      <div class="header-two-left">
        <el-tabs v-model="tabsActive" @tab-click="handleClick" v-if="userType==1">
          <el-tab-pane :label="$t('header.tabsHomeOne')" name="/"></el-tab-pane>
          <el-tab-pane :label="$t('header.tabsHomeTwo')" name="product"></el-tab-pane>
          <el-tab-pane :label="$t('header.tabsHomeThree')" name="enquire"></el-tab-pane>
          <el-tab-pane :label="$t('header.tabsHomeFour')" name="order"></el-tab-pane>
        </el-tabs>
        <el-tabs v-model="tabsActive" @tab-click="handleClick" v-if="userType==2">
          <el-tab-pane label="首页" name="/"></el-tab-pane>
          <el-tab-pane label="订单" name="manageOrder"></el-tab-pane>
          <el-tab-pane label="发布" name="manageProduct"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="header-two-right">
        <el-select v-model="selectValue" @change="langChange" placeholder="请选择" v-if="userType==1" size="mini">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div class="one" v-if="!is_login">
          <i class="iconfont icon-1USER"></i>
          <el-button type="text" size="small" @click="$go('login')">{{$t('header.login')}}</el-button>
          <el-button type="text" size="small" @click="$go('register')">{{$t('header.register')}}</el-button>
        </div>
        <el-dropdown @command="nav" v-else>
          <span class="one el-dropdown-link">
            <i class="iconfont icon-1USER"></i>
            {{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="basicSet">{{$t('header.basicSet')}}</el-dropdown-item>
            <el-dropdown-item command="out">{{$t('header.Logout')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="message">
          <el-badge :value="message">
            <el-button icon="iconfont icon-xinxi1" @click="$go('message')" type="text"></el-button>
          </el-badge>
        </div>
        <!-- <div class="three" v-if="userType==1">
          <el-badge :value="cart">
            <el-button icon="iconfont icon-order" @click="$go('cart')"></el-button>
          </el-badge>
        </div>-->
        <div class="three" v-if="userType==1">
          <el-badge :value="cart">
            <el-button icon="iconfont icon-cart" @click="$go('cart')"></el-button>
          </el-badge>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import session from "@/libs/session";
  import {
    mapState,
    mapActions,
    mapGetters
  } from "vuex";
  export default {
    name: "cfooter",
    data() {
      return {
        tabsActive: "",
        shopText: true,
        is_login: false,
        username: "",
        userType: null,
        selectValue: "",
        options: [{
            value: "cn",
            label: "简体"
          },
          {
            value: "en",
            label: "English"
          },
          {
            value: "tc",
            label: "繁体"
          }
        ]
      };
    },
    created: function () {
      let username = session.getHistory("username");
      let is_login = session.getHistory("is_login");
      let userType = session.getHistory("userType");
      let language = session.getlocalHistory("lang");
      if (username) {
        this.username = username;
      }
      if (is_login) {
        this.is_login = true;
      } else {
        this.is_login = false;
      }
      if (userType) {
        this.userType = Number(userType);
        if (this.userType === 1) {
          if (language) {
            this.language(language);
            this.$i18n.locale = language;
            this.selectValue = this.options.find(data => {
              return data.value === language;
            }).label;
          } else {
            this.language("en");
            this.$i18n.locale = "en";
            this.selectValue = "English";
          }
        } else {
          this.language("cn");
          this.$i18n.locale = "cn";
          this.selectValue = "简体";
        }
      } else {
        this.userType = 1;
        if (language) {
          this.language(language);
          this.$i18n.locale = language;
          this.selectValue = this.options.find(data => {
            return data.value === language;
          }).label;
        } else {
          this.language("en");
          this.selectValue = "English";
        }
      }
      if (this.is_login) {
        this.getMsgNum();
      }
    },
    watch: {
      $route(to, from) {
        switch (to.name) {
          case "home":
            this.tabsActive = "/";
            break;
          case "product":
            this.tabsActive = "product";
            break;
          case "enquire":
            this.tabsActive = "enquire";
            break;
          case "order":
            this.tabsActive = "order";
            break;
          case "manageOrder":
            this.tabsActive = "manageOrder";
            break;
          case "manageProduct":
            this.tabsActive = "manageProduct";
            break;
          default:
            this.tabsActive = "";
            break;
        }
      }
    },
    components: {},
    computed: {
      ...mapState("cart", ["cart", "message"])
    },
    methods: {
      ...mapActions("common", ["language", "getRate"]),
      ...mapActions("cart", ["getMsgNum"]),
      /**
       * 经销商鼠标经过触发
       */
      over() {
        this.shopText = true;
      },
      /**
       * 经销商鼠标离开触发
       */
      out() {
        this.shopText = false;
      },

      // 语言切换
      langChange(lang) {
        session.addlocalHistory("lang", lang);
        this.$i18n.locale = lang;
        switch (lang) {
          case "cn":
            this.lang = "简体";
            break;
          case "en":
            this.lang = "English";
            break;
          case "tc":
            this.lang = "中文繁体";
            break;
        }
        this.language(lang);
        this.getRate();
      },
      nav(nav) {
        if (nav === "out") {
          this.loginOut();
        } else {
          this.$go(nav);
        }
      },
      handleClick(tab, event) {
        this.$go(tab.name);
      },
      loginOut() {
        session.clearHistory("username");
        session.clearHistory("is_login");
        session.clearHistory("userType");
        session.clearHistory("token");
        this.$message({
          message: "退出成功",
          type: "success"
        });
        if (this.userType === 1) {
          this.$go("/");
          location.reload();
        } else {
          this.$go("login");
        }
      }
    }
  };

</script>
<style lang="less" scoped>
  /deep/ .el-select-dropdown {
    min-width: 0px !important;
  }

  .headerall {
    position: relative;
    width: 100%;
    background: #2d2c2c;

    /deep/ .el-menu.el-menu--horizontal {
      background-color: #2d2c2c;
      display: flex;
      justify-content: flex-end;

      .el-badge__content.is-fixed {
        top: 23px;
        right: 1px;
      }
    }

    /deep/ .el-input {
      width: 56%;
      left: 65px;
    }

    .goog-te-combo {
      border: none;
      height: 30px;
      margin-right: 35px;
      border-radius: 4px;
    }

    .header {
      width: 1200px;
      height: 120px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      .header-two-left {
        /deep/ .el-tabs__item {
          font-size: 20px;
          color: #bbbbbb;
        }

        /deep/ .el-tabs__nav-wrap::after {
          background: transparent;
        }

        /deep/ .el-tabs__item.is-active {
          color: #bbbbbb;
          font-size: 22px;
        }

        /deep/ .el-tabs__active-bar {
          background: transparent;
        }

        /deep/ .el-tabs__header {
          margin: 0px;
        }
      }

      .logo {
        cursor: pointer;
        font-size: 20px;
        color: #bbbbbb;
        flex-shrink: 1;
        width: 120px;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 78px;
          height: 58px;
        }
      }

      .header-two-right {
        display: flex;
        align-items: center;

        .one {
          margin-right: 20px;
          display: flex;
          align-items: center;
          color: #bbbbbb;

          .icon-1USER {
            font-size: 30px;
            margin-right: 10px;
          }
        }

        .two {
          margin-right: 57px;

          .icon-xinxi {
            margin-right: 10px;
            font-size: 24px;
            top: 3px;
            position: relative;
          }

          /deep/ .el-badge__content.is-fixed {
            top: 10px;
          }
        }

        .three {
          width: 120px;
          height: 120px;
          cursor: pointer;
          margin-left: 10px;

          .icon-gouwu {
            font-size: 28px;
          }

          .bottom {
            position: absolute;
          }

          /deep/ .el-button {
            width: 120px;
            height: 120px;
            background: #fff;
            color: #000;
            border-radius: 0px;
            border: none;

            .icon-cart,
            .icon-order {
              font-size: 28px;
            }
          }

          /deep/ .el-badge__content.is-fixed {
            top: 38%;
            right: 50%;
          }
        }

        .message {
          width: 40px;

          /deep/ .icon-xinxi1 {
            margin-right: 5px;
            position: relative;
            top: 2px;
          }

          /deep/ .el-badge__content.is-fixed {
            top: 5px !important;
          }
        }

        .three:hover {
          .el-button {
            background: #ccc;
            color: #fff;

            .icon-cart,
            .icon-order {
              font-size: 28px;
            }
          }
        }
      }

      .el-button--text {
        color: #bbbbbb;
        font-size: 16px;
      }
    }
  }

</style>

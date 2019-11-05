<template>
  <div class="homesupplier">
    <div class="banner">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <el-card class="box-card">
            <img :src="item.picUrl" alt>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="search">
      <el-input :placeholder="$t('home.placeholder')" v-model="keyword" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="two-info">
      <div class="active">
        <div class="title">
          <div class="big-title">{{$t('home.serviceDynamics')}}</div>
          <div class="small-title">Service dynamics</div>
        </div>
        <div class="home-service-list">
          <div class="home-service-item" v-for="(item, index) in newsList" :key="index" @click="toHomeService(item)">
            <div class="left"><i class="iconfont icon-dian"></i>{{item.title}}</div>
            <div class="right">
              {{item.createtime}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-recom">
      <div class="title">
        <div class="big-title">{{$t('home.recommendCommodities')}}</div>
        <div class="small-title">Recommend commodities</div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('home.recommend')" name="one"></el-tab-pane>
        <el-tab-pane :label="lang==='en'?item.nameEn:item.name" :name="lang==='en'?item.nameEn:item.name" v-for="(item, index) in goodsCategoryList" :key="index"></el-tab-pane>
      </el-tabs>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in goodsList" :key="index">
          <div class="grid-content bg-purple" @click.stop="toProduct(item)">
            <div class="img">
              <img :src="item.picHead" alt>
            </div>
            <el-tooltip class="item" effect="dark" :content="item.title" placement="top" popper-class="top-title">
              <div class="title1">
                <span v-if="lang==='en'">{{item.titleEn}}</span>
                <span v-else>{{item.title}}</span>
              </div>
            </el-tooltip>
            <div class="price">
              <div class="price-top">
                <span v-if="lang === 'cn'">￥{{(item.price * rate).toFixed(2)}}</span>
                <span v-if="lang === 'en'">${{(item.price * rate).toFixed(2)}}</span>
                <span v-if="lang === 'tc'">HK${{(item.price * rate).toFixed(2)}}</span>
              </div>
              <div class="add" @click.stop="add(item)">
                <i class="iconfont icon-cartplus"></i>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="recom-more">
        <el-button type="text" @click="more">{{$t('home.more')}}</el-button>
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
    name: "homeSuuplier",
    data() {
      return {
        activeName: "one",
        keyword: "",
        bannerList: [],
        goodsCategoryList: [],
        goodsList: [],
        category: {},
        newsList: []
      };
    },

    computed: {
      ...mapState("common", ["lang", "rate"]),
    },
    created: function () {
      /**
       * 数据初始化
       */
      this.load();
    },
    methods: {
      ...mapActions("cart", ["addCart"]),
      /**
       * 供应商
       */

      load() {
        this.$api.home.customer({}).then(res => {
          if (res.code == 200) {
            this.newsList = res.newsList;
            this.bannerList = res.bannerList;
            this.goodsCategoryList = res.goodsCategoryList;
            this.goodsList = res.goodsList;
          }
        });
      },
      /**
       * 搜索型号
       */
      search() {
        this.$api.product
          .list({
            page: 1,
            limit: 28,
            title: this.keyword,
            categoryId: this.category.id
          })
          .then(res => {
            if (res.code == 200) {
              this.goodsList = res.page.list;
            }
          });
      },
      /**
       * 服务动态
       */
      toHomeService(item) {
        this.$router.push({
          path: 'homeService',
          query: {
            item: JSON.stringify(item)
          }
        })
        // this.$go('homeService?item=' + JSON.stringify(item))
      },
      /**
       * 推荐筛选
       */
      handleClick(tab, event) {
        let categoryId;
        this.activeName = tab.name;
        switch (Number(tab.index)) {
          case 0:
            categoryId = "";
            break;
          default:
            categoryId = this.goodsCategoryList[Number(tab.index) - 1].id;
            break;
        }
        this.category = this.goodsCategoryList[Number(tab.index) - 1];

        this.$api.product
          .list({
            page: 1,
            limit: 28,
            categoryId: categoryId,
            title: this.keyword,
          })
          .then(res => {
            if (res.code == 200) {
              this.goodsList = res.page.list;
            }
          });
      },
      /**
       * 跳转产品列表
       */
      more() {
        this.category.keyword = this.keyword;
        this.$go('product?category=' + JSON.stringify(this.category))
      },
      /**
       * 跳转详情
       */
      toProduct(item) {
        this.$go('productDetail?id=' + item.id)
      },
      /**
       * 加入购物车
       */
      add(item) {
        let data = {
          goodsId: item.id,
          count: 1,
          color: item.color,
          price: item.price,
          totalPrice: item.price * 1,
          goodsStockId: item.goodsStockId
        };
        this.addCart(data).then(res => {
          if (res) {
            switch (res.code) {
              case 200:
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                break;
              case 503:
                break;
              default:
                this.$message({
                  message: res.msg,
                  type: "error"
                });
                break;
            }
          }
        });
      }
    }
  };

</script>
<style lang="less" scoped>
  .homesupplier {
    .recom-more {
      display: flex;
      justify-content: flex-end;

      /deep/ .el-button {
        font-size: 18px;
      }
    }

    .banner {
      margin-top: 40px;
    }

    .search {
      margin: 40px auto;
      margin-bottom: 0px;
      width: 450px;
      height: 50px;
    }

    margin-bottom: 30px;

    /deep/ .el-tabs--top {
      width: 100%;
    }

    /deep/ .el-tabs__nav-prev,
    /deep/ .el-tabs__nav-next {
      i {
        font-size: 20px;
      }
    }

    /deep/ .el-tabs__nav-wrap::after {
      background: none;
    }

    /deep/ .el-carousel__container {
      height: 500px;

      .el-card__body {
        padding: 0px;
      }
    }

    .two-info {
      padding-top: 40px;
      display: flex;
      align-items: center;

      .active {
        width: 100%;

        .home-service-list {
          .home-service-item {
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            line-height: 55px;

            .icon-dian {
              margin: 0px 20px;
            }

            .left {
              width: 70%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .right {
              width: 30%;
              text-align: right;
            }
          }

          .home-service-item:hover {
            color: #7679df;
          }
        }
      }
    }

    .home-recom {
      width: 100%;
      padding-top: 80px;

      .img {
        width: 100%;
        height: 200px;
        display: flex;

        img {
          height: 150px;
          margin: 0 auto;
          margin-top: 25px;
        }
      }

      .title1 {
        font-weight: bold;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #000;
        font-size: 16px;
        padding: 0px 20px;
      }

      .price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;

        .price-top {
          display: flex;
          align-items: baseline;
          font-size: 12px;

          span {
            font-size: 18px;
            color: red;
            font-weight: bold;
            margin-left: 5px;
          }
        }

        .add {
          font-size: 14px;

          .icon-jiahao1 {
            margin-right: 5px;
          }
        }
      }

      .bg-purple {
        background: #fff;
      }

      .grid-content {
        cursor: pointer;
        border-radius: 4px;
        min-height: 36px;
        margin-bottom: 20px;
      }
    }

    .title {
      text-align: center;
      color: #07010d;
      margin-bottom: 50px;

      .big-title {
        font-size: 28px;
        margin-bottom: 5px;
      }

      .small-title {
        font-size: 14px;
      }
    }

    /deep/ .el-tabs__item {
      font-size: 22px;
      color: #8b8b8b;
    }

    /deep/ .el-tabs__nav-wrap::after {
      background: transparent;
    }

    /deep/ .el-tabs__item.is-active {
      color: #07010d;
      font-weight: bold;
      font-size: 24px;
    }

    /deep/ .el-tabs__active-bar {
      background: transparent;
    }
  }

</style>

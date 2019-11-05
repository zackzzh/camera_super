<template>
  <div>
    <div class="banner">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <el-card class="box-card">
            <img :src="item.picUrl" alt="">
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="technical">
      <div class="title">
        <div class="big-title">我们的优势</div>
        <div class="small-title">Our advantages</div>
      </div>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, key) in advantageList" :key=key>
          <img :src="item.logoUrl" alt="">
          <div class="technical-item-one">{{item.title}}</div>
          <div class="technical-item-two">{{item.subtitle}}</div>
        </el-col>
      </el-row>
    </div>
    <div class="two-info">
      <div class="active">
        <div class="title">
          <div class="big-title">服务动态</div>
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
      <div class="advantage">
        <div class="title">
          <div class="big-title">技术支持</div>
          <div class="small-title">Technical support</div>
        </div>
        <div class="advantage-item" v-for="(item, key) in supportList" :key="key">
          <div class="advantage-item-left">
            <img :src="item.logoUrl" alt="">
          </div>
          <div class="advantage-item-right">
            <div class="big-title">{{item.titleOne}}</div>
            <div class="small-title">{{item.titleTwo}}</div>
            <div>{{item.titleThree}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="release">
      <div class="title">
        <div class="big-title">我要发布商品</div>
        <div class="small-title">Release commodities</div>
      </div>
      <div class="home-look-list">
        <div v-for="(item, key) in releaseList" :key="key" class="home-look-big">
          <div class="home-look-item">
            <img :src="item.logoUrl" alt="">
            <div v-if="item.showIndex == 1">第一步</div>
            <div v-if="item.showIndex == 2">第二步</div>
            <div v-if="item.showIndex == 3">第三步</div>
            <div v-if="item.showIndex == 4">第四步</div>
            <div class="small">{{item.name}}</div>
          </div>
          <i class="iconfont icon-jiantou-you" v-if="item.showIndex !== 4"></i>
        </div>
      </div>
    </div>
    <div class="home-partner">
      <div class="title">
        <div class="big-title">供应商伙伴</div>
        <div class="small-title">Supplier partners</div>
      </div>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, key) in partnerList" :key="key">
          <img :src="item.logoUrl" alt="">
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    name: "home",
    data() {
      return {
        bannerList: [],
        newsList: [],
        advantageList: [],
        releaseList: [],
        partnerList: [],
        supportList: []
      }
    },
    created: function () {
      this.loadTwo();
    },
    methods: {
      /**
       * 供应商
       */
      loadTwo() {
        this.$api.home.supplier().then((res) => {
          if (res.code == 200) {
            this.bannerList = res.bannerList;
            this.newsList = res.newsList;
            this.advantageList = res.advantageList
            this.releaseList = res.releaseList
            this.partnerList = res.partnerList;
            this.supportList = res.supportList;
          }
        })
      },
      handleClick(tab, event) {
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
    }
  }

</script>
<style lang="less" scoped>
  .banner {
    margin-top: 50px;
  }

  /deep/ .el-card__body {
    padding: 0px;
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

  .technical {
    width: 100%;
    text-align: center;
    padding-top: 80px;

    img {
      margin-bottom: 12px;
    }

    .technical-item-one {
      font-size: 20px;
      margin-bottom: 5px;
    }

    .technical-item-two {
      font-size: 12px;
    }
  }

  .two-info {
    padding-top: 80px;
    display: flex;
    align-items: center;

    .active {
      width: 60%;

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

    .advantage {
      width: 40%;

      .advantage-item {
        display: flex;
        align-items: center;
        justify-content: center;

        .advantage-item-left {
          img {
            margin-right: 30px;
          }
        }

        .advantage-item-right {
          .big-title {
            font-size: 28px;
            margin-bottom: 5px;
            color: #07010d;
          }

          .small-title {
            font-size: 14px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }

  .release {
    width: 100%;
    text-align: center;
    padding-top: 80px;

    .home-look-list {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .home-look-big {
        display: flex;
        align-items: center;
      }

      .home-look-item {
        text-align: center;

        img {
          margin-bottom: 5px;
        }

        .small {
          margin: 5px 0px;
          font-size: 12px;
        }
      }

      .icon-jiantou-you {
        font-size: 40px;
        position: relative;
        top: -20px;
        left: 65px;
      }
    }
  }

  .home-partner {
    width: 100%;
    padding-top: 80px;

    .home-title {
      margin-bottom: 20px;
      font-size: 26px;
      width: 100%;
      text-align: center;
    }

    .el-row {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .el-col {
      border-radius: 4px;
    }

    .bg-purple-dark {
      background: #99a9bf;
    }

    .bg-purple {
      background: #d3dce6;
    }

    .bg-purple-light {
      background: #e5e9f2;
    }

    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }

    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }

  }

</style>

<template>
  <div class="page-about">
    <el-container>
      <div class="card">
        <el-card>
          <div class="big-title">
            <!-- {{$t('footer.Billing')}} -->
            <span class="line"></span> <span>{{aboutUs.title}}</span> <span class="line"></span>
          </div>
          <div class="small-title">
            {{aboutUs.subtitle}}
          </div>
          <div class="banner">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                <el-card class="box-card">
                  <img :src="item" alt>
                </el-card>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- <div class="invoice-content">
            <img :src=" invoiceInfo.picUrl" alt="">
          </div> -->
          <div class="invoice-content" id="content">
          </div>
        </el-card>
      </div>
    </el-container>
  </div>

</template>

<script>
  export default {
    name: 'aboutc',
    data() {
      return {
        aboutUs: {},
        bannerList: []
      }
    },
    created: function () {
      this.load();
    },
    methods: {
      load() {
        this.$api.footer.getAboutUs({})
          .then((res) => {
            if (res.code == 200) {
              this.aboutUs = res.aboutUs
              setTimeout(() => {
                document.getElementById('content').innerHTML = res.aboutUs.content
              }, 500);
              this.bannerList = res.aboutUs.picUrl.split(';')
            }
          })
      }
    },
  }

</script>

<style scoped lang="less">
  .page-about {
    /deep/ .el-carousel__container {
      height: 500px;

      .el-card__body {
        padding: 0px;
      }
    }

    .card {
      margin: 40px 0px;

      /deep/ .el-card {
        min-height: 517px;
      }
    }

    img {
      width: 100%;
    }

    .big-title {
      width: 100%;
      margin: 40px auto;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        display: inline-block;
        margin: 0px 10px;
        font-size: 30px;
      }

      .line {
        display: inline-block;
        width: 50px;
        height: 2px;
        background: #ccc;
      }
    }

    .small-title {
      width: 100%;
      font-size: 18px;
      margin-bottom: 10px;
    }

    .privacy-content {
      font-size: 14px;
      color: #666;
    }
  }

</style>

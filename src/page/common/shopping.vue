<template>
  <div class="page-shoping">
    <el-container>
      <div class="card">
        <el-card>
          <div class="big-title">
            <span class="line"></span>
            <span>{{$t('footer.process')}}</span>
            <span class="line"></span>
          </div>
          <div class="small-title title">
            {{shoppingProcess.title}}
          </div>
          <div class="small-title">
            {{shoppingProcess.subtitle}}
          </div>
          <div class="invoice-content">
            <img :src=" shoppingProcess.picUrl" alt="">
          </div>
          <div class="shoping-content" id="center"></div>
        </el-card>
      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "shopping",
    data() {
      return {
        shoppingProcess: {}
      };
    },
    created: function () {
      this.load();
    },
    methods: {
      load() {
        this.$api.footer.getShoppingProcess({}).then(res => {
          if (res.code == 200) {
            this.shoppingProcess = res.shoppingProcess;
          }
        });
      }
    }
  };

</script>

<style scoped lang="less">
  .page-shoping {
    .card {
      margin: 40px 0px;

      /deep/ .el-card {
        min-height: 517px;
      }
    }

    img {
      width: 100%;
    }

    .small-title {
      width: 100%;
      font-size: 18px;
      margin-bottom: 10px;
    }

    .title {
      text-align: center;
      font-size: 22px;
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

    .shoping-content {
      font-size: 14px;
      color: #666;
    }
  }

</style>

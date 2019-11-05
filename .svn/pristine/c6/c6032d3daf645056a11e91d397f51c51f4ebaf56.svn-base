<template>
  <div class="page-invoice">
    <el-container>
      <div class="card">
        <el-card>
          <div class="big-title">
            <!-- {{$t('footer.Billing')}} -->
            <span class="line"></span> <span>{{invoiceInfo.title}}</span> <span class="line"></span>
          </div>
          <div class="small-title">
            {{invoiceInfo.subtitle}}
          </div>
          <div class="invoice-content">
            <img :src=" invoiceInfo.picUrl" alt="">
          </div>
          <div class="invoice-content" id="content">
          </div>
        </el-card>
      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'invoice',
    data() {
      return {
        invoiceInfo: {}
      }
    },
    created: function () {
      this.load()
    },
    methods: {
      load() {
        this.$api.footer.getInvoice({})
          .then((res) => {
            if (res.code == 200) {
              this.invoiceInfo = res.invoiceInfo
              setTimeout(() => {
                document.getElementById('content').innerHTML = res.invoiceInfo.remark
              }, 500);
            }
          })
      }
    }
  }

</script>

<style scoped lang="less">
  .page-invoice {
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

    .invoice-content {
      display: flex;
      justify-content: center;
      img {
        margin-bottom: 10px;
      }
    }
  }

</style>

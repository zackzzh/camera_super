<template>
  <div class="page-privacy">
    <el-container>
      <div class="card">
        <el-card>
          <div class="big-title">
            <!-- {{$t('footer.Policy')}} -->
            <span class="line"></span> <span>{{rulesInfo.title}}</span> <span class="line"></span>
          </div>
          <div class="small-title">
            {{rulesInfo.subtitle}}
          </div>
          <div class="privacy-content" id="content">
          </div>
        </el-card>
      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'privacy',
    data() {
      return {
        rulesInfo: {}
      }
    },
    created: function () {
      this.load()
    },
    methods: {
      load() {
        this.$api.footer.getRules({})
          .then((res) => {
            if (res.code == 200) {
              this.rulesInfo = res.rulesInfo
              setTimeout(() => {
                document.getElementById('content').innerHTML = res.rulesInfo.content
              }, 500);
            }
          })
      }
    }
  }

</script>

<style scoped lang="less">
  .page-privacy {
    .card {
      margin: 40px 0px;

      /deep/ .el-card {
        min-height: 517px;
      }
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
    }

    .privacy-content {
      font-size: 14px;
      color: #666;
    }
  }

</style>

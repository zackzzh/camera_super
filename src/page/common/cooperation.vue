<template>
  <div class="page-cooperation">
    <el-container>
      <div class="card">
        <el-card>
          <div class="big-title">
            <!-- {{$t('footer.Service')}} -->
            <span class="line"></span> <span>{{protocolInfo.title}}</span><span class="line"></span>
          </div>
          <div class="small-title">
            {{protocolInfo.subtitle}}
          </div>
          <div class="shoping-content" id="content">
          </div>
        </el-card>
      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'cooperation',
    data() {
      return {
        protocolInfo: {}
      }
    },
    created: function () {
      this.load()
    },
    methods: {
      load() {
        this.$api.footer.getProtocol({})
          .then((res) => {
            if (res.code == 200) {
              this.protocolInfo = res.protocolInfo
              setTimeout(() => {
                document.getElementById('content').innerHTML = res.protocolInfo.content
              }, 500);
            }
          })
      }
    }
  }

</script>

<style scoped lang="less">
  .page-cooperation {
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

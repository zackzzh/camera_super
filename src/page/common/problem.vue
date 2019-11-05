<template>
  <div class="page-problem">
    <el-container>
      <div class="card">
        <el-card>
          <div class="big-title">
            <span class="line"></span> <span>{{$t('footer.problem')}}</span> <span class="line"></span>
          </div>
          <div class="problem-list" v-if="FAQList.length>0">
            <div class="list-item" v-for="(item, key) in FAQList" :key="key">
              <div class="item-title">{{key+1}}、{{item.question}}</div>
              <div class="item-content">{{item.answer}}</div>
            </div>
          </div>
        </el-card>
      </div>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'problem',
    data() {
      return {
        FAQList: []
      }
    },
    created: function () {
      this.load()
    },
    methods: {
      load() {
        this.$api.footer.getFAQ({})
          .then((res) => {
            if (res.code == 200) {
              this.FAQList = res.FAQList
            }
          })
      }
    }
  }

</script>

<style scoped lang="less">
  .page-problem {
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

    .problem-list {
      .list-item {
        margin-bottom: 20px;

        .item-title {
          font-size: 18px;
        }

        .item-content {
          margin-top: 5px;
          text-indent: 30px;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }

</style>

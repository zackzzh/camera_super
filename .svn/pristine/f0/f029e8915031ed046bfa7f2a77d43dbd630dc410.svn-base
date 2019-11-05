<template>
  <div class="manage">
    <el-container>
      <div class="basic">
        <div class="basic-left">
          <el-card>
            <div class="title"><i class="iconfont icon-gouwucheman"></i>订单管理</div>
            <div class="tree">
              <div class="item" @click="nav('D')" v-bind:class="{'active':keys === 'D'}">
                <el-badge class="item-left">
                  <i class="iconfont icon-daishenhe"></i>未收款
                </el-badge>
                <div class="item-right">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="item" @click="nav('P')" v-bind:class="{'active':keys === 'P'}">
                <el-badge :value="received" class="item-left">
                  <i class="iconfont icon-dingdanwancheng"></i>已收款
                </el-badge>
                <div class="item-right">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="item" @click="nav('U')" v-bind:class="{'active':keys === 'U'}">
                <el-badge class="item-left">
                  <i class="iconfont icon-shenhebutongguo"></i>已收货未付款
                </el-badge>
                <div class="item-right">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="item" @click="nav('S')" v-bind:class="{'active':keys === 'S'}">
                <el-badge class="item-left">
                  <i class="iconfont icon-yifahuo"></i>已发货
                </el-badge>
                <div class="item-right">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="item" @click="nav('E')" v-bind:class="{'active':keys === 'E'}">
                <el-badge class="item-left">
                  <i class="iconfont icon-yifabu"></i>已完成
                </el-badge>
                <div class="item-right">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="item" @click="nav('C')" v-bind:class="{'active':keys === 'C'}">
                <div class="item-left">
                  <i class="iconfont icon-dingdanquxiao"></i>已取消
                </div>
                <div class="item-right">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div class="basic-right">
          <el-card>
            <order v-if="keys==='D'" v-on:Out="OutEvent($event)" :keys="keys"></order>
            <order v-if="keys==='P'" v-on:Out="OutEvent($event)" :keys="keys"></order>
            <order v-if="keys==='U'" v-on:Out="OutEvent($event)" :keys="keys"></order>
            <order v-if="keys==='S'" v-on:Out="OutEvent($event)" :keys="keys"></order>
            <order v-if="keys==='E'" v-on:Out="OutEvent($event)" :keys="keys"></order>
            <order v-if="keys==='C'" v-on:Out="OutEvent($event)" :keys="keys"></order>
          </el-card>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
  import order from '@/components/manageOrder/order'
  export default {
    name: "manageProduct",
    data() {
      return {
        keys: 'D',
        item: {},
        received: null,
        completed: null
      }
    },
    components: {
      'order': order,
    },
    created: function () {
      this.load('P')
      this.load('E')
    },
    methods: {
      /**
       * 选择第几项
       */
      nav(index) {
        this.keys = index;
      },

      /**
       * 接受传回的值
       */
      OutEvent(event) {
        if (event) {
          if (event.keys === 'P') {
            this.load('P')
          }
          this.item = event.item;
          this.keys = event.keys;
        }
      },
      load(status) {
        let data = {
          page: 1,
          limit: 10,
          status: status
        }
        this.$api.manageOrder.list(data)
          .then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  if (status === 'P') {
                    if (res.page.totalCount > 0) {
                      this.received = res.page.totalCount;
                    } else {
                      this.received = null;
                    }
                  }
                  break;
                case 503:
                  break;
                default:
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  })
                  break;
              }
            }
          })
      }
    },
  }

</script>
<style lang="less" scoped>
  /deep/ .el-container {
    background: #fff;
    margin-top: 40px;

    /deep/ .el-card {
      min-height: 600px;
    }
  }

  .basic {
    display: flex;
    width: 100%;
    min-height: 600px;
    background: #fff;

    /deep/ .el-card__body {
      padding: 0px;
    }

    .basic-left {
      width: 240px;
      border-right: 1px solid #f1f1f1;
      flex-shrink: 0;
      margin-right: 5px;

      .iconfont {
        font-size: 30px;
        color: #1296db;
        margin-right: 10px;
      }

      .icon-fabuguanli {
        position: relative;
        top: 3px;
      }

      .title {
        height: 65px;
        border-bottom: 1px solid #f1f1f1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }

      .tree {
        .item {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          padding: 0px 20px;
          height: 55px;
          border-bottom: 1px solid #f1f1f1;

          .item-left {
            display: flex;
            align-items: center;

            /deep/ .el-badge__content.is-fixed {
              top: 15px !important;
              left: 0px !important;
              right: auto !important;
            }
          }

          .item-right {
            display: flex;
            align-items: center;
          }
        }

        .active {
          color: #1296db;
        }
      }
    }

    .basic-right {
      width: 100%;

      /deep/ .el-card__body {
        padding: 65px 20px;
      }
    }
  }

</style>

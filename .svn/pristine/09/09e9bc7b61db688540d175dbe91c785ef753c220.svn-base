<template>
  <div class="manage">
    <el-container>
      <div class="basic">
        <div class="basic-left">
          <el-card>
            <div class="title"><i class="iconfont icon-fabuguanli"></i>发布管理</div>
            <div class="tree">
              <div class="item" @click="nav(0)" v-bind:class="{'active':keys == 0}">
                <div class="item-left">
                  <i class="iconfont icon-daishenhe"></i>待审核
                </div>

                <div class="item-right">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="item" @click="nav(1)" v-bind:class="{'active':keys == 1}">
                <el-badge class="item-left" :value="approved">
                  <i class="iconfont icon-dingdanwancheng"></i>审核通过
                </el-badge>
                <div class="item-right">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="item" @click="nav(2)" v-bind:class="{'active':keys == 2}">
                <el-badge class="item-left" :value="notapproved">
                  <i class="iconfont icon-shenhebutongguo"></i>审核不通过
                </el-badge>
                <div class="item-right">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="item" @click="nav(3)" v-bind:class="{'active':keys == 3}">
                <div class="item-left">
                  <i class="iconfont icon-yifabu"></i>已上架
                </div>
                <div class="item-right">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="item" @click="nav(4)" v-bind:class="{'active':keys == 4}">
                <div class="item-left">
                  <i class="iconfont icon-shangpinyixiajia-"></i>已下架
                </div>
                <div class="item-right">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="item" @click="nav(5)" v-bind:class="{'active':keys == 5}">
                <div class="item-left">
                  <i class="iconfont icon-fabu"></i>去发布
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
            <audited v-if="keys==='0'" v-on:Out="OutEvent($event)" :keys="keys"></audited>
            <audited v-if="keys==='1'" v-on:Out="OutEvent($event)" :keys="keys"></audited>
            <audited v-if="keys==='2'" v-on:Out="OutEvent($event)" :keys="keys"></audited>
            <audited v-if="keys==='3'" v-on:Out="OutEvent($event)" :keys="keys"></audited>
            <audited v-if="keys==='4'" v-on:Out="OutEvent($event)" :keys="keys"></audited>
            <publish v-if="keys === '5'" :item="item" v-on:Out="OutEvent($event)"></publish>
          </el-card>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
  import publish from '@/components/manageProduct/publish'
  import audited from '@/components/manageProduct/audited'
  export default {
    name: "manageProduct",
    data() {
      return {
        keys: '0',
        item: {},
        approved: null,
        notapproved: null
      }
    },
    components: {
      'publish': publish,
      'audited': audited
    },
    created: function () {
      this.load('1')
      this.load('2')
    },
    methods: {
      /**
       * 选择第几项
       */
      nav(index) {
        this.keys = String(index);
      },
      /**
       * 接受传回的值
       */
      OutEvent(event) {
        if (event) {
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
        this.$api.manageProduct.list(data)
          .then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  if (status === '1') {
                    if (res.page.totalCount > 0) {
                      this.approved = res.page.totalCount;
                    } else {
                      this.approved = null;
                    }
                  } else {
                    if (res.page.totalCount > 0) {
                      this.notapproved = res.page.totalCount;
                    } else {
                      this.notapproved = null;
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
    }
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

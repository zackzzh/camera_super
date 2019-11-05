<template>
  <div class="detail">
    <el-container>
      <div class="enquire-top">
        <div class="left">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'manageOrder' }">我的订单</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'manageOrderDetail' }"><span>{{title}}</span></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="content">
        <el-card class="box-card">
          <div class="title">
            <div v-if="item.status === 'D'">未支付</div>
            <div v-if="item.status === 'P'">已付款</div>
            <div v-if="item.status === 'S'">已发货</div>
            <div v-if="item.status === 'E'">已完成</div>
            <div v-if="item.status === 'C'">已取消</div>
          </div>

          <div class="options-list">
            <div class="item">
              品牌名称
            </div>
            <div class="item">
              型号
            </div>
            <div class="item">
              颜色
            </div>
            <div class="item">
              货到付款
            </div>
            <div class="item">
              单价
            </div>
            <div class="item">
              数量
            </div>
            <div class="item">
              总价
            </div>
            <div class="item">
              状态
            </div>
          </div>
          <div class="list">
            <div class="item">
              <div class="item-bottom">
                <div class="bottom-child">{{item.brandName}}</div>
                <div class="bottom-child">{{item.model}}</div>
                <div class="bottom-child">{{item.color}}</div>
                <div class="bottom-child">
                  <span v-if="item.isCod === '1'">是</span>
                  <span v-else>不是</span>
                </div>
                <div class="bottom-child">{{item.price}}</div>
                <div class="bottom-child">{{item.count}}</div>
                <div class="bottom-child">
                  <div v-if="item.arrivalMoney">{{item.arrivalMoney}}</div>
                  <div v-else>{{item.totalPrice}}</div>
                </div>
                <div class="bottom-child">
                  <div v-if="item.status === 'D'">未支付</div>
                  <div v-if="item.status === 'P'">已付款</div>
                  <div v-if="item.status === 'S'">已发货</div>
                  <div v-if="item.status === 'E'">已完成</div>
                  <div v-if="item.status === 'C'">已取消</div>
                </div>
              </div>
            </div>
          </div>
          <div class="top-info">
            <div class="info">
              <div class="info-item">
                <i class="iconfont icon-yonghu"></i>
                收货人姓名：{{item.contactsName}}
              </div>
              <div class="info-item">
                <i class="iconfont icon-shouji"></i>
                收货人手机号：{{item.contactsName}}
              </div>
              <div class="info-item">
                <i class="iconfont icon-dizhi"></i>
                配送至：{{item.address}}
              </div>
              <div class="info-item">
                <i class="iconfont icon-xinxi1" v-if="item.remark"></i>
                买家留言：{{item.remark}}
              </div>
            </div>
            <div class="top">
              <div class="orderno">下单时间：{{item.createtime}}</div>
              <div class="orderno">订单编号：{{item.orderno}}</div>
              <div class="orderno" v-if="item.trackingNumber">快递单号：{{item.trackingNumber}}</div>
              <div class="orderno" v-if="item.arrivalDate">收款时间：{{item.arrivalDate}}</div>
            </div>
          </div>
        </el-card>
      </div>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'manageOrderDetail',
    data() {
      return {
        item: {},
        title: ''
      }
    },
    created: function () {
      let orderno = this.$route.query.orderno;
      this.load(orderno)
    },
    methods: {
      load(orderno) {
        this.$api.manageOrder.info({
            orderNo: orderno
          })
          .then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.item = res.orderInfo;
                  switch (this.item.status) {
                    case 'D':
                      this.title = '待支付'
                      break;
                    case 'P':
                      this.title = '已付款'
                      break;
                    case 'S':
                      this.title = '已发货'
                      break;
                    case 'E':
                      this.title = '已确认完成'
                      break;
                    case 'C':
                      this.title = '已取消'
                      break;
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
  .enquire-top {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    color: #858585;
    margin-bottom: 40px;

    .right {
      display: flex;
      align-items: center;

      /deep/ .el-dropdown {
        // width: 100px;
      }

      .input {
        margin-left: 40px;
      }
    }
  }

  .content {
    .top-info {
      display: flex;
      justify-content: space-between;
    }

    .title {
      font-size: 22px;
      width: 100%;
      margin-bottom: 20px;
      text-align: center;
    }

    .time {
      margin-bottom: 10px;
    }

    .top {
      padding: 20px 0px;

      .orderno {
        margin-bottom: 25px;
      }
    }


    .options-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      border: 1px solid #e5e5e5;
      border-radius: 5px;

      .item {
        flex: 1 16.6;
        max-width: 16.6%;
        text-align: center;
      }
    }

    .list {
      .item {
        font-size: 14px;
        color: #353535;

        .item-top {
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0px 20px;
          background: #bde8ff;

          .top-left {
            display: flex;
            align-items: center;

            .time {
              margin-right: 40px;
            }
          }
        }

        .item-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;

          .bottom-child {
            flex: 1 16.6;
            max-width: 16.6%;
            text-align: center;
          }
        }
      }
    }

    .info {
      padding: 20px 0px;
      font-size: 14px;

      .info-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .iconfont {
          font-size: 28px;
          color: #1e9bdd;
          margin-right: 10px;
        }
      }
    }
  }

</style>

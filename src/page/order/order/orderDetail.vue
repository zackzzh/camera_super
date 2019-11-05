<template>
  <div class="enquireDetail">
    <el-container>
      <div class="enquire-top">
        <div class="left">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">
              <i class="iconfont icon-home"></i>
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'order' }">{{$t('header.tabsHomeFour')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'orderDetail' }">
              <span>{{title}}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <el-card class="card-box">
        <div class="order-options">
          <div class="options-first">
            <div class="options-one">{{$t('order.product')}}</div>
            <div class="options-two">{{$t('order.parameter')}}</div>
            <div class="options-four">{{$t('order.unitprice')}}</div>
            <div class="options-five">{{$t('order.quantity')}}</div>
            <div class="options-six">{{$t('order.realpayment')}}</div>
          </div>
          <div class="options-second">{{$t('order.express')}}</div>
          <div class="options-third">{{$t('order.transaction')}}</div>
        </div>
      </el-card>
      <div class="order-info">
        <!-- <div class="info-list">{{$t('order.product')}}：{{item.createtime}}</div> -->
        <div class="info-list" v-if="item.arrivalDate">{{$t('order.Paymenttime')}}：{{item.arrivalDate}}</div>
      </div>
      <div class="order-item">
        <div class="order-item-top">
          <div class="top-left">
            <div class="order-time">{{$t('order.orderNumber')}}：{{item.orderno}}</div>
            <div class="order-sn">{{$t('order.createdTime')}}：{{item.createtime}}</div>
          </div>
        </div>
        <div class="order-item-mid">
          <div class="first">
            <div class="first-top">
              <div class="one">
                <img :src="item.goodsPicHead" alt class="img">
              </div>
              <div class="two">
                <div class="title">{{item.goodsTitle}}</div>
                <div>{{$t('order.color')}}:
                  <span v-if="lang==='en'">{{item.colorEn}}</span>
                  <span v-else>{{item.color}}</span>
                </div>
              </div>
              <div class="four">
                <!-- ￥{{item.price}} -->
                <span v-if="item.currency === 'CNY'">￥</span>
                <span v-if="item.currency === 'USD'">$</span>
                <span v-if="item.currency === 'HKD'">HK$</span>
                {{item.price}}
              </div>
              <div class="five">{{item.count}}</div>
              <div class="six">
                <span v-if="item.arrivalMoney">
                  <span v-if="item.currency === 'CNY'">￥</span>
                  <span v-if="item.currency === 'USD'">$</span>
                  <span v-if="item.currency === 'HKD'">HK$</span>
                  {{item.arrivalMoney}}
                </span>
                <span v-else>
                  <span v-if="item.currency === 'CNY'">￥</span>
                  <span v-if="item.currency === 'USD'">$</span>
                  <span v-if="item.currency === 'HKD'">HK$</span>
                  {{item.totalPrice}}
                </span>
              </div>
            </div>
            <div class="first-bottom">{{$t('order.receiving')}}:{{item.address}}</div>
          </div>
          <div class="second">
            <div class="detail" v-if="item.trackingNumber">
              <div>{{$t('order.express')}}</div>
              <div>{{item.trackingNumber}}</div>
            </div>
          </div>
          <div class="third">
            <div v-if="item.status === 'D'">{{$t('order.Pendingpayment')}}</div>
            <div v-if="item.status === 'P'">{{$t('order.Alreadypaid')}}</div>
            <div v-if="item.status === 'S'">{{$t('order.Alreadyshipped')}}</div>
            <div v-if="item.status === 'E'">{{$t('order.completed')}}</div>
            <div v-if="item.status === 'C'">{{$t('order.cancelled')}}</div>
          </div>
        </div>
      </div>
      <div class="order-status">
        <div class="status-title">
          <div v-if="item.status === 'D'">{{$t('order.Current')}}:{{$t('order.Pendingpayment')}}</div>
          <div v-if="item.status === 'P'">{{$t('order.Current')}}:{{$t('order.Alreadypaid')}}</div>
          <div v-if="item.status === 'S'">{{$t('order.Current')}}:{{$t('order.Alreadyshipped')}}</div>
          <div v-if="item.status === 'E'">{{$t('order.Current')}}:{{$t('order.completed')}}</div>
          <div v-if="item.status === 'C'">{{$t('order.Current')}}:{{$t('order.cancelled')}}</div>
        </div>
        <div class="status-list">
          <div class="item">
            <i class="iconfont icon-dian"></i>
            {{$t('order.Current')}}
          </div>
          <div class="item">
            <i class="iconfont icon-dian"></i>
            <span @click="$go('/')">{{$t('order.back')}}</span>
          </div>
          <div class="item" v-if="item.status === 'D'">
            <i class="iconfont icon-dian"></i>
            <el-button type="info" size="mini" @click="cancel(item)">{{$t('order.cancelorder')}}</el-button>
          </div>
          <div class="list-logisticsId" v-if="item.logisticsId">
            <div class="item-logisticsId" v-for="(d, key) in logisticsList" :key="key">
              <div class="logisticsId-left">
                <div class="left-dian">
                  <i class="iconfont icon-dian" v-bind:class="{'active':item.logisticsId === d.id}"></i>
                </div>
              </div>
              <div class="logisticsId-right" v-bind:class="{'active':item.logisticsId === d.id}">
                <span v-if="lang=='en'">{{d.nameEn}}</span>
                <span v-else>{{d.name}}</span>
                <span v-for="(n, nkey) in orderLogisticsList" :key="nkey">
                  <span v-if="d.id === n.logisticsId">{{n.createtime}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
  import {
    mapState,
    mapActions,
    mapGetters
  } from "vuex";
  export default {
    name: "enquireDetail",
    data() {
      return {
        title: "",
        item: {},
        logisticsList: [],
        orderLogisticsList: []
      };
    },
    computed: {
      ...mapState("common", ["lang"])
    },
    created: function () {
      /**
       * 初始化数据
       */
      let orderno = "";
      if (this.$route.query.orderno && this.$route.query.orderno.length > 0) {
        orderno = this.$route.query.orderno;
      } else {
        if (Object.keys(JSON.parse(this.$route.query.item)).length > 0) {
          let item = JSON.parse(this.$route.query.item);
          orderno = item.orderno;
        }
      }
      this.load(orderno);
    },
    watch: {
      lang(n, o) {
        switch (this.item.status) {
          case "":
            this.title = this.$t("order.all");
            break;
          case "D":
            this.title = this.$t("order.Pendingpayment");
            break;
          case "P":
            this.title = this.$t("order.Alreadypaid");
            break;
          case "S":
            this.title = this.$t("order.Alreadyshipped");
            break;
          case "E":
            this.title = this.$t("order.completed");
            break;
          case "C":
            this.title = this.$t("order.cancelled");
            break;
        }
      }
    },
    methods: {
      /**
       * 数据初始化
       */
      load(orderno) {
        this.$api.order
          .info({
            orderNo: orderno
          })
          .then(res => {
            if (res) {
              switch (res.code) {
                case 200:
                  if (
                    Object.keys(JSON.parse(this.$route.query.item)).length > 0
                  ) {
                    let item = JSON.parse(this.$route.query.item);
                    this.logisticsList = item.logisticsList;
                  }
                  this.item = res.orderCustomerInfo;
                  this.orderLogisticsList = res.orderLogisticsList;
                  switch (this.item.status) {
                    case "":
                      this.title = this.$t("order.all");
                      break;
                    case "D":
                      this.title = this.$t("order.Pendingpayment");
                      break;
                    case "P":
                      this.title = this.$t("order.Alreadypaid");
                      break;
                    case "S":
                      this.title = this.$t("order.Alreadyshipped");
                      break;
                    case "E":
                      this.title = this.$t("order.completed");
                      break;
                    case "C":
                      this.title = this.$t("order.cancelled");
                      break;
                  }
                  break;
                case 503:
                  break;
                default:
                  break;
              }
            }
          });
      },
      /**
       * 取消订单
       */
      cancel(item) {
        let title = '';
        let notice = '';
        let buttonCancel = '';
        let buttonConfirm = '';
        let deleteCancel = ''
        if (this.lang === 'en') {
          notice = 'Notice';
          buttonCancel = 'Cancel';
          buttonConfirm = 'Confirm';
          deleteCancel = "I think again"
          title = "Cancel this order?"
        } else {
          notice = '提示';
          buttonCancel = '取消';
          buttonConfirm = '确定';
          deleteCancel = '我再想想'
          title = '取消该订单, 是否继续?'
        }
        this.$confirm(title, notice, {
            confirmButtonText: buttonConfirm,
            cancelButtonText: deleteCancel,
            type: "warning"
          })
          .then(() => {
            this.$api.order
              .cancel({
                orderNo: item.orderno
              })
              .then(res => {
                if (res) {
                  switch (res.code) {
                    case 200:
                      this.$message({
                        message: res.msg,
                        type: "success"
                      });
                      this.$go("order");
                      break;
                    case 503:
                      break;
                    default:
                      this.$message({
                        message: res.msg,
                        type: "error"
                      });
                      break;
                  }
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: deleteCancel
            });
          });
      }
    }
  };

</script>
<style lang="less" scoped>
  .order-status {
    margin-top: 30px;
    background: #f8dedb;
    border: 1px solid #e8377a;
    padding: 30px 80px;
    color: #4c4c4c;

    .list-logisticsId {
      .item-logisticsId {
        display: flex;
        align-items: center;
        height: 60px;

        .logisticsId-left {
          margin-right: 20px;
          position: relative;
          height: 100%;

          .left-dian {
            position: absolute;

            i {
              font-size: 30px;
              position: absolute;
              left: -7px;

              &:after {
                position: absolute;
                content: "";
                top: 20px;
                left: 14px;
                width: 0;
                height: 150%;
                border-right: 2px solid #666;
              }
            }
          }
        }

        .logisticsId-right {
          margin-top: 20px;
        }

        .active {
          color: red;
        }
      }
    }

    .status-title {
      margin-bottom: 20px;
    }

    .item {
      font-size: 12px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;

      .fa-status {
        font-size: 16px;
      }

      span {
        cursor: pointer;
        color: red;
      }
    }
  }

  .enquire-top {
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

  /deep/ .el-card__body {
    padding: 0px;
  }

  .order-options {
    width: 100%;
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 13px;
    color: #1a1a1a;
    background: #fff;

    .options-first {
      display: flex;
      align-items: center;
      width: 70%;
      text-align: center;

      .options-two,
      .options-one,
      .options-five,
      .options-six,
      .options-four {
        width: 20%;
      }
    }

    .options-second {
      width: 15%;
      text-align: center;
    }

    .options-third {
      width: 15%;
      text-align: center;
    }
  }

  .order-info {
    margin-top: 40px;

    info-title {
      height: 30px;
      line-height: 30px;
      color: #4c4c4c;
    }

    .info-list {
      color: #858585;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      height: 30px;
    }
  }

  .order-item {
    margin-bottom: 10px;
    border: 1px solid #7fc2ff;

    .order-item-top {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #858585;
      font-size: 12px;
      justify-content: space-between;
      border-bottom: 1px solid #7fc2ff;
      padding: 0px 10px;
      background: #dfecff;
      height: 40px;

      .top-left {
        display: flex;
        align-items: center;

        .order-time {
          margin-right: 50px;
        }
      }
    }

    .order-item-mid {
      cursor: pointer;
      display: flex;
      background: #fff;
      justify-content: space-between;
      font-size: 14px;
      width: 100%;

      .first {
        width: 70%;
        border-right: 1px solid #7fc2ff;
        height: 100%;

        .first-top {
          display: flex;
          align-items: center;
          text-align: center;
          padding: 10px 0px;
          border-bottom: 1px solid #7fc2ff;

          .one,
          .two,
          .five,
          .four,
          .six {
            width: 20%;
          }

          .one {
            img {
              widows: 80px;
              height: 80px;
            }
          }

          .two {
            text-align: left;

            .title {
              width: 130px;
              margin-bottom: 8px;
            }
          }

          .num {
            margin-right: 15px;
          }

          span {
            color: red;
          }
        }

        .first-bottom {
          display: flex;
          align-items: center;
          height: 37px;
          padding-left: 10px;
          color: #858585;
        }
      }

      .second,
      .third {
        width: 15%;
        font-size: 14px;
        color: #1a1a1a;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }

      .second {
        border-right: 1px solid #7fc2ff;

        .detail {
          width: 100%;
          text-align: center;
          margin-top: 10px;
        }
      }

      .third {
        /deep/ .el-button {
          margin: 5px 0px;
        }

        /deep/ .el-button+.el-button {
          margin-left: 0px;
        }
      }

      .icon-shanchu1 {
        color: #858585;
      }
    }
  }

</style>

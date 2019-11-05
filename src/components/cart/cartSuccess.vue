<template>
  <el-card class="box-card">
    <div class="success">
      <div class="success-title">{{$t('cartSuucess.submitcompleted')}}</div>
      <div class="success-content">
        <div class="content-left">
          <div class="mid">
            <div class="order-tip">
              {{$t('cartSuucess.tipOne')}} <span><span @click="$go('/')">{{$t('cartSuucess.tipTwo')}}</span>><span
                  @click="$go('order')">{{$t('cartSuucess.tipThree')}}</span></span>
              {{$t('cartSuucess.tipFour')}}
            </div>
            <div class="order-money" v-if="bankInfo && bankInfo.bankName">
              <div>{{$t('cartSuucess.tipFive')}}:</div>
              <div class="item" v-if="bankInfo.bankno">{{$t('cartSuucess.bankno')}}：{{bankInfo.bankno}}</div>
              <div class="item" v-if="bankInfo.bankAccount">{{$t('cartSuucess.bankAccount')}}：{{bankInfo.bankAccount}}
              </div>
              <div class="item" v-if="bankInfo.bankAddress">{{$t('cartSuucess.bankAddress')}}：{{bankInfo.bankAddress}}
              </div>
              <div class="item" v-if="bankInfo.bankCode">{{$t('cartSuucess.bankCode')}}：{{bankInfo.bankCode}}</div>
              <div class="item" v-if="bankInfo.bankName">{{$t('cartSuucess.bankName')}}：{{bankInfo.bankName}}</div>
              <div class="item" v-if="bankInfo.companyAddress">
                {{$t('cartSuucess.companyAddress')}}：{{bankInfo.companyAddress}}</div>
              <div class="item" v-if="bankInfo.swiftCode">{{$t('cartSuucess.swiftCode')}}：{{bankInfo.swiftCode}}</div>
            </div>
            <div class="order-other">{{$t('cartSuucess.tipseven')}}</div>
            <div class="button">
              <el-button type="primary" @click="$go('order')">{{$t('cartSuucess.tipeight')}}</el-button>
            </div>
          </div>
        </div>
        <div class="content-right">
          <img src="../../assets/images/success.png" alt="">
        </div>
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
    <div v-for="(item, key) in orderList" :key="key">
      <div class="order-info">
        <!-- <div class="info-title">订单信息</div> -->
        <div class="info-list">
          {{$t('order.product')}}：{{item.createtime}}
        </div>
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
            <div class="first-bottom">
              {{$t('order.receiving')}}:{{item.companyName}}, {{item.companyPhone}}, {{item.address}}
            </div>
          </div>
          <div class="second">
            <div class="detail" v-if="item.trackingNumber">
              <div>{{$t('order.product')}}</div>
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
    </div>
  </el-card>
</template>
<script>
  import session from '@/libs/session';
  import {
    mapState,
    mapActions,
    mapGetters
  } from "vuex";
  export default {
    name: 'bargainSuccess',
    data() {
      return {
        bankInfo: {},
        orderNoList: [],
        orderList: [],
      }
    },
    computed: {
      ...mapState("common", ["lang", "rate"]),
    },
    created: function () {
      this.orderNoList = session.getHistory('orderNoList')
      this.load()
      this.loadOrder(this.orderNoList)
    },
    methods: {
      /**
       * 获取银行信息
       */
      load() {
        this.$api.address.info({})
          .then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.bankInfo = res.bankInfo;
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
          })
      },
      loadOrder(orderNoList) {
        this.$api.order.query(orderNoList).then((res) => {
          if (res) {
            switch (res.code) {
              case 200:
                this.orderList = res.orderList;
                break;
              case 503:
                break;
              default:
                break;
            }
          }
        })
      },
    }
  }

</script>
<style lang="less" scoped>
  /deep/ .el-card__body {
    padding: 20px;
  }

  .success {
    margin-bottom: 40px;

    .success-title {
      width: 100%;
      text-align: center;
      color: #5b5b5b;
      font-size: 28px;
      margin-bottom: 40px;
    }

    .success-content {
      display: flex;
      justify-content: center;

      .content-left {
        width: 50%;
        margin: 0 auto;
        font-size: 14px;
        color: #b6b6b6;

        .mid {
          width: 300px;
          margin: 0 auto;

          .order-money {
            margin-bottom: 40px;

            .item {
              color: #4c4c4c;
              margin-bottom: 5px;
            }
          }

          .order-sn {
            margin-bottom: 20px;
          }

          .order-time {
            margin-bottom: 70px;
          }

          .button {
            display: flex;
            margin-top: 50px;
          }

          .order-tip {
            margin-bottom: 70px;
            line-height: 25px;

            span {
              cursor: pointer;
              color: #393939;
              font-weight: bold;
            }
          }
        }
      }

      .content-right {
        width: 50%;
        margin: 0 auto;

        img {
          width: 300px;
          margin: 0 auto;
          display: block;
        }
      }
    }
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

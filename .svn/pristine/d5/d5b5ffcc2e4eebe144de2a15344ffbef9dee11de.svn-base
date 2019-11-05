<template>
  <div class="enquireDetail">
    <el-container>
      <div class="enquire-top">
        <div class="left">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'enquire' }">{{$t('enquireDetail.myInquirySheet')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'enquireDetail' }"><span>{{title}}</span></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <el-card class="box-card">
        <div class="detail-one">{{$t('enquireDetail.bargainingNumber')}}：{{item.orderno}}</div>
        <div class="detail-one">{{$t('enquireDetail.createdTime')}}：{{item.createtime}}</div>
        <div class="top-title" v-if="item.status==='1'">{{$t('enquireDetail.titleA')}}</div>
        <div class="top-title" v-if="item.status==='2'">{{$t('enquireDetail.titlePo')}}
          <span>{{$t('enquireDetail.titlePs')}}</span>
          {{$t('enquireDetail.titlepth')}}</div>
        <div class="top-title" v-if="item.status==='3'">{{$t('enquireDetail.titleFo')}}
          <span>{{$t('enquireDetail.titleFs')}}</span>
          {{$t('enquireDetail.titleFt')}}</div>
        <div class="top-title" v-if="item.status==='4'">{{$t('enquireDetail.titleE')}} </div>
        <div class="top-title" v-if="item.status==='5'">{{$t('enquireDetail.titleC')}} </div>
        <div class="product">
          <div class="product-top">
            <div class="item">{{$t('enquireDetail.product')}} </div>
            <div class="item">{{$t('enquireDetail.parameter')}} </div>
            <div class="item">{{$t('enquireDetail.quantity')}} </div>
            <div class="item">{{$t('enquireDetail.intentionPrice')}} </div>
            <div class="item" v-if="this.item.finalPrice>0 && item.status !=='1'">{{$t('enquireDetail.finalprice')}}
            </div>
            <div class="item">{{$t('enquireDetail.totalprice')}} </div>
            <div class="item" v-if="this.item.finalPrice>0 && item.status !=='1'">{{$t('enquireDetail.approvalprice')}}
            </div>
          </div>
          <div class="product-mid">
            <div class="item"><img :src="item.goodsPicHead" alt=""></div>
            <div class="product-title item">
              <div class="title">
                <span v-if="lang==='en'">{{goodsInfo.titleEn}}</span>
                <span v-else>{{goodsInfo.title}}</span>
              </div>
              <div class="color">{{$t('cart.color')}}:
                <span v-if="lang==='en'">{{item.colorEn}}</span>
                <span v-else>{{item.color}}</span>
              </div>
            </div>
            <div class="item num">
              {{item.count}}
            </div>
            <div class="item price">
              <!-- {{item.expectedPrice}} -->
              <span v-if="item.currency === 'CNY'">￥</span>
              <span v-if="item.currency === 'USD'">$</span>
              <span v-if="item.currency === 'HKD'">HK$</span>
              {{(item.expectedPrice).toFixed(2)}}
            </div>
            <div class="item num" v-if="this.item.finalPrice>0 && item.status !=='1'">
              <span v-if="item.currency === 'CNY'">￥</span>
              <span v-if="item.currency === 'USD'">$</span>
              <span v-if="item.currency === 'HKD'">HK$</span>
              {{(item.finalPrice).toFixed(2)}}
            </div>
            <div class="item num">
              <span v-if="item.currency === 'CNY'">￥</span>
              <span v-if="item.currency === 'USD'">$</span>
              <span v-if="item.currency === 'HKD'">HK$</span>
              {{(item.expectedPrice * item.count).toFixed(2)}}
            </div>
            <div class="item num color1" v-if="this.item.finalPrice>0 && item.status !=='1'">
              <span v-if="item.currency === 'CNY'">￥</span>
              <span v-if="item.currency === 'USD'">$</span>
              <span v-if="item.currency === 'HKD'">HK$</span>
              {{(item.finalPrice * item.count).toFixed(2)}}
            </div>
          </div>
        </div>
        <div class="button">
          <el-button round @click="cancel" class="cancle"
            v-if="item.status === '2' || item.status === '1' || item.status === '3'" type="info">
            {{$t('enquireDetail.giveup')}}</el-button>
          <el-button round class="cancle" v-if="item.status==='3'" @click="dialogVisible = true" type="primary">
            {{$t('enquireDetail.titleFs')}}</el-button>
          <el-button round class="cancle" v-if="item.status==='2'" @click="confirm" type="success">
            {{$t('enquireDetail.titlePs')}}</el-button>
          <el-button round class="cancle" v-if="item.status==='3'" @click="confirm" type="success">
            {{$t('enquireDetail.completedprice')}}</el-button>
        </div>
      </el-card>
      <el-dialog :title="$t('enquireDetail.completedprice')" :visible.sync="dialogVisible">
        <div class="order-options">
          <div class="info">{{$t('bargain.businessInformation')}}</div>
          <div class="onceprice">{{$t('bargain.unitPriceNegotiation')}}</div>
          <div class="num">{{$t('bargain.number')}}</div>
          <div class="price">{{$t('bargain.intentionalPrice')}}</div>
        </div>
        <div class="order-item">
          <div class="order-item-one">
            <div class="item-two-img">
              <img :src="item.goodsPicHead" alt="">
            </div>
            <div class="item-two-title">
              <div>{{item.goodsTitle}}</div>
              <div class="item-two-sku">
                <div class="color">{{$t('enquireDetail.color')}}:
                  <span v-if="lang==='en'">{{item.colorEn}}</span>
                  <span v-else>{{item.color}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="item-two-price">
            <div class="price-top">
              <span v-if="item.currency === 'CNY'">￥</span>
              <span v-if="item.currency === 'USD'">$</span>
              <span v-if="item.currency === 'HKD'">HK$</span>
              &nbsp;
              <el-input v-model="expectedPrice" @blur="expectedPriceInput"></el-input>
            </div>
            <div>{{$t('bargain.originalPrice')}}:
              <span v-if="item.currency === 'CNY'">￥</span>
              <span v-if="item.currency === 'USD'">$</span>
              <span v-if="item.currency === 'HKD'">HK$</span>
              <span v-if="item.finalPrice>0">{{(item.finalPrice).toFixed(2)}}</span>
            </div>
          </div>
          <div class="item-two-add">
            <el-button icon="el-icon-minus" @click="changeCount(-1)"></el-button>
            <el-input v-model="count" @blur="input"></el-input>
            <el-button icon="el-icon-plus" @click="changeCount(1)"></el-button>
          </div>
          <div class="all-price">
            <div class="now" v-if="expectedPrice>0">
              {{$t('bargain.currentTotalPrice')}}:
              <span v-if="item.currency === 'CNY'">￥</span>
              <span v-if="item.currency === 'USD'">$</span>
              <span v-if="item.currency === 'HKD'">HK$</span>
              {{(expectedPrice * count).toFixed(2)}}
            </div>
            <div>{{$t('bargain.originalTotalPrice')}}:
              <span v-if="item.currency === 'CNY'">￥</span>
              <span v-if="item.currency === 'USD'">$</span>
              <span v-if="item.currency === 'HKD'">HK$</span>
              {{(item.finalPrice * count).toFixed(2)}}
            </div>
          </div>
        </div>
        <div class="basic-center">
          <el-button type="danger" round @click="dialogVisible = false">{{$t('enquireDetail.thinkagain')}}</el-button>
          <el-button type="primary" round @click="again">{{$t('enquireDetail.Regeneratebargaining')}}</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>
<script>
  import session from '@/libs/session';
  import {
    mapState,
    mapActions,
    mapGetters
  } from "vuex";
  export default {
    name: 'enquireDetail',
    data() {
      return {

        title: '',
        item: {},
        dialogVisible: false,
        goodsInfo: {},
        sku: null,
        count: 1,
        expectedPrice: null
      }
    },
    created: function () {
      /**
       * 初始化数据
       */
      this.item = JSON.parse(this.$route.query.item);
      this.count = this.item.count
      switch (this.item.status) {
        case '1':
          this.title = this.$t('enquire.pendingReview');
          break;
        case '2':
          this.title = this.$t('enquire.agreed');
          break;
        case '3':
          this.title = this.$t('enquire.auditNotPassed');
          break;
        case '4':
          this.title = this.$t('enquire.completed');
          break;
        case '5':
          this.title = this.$t('enquire.cancelled');
          break;
      }
      /**
       * 获取原商品信息
       */
      this.$api.product.info({
          goodsId: this.item.goodsId
        })
        .then((res) => {
          if (res.code == 200) {
            this.goodsInfo = res.goodsInfo
            this.sku = this.goodsInfo.goodsStockList[0];
          }
        })
    },
    computed: {
      ...mapState("common", ["lang"]),
    },
    watch: {
      lang(n, o) {
        switch (this.item.status) {
          case '1':
            this.title = this.$t('enquire.pendingReview');
            break;
          case '2':
            this.title = this.$t('enquire.agreed');
            break;
          case '3':
            this.title = this.$t('enquire.auditNotPassed');
            break;
          case '4':
            this.title = this.$t('enquire.completed');
            break;
          case '5':
            this.title = this.$t('enquire.cancelled');
            break;
        }
      },
    },
    methods: {
      /**
       * 取消议价
       * orderNo:订单编号
       */
      cancel() {
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
          title = "Shall we continue to waive the offer??"
        } else {
          notice = '提示';
          buttonCancel = '取消';
          buttonConfirm = '确定';
          deleteCancel = '我再想想'
          title = '放弃该议价单, 是否继续?'
        }
        this.$confirm(title, notice, {
          confirmButtonText: buttonConfirm,
          cancelButtonText: buttonCancel,
          type: 'warning'
        }).then(() => {
          this.$api.bargain.cancel({
            orderNo: this.item.orderno
          }).then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.$message({
                    message: '取消议价单成功',
                    type: 'success'
                  })
                  this.$go('enquire')
                  break;
                case 503:
                  break;
                default:
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  })
                  break
              }
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: deleteCancel
          });
        });
      },
      /**
       * 改变议价数量
       * num:区分加减
       */
      changeCount(num) {
        if (num > 0) {
          this.count++;
        } else {
          this.count--;
        }
        if (this.count < 1) {
          this.count = 1;
        }
        // if (this.count > this.sku.inventory) {
        //   this.$message({
        //     message: '库存不足，请联系客服',
        //     type: 'error'
        //   })
        //   this.count = 1;
        // }
      },
      /**
       * 改变议价数量
       * 正则表达式验证数字
       */
      input() {
        if (isNaN(this.count)) {
          let message = '';
          if (this.lang === 'en') {
            message = 'Please enter number'
          } else {
            message = '请输入数字'
          }
          this.$message({
            message: message,
            type: 'error'
          })
          this.count = 1;
        }
        if (this.count < 1) {
          this.count = 1;
        }
        if (this.count > this.sku.inventory) {
          let message = '';
          if (this.lang === 'en') {
            message = 'Out of stock, please contact customer service'
          } else {
            message = '库存不足，请联系客服'
          }
          this.$message({
            message: message,
            type: 'error'
          })
          this.count = 1;
        }
      },
      /**
       * 改变提交议价的价格
       * 正则表达式验证数字
       */
      expectedPriceInput() {
        if (isNaN(this.expectedPrice)) {
          let message = '';
          if (this.lang === 'en') {
            message = 'Please enter price'
          } else {
            message = '请输入金额'
          }
          this.$message({
            message: message,
            type: 'error'
          })
          this.expectedPrice = null;
        }
        if (this.expectedPrice < 0) {
          this.expectedPrice = null;
        }
      },
      /**
       * 再次议价
       * color:选择颜色
       * count:数量
       * initialPrice:原价
       * expectedPrice：议价
       * orderNo：议价编号
       */
      again() {
        if (this.expectedPrice === null) {
          let message = '';
          if (this.lang === 'en') {
            message = 'Please enter negotiation price'
          } else {
            message = '请输入金额'
          }
          this.$message({
            message: message,
            type: 'error'
          })
        } else {
          this.$api.bargain.update({
            currency: this.item.currency,
            color: this.item.color,
            count: this.count,
            initialPrice: this.item.finalPrice,
            expectedPrice: this.expectedPrice,
            orderNo: this.item.orderno,
            goodsStockId: this.item.goodsStockId
          }).then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.dialogVisible = false;
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  })
                  this.$go('enquire')
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
      /**
       * 确认同意议价自动生成对应价格的订单：议价订单号orderNo
       */
      confirm() {
        this.$api.bargain.confirm({
            orderNo: this.item.orderno
          })
          .then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  })
                  session.addHistory('StepKey', 3)
                  session.addHistory('orderNoList', [res.orderNo])
                  this.$go('cart')
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    color: #858585;
    margin-bottom: 40px;

    .right {
      display: flex;
      align-items: center;

      .input {
        margin-left: 40px;
      }
    }
  }

  .box-card {
    width: 100%;

    .detail-one {
      font-size: 12px;
      color: #858585;
      margin-bottom: 5px;
    }

    .top-title {
      width: 100%;
      margin: 33px auto;
      font-size: 14px;
      color: #858585;
      text-align: center;

      span {
        color: #000;
        font-size: 16px;
      }
    }

    .product-top,
      {
      margin-bottom: 20px;
      border-bottom: 1px solid #e5e5e5;
      height: 60px;
    }

    .product-top,
    .product-mid {
      display: flex;
      align-items: center;
      justify-content: space-around;

      .item {
        flex: 1 16.6%;
        text-align: center;
      }

      .product-title {
        width: 158px;
        text-align: left;
      }

      img {
        width: 75px;
      }

      .color1 {
        color: red;
        font-weight: bold;
      }
    }

    .button {
      padding: 40px 0px;
      display: flex;
      justify-content: center;

      .cancle {
        background: #4c4c4c;
        color: #fff;
        border: none;
      }
    }
  }

  .order-options {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;

    .info {
      width: 40%;
    }

    .onceprice {
      width: 20%;
    }

    .num {
      width: 15%;
    }

    .price {
      width: 25%;
    }
  }

  /deep/ .el-dialog {
    width: 65%;

    /deep/ .el-dialog__body {
      padding: 60px 20px;
    }
  }

  .order-item {
    margin-bottom: 10px;
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #c4c4c4;
    padding: 20px 0px;

    .order-item-one {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      width: 40%;
      padding-left: 10px;
      box-sizing: border-box;

      .item-two-img {

        img {
          width: 80px;
          flex-shrink: 0;
          height: 80px;
          border-radius: 5px;
          margin-right: 25px;
          margin-left: 5px;
        }
      }

      .item-two-title {
        flex-shrink: 0;
        width: 150px;
        line-height: 20px;
        color: #1a1a1a;
      }

      .item-two-sku {
        flex-shrink: 0;

        .color {
          margin-bottom: 5px;
        }
      }
    }

    .item-two-price {
      width: 20%;
      flex-shrink: 0;
      text-align: center;

      .price-top {
        display: flex;
        align-items: center;
        justify-content: center;

      }

      /deep/ .el-input {
        width: 60px;
      }

      /deep/ .el-input__inner {
        margin-bottom: 5px;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        text-align: center;
        width: 60px;
        padding: 0px 5px;
      }
    }

    .item-two-add {
      width: 15%;
      display: flex;
      align-items: center;
      justify-content: center;

      /deep/ .el-button {
        padding: 0px;
        height: 30px;
        width: 20px;
        border-radius: 0px;
      }

      /deep/ .el-input {
        width: 50px;
        ;
      }

      /deep/ .el-input__inner {
        width: 50px;
        height: 30px;
        text-align: center;
        padding: 0px 5px;
        border-left: none;
        border-right: none;
        border-radius: 0px;
      }
    }

    .all-price {
      width: 25%;
      text-align: center;

      .now {
        margin-bottom: 5px;
      }
    }

  }

  .basic-center {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>

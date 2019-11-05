<template>
  <div class="order-one">
    <div class="order-title">
      <div class="big-title">{{$t('bargain.title')}}</div>
    </div>
    <div class="order-options">
      <div class="info">{{$t('bargain.businessInformation')}}</div>
      <div class="onceprice">{{$t('bargain.unitPriceNegotiation')}}</div>
      <div class="num">{{$t('bargain.number')}}</div>
      <div class="num">{{$t('bargain.intentionalPrice')}}</div>
    </div>
    <div class="order-list">
      <div class="order-item" v-if="item && item.goodsPicHead">
        <div class="order-item-two">
          <div class="two-left">
            <div class="item-two-img">
              <img :src="item.goodsPicHead" alt="">
            </div>
            <div class="item-two-title">
              <div>{{item.goodsTitle}}</div>
              <div class="item-two-sku">
                <div class="color">{{$t('bargain.colorCategory')}}:
                  <span v-if="lang==='en'">{{item.colorEn}}</span>
                  <span v-else>{{item.color}}</span>
                </div>
              </div>
              <div>{{$t('product.stock')}}:{{item.inventory}}</div>
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
            <div>
              {{$t('bargain.originalPrice')}}:
              <span v-if="item.currency === 'CNY'">￥{{(item.initialPrice).toFixed(2)}}</span>
              <span v-if="item.currency === 'USD'">${{(item.initialPrice).toFixed(2)}}</span>
              <span v-if="item.currency === 'HKD'">HK${{(item.initialPrice).toFixed(2)}}</span>
              <!-- <span v-if="lang === 'cn'">￥</span>
              <span v-if="lang === 'en'">${{(item.initialPrice * rate).toFixed(2)}}</span>
              <span v-if="lang === 'tc'">HK${{(item.initialPrice * rate).toFixed(2)}}</span> -->
            </div>
          </div>
          <div class="item-two-add">
            <el-button icon="el-icon-minus" @click="changeCount(-1,item.count)" :disabled="item.count <= 1"></el-button>
            <el-input v-model="item.count" @blur="input"></el-input>
            <el-button icon="el-icon-plus" @click="changeCount(1,item.count)"></el-button>
          </div>
          <div class="all-price">
            <div class="now" v-if="expectedPrice>0" style="text-align: center;">
              {{$t('bargain.currentTotalPrice')}}:
              <!-- <span v-if="lang === 'cn'">￥{{(expectedPrice * item.count ).toFixed(2)}}</span>
              <span v-if="lang === 'en'">${{(expectedPrice * item.count ).toFixed(2)}}</span>
              <span v-if="lang === 'tc'">HK${{(expectedPrice * item.count ).toFixed(2)}}</span> -->
              <span v-if="item.currency === 'CNY'">￥{{(expectedPrice * item.count ).toFixed(2)}}</span>
              <span v-if="item.currency === 'USD'">${{(expectedPrice * item.count ).toFixed(2)}}</span>
              <span v-if="item.currency === 'HKD'">HK${{(expectedPrice * item.count ).toFixed(2)}}</span>
            </div>
            <div style="text-align: center;">
              {{$t('bargain.originalTotalPrice')}}:
              <span v-if="item.currency === 'CNY'">￥{{(item.initialPrice * item.count).toFixed(2)}}</span>
              <span v-if="item.currency === 'USD'">${{(item.initialPrice * item.count ).toFixed(2)}}</span>
              <span v-if="item.currency === 'HKD'">HK${{(item.initialPrice * item.count ).toFixed(2)}}</span>
              <!-- <span v-if="lang === 'cn'">￥{{(item.initialPrice * item.count * rate).toFixed(2)}}</span>
              <span v-if="lang === 'en'">${{(item.initialPrice * item.count * rate).toFixed(2)}}</span>
              <span v-if="lang === 'tc'">HK${{(item.initialPrice * item.count * rate ).toFixed(2)}}</span> -->
            </div>
          </div>
          <div class="del">
          </div>
        </div>
      </div>
    </div>
    <div class="order-jiesuan">
      <el-button type="primary" round @click="next">{{$t('bargain.generateBargainList')}}</el-button>
    </div>
  </div>
</template>
<script>
  import session from '@/libs/session'
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex'
  export default {
    name: 'bargainCreate',
    data() {
      return {
        item: null,

        expectedPrice: null
      }
    },
    created: function () {
      this.item = JSON.parse(this.$route.query.item);
    },
    computed: {
      ...mapState("common", ["lang", "rate", "currency"]),
    },
    methods: {
      /**
       * 数量加减
       */
      changeCount(num) {
        if (num > 0) {
          this.item.count++;
        } else {
          this.item.count--;
        }
        if (this.item.count < 1) {
          this.item.count = 1;
        }
        if (this.item.count > this.item.inventory) {
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
          this.item.count = 1;
        }
      },
      /**
       * 验证数量输入框正则
       */
      input() {
        if (isNaN(this.item.count)) {
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
          this.item.count = 1;
        }
        if (this.item.count < 1) {
          this.item.count = 1;
        }
        if (this.item.count > this.sku.inventory) {
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
          this.item.count = 1;
        }
      },
      /**
       * 验证价格输入框正则
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
       * 下一步
       */
      next() {
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
          let data = {
            count: this.item.count,
            color: this.item.color,
            colorEn: this.item.colorEn,
            initialPrice: this.item.initialPrice,
            orderNo: this.item.orderno,
            goodsStockId: this.item.goodsStockId,
            expectedPrice: this.expectedPrice,
            currency: this.item.currency,
          }
          session.addHistory('StepKey', 2)
          session.addHistory('bargainData', JSON.stringify(data))
          this.$emit('Out', {
            key: 2
          })
        }
      }
    }
  }

</script>
<style lang="less" scoped>
  .order-one {
    /deep/ .el-button--text {
      color: #999;
    }

    .order-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #999;
      margin-bottom: 40px;

      .big-title {
        font-size: 20px;
        color: #5b5b5b;
      }
    }

    .icon-weixuanzhongkuang {
      position: relative;
      top: 0px;
      margin-right: 5px;
    }

    .order-options {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #999;
      text-align: center;

      .sellect-all {
        display: flex;
        margin-right: 100px;
        width: 115px;
      }

      .info {
        margin-right: 330px;
        margin-left: 35px;
        width: 115px;
      }

      .onceprice {
        margin-right: 80px;
        width: 115px;
      }

      .num {
        margin-right: 95px;
        width: 115px;
      }
    }

    .order-list {
      margin-top: 30px;

      .order-item {
        margin-bottom: 10px;
        font-size: 12px;
        color: #999;

        .order-item-shop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .order-item-two {
          border: 1px solid #c4c4c4;
          display: flex;
          align-items: center;
          padding: 20px;
          background-color: #f9f8f8;
          position: relative;
          margin-bottom: 10px;

          .two-left {
            display: flex;
            align-items: center;
            width: 440px;
          }

          .item-two-img {
            img {
              flex-shrink: 0;
              height: 80px;
              border-radius: 5px;
              margin-right: 25px;
              margin-left: 5px;
            }
          }

          .item-two-title {
            flex-shrink: 0;
            width: 210px;
            line-height: 20px;
            color: #1a1a1a;
            margin-right: 50px;
          }

          .item-two-sku {
            flex-shrink: 0;
            width: 210px;

            .color {
              margin-bottom: 5px;
            }
          }

          .item-two-price {
            width: 156px;
            flex-shrink: 0;
            text-align: center;
            margin-right: 88px;

            .price-top {
              display: flex;
              align-items: center;
              justify-content: center;

              /deep/ .el-input {
                width: 60px;
              }
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
            display: flex;
            align-items: center;
            margin-right: 75px;

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
            width: 180px;

            .now {
              margin-bottom: 5px;
            }
          }

          .del {
            position: absolute;
            right: 20px;
            bottom: 20px;
          }
        }

      }
    }

    .order-jiesuan {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

</style>

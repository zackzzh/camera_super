<template>
  <div class="cart-one">
    <el-card class="box-card cart-one-left">
      <div class="order-options">
        <div class="checked" @click="checkedAll">
          <i class="iconfont icon-fangxingxuanzhong" v-if="checkAll"></i>
          <i class="iconfont icon-weixuanzhongkuang" v-else></i>
          {{$t('cart.selectall')}}
        </div>
        <div class="info">{{$t('cart.description')}}</div>
        <div class="onceprice">{{$t('cart.unitprice')}}</div>
        <div class="options-num">{{$t('cart.quantity')}}</div>
        <div class="total-num">{{$t('cart.totalprice')}}</div>
        <div class="options-del" @click="delCheck">{{$t('cart.delete')}}</div>
      </div>
      <div class="cart-list">
        <div class="cart-item" v-for="(item, index) in list" :key="index">
          <div class="cart-checked">
            <div @click="productCheck(item)">
              <i class="iconfont icon-fangxingxuanzhong" v-if="item.checked"></i>
              <i class="iconfont icon-weixuanzhongkuang" v-else></i>
            </div>
            <img :src="item.goodsPicHead" alt>
          </div>
          <div class="cart-title">
            <div class="title">
              <div>{{item.goodsTitle}}</div>
              <div class="sku">{{$t('cart.color')}}:
                <span v-if="lang==='en'">{{item.colorEn}}</span>
                <span v-else>{{item.color}}</span>
              </div>
            </div>
          </div>
          <div class="price">
            <span v-if="lang === 'cn'">￥{{(item.price * rate).toFixed(2)}}</span>
            <span v-if="lang === 'en'">${{(item.price * rate).toFixed(2)}}</span>
            <span v-if="lang === 'tc'">HK${{(item.price * rate).toFixed(2)}}</span>
            <!-- $<span>{{item.price}}</span><i style="font-size:12px;">&nbsp;/&nbsp;</i>HK$<span>{{item.price}}</span> -->
          </div>
          <div class="item-two-add">
            <el-button icon="el-icon-minus" @click="changeCount(-1, item)" :disabled="item.count <= 1"></el-button>
            <el-input v-model="item.count" @blur="input(item)"></el-input>
            <el-button icon="el-icon-plus" @click="changeCount(1, item)"></el-button>
          </div>
          <div class="total-price">
            <!-- ￥{{item.count * item.price}} -->
            <span v-if="lang === 'cn'">￥{{(item.count * item.price * rate).toFixed(2)}}</span>
            <span v-if="lang === 'en'">${{(item.count * item.price * rate).toFixed(2)}}</span>
            <span v-if="lang === 'tc'">HK${{(item.count * item.price * rate).toFixed(2)}}</span>
            <!-- $<span>{{item.count * item.price}} </span><i style="font-size:12px;">&nbsp;/&nbsp;</i>HK$<span>{{item.count
              * item.price}}</span> -->
          </div>
          <div class="del" @click="del(item, index)">
            <el-button icon="iconfont icon-shanchu1"></el-button>
          </div>
        </div>
      </div>
    </el-card>
    <div class="cart-one-right">
      <el-card class="box-card right-top">
        <div class="right-top-title">{{$t('cart.bill')}}</div>
        <!-- <div class="total">
          <div class="total-left">共计</div>
          <div class="total-right">￥10000.00</div>
        </div>-->
        <!-- <div class="total">
          <div class="total-left">支付运费</div>
          <div class="total-right">￥15.00</div>
        </div>-->
        <div class="total">
          <div class="total-left">{{$t('cart.totalpayment')}}</div>
          <div class="total-right">
            <!-- ￥{{total_price}} -->
            <span v-if="lang === 'cn'">￥{{(total_price * rate).toFixed(2)}}</span>
            <span v-if="lang === 'en'">${{(total_price * rate).toFixed(2)}}</span>
            <span v-if="lang === 'tc'">HK${{(total_price * rate).toFixed(2)}}</span>
            <!-- $<span>{{total_price}}</span><i style="font-size:12px;">&nbsp;/&nbsp;</i>HK$<span>{{total_price}}</span> -->
          </div>
        </div>
        <!-- <div class="right-top-bargain">
          <i class="iconfont icon-order"></i>
          生成议价单
        </div> -->
      </el-card>
      <el-card class="box-card">
        <div class="talk-top-left">
          <span>{{$t('cart.remark')}}：</span>
          <el-input :placeholder="$t('cart.placeholderremark')" type="textarea" :autosize="{ minRows: 1, maxRows: 5}"
            v-model="remark"></el-input>
        </div>
      </el-card>
      <div class="button">
        <el-button type="primary" round @click="toProduct">{{$t('cart.continueshopping')}}</el-button>
        <el-button type="danger" round @click="next">{{$t('cart.settlement')}}</el-button>
      </div>
      <div class="right-bottom">
        <!-- <div class="bottom-nav">
          <div class="nav-item" @click="nav(index, item)" v-bind:class="{'active':navKey==index}" v-for="(item, index) in goodsCategoryList"
            :key="index">{{item.name}}</div>
        </div> -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="lang==='en'?item.nameEn:item.name" :name="lang==='en'?item.nameEn:item.name"
            v-for="(item, index) in goodsCategoryList" :key="index">
          </el-tab-pane>
        </el-tabs>
        <el-row :gutter="10">
          <el-col :span="12" v-for="(item, index) in goodsList" :key="index">
            <div class="grid-content bg-purple" @click="toDetail(item)">
              <div class="img">
                <img :src="item.picHead" alt>
              </div>
              <el-tooltip class="item" effect="dark" :content="item.title" placement="top" popper-class="top-title">
                <div class="title1">
                  <span v-if="lang==='en'">{{item.titleEn}}</span>
                  <span v-else>{{item.title}}</span>
                </div>

              </el-tooltip>
              <div class="price">
                <div>
                  <!-- ¥<span>{{item.price}}</span> -->
                  <!-- $<span>{{item.price}}</span><i style="font-size:12px;">&nbsp;/&nbsp;</i>HK$<span>{{item.price}}</span> -->
                  <span v-if="lang === 'cn'">￥{{(item.price * rate).toFixed(2)}}</span>
                  <span v-if="lang === 'en'">${{(item.price * rate).toFixed(2)}}</span>
                  <span v-if="lang === 'tc'">HK${{(item.price * rate).toFixed(2)}}</span>
                </div>
                <div class="add" @click.stop="add(item)">
                  <i class="iconfont icon-cartplus"></i>&nbsp;&nbsp;
                  <!-- <i class="iconfont icon-order"></i> -->
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import session from "@/libs/session";
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex'
  export default {
    name: "cartOne",
    data() {
      return {
        activeName: '',
        navKey: 0,
        count: 1,
        checkAll: false,
        total_price: 0,
        ids: [],
        goodsCategoryList: [],
        goodsList: [],
        remark: ''
      };
    },
    computed: {
      ...mapState("cart", ["list"]),
      ...mapState("common", ["lang", "rate", "currency"]),
    },
    created: function () {
      /**
       * 初始化数据
       */
      this.list.forEach(data => {
        data.checked = false;
      });
      this.load();
      this.cartList();
    },
    methods: {
      ...mapActions('cart', ['cartNumber', 'addCart', 'cartList']),
      /**
       * 跳转详情
       */
      toDetail(item) {
        this.$go('productDetail?id=' + item.id)
      },
      /**
       * 加入购物车
       */
      add(item) {
        let data = {
          goodsId: item.id,
          count: 1,
          color: item.color,
          colorEn: item.colorEn,
          price: item.price,
          totalPrice: item.price * 1,
          goodsStockId: item.goodsStockId
        }
        this.addCart(data)
          .then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  })
                  this.total_price = 0;
                  this.ids = [];
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
      },
      load() {
        this.$api.home.customer({})
          .then((res) => {
            if (res.code == 200) {
              this.goodsCategoryList = res.goodsCategoryList;
              this.activeName = res.goodsCategoryList[0].name
              this.goodsList = res.goodsList;
            }
          })
      },
      // /**
      //  * 分类推荐筛选
      //  */
      // nav(index, item) {
      //   this.navKey = index;
      //   var categoryId = item.id;
      //   this.$api.product.list({
      //     page: 1,
      //     limit: 8,
      //     categoryId: categoryId
      //   }).then((res) => {
      //     if (res.code == 200) {
      //       this.goodsList = res.page.list;
      //     }
      //   })
      // },
      /**
       * 推荐筛选
       */
      handleClick(tab, event) {
        let categoryId;
        categoryId = this.goodsCategoryList[Number(tab.index)].id
        this.$api.product.list({
          page: 1,
          limit: 28,
          categoryId: categoryId
        }).then((res) => {
          if (res.code == 200) {
            this.goodsList = res.page.list;
          }
        })
      },
      /**
       * 计算价格和统计ids
       */
      totalPrice() {
        let sum = 0;
        this.list.forEach((data, index) => {
          if (data.checked === true) {
            sum += Number(data.count) * Number(data.price);
            this.ids.push(data.id);
            this.ids = Array.from(new Set(this.ids))
          } else {
            this.ids.forEach((d, i) => {
              if (d == data.id) {
                this.ids.splice(i, 1);
              } else {
                return;
              }
            })

          }
          if (this.list.length - 1 == index) {
            this.total_price = sum;
          }
        });
      },
      /**
       * 下一步
       */
      next() {
        if (this.ids.length > 0) {
          let goodsList = [];
          this.list.forEach((data, index) => {
            if (data.checked) {
              goodsList.push({
                color: data.color,
                colorEn: data.colorEn,
                count: data.count,
                goodsId: data.goodsId,
                price: data.price,
                totalPrice: data.totalPrice,
                goodsStockId: data.goodsStockId
              })
            }
            if (this.list.length - 1 == index) {
              let params = {
                currency: this.currency,
                totalPrice: this.total_price,
                goodsList,
                remark: this.remark
              }
              session.addHistory("cartData", JSON.stringify(params));
              session.addHistory("StepKey", 2);
              this.total_price = 0;
              this.checkAll = false;
              this.$emit("Out", {
                key: 2
              });
            }
          })
        } else {
          let message = '';
          if (this.lang === 'en') {
            message = 'Check at least one item in order to settle accounts'
          } else {
            message = '最少要勾选一件商品，才能结算'
          }
          this.$message({
            message: message,
            type: 'error'
          })
        }
      },
      toProduct() {
        this.$go('product')
      },
      /**
       * 购物车单选
       */
      productCheck(item, index) {
        item.checked = !item.checked;
        this.totalPrice();
        let sum = 0;
        this.list.forEach((data, index) => {
          sum += data.checked;
          if (this.list.length - 1 == index) {
            if (sum === this.list.length) {
              this.checkAll = true;
            } else {
              this.checkAll = false;
            }
          }
        });
      },
      /**
       * 购物车全选
       */
      checkedAll() {
        this.checkAll = !this.checkAll;
        if (this.checkAll) {
          this.list.forEach(data => {
            data.checked = true;
          });
        } else {
          this.list.forEach(data => {
            data.checked = false;
          });
        }
        this.totalPrice();

      },
      /**
       * 商品数量加减
       */
      changeCount(num, item) {
        if (num > 0) {
          item.count++;
        } else {
          item.count--;
        }
        if (item.count < 1) {
          item.count = 1;
        }
        if (item.count > item.inventory) {
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
          item.count = item.inventory;
        }
        this.totalPrice();
      },
      /**
       * 商品数量正则
       */
      input(item) {
        if (isNaN(item.count)) {
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
          item.count = 1;
        }
        if (item.count < 1) {
          item.count = 1;
        }
        if (item.count > item.inventory) {
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
          item.count = item.inventory;
        }
        this.totalPrice();
      },
      /**
       * 删除商品
       */
      del(item, index) {
        let title = '';
        let notice = '';
        let buttonCancel = '';
        let buttonConfirm = '';
        let deleteCancel = ''
        switch (this.lang) {
          case 'cn':
            title = '删除购物车商品, 是否继续?';
            notice = '提示';
            buttonCancel = '取消';
            buttonConfirm = '确定';
            deleteCancel = '已取消删除'
            break;
          case 'en':
            notice = 'Notice';
            title = 'Delete this Goods?';
            buttonCancel = 'Cancel';
            buttonConfirm = 'Confirm';
            deleteCancel = "Canceled delete"
            break;
          default:
            title = '删除购物车商品, 是否继续?';
            notice = '提示';
            buttonCancel = '取消';
            buttonConfirm = '确定';
            deleteCancel = '已取消删除'
            break;
        }
        this.$confirm(title, notice, {
          confirmButtonText: buttonConfirm,
          cancelButtonText: buttonCancel,
          type: 'warning'
        }).then(() => {
          let id = [];
          id.push(item.id);
          this.$api.cart.delete(id).then(res => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.list.splice(index, 1);
                  this.cartNumber(this.list);
                  let sum = 0;
                  this.list.forEach((data, index) => {
                    sum += data.checked;
                    if (this.list.length - 1 == index) {
                      if (sum === this.list.length) {
                        this.checkAll = true;
                      } else {
                        this.checkAll = false;
                      }
                    }
                  });
                  this.totalPrice();
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                  break;
              }
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: deleteCancel
          });
        });
      },
      /**
       * 全选删除和多选删除
       */
      delCheck() {
        if (this.ids.length === 0) {
          let message = '';
          if (this.lang === 'en') {
            message = 'Please tick the one you want to delete first'
          } else {
            message = '库存不足，请联系客服'
          }
          this.$message({
            message: message,
            type: 'error'
          })
          return;
        } else {
          let message = '';
          let notice = '';
          let buttonCancel = '';
          let buttonConfirm = '';
          let deleteCancel = ''
          if (this.lang === 'en') {
            message = 'Delete the items in the shopping cart tick, do you want to continue?'
            notice = 'Notice';
            buttonCancel = 'Cancel';
            buttonConfirm = 'Confirm';
            deleteCancel = "Canceled delete"
          } else {
            title = '删除购物车商品, 是否继续?';
            notice = '提示';
            buttonCancel = '取消';
            buttonConfirm = '确定';
            deleteCancel = '已取消删除'
          }
          this.$confirm(message, notice, {
            confirmButtonText: buttonConfirm,
            cancelButtonText: buttonCancel,
            type: 'warning'
          }).then(() => {

            if (this.checkAll) {
              this.$api.cart.deleteAll()
                .then((res) => {
                  this.cartNumber([]);
                  this.totalPrice();
                  this.checkAll = false;
                })
            } else {
              this.$api.cart.delete(this.ids).then(res => {
                if (res) {
                  switch (res.code) {
                    case 200:
                      let arr = [];
                      this.list.forEach((data, index) => {
                        if (data.checked) {

                        } else {
                          arr.push(data)
                        }
                        if (this.list.length - 1 == index) {
                          this.cartNumber(arr);
                          this.totalPrice();
                        }
                      })
                      this.$message({
                        message: res.msg,
                        type: "success"
                      });
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
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: deleteCancel
            });
          });

        }
      }
    }
  };

</script>
<style lang="less" scoped>
  .cart-one {
    display: flex;
    width: 100%;

    .talk-top-left {
      display: flex;
      align-items: center;
      padding: 10px;
      font-size: 14px;

      /deep/ .el-textarea {
        width: 185px;

        input {
          margin-left: 10px;
          padding: 0px 8px;
          height: 30px;
          line-height: 30px;
        }
      }
    }

    ::-webkit-scrollbar-track-piece {
      //滚动条凹槽的颜色，还可以设置边框属性
      background-color: #f8f8f8;
    }

    ::-webkit-scrollbar {
      //滚动条的宽度
      width: 9px;
      height: 9px;
    }

    ::-webkit-scrollbar-thumb {
      //滚动条的设置
      background-color: #dddddd;
      background-clip: padding-box;
      min-height: 28px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #bbb;
    }

    .cart-one-left {
      width: 65%;
      margin-right: 5%;
      padding-bottom: 60px;

      .order-options {
        height: 60px;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding: 0px 10px;
        border-bottom: 1px solid #e5e5e5;
        box-sizing: border-box;
        justify-content: space-between;

        .checked {
          width: 140px;
          flex-shrink: 0;
        }

        .info {
          width: 140px;
          flex-shrink: 0;
          text-align: center;
        }

        .onceprice {
          width: 100px;
          flex-shrink: 0;
          text-align: center;
        }

        .options-num {
          width: 140px;
          flex-shrink: 0;
          text-align: center;
        }

        .total-num {
          width: 130px;
          flex-shrink: 0;
          text-align: center;
        }

        .options-del {
          width: 60px;
          flex-shrink: 1;
          text-align: center;
        }
      }

      .icon-weixuanzhongkuang {
        font-size: 20px;
      }

      .icon-fangxingxuanzhong {
        font-size: 20px;
        color: #409eff;
      }

      .cart-list {
        height: 700px;
        overflow-y: auto;

        .cart-item {
          display: flex;
          align-items: center;
          padding: 20px 10px;
          border-bottom: 1px solid #e5e5e5;
          box-sizing: border-box;
          justify-content: space-between;

          .cart-checked {
            width: 140px;
            flex-shrink: 0;
            display: flex;
            align-items: center;

            .iconfont {
              margin-right: 5px;
            }

            img {
              width: 100px;
              height: 100px;
            }
          }

          .cart-title {
            width: 140px;
            flex-shrink: 0;
            font-size: 12px;

            .title {
              width: 140px;

              .sku {
                background: #e5e5e5;
                margin-top: 5px;
                padding: 3px 5px;
                border-radius: 5px;
                width: 90px;
                text-align: center;
              }
            }
          }

          .price {
            width: 110px;
            flex-shrink: 0;
            font-size: 16px;
            text-align: center;
          }

          .item-two-add {
            display: flex;
            align-items: center;
            width: 140px;
            flex-shrink: 0;
            justify-content: center;

            /deep/ .el-button {
              padding: 0px;
              height: 30px;
              width: 30px;
              border-radius: 0px;
            }

            /deep/ .el-input {
              width: 50px;
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

          .total-price {
            width: 130px;
            flex-shrink: 0;
            font-size: 16px;
            text-align: center;
            flex-wrap: nowrap;
          }

          .del {
            width: 60px;
            flex-shrink: 0;

            /deep/ .el-button {
              border: none;
            }
          }
        }
      }
    }

    .cart-one-right {
      width: 30%;

      .right-top {
        margin-bottom: 20px;

        .right-top-title {
          height: 60px;
          font-size: 14px;
          display: flex;
          align-items: center;
          padding: 0px 20px;
          border-bottom: 1px solid #e5e5e5;
        }

        .total {
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0px 20px;
          height: 40px;
          line-height: 40px;

          .total-right {
            color: red;
          }
        }

        .right-top-bargain {
          border-top: 1px solid #e5e5e5;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 50px;
          font-size: 14px;
          color: #a7a9ab;
          padding: 0px 20px;
        }
      }

      .button {
        margin: 20px 0px;
        display: flex;
        justify-content: space-between;

        /deep/ .el-button {
          padding: 12px 40px;
        }

        /deep/ .el-button+.el-button {
          margin-left: 0px;
        }
      }

      .right-bottom {
        /deep/ .el-tabs__item {
          font-size: 16px;
          color: #8b8b8b;
        }

        /deep/ .el-tabs__nav-wrap::after {
          background: transparent;
        }

        /deep/ .el-tabs__item.is-active {
          color: #07010d;
          font-weight: bold;
          font-size: 18px;
        }

        /deep/ .el-tabs__active-bar {
          background: transparent;
        }

        .bottom-nav {
          display: flex;
          align-items: center;
          height: 50px;
          width: 100%;
          cursor: pointer;

          .nav-item {
            flex: 1 33.3%;
            max-width: 33.3%;
            text-align: center;
            font-size: 14px;
            color: #999;
          }

          .active {
            color: #333;
            font-size: 16px;
          }
        }

        .bg-purple {
          background: #fff;
        }

        .grid-content {
          cursor: pointer;
          border-radius: 4px;
          min-height: 36px;
          margin-bottom: 10px;

          .img {
            width: 100%;
            height: 150px;
            display: flex;

            img {
              height: 100px;
              margin: 0 auto;
              margin-top: 25px;
            }
          }

          .title1 {
            height: 30px;
            line-height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #949494;
            font-size: 14px;
            padding: 0px 20px;
          }

          .price {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            font-size: 12px;

            span {
              font-size: 15px;
              color: red;
              font-weight: bold;
              margin-left: 5px;
            }

            .add {
              font-size: 14px;

              .icon-jiahao1 {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }

</style>

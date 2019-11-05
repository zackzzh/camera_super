<template>
  <div class="productDetail">
    <el-container class="product-detail">
      <div class="product-one">
        <!-- <i class="iconfont icon-home"></i>&nbsp;&nbsp;>&nbsp;&nbsp;<span>产品中心</span>&nbsp;&nbsp;>&nbsp;&nbsp;<span>单反相机</span> -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i></el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: 'product' }">{{$t('productDetail.crumb')}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{item.brandName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="product-two">
        <div class="two-left">
          <div class="swiper-container gallery-top">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-if="item.picHead">
                <!-- <img :src="item.picHead" alt="" srcset="" style="width:610px; height:487px;"> -->
                <img-zoom :src="item.picHead" :width="'610'" :height="'487'" :bigsrc="item.picHead" :configs="configs">
                </img-zoom>
              </div>
            </div>
          </div>
          <div class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-bind:class="{'swiper-slide-active':checkedIndex == index}"
                v-for="(d, index) in item.picGoods" :key="index" @mouseover="checked(d,index)">
                <img :src="d" alt="" class="img">
              </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
        <div class="two-right">
          <div class="two-right-first">{{$t('productDetail.supplyDetails')}}</div>
          <div class="two-right-second">
            <div class="second-one">{{$t('productDetail.stock')}}：{{sku.inventory}}</div>
            <div v-if="item.salesVolume>0">{{$t('productDetail.monthlySales')}}：{{item.salesVolume}}</div>
          </div>
          <div class="two-right-third">
            <span v-if="lang=='en'">{{item.titleEn}}</span>
            <span v-else>{{item.title}}</span>
          </div>
          <div class="two-right-third">
            <span v-if="lang=='en'">{{item.subtitleEn}}</span>
            <span v-else>{{item.subtitle}}</span>
          </div>
          <div class="two-right-four">
            <!-- ￥<span>{{sku.price}}</span> -->
            <span v-if="lang === 'cn'">￥{{(sku.price * rate).toFixed(2)}}</span>
            <span v-if="lang === 'en'">${{(sku.price * rate).toFixed(2)}}</span>
            <span v-if="lang === 'tc'">HK${{(sku.price * rate).toFixed(2)}}</span>
            <!-- $<span>{{sku.price}}</span> <i style="font-size:30px;">/</i> HK$<span>{{sku.price}}</span> -->
          </div>
          <div class="two-right-five">
            <span>{{$t('productDetail.color')}}</span>
            <div class="list" v-for="(d, index) in item.goodsStockList" :key="index">
              <div class="item" v-bind:class="{'active':active===index}" @click="select(index, d)">
                <span v-if="lang==='en'">{{d.colorEn}}</span>
                <span v-else>{{d.color}}</span>
              </div>
            </div>
          </div>
          <div class="two-right-six">
            {{$t('productDetail.number')}}
            <div class="six-one">
              <el-button icon="el-icon-minus" class="jian" @click="changeCount(-1)" :disabled="count <= 1"></el-button>
              <el-input v-model="count" type="text" @blur="input"></el-input>
              <el-button icon="el-icon-plus" class="add" @click="changeCount(1)"></el-button>
            </div>
            <el-button icon="iconfont icon-cartplus" class="six-two" @click="add">{{$t('productDetail.addCart')}}
            </el-button>
            <el-button class="six-three" @click="Buy">{{$t('productDetail.buyNow')}}</el-button>
          </div>
          <div class="two-right-seven">
            {{$t('productDetail.prompt')}}
          </div>
          <div class="two-right-eight">
            <el-button type="text" icon="iconfont icon-jiahao1" @click="toBargain">
              {{$t('productDetail.addBargainingList')}}</el-button>
            <el-button type="text" icon="iconfont icon-wodekefu">
              <a
                href="tencent://message/?uin=983259423&Site=sc.chinaz.com&Menu=yes">{{$t('productDetail.onlineService')}}</a>
            </el-button>
          </div>
        </div>
      </div>
      <div class="tab">
        <div class="tab-item" :class="{'tab-item-active':tabKey==1}" @click="tabs(1)">
          {{$t('productDetail.productDesciption')}}</div>
        <div class="tab-item" :class="{'tab-item-active':tabKey==2}" @click="tabs(2)">
          {{$t('productDetail.onlineService')}}</div>
      </div>
      <div class="product-three" v-show="tabKey==1">
        <!-- <div class="title">商品介绍</div> -->
        <div class="remark" id="remark"></div>
      </div>
      <div class="product-three" v-show="tabKey==2">
        <!-- <div class="title">规格参数</div> -->
        <el-row :gutter="20" v-if="item.goodsParameterList && item.goodsParameterList.length>0">
          <el-col :span="6" v-for="(d, index) in item.goodsParameterList" :key="index">
            <div class="grid-content bg-purple" v-if="d.name.length>0">
              {{d.name}}：{{d.value}}
            </div>
          </el-col>
        </el-row>
      </div>
    </el-container>
  </div>
</template>
<script>
  import session from '@/libs/session'
  import Swiper from 'swiper';
  import imgZoom from 'vue2.0-zoom'
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex'
  export default {
    name: "productDetail",
    data() {
      return {
        item: {},
        sku: {},
        active: 0,
        count: 1,
        checkedIndex: null,
        tabKey: 1,
        configs: {
          width: 660,
          height: 487,
          maskWidth: 200,
          maskHeight: 200,
          maskColor: 'blue',
          maskOpacity: 0.2
        }
      }
    },
    computed: {
      ...mapState("common", ["lang", "rate", "currency"]),
    },
    created: function () {
      /**
       * 初始化数据
       */
      var id = this.$route.query.id;
      this.load(id)
    },
    components: {
      imgZoom
    },
    mounted() {
      var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        watchSlidesVisibility: true,
        slidesPerView: 4,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
      });
      var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        thumbs: {
          swiper: galleryThumbs,
        }
      });
    },
    methods: {
      ...mapActions('cart', ['addCart']),
      /**
       * tab切换
       */
      tabs(index) {
        this.tabKey = index;
      },
      /**
       * 跳转去议价
       */
      checked(d, index) {
        this.item.picHead = d;
        this.checkedIndex = index;
      },
      toBargain() {
        let data = {
          currency: this.currency,
          goodsId: this.item.id,
          color: this.sku.color,
          colorEn: this.sku.colorEn,
          count: this.count,
          initialPrice: this.sku.price,
          goodsStockId: this.sku.id
        }
        this.$api.bargain.createOrder(data).then((res) => {
          if (res) {
            switch (res.code) {
              case 200:
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
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

      /**
       * 数量加减
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
        if (this.count > this.sku.inventory) {
          this.$message({
            message: '库存不足，请联系客服',
            type: 'error'
          })
          this.count = 1;
        }
      },
      /**
       * 颜色筛选
       */
      select(index, d) {
        this.active = index;
        this.sku = d;
      },
      /**
       * 验证input正则
       */
      Buy() {
        let goodsList = [];
        let params = {};
        goodsList.push({
          color: this.sku.color,
          colorEn: this.sku.colorEn,
          count: this.count,
          goodsId: this.item.id,
          price: this.sku.price,
          totalPrice: this.sku.price * this.count,
          goodsStockId: this.sku.id
        })
        params = {
          currency: this.currency,
          goodsList,
          totalPrice: this.sku.price * this.count,
        }
        session.addHistory("cartData", JSON.stringify(params))
        session.addHistory("StepKey", 2);
        this.$go('cart')
      },
      input() {
        if (isNaN(this.count)) {
          this.$message({
            message: "请输入数量",
            type: 'error'
          })
          this.count = 1;
        }
        if (this.count < 1) {
          this.count = 1;
        }
        if (this.count > this.sku.inventory) {
          this.$message({
            message: '库存不足，请联系客服',
            type: 'error'
          })
          this.count = 1;
        }
      },
      load(id) {
        this.$api.product.info({
          goodsId: id
        }).then((res) => {
          if (res) {
            switch (res.code) {
              case 200:
                this.item = res.goodsInfo;
                document.getElementById('remark').innerHTML = this.item.remark;
                this.sku = this.item.goodsStockList[0];
                let arr = [];
                if (this.item.picGoods) {
                  arr = this.item.picGoods.split(';');
                  this.item.picGoods = arr;
                }
                break;
              case 503:
                break;
              default:
                break;
            }
          }
        })
      },
      /**
       * 加入购物车
       */
      add() {
        let data = {
          goodsId: this.item.id,
          count: this.count,
          color: this.sku.color,
          colorEn: this.sku.colorEn,
          price: this.sku.price,
          totalPrice: this.sku.price * 1,
          goodsStockId: this.sku.id
        }
        this.addCart(data)
          .then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  let message = '';
                  switch (this.lang) {
                    case 'cn':
                      message = res.msg
                      break;
                    case 'en':
                      message = 'Inquiry Created'
                      break;
                    default:
                      message = res.msg
                      break;
                  }
                  this.$message({
                    message: message,
                    type: 'success'
                  })
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
  .productDetail {
    background: #fff;

    .tab {
      display: flex;
      align-items: center;
      border-bottom: 1px solid red;
      // height: 40px;
      margin-top: 70px;
      background: #f7f7f7;

      .tab-item {
        cursor: pointer;
        // width: 120px;
        padding: 15px 10px;
        text-align: center;
        // height: 40px;
        // line-height: 40px;
        font-size: 14px;

        &-active {
          background: red;
          color: #fff;
        }

        &::after {
          position: absolute;
          content: '';
          bottom: -1px;
          width: 100%;
          height: 0;
          left: 0;
          border-bottom: 1px solid red;
        }
      }
    }

    .pic-box {
      width: 500px;
      height: 500px;
    }

    .swiper-container {
      width: 600px;
      height: 300px;
    }

    .gallery-top {
      // height: 80%;
      // width: 100%;
      width: 610px;
      height: 487px;
    }

    .gallery-thumbs {
      // height: 20%;
      height: 100px;
      box-sizing: border-box;
      padding: 10px 0;
    }

    .gallery-thumbs .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.4;
      margin-right: 20px;
      display: flex;
      align-items: center;
      border: 5px solid #ccc;
    }

    .gallery-thumbs .swiper-slide-active {
      opacity: 1;
    }

    .product-detail {
      margin-bottom: 30px;
    }

    .product-three {
      color: #1c1c1c;
      padding: 20px;

      .title {
        font-size: 24px;
        margin: 50px 0px
      }

      .remark {
        line-height: 30px;
      }

      .bg-purple {
        background: #fff;
      }

      .grid-content {
        cursor: pointer;
        border-radius: 4px;
        height: 40px;
        margin-bottom: 10px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    .product-one {
      cursor: pointer;
      padding: 30px 0px;
      font-size: 12px;
      color: #9a9a9a;
    }

    .product-two {
      display: flex;
      align-items: center;
      // height: 500px;

      .two-left {
        width: 55%;
        height: 100%;
        margin-right: 90px;

        // overflow-x: auto;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .two-right {
        width: 45%;
        color: #1c1c1c;

        .two-right-first {
          font-size: 24px;
          margin-bottom: 35px;
        }

        .two-right-second {
          font-size: 24px;
          display: flex;
          align-items: center;
          margin-bottom: 35px;

          .second-one {
            margin-right: 45px;

            span {
              display: inline-block;
              background: #ebebeb;
              padding: 0px 5px;
            }
          }
        }

        .two-right-third {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 35px;
          height: 60px;
          line-height: 25px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .two-right-four {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 35px;

          span {
            color: red;
            font-size: 30px;
            margin-left: 5px;
          }
        }

        .two-right-five {
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-bottom: 35px;
          font-size: 16px;

          .list {
            display: flex;
            align-items: center;
            margin-left: 10px;
            flex-wrap: wrap;

            span {
              display: inline-block;
              width: 40px;
            }

            .item {
              padding: 2px 10px;
              border-radius: 5px;
              text-align: center;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              margin-bottom: 5px;
            }

            .active {
              border: 1px solid red;
              color: red;
            }
          }
        }

        .two-right-six {
          display: flex;
          align-items: center;
          margin-bottom: 35px;

          .six-one {
            display: flex;
            align-items: center;
            margin: 0px 10px;

            /deep/ .el-button {
              height: 60px;
              display: flex;
              padding: 12px;
              justify-content: center;
            }

            .jian {
              margin-right: 5px;
            }

            .add {
              margin-left: 5px;
            }

            /deep/ .el-input__inner {
              width: 60px;
              height: 60px;
              text-align: center;
            }
          }

          .six-two {
            background: #a81081;
            color: #fff;
            width: 140px;
            height: 60px;
          }

          .six-three {
            height: 60px;
            width: 140px;
            background: #ea2727;
            color: #fff;
          }
        }

        .two-right-seven {
          font-size: 18px;
          margin-bottom: 35px;

        }

        .two-right-eight {
          /deep/ .el-button {
            margin-right: 50px;
          }

          a {
            color: #1c1c1c;
            text-decoration: none;
          }

          .icon-jiahao1,
          .icon-xinxi {
            color: #787878;
            font-size: 18px;

          }

          /deep/ .el-button--text {
            color: #1c1c1c;
            font-size: 18px;
            margin-left: 10px;

            span {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

</style>

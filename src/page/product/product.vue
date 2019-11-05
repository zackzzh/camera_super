<template>
  <div class="product">
    <el-container>

      <div class="banner">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <el-card class="box-card">
              <img :src="item.picUrl" alt="">
            </el-card>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="search">
        <el-input :placeholder="$t('product.placeholder')" v-model="keyword" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div class="sort">
        <div class="sort-one">
          <el-button>{{$t('product.brandCategory')}}</el-button>
          <el-tabs v-model="activeName" @tab-click="handleBrand">
            <el-tab-pane :label="$t('product.all')" name=""></el-tab-pane>
            <el-tab-pane :label="lang=='en'?item.nameEn:item.name" :name="lang=='en'?item.nameEn:item.name"
              v-for="(item, index) in goodsBrandList" :key="index"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="sort-two">
          <el-button>{{$t('product.productCategory')}}</el-button>
          <el-tabs v-model="activeName1" @tab-click="handleCategory">
            <el-tab-pane :label="$t('product.all')" name=""></el-tab-pane>
            <el-tab-pane :label="lang=='en'?item.nameEn:item.name" :name="lang=='en'?item.nameEn:item.name"
              v-for="(item, index) in goodsCategoryList" :key="index"></el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <div class="product">
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item, index) in list" :key="index">
            <div class="grid-content bg-purple" @click="toProduct(item)">
              <div class="left">
                <div class="img">
                  <img :src="item.picHead" alt="">
                </div>
                <div class="left-bottom">
                  <div class="item">
                    <div>{{$t('product.stock')}}</div>
                    <div class="num">{{item.inventory}}</div>
                  </div>
                  <span>|</span>
                  <div class="item">
                    <div>{{$t('product.monthlySales')}}</div>
                    <div class="num">{{item.salesVolume}}</div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="right-detail">
                  <el-tooltip class="item" effect="dark" :content="item.title" placement="top" popper-class="top-title">
                    <div class="right-two">
                      <span v-if="lang=='en'">{{item.titleEn}}</span>
                      <span v-else>{{item.title}}</span>
                    </div>
                  </el-tooltip>
                  <!-- <div class="right-two">{{item.subtitle}}</div> -->
                  <div class="right-three">
                    <!-- ￥<span>{{item.price}}</span> -->
                    <span v-if="lang === 'cn'">￥{{(item.price * rate).toFixed(2)}}</span>
                    <span v-if="lang === 'en'">${{(item.price * rate).toFixed(2)}}</span>
                    <span v-if="lang === 'tc'">HK${{(item.price * rate).toFixed(2)}}</span>
                    <!-- $<span>{{item.price}}</span>&nbsp;/&nbsp;HK$<span>{{item.price}}</span> -->
                    <!-- $<span>{{item.price}}</span><i style="font-size:20px;">&nbsp;/&nbsp;</i>HK$<span>{{item.price}}</span> -->
                  </div>
                  <div class="right-four">
                    <div class="item">
                      <span v-if="lang=='en'">{{item.subtitleEn}}</span>
                      <span v-else>{{item.subtitle}}</span>
                    </div>
                    <!-- <div class="item">4000万像素以上</div>
                    <div class="item">5轴防抖，4k视频</div> -->
                  </div>
                </div>
                <div class="right-button">
                  <el-button>{{$t('product.goBuy')}}</el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="currentPage" :page-sizes="[pageSize]" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
        <el-button type="primary" size="mini" style="margin-left:5px;">{{$t('cartAddress.confirm')}}</el-button>
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
    name: "productDetail",
    data() {
      return {
        activeName: '',
        activeName1: '',
        keyword: '',
        page: 1,
        limit: 8,
        list: [],
        totalCount: null,
        totalPage: null,
        pageSize: null,
        currentPage: 1,
        bannerList: [],
        goodsBrandList: [],
        goodsCategoryList: [],
        brandId: '',
        categoryId: ''
      }
    },
    computed: {
      ...mapState("common", ["lang", "rate"]),
    },
    created: function () {
      if (this.$route.query.category) {
        if (Object.keys(JSON.parse(this.$route.query.category)).length > 0) {
          this.activeName1 = JSON.parse(this.$route.query.category).name
          this.categoryId = JSON.parse(this.$route.query.category).id
          this.keyword = JSON.parse(this.$route.query.category).keyword
        }
      }
      let data = {
        page: 1,
        title: this.keyword,
        limit: this.limit,
        brandId: this.brandId,
        categoryId: this.categoryId
      }

      this.loadBnaner()
      this.load(data)
    },
    methods: {
      /**
       * 搜索型号
       */
      search() {
        this.page = 1;
        this.currentPage = 1;
        let data = {
          title: this.keyword,
          page: 1,
          limit: this.limit,
          brandId: this.brandId,
          categoryId: this.categoryId
        }
        this.load(data);
      },
      /**
       * 跳转详情
       */
      toProduct(item) {
        this.$go('productDetail?id=' + item.id)
      },
      /**
       * 分页
       */
      handleSizeChange(val) {
        let data = {
          title: this.keyword,
          page: val,
          limit: this.limit,
          brandId: this.brandId,
          categoryId: this.categoryId
        }
        this.load(data);
      },
      handleCurrentChange(val) {
        let data = {
          title: this.keyword,
          page: val,
          limit: this.limit,
          brandId: this.brandId,
          categoryId: this.categoryId
        }
        this.load(data);
      },
      /**
       * 加载banenr图
       */
      loadBnaner() {
        this.$api.home.customer({})
          .then((res) => {
            if (res.code == 200) {
              this.goodsCategoryList = res.goodsCategoryList;
              this.bannerList = res.bannerList;
            }
          })
      },
      /**
       * 品牌分类筛选
       */
      handleBrand(tab) {
        if (Number(tab.index) > 0) {
          this.brandId = this.goodsBrandList[Number(tab.index) - 1].id;
        } else {
          this.brandId = '';
        }
        this.currentPage = 1;
        let data = {
          title: this.keyword,
          page: this.page,
          limit: this.limit,
          brandId: this.brandId,
          categoryId: this.categoryId
        }
        this.load(data);
      },
      /**
       * 商品分类筛选
       */
      handleCategory(tab) {
        this.page = 1;
        if (Number(tab.index) > 0) {
          this.categoryId = this.goodsCategoryList[Number(tab.index) - 1].id
        } else {
          this.categoryId = ''
        }
        this.currentPage = 1;
        let data = {
          title: this.keyword,
          page: this.page,
          limit: this.limit,
          brandId: this.brandId,
          categoryId: this.categoryId
        }
        this.load(data);
      },
      /**
       * 产品加载
       */
      load(data) {
        this.$api.product.list(data)
          .then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.goodsBrandList = res.goodsBrandList;
                  this.list = res.page.list;
                  this.totalCount = res.page.totalCount;
                  this.totalPage = res.page.totalPage;
                  this.pageSize = res.page.pageSize;
                  this.page = res.page.currPage,
                    this.currPage = res.page.currPage;
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

    }
  }

</script>
<style lang="less" scoped>
  .product {
    .banner {
      margin-top: 40px;
    }

    .search {
      margin: 40px auto;
      width: 450px;
      height: 50px;
    }

    margin-bottom: 30px;

    /deep/ .el-tabs--top {
      width: 88%;
    }

    /deep/ .el-tabs__nav-prev,
    /deep/ .el-tabs__nav-next {
      i {
        font-size: 20px;
      }
    }

    /deep/ .el-tabs__nav-wrap::after {
      background: none;
    }

    /deep/ .el-carousel__container {
      height: 500px;

      .el-card__body {
        padding: 0px;
      }
    }

    .sort {
      margin: 40px 0px;

      /deep/ .el-tabs__item {
        font-size: 14px;
        color: #8b8b8b;
      }

      /deep/ .el-tabs__nav-wrap::after {
        background: transparent;
      }

      /deep/ .el-tabs__item.is-active {
        color: #07010d;
        font-weight: bold;
        font-size: 16px;
      }

      /deep/ .el-tabs__active-bar {
        background: transparent;
      }


      /deep/ .el-tabs__header {
        margin: 0px;
      }

      .sort-one {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        /deep/ .el-button {
          margin-right: 20px;
          border-radius: 25px;
          border: 1px solid#ceecfe;
          height: 33px;
          line-height: 8px;
        }
      }

      .sort-two {
        display: flex;
        align-items: center;

        /deep/ .el-button {
          margin-right: 20px;
          border-radius: 25px;
          border: 1px solid#cddc39;
          height: 33px;
          line-height: 8px;
        }
      }
    }

    .product {
      .bg-purple {
        background: #fff;
      }

      .grid-content {
        display: flex;
        cursor: pointer;
        border-radius: 4px;
        min-height: 36px;
        margin-bottom: 10px;
        border: 1px solid #d3d3d4;

        .left {
          width: 50%;
          height: 100%;
          border-right: 1px solid #d3d3d4;

          .img {
            width: 100%;
            height: 210px;
            display: flex;

            img {
              height: 150px;
              margin: 0 auto;
              margin-top: 30px;
            }
          }

          .left-bottom {
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            background: #5c5c5c;
            color: #828488;

            .item {
              flex: 1 50%;
              text-align: center;

              .num {
                margin-top: 5px;
                color: #fff;
                font-size: 14px;
              }
            }
          }
        }

        .right {
          width: 50%;
          height: 100%;
          color: #707070;
          font-size: 16px;

          .right-detail {
            padding: 0px 50px;
            height: 210px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .right-one {
              margin-bottom: 14px;
            }

            .right-two {
              width: 200px;
              height: 40px;
              line-height: 20px;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              margin-bottom: 10px;
            }

            .right-three {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 25px;

              span {
                color: red;
                font-size: 20px;
                margin-left: 5px;
              }
            }

            .right-four {
              font-size: 12px;

              .item {
                margin-bottom: 6px;
              }
            }
          }

          .right-button {
            .el-button {
              height: 90px;
              font-size: 30px;
              background: #cccccc;
              color: #1c1c1c;
              border-radius: 0;
              font-weight: bold;
              width: 100%;
              border: none;
            }
          }
        }
      }
    }

    .block {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

</style>

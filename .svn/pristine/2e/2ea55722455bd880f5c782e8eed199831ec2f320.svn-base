<template>
  <div class="enquire">
    <el-container>
      <div class="enquire-top">
        <div class="left">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">
              <i class="iconfont icon-home"></i>
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'enquire' }">{{$t('enquire.myInquirySheet')}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{title}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">{{$t('enquire.all')}}</el-dropdown-item>
              <el-dropdown-item command="0">{{$t('enquire.submit')}}</el-dropdown-item>
              <el-dropdown-item command="2">{{$t('enquire.pendingReview')}}</el-dropdown-item>
              <el-dropdown-item command="3">{{$t('enquire.agreed')}}</el-dropdown-item>
              <el-dropdown-item command="4">{{$t('enquire.auditNotPassed')}}</el-dropdown-item>
              <el-dropdown-item command="5">{{$t('enquire.completed')}}</el-dropdown-item>
              <el-dropdown-item command="6">{{$t('enquire.cancelled')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="input">
            <el-input :placeholder="$t('enquire.placeholderOlder')" v-model="keyWord" class="input-with-select"
              size="mini">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </div>
      </div>
      <div class="enquire-mid" v-if="list.length>0">
        <div class="order-list">
          <div class="order-item" v-for="(item, index) in list" :key="index">
            <div class="order-item-top">
              <div class="top-left">
                <div class="order-time">{{$t('enquireDetail.bargainingNumber')}}：{{item.orderno}}</div>
                <div class="order-sn">{{$t('enquire.createdTime')}}：{{item.createtime}}</div>
              </div>
              <!-- <div>
                <i class="iconfont icon-shanchu1"></i>
              </div> -->
            </div>
            <div class="order-item-mid">
              <div class="one">
                <div class="num">{{index + 1}}</div>
                <img :src="item.goodsPicHead" alt class="img">
                <div class="title">
                  <div>{{item.goodsTitle}}</div>
                  <div class="price">
                    <!-- ￥{{item.expectedPrice}} -->
                    <span v-if="item.currency === 'CNY'">￥</span>
                    <span v-if="item.currency === 'USD'">$</span>
                    <span v-if="item.currency === 'HKD'">HK$</span>
                    <span v-if="item.expectedPrice">{{item.expectedPrice}}</span>
                    <span v-else>{{item.initialPrice}}</span>
                  </div>
                </div>
                <div class="color">{{$t('enquire.color')}}:
                  <span v-if="lang==='en'">{{item.colorEn}}</span>
                  <span v-else>{{item.color}}</span>
                </div>
              </div>
              <div class="two">
                <div v-if="item.status === '0'">{{$t('enquire.submit')}}</div>
                <div v-if="item.status === '1'">{{$t('enquire.pendingReview')}}</div>
                <div v-if="item.status === '2'">{{$t('enquire.agreed')}}</div>
                <div v-if="item.status === '3'">{{$t('enquire.auditNotPassed')}}</div>
                <div v-if="item.status === '4'">{{$t('enquire.completed')}}</div>
                <div v-if="item.status === '5'">{{$t('enquire.cancelled')}}</div>
              </div>
              <div class="three" @click="toDetail(item)" v-if="item.status !== '0'">
                <span>{{$t('enquire.details')}}</span>
                >> </div>
              <div class="three" v-if="item.status === '0'">
                <el-button type="primary" @click="toBargain(item)">{{$t('enquire.bargain')}}</el-button>
              </div>
              <div @click="del(item)">
                <i class="iconfont icon-shanchu1"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="block" v-if="list.length>0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="currentPage" :page-sizes="[pageSize]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
          <el-button type="primary" size="mini" style="margin-left:5px;">{{$t('cartAddress.confirm')}}</el-button>
        </div>
      </div>
      <div class="enquire-mid-none" v-else>
        <el-card class="box-card">
          <img src="../../../assets/images/order_no.png" alt="">
          <div class="none-title">{{$t('enquire.noData')}}</div>
        </el-card>
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
    name: "enquire",
    data() {
      return {
        keyWord: "",
        title: "全部订单",
        page: 1,
        limit: 10,
        list: [],
        totalCount: null,
        totalPage: null,
        currentPage: 1,
        pageSize: 10,
        status: ""
      };
    },
    computed: {
      ...mapState("common", ["lang"]),
    },
    created: function () {
      /**
       * 初始化数据
       */
      var data = {
        limit: this.limit,
        page: 1,
        status: this.status
      };
      this.load(data);
      this.title = this.$t('enquire.all');
    },
    watch: {
      lang(n, o) {
        switch (this.status) {
          case '':
            this.title = this.$t('enquire.all');
            break;
          case '0':
            this.title = this.$t('enquire.submit');
            break;
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
      load(data) {
        this.$api.bargain.list(data).then(res => {
          if (res) {
            switch (res.code) {
              case 200:
                this.totalCount = res.page.totalCount;
                this.totalPage = res.page.totalPage;
                this.currentPage = res.page.currPage;
                this.size = res.page.pageSize;
                this.list = res.page.list;
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
      },
      /**
       * 分页
       */
      handleSizeChange(val) {
        var data = {
          limit: this.limit,
          page: val,
          status: this.status
        };
        this.load(data);
      },
      toBargain(item) {
        this.$router.push({
          path: 'bargain',
          query: {
            item: JSON.stringify(item),
          }
        })
      },
      handleCurrentChange(val) {
        var data = {
          limit: this.limit,
          page: val,
          status: this.status
        };
        this.load(data);
      },
      /**
       * 订单状态筛选
       */
      handleCommand(command) {
        switch (Number(command)) {
          case 0:
            this.status = "0";
            this.title = this.$t('enquire.submit');
            break;
          case 1:
            this.status = "";
            this.title = this.$t('enquire.all');
            break;
          case 2:
            this.status = "1";
            this.title = this.$t('enquire.pendingReview');
            break;
          case 3:
            this.status = "2";
            this.title = this.$t('enquire.agreed');
            break;
          case 4:
            this.status = "3";
            this.title = this.$t('enquire.auditNotPassed');
            break;
          case 5:
            this.status = "4";
            this.title = this.$t('enquire.completed');
            break;
          case 6:
            this.status = "5";
            this.title = this.$t('enquire.cancelled');
            break;
        }
        var data = {
          limit: this.limit,
          page: 1,
          status: this.status
        };
        this.load(data);
      },
      /**
       * 跳转详情
       */
      toDetail(item) {
        this.$go('enquireDetail?item=' + JSON.stringify(item))
      },
      /**
       * 搜索
       */
      search() {
        this.currentPage = 1;
        var data = {
          limit: 10,
          orderNo: this.keyWord,
          page: 1,
          status: this.status
        };
        this.load(data);
      },
      /**
       * 删除议价单
       */
      del(item) {
        let title = '';
        let notice = '';
        let buttonCancel = '';
        let buttonConfirm = '';
        let deleteCancel = ''
        switch (this.lang) {
          case 'cn':
            title = '删除该议价单, 是否继续?';
            notice = '提示';
            buttonCancel = '取消';
            buttonConfirm = '确定';
            deleteCancel = '已取消删除'
            break;
          case 'en':
            notice = 'Notice';
            title = 'Delete this negotiation?';
            buttonCancel = 'Cancel';
            buttonConfirm = 'Confirm';
            deleteCancel = "Canceled delete"
            break;
          default:
            title = '删除该议价单, 是否继续?';
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
          this.$api.bargain.delete({
            orderNo: item.orderno
          }).then(res => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                  var data = {
                    limit: this.limit,
                    page: this.page,
                    status: this.status
                  };
                  this.load(data)
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

        }).catch(() => {
          this.$message({
            type: 'info',
            message: deleteCancel
          });
        });
      }
    }
  };

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

      /deep/ .el-dropdown {
        border: 1px solid #e5e5e5;
        padding: 3px 8px;
        background: #fff;
        border-radius: 5px;
      }

      .input {
        margin-left: 40px;
      }
    }
  }

  .enquire-mid-none {
    /deep/ .el-card__body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .none-title {
        font-size: 30px;
        font-weight: bold;
        margin-top: 30px;
      }
    }
  }

  .order-list {
    .order-item {
      margin-bottom: 10px;

      .order-item-top {
        display: flex;
        align-items: center;
        color: #858585;
        font-size: 12px;
        margin-bottom: 5px;
        justify-content: space-between;
        padding: 0px 10px;

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
        align-items: center;
        border: 1px solid #e5e5e5;
        padding: 25px 15px;
        background: #fff;
        justify-content: space-between;

        .one {
          display: flex;
          align-items: center;

          .num {
            margin-right: 15px;
          }

          img {
            width: 100px;
            height: 100px;
            margin-right: 15px;
          }

          .title {
            width: 210px;
            font-size: 14px;
            color: #1a1a1a;
            margin-right: 32px;

            .price {
              margin-top: 5px;
              color: #858585;
            }
          }

          .color {
            font-size: 12px;
            color: #858585;
          }
        }

        .two,
        .three {
          font-size: 14px;
          color: #1a1a1a;
        }

        .icon-shanchu1 {
          color: #858585;
        }
      }
    }
  }

  .block {
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>

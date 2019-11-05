<template>
  <div class="enquire">
    <el-container>
      <div class="enquire-top">
        <div class="left">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">
              <i class="iconfont icon-home"></i>
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'order' }">{{$t('header.tabsHomeFour')}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{title}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">{{$t('order.all')}}</el-dropdown-item>
              <el-dropdown-item command="2">{{$t('order.Pendingpayment')}}</el-dropdown-item>
              <el-dropdown-item command="3">{{$t('order.Alreadypaid')}}</el-dropdown-item>
              <el-dropdown-item command="5">{{$t('order.completed')}}</el-dropdown-item>
              <el-dropdown-item command="6">{{$t('order.cancelled')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="input">
            <el-input :placeholder="$t('order.placeholderOlder')" v-model="keyWord" class="input-with-select"
              size="mini">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </div>
      </div>
      <div class="enquire-tip" v-if="this.status === 'D'">
        {{$t('order.online')}}
      </div>
      <div class="enquire-mid" v-if="list.length>0">
        <div class="order-options">
          <div class="options-first">
            <div class="options-one">{{$t('order.Numbering')}}</div>
            <div class="options-two">{{$t('order.product')}}</div>
            <div class="options-three">{{$t('order.parameter')}}</div>
            <div class="options-four">{{$t('order.unitprice')}}</div>
            <div class="options-five">{{$t('order.quantity')}}</div>
            <div class="options-six">{{$t('order.realpayment')}}</div>
          </div>
          <div class="options-second">{{$t('order.transaction')}}</div>
          <div class="options-third">{{$t('order.transactionoperation')}}</div>
        </div>
        <div class="order-list">
          <div class="order-item" v-for="(item, index) in list" :key="index">
            <div class="order-item-top">
              <div class="top-left">
                <div class="order-time">{{$t('order.orderNumber')}}：{{item.orderno}}</div>
                <div class="order-sn">{{$t('order.createdTime')}}：{{item.createtime}}</div>
              </div>
              <div class="top-right" @click="changeStatus(4,item)" v-if="item.status === 'C'">
                <i class="iconfont icon-shanchu1"></i>
              </div>
            </div>
            <div class="order-item-mid">
              <div class="first">
                <div class="one">{{index + 1}}</div>
                <div class="two">
                  <img :src="item.goodsPicHead" alt class="img">
                  <div class="title">{{item.goodsTitle}}</div>
                </div>
                <div class="three">{{$t('order.color')}}:
                  <span v-if="lang==='en'">{{item.colorEn}}</span>
                  <span v-else>{{item.color}}</span>
                </div>
                <div class="four">
                  <span v-if="item.currency === 'CNY'">￥</span>
                  <span v-if="item.currency === 'USD'">$</span>
                  <span v-if="item.currency === 'HKD'">HK$</span>
                  {{(item.price)}}
                </div>
                <div class="five">{{item.count}}</div>
                <div class="six">
                  <span v-if="item.currency === 'CNY'">￥</span>
                  <span v-if="item.currency === 'USD'">$</span>
                  <span v-if="item.currency === 'HKD'">HK$</span>
                  {{item.totalPrice}}
                </div>
              </div>
              <div class="second">
                <div v-if="item.status === 'D'" class="second-item">{{$t('order.Pendingpayment')}}</div>
                <div v-if="item.status === 'P' || item.status === 'E' || item.status === 'S'" class="second-item">
                  {{$t('order.Alreadypaid')}}</div>
                <div v-if="item.status === 'C'" class="second-item">{{$t('order.cancelled')}}</div>
                <el-button type="info" v-if="item.status === 'D'" size="mini" class="cancel"
                  @click="changeStatus(2,item)">{{$t('order.cancelorder')}}</el-button>
              </div>
              <div class="third">
                <div v-if="item.status === 'E'" class="second-item" style="color:red">{{$t('order.completed')}}</div>
                <el-button type="primary" v-if="item.status === 'S'" size="mini" @click="changeStatus(1,item)">
                  {{$t('order.Confirmreceipt')}}</el-button>
                <div v-if="item.status === 'S' || item.status === 'P'" style="color:red" class="second-item">
                  <div v-for="(logic, i) in logisticsList" :key="i">
                    <span v-if="logic.id === item.logisticsId">
                      <span v-if="lang=='en'">{{logic.nameEn}}</span>
                      <span v-else>{{logic.name}}</span>
                    </span>
                  </div>
                </div>
                <div class="detail" @click="toDetail(item)" v-if="item.status === 'E' || item.status === 'P'">
                  {{$t('order.orderdetails')}}>></div>
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
          <div class="none-title">{{$t('order.noData')}}</div>
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
        status: "",
        payStatus: '',
        logisticsList: [],
      };
    },
    computed: {
      ...mapState("common", ["lang"]),
    },
    created: function () {
      this.load(this.params(1));
      this.title = this.$t('order.all');
    },
    watch: {
      lang(n, o) {
        switch (this.status) {
          case '':
            this.title = this.$t('order.all');
            break;
          case 'D':
            this.title = this.$t('order.Pendingpayment');
            break;
          case 'P':
            this.title = this.$t('order.Alreadypaid');
            break;
          case 'E':
            this.title = this.$t('order.completed');
            break;
          case 'C':
            this.title = this.$t('order.cancelled');
            break;
        }
      },
    },
    methods: {
      /**
       * 初始化数据
       */
      load(data) {
        this.$api.order.list(data).then(res => {
          if (res) {
            switch (res.code) {
              case 200:
                this.totalCount = res.page.totalCount;
                this.totalPage = res.page.totalPage;
                this.currentPage = res.page.currPage;
                this.size = res.page.pageSize;
                this.list = res.page.list;
                this.logisticsList = res.logisticsList
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
        this.load(this.params(val));
      },
      handleCurrentChange(val) {
        this.load(this.params(val));
      },
      /**
       * 订单状态帅筛选
       */
      handleCommand(command) {
        this.payStatus = '';
        switch (Number(command)) {
          case 1:
            this.status = "";
            this.title = this.$t('order.all');
            break;
          case 2:
            this.status = "D";
            this.title = this.$t('order.Pendingpayment');
            break;
          case 3:
            this.status = "P";
            this.payStatus = '1'
            this.title = this.$t('order.Alreadypaid');
            break;
          case 5:
            this.status = "E";
            this.title = this.$t('order.completed');
            break;
          case 6:
            this.status = "C";
            this.title = this.$t('order.cancelled');
            break;
        }
        this.load(this.params(1));
      },
      params(val) {
        var data = {};
        if (this.payStatus.length > 0) {
          return data = {
            page: val,
            limit: this.limit,
            payStatus: this.payStatus,
            orderNo: this.keyWord,
          };
        } else {
          return data = {
            page: val,
            limit: this.limit,
            status: this.status,
            orderNo: this.keyWord,
          };
        }
      },
      toDetail(item) {
        item.logisticsList = this.logisticsList;
        this.$go('orderDetail?item=' + JSON.stringify(item))
      },
      /**
       * 订单搜索允许搜索订单编号
       */
      search() {
        this.currentPage = 1;
        this.load(this.params(1));
      },
      /**
       * 改变状态
       */
      changeStatus(index, item) {
        let title = '';
        let notice = '';
        let buttonCancel = '';
        let buttonConfirm = '';
        let deleteCancel = ''
        switch (this.lang) {
          case 'cn':
            notice = '提示';
            buttonCancel = '取消';
            buttonConfirm = '确定';
            deleteCancel = '我再想想'
            break;
          case 'en':
            notice = 'Notice';
            buttonCancel = 'Cancel';
            buttonConfirm = 'Confirm';
            deleteCancel = "I think again"
            break;
          default:
            notice = '提示';
            buttonCancel = '取消';
            buttonConfirm = '确定';
            deleteCancel = '我再想想'
            break;
        }
        switch (index) {
          case 1:
            switch (this.lang) {
              case 'cn':
                title = '确认收货, 是否继续?'
                break;
              case 'en':
                title = "Confirm receipt of goods?"
                break;
              default:
                title = '确认收货, 是否继续?'
                break
            }
            break;
          case 2:
            switch (this.lang) {
              case 'cn':
                title = '取消该订单, 是否继续?'
                break;
              case 'en':
                title = "Cancel this order?"
                break;
              default:
                title = '取消该订单, 是否继续?'
                break
            }
            break;
          default:
            switch (this.lang) {
              case 'cn':
                title = '删除该订单, 是否继续?';
                break;
              case 'en':
                title = "Delete this order?"
                break;
              default:
                title = '删除该订单, 是否继续?';
                break
            }
            break;
        }
        this.change(index, title, notice, buttonCancel, buttonConfirm, deleteCancel, item.orderno)

      },
      /**
       * 改变
       */
      change(index, title, notice, buttonCancel, buttonConfirm, deleteCancel, orderno) {
        this.$confirm(title, notice, {
          confirmButtonText: buttonConfirm,
          cancelButtonText: buttonCancel,
          type: 'warning'
        }).then(() => {
          let next = {}
          switch (index) {
            case 1:
              next = this.$api.order.confirm({
                orderNo: orderno
              })
              break;
            case 2:
              next = this.$api.order.cancel({
                orderNo: orderno
              })
              break;
            default:
              next = this.$api.order.delete({
                orderNo: orderno
              })
              break;
          }
          next.then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                  this.load(this.params(this.page));
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: deleteCancel
          });
        });
      },
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
    cursor: pointer;

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

  .enquire-tip {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
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

  .order-options {
    width: 100%;
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 13px;
    color: #1a1a1a;
    background: #fff;
    margin-bottom: 20px;

    .options-first {
      display: flex;
      align-items: center;
      width: 70%;
      text-align: center;

      .options-one,

      .options-five,
        {
        width: 13%;
      }

      .options-six,
      .options-four,
        {
        width: 15%;
      }

      .options-two {
        width: 40%;
      }

      .options-three {
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

  .order-list {
    .order-item {
      margin-bottom: 10px;
      border: 1px solid #000;

      .order-item-top {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #858585;
        font-size: 12px;
        justify-content: space-between;
        border-bottom: 1px solid #000;
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
        align-items: center;
        height: 130px;
        background: #fff;
        justify-content: space-between;
        font-size: 14px;
        width: 100%;

        .first {
          display: flex;
          align-items: center;
          text-align: center;
          width: 70%;
          border-right: 1px solid #000;
          height: 100%;

          .one,
          .five {
            width: 5%;
          }

          .four,
          .six {
            width: 15%;
          }

          .two {
            width: 40%;
            display: flex;
            align-items: center;

            img {
              width: 80px;
              height: 80px;
              margin-right: 15px;
            }

            .title {
              width: 130px;
            }
          }

          .three {
            width: 20%;
          }

          .num {
            margin-right: 15px;
          }



          span {
            color: red;
          }
        }

        .second,
        .third {
          width: 15%;
          height: 100%;
          font-size: 14px;
          color: #1a1a1a;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }

        .second {
          border-right: 1px solid #000;

          .second-item {
            margin-bottom: 5px;
          }

          .detail {
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
  }

  .block {
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>

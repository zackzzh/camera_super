<template>
  <div class="order">
    <div class="search">
      <el-input placeholder="订单编号" v-model="keyword" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="options-list">
      <div class="item">品牌名称</div>
      <div class="item">型号</div>
      <div class="item">颜色</div>
      <div class="item">货到付款</div>
      <div class="item">单价</div>
      <div class="item">数量</div>
      <div class="item">总价</div>
      <div class="item">操作</div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="item-top">
          <div class="top-left">
            <div class="time">下单时间：{{item.createtime}}</div>
            <div class="orderno">订单编号：{{item.orderno}}</div>
          </div>
          <div class="top-right">
            <div v-if="item.status === 'S'" class="right-one">
              收款：
              <span v-if="item.isCod==='1'">未收款</span>
              <span v-if="item.isCod==='0'">已收款</span>
            </div>
            <div v-if="item.status === 'D'">状态：未收款</div>
            <div v-if="item.status === 'P'">状态：已收款</div>
            <div v-if="item.status === 'U'">状态：已收货未付款</div>
            <div v-if="item.status === 'S'">状态：已发货</div>
            <div v-if="item.status === 'E'">状态：已完成</div>
            <div v-if="item.status === 'C'">状态：已取消</div>
          </div>
        </div>
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
            <div class="bottom" @click="toDetail(item.orderno)">查看详情>></div>
            <el-button type="info" @click="shipment(item.orderno)" size="mini" v-if="item.status === 'D' && item.isCod === '1'">立即发货</el-button>
            <el-button type="info" @click="shipment(item.orderno)" size="mini" v-if="item.status === 'P'">立即发货</el-button>
            <el-button type="info" @click="cancel(item.orderno)" size="mini" v-if="item.status === 'D'">取消订单</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-sizes="[pageSize]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
      <el-button type="primary" size="mini" style="margin-left:5px;">确定</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "order",
    props: ["keys"],
    data() {
      return {
        keyword: "",
        page: 1,
        limit: 10,
        list: [],
        totalCount: null,
        totalPage: null,
        pageSize: null,
        currentPage: 1,
        checkAll: false,
        ids: []
      };
    },
    created: function () {
      /**
       * 初始化数据
       */
      let data = {
        page: 1,
        limit: this.limit,
        status: this.keys
      };
      this.load(data);
    },
    watch: {
      keys: function (val, oldval) {
        let data = {
          page: 1,
          limit: this.limit,
          status: val
        };
        this.load(data);
      }
    },

    methods: {
      /**
       * 获取数据
       */
      load(data) {
        this.$api.manageOrder.list(data).then(res => {
          if (res) {
            switch (res.code) {
              case 200:
                this.goodsBrandList = res.goodsBrandList;
                this.list = res.page.list;
                this.list.forEach(data => {
                  data.checked = false;
                  this.ids.push(data.id);
                });
                this.totalCount = res.page.totalCount;
                this.totalPage = res.page.totalPage;
                this.pageSize = res.page.pageSize;
                this.page = res.page.currPage;
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
       * 跳转详情
       */
      toDetail(orderno) {
        this.$go("manageOrderDetail?orderno=" + orderno);
      },
      /**
       * 搜索订单编号
       */
      search() {
        this.currentPage = 1;
        let data = {
          orderNo: this.keyword,
          page: 1,
          limit: this.limit,
          status: this.keys
        };
        this.load(data);
      },
      /**
       * 分页
       */
      handleSizeChange(val) {
        let data = {
          page: val,
          limit: this.limit,
          status: this.keys
        };
        this.load(data);
      },
      handleCurrentChange(val) {
        let data = {
          page: val,
          limit: this.limit,
          status: this.keys
        };
        this.load(data);
      },
      /**
       * 立即发货
       */
      shipment(orderno) {
          
        this.$prompt("请输入快递单号", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
          .then(({
            value
          }) => {
            this.$api.manageOrder
              .shipment({
                orderNo: orderno,
                trackingNumber: value
              })
              .then(res => {
                if (res) {
                  switch (res.code) {
                    case 200:
                      this.$message({
                        type: "success",
                        message: res.msg
                      });
                      let data = {
                        page: this.page,
                        status: this.keys,
                        limit: this.limit
                      };
                      this.load(data);
                      this.$emit("Out", {
                        keys: "D"
                      });
                      break;
                    case 503:
                      break;
                    default:
                      this.$message({
                        type: "error",
                        message: res.msg
                      });
                      break;
                  }
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入"
            });
          });
      },
      /**
       * 取消订单
       */
      cancel(orderno) {
        this.$confirm("取消该订单, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.$api.manageOrder
              .cancel({
                orderNo: orderno
              })
              .then(res => {
                if (res) {
                  switch (res.code) {
                    case 200:
                      this.$message({
                        message: res.msg,
                        type: "success"
                      });
                      let data = {
                        page: this.page,
                        status: this.keys,
                        limit: this.limit
                      };
                      this.load(data);
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
              message: "我再想想"
            });
          });
      }
    }
  };

</script>
<style lang="less" scoped>
  .order {
    .search {
      margin: 40px auto;
      width: 450px;
      height: 50px;
    }

    .options-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      border: 1px solid #e5e5e5;
      border-radius: 5px;
      margin-bottom: 20px;

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

          .top-right {
            display: flex;
            align-items: center;

            .right-one {
              margin-right: 20px;
            }
          }
        }

        .item-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #e5e5e5;
          min-height: 100px;
          margin-bottom: 20px;
          padding: 10px 0px;

          .bottom-child {
            flex: 1 16.6;
            max-width: 16.6%;
            text-align: center;

            .bottom {
              cursor: pointer;
              margin-bottom: 10px;
            }

            /deep/ .el-button+.el-button {
              margin-left: 0px;
              margin-top: 5px;
            }
          }
        }
      }
    }

    .block {
      width: 400px;
      margin: 50px auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

</style>

<template>
  <div class="audited">
    <div class="search">
      <el-input placeholder="搜索品牌名" v-model="keyword" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="list">
      <div>
        <el-button type="text" @click="All('del')" v-if="keys!=='3'">一键删除</el-button>
        <el-button v-if="keys==='1' || keys==='4'" type="text" @click="All('shelve')">一键上架</el-button>
        <el-button v-if="keys==='3'" type="text" @click="All('unShelve')">一键下架</el-button>
      </div>
    </div>
    <el-table :data="list" border style="width: 100%" class="audited-table">
      <!-- <el-table-column prop="date" label="选择" width="100px">
        <template slot-scope="scope">
          <div class="item" @click="productCheck(list[scope.$index])">
            <i class="iconfont icon-fangxingxuanzhong" v-if="list[scope.$index].checked"></i>
            <i class="iconfont icon-weixuanzhongkuang" v-else></i>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column prop="date" label="发布时间" width="160px">
        <template slot-scope="scope">
          <div class="item">{{list[scope.$index].createtime}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="品牌名称" width="120px">
        <template slot-scope="scope">
          <div class="item">{{list[scope.$index].brandName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="型号名称" width="120px">
        <template slot-scope="scope">
          <div class="item">{{list[scope.$index].modelName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="商品信息">
        <template slot-scope="scope">
          <div class="info" v-for="(item, index) in list[scope.$index].stockList" :key="index">
            <div>颜色：{{item.color}}</div>
            <div>价格：{{item.price}}</div>
            <div>库存：{{item.inventory}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <div class="button">
            <el-button size="mini" @click="handleEdit(list[scope.$index] ,1)" type="info" v-if="keys==='0'">编辑</el-button>
            <el-button size="mini" @click="handleEdit(list[scope.$index], 2)" type="info" v-if="keys==='1' || keys==='4'">上架</el-button>
            <el-button size="mini" @click="handleEdit(list[scope.$index], 3)" type="info" v-if="keys==='3'">下架</el-button>
            <el-button size="mini" @click="handleEdit(list[scope.$index] ,4)" type="info" v-if="keys!=='3'">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
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
    name: 'audited',
    props: ['keys'],
    data() {
      return {
        keyword: '',
        page: 1,
        limit: 10,
        list: [],
        totalCount: null,
        totalPage: null,
        pageSize: null,
        currentPage: 1,
        checkAll: false,
        ids: []
      }
    },
    created: function () {
      /**
       * 初始化数据
       */
      let data = {
        page: 1,
        limit: this.limit,
        status: this.keys
      }
      this.load(data);
    },
    watch: {
      keys: function (val, oldval) {
        let data = {
          page: 1,
          limit: this.limit,
          status: val
        }
        this.load(data);
      }
    },
    methods: {
      /**
       * 搜索品牌名称
       */
      search() {
        this.currentPage = 1;
        let data = {
          brandName: this.keyword,
          page: 1,
          limit: this.limit,
          status: this.keys
        }
        this.load(data);
      },
      /**
       * 获取数据
       */
      load(data) {
        this.ids = [];
        this.$api.manageProduct.list(data)
          .then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.goodsBrandList = res.goodsBrandList;
                  this.list = res.page.list;
                  this.list.forEach((data) => {
                    data.checked = false;
                    this.ids.push(data.id);
                  })
                  this.totalCount = res.page.totalCount;
                  this.totalPage = res.page.totalPage;
                  this.pageSize = res.page.pageSize;
                  this.page = res.page.currPage
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
       * 删除商品
       */
      del(item) {
        this.$confirm('删除发布商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = [];
          id.push(item.id);
          this.$api.manageProduct.delete(id).then(res => {
            if (res) {
              switch (res.code) {
                case 200:
                  let data = {
                    page: this.page,
                    status: this.keys,
                    limit: this.limit
                  }
                  this.load(data);
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
            message: '已取消'
          });
        });
      },
      /**
       * 商品单选
       */
      productCheck(item) {
        item.checked = !item.checked;
        let sum = 0;
        this.list.forEach((data, index) => {
          if (data.checked === true) {
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
          sum += data.checked;
          if (this.list.length - 1 == index) {
            if (sum === this.list.length) {
              this.checkAll = true;
            } else {
              this.checkAll = false;
            }
          }
        });
        this.$set(this.list)
      },

      All(name) {
        switch (name) {
          case 'del':
            this.$confirm('您确定删除这一页商品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$api.manageProduct.delete(this.ids).then(res => {
                if (res) {
                  switch (res.code) {
                    case 200:
                      let data = {
                        page: this.page,
                        status: this.keys,
                        limit: this.limit
                      }
                      this.load(data);
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
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
            break;
          case 'shelve':
            this.$confirm('您确定上架这一页商品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$api.manageProduct.shelve(this.ids).then(res => {
                if (res) {
                  switch (res.code) {
                    case 200:
                      let data = {
                        page: this.page,
                        status: this.keys,
                        limit: this.limit
                      }
                      this.load(data);
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
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
            break;
          default:
            this.$confirm('您确定下架这一页商品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$api.manageProduct.unShelve(this.ids).then(res => {
                if (res) {
                  switch (res.code) {
                    case 200:
                      let data = {
                        page: this.page,
                        status: this.keys,
                        limit: this.limit
                      }
                      this.load(data);
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
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
            break;
        }

      },
      /**
       * 分页
       */
      handleSizeChange(val) {
        let data = {
          brandName: this.keyword,
          page: val,
          limit: this.limit,
          status: this.keys
        }
        this.load(data);
      },
      handleCurrentChange(val) {
        let data = {
          brandName: this.keyword,
          page: val,
          limit: this.limit,
          status: this.keys
        }
        this.load(data);
      },
      /**
       * 操作
       */
      handleEdit(item, index) {
        switch (index) {
          case 1:
            this.$emit('Out', {
              item: item,
              keys: '5'
            })
            break;
          case 2:
            this.shelve(item)
            break;
          case 3:
            this.unShelve(item)
            break;
          default:
            this.del(item);
            break;
        }
      },
      /**
       * 上架
       */
      shelve(item) {
        this.$confirm('上架该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = [];
          id.push(item.id);
          this.$api.manageProduct.shelve(id).then(res => {
            if (res) {
              switch (res.code) {
                case 200:
                  let data = {
                    page: this.page,
                    status: this.keys,
                    limit: this.limit
                  }
                  this.load(data);
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
            message: '已取消'
          });
        });
      },
      /**
       * 下架
       */

      unShelve(item) {
        this.$confirm('下架该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = [];
          id.push(item.id);
          this.$api.manageProduct.unShelve(id).then(res => {
            if (res) {
              switch (res.code) {
                case 200:
                  let data = {
                    page: this.page,
                    status: this.keys,
                    limit: this.limit
                  }
                  this.load(data);
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
            message: '已取消'
          });
        });
      }
    }
  }

</script>
<style lang="less" scoped>
  .audited {
    .search {
      margin: 40px auto;
      width: 450px;
      height: 50px;
    }

    /deep/ .el-table th>.cell {
      text-align: center;
    }

    .audited-table {
      /deep/ .el-button {
        margin: 3px auto;
      }
    }

    /deep/ .el-table {
      text-align: center;

      .info {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 5px;
      }

      .item {
        text-align: center;
      }

      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }

    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
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

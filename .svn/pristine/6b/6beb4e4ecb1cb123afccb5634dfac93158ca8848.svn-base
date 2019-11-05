<template>
  <div class="addresslist">
    <div v-if="showAdd">
      <div class="two-title">
        <div>{{$t('basicSet.Myaddress')}}</div>
      </div>
      <div class="button">
        <el-button @click="add()" type="primary">{{$t('basicSet.Addaddress')}}</el-button>
      </div>
      <div class="address-list">
        <div class="address-item" v-for="(item, index) of list" :key="index">
          <div class="address-item-one">
            <div class="one-left">{{item.username}}</div>
            <div class="one-right" v-if="item.type==0">{{$t('cartAddress.setAsDefault')}}</div>
          </div>
          <div class="address-item-two">
            <span>{{$t('cartAddress.consignee')}}：</span> {{item.username}}
          </div>
          <div class="address-item-two" v-if="item.province && item.province.length>0">
            <span>{{$t('cartAddress.area')}}：</span> {{item.province}}{{item.city}}{{item.area}}
          </div>
          <div class="address-item-two">
            <span>{{$t('cartAddress.address')}}：</span> {{item.address}}
          </div>
          <div class="address-item-two">
            <span>{{$t('cartAddress.cellphoneNumber')}}：</span>{{item.phoneCode}} {{item.contactsPhone}}
          </div>
          <div class="address-item-two">
            <span>{{$t('basicSet.email')}}：</span>{{email}}
          </div>
          <div class="address-del">
            <el-button icon="iconfont icon-shanchu1" @click="del(item)"></el-button>
          </div>
          <div class="address-edit">
            <el-button type="text" @click="edit(item)">{{$t('basicSet.edit')}}</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <add-address :item="item" :index="index" v-on:Out="outEvent"></add-address>
    </div>
  </div>
</template>
<script>
  import addAddress from "@/components/account/addAddress.vue"
  import session from '@/libs/session';
  export default {
    name: 'addressList',
    data() {
      return {
        page: 1,
        limit: 5,
        list: [],
        totalCount: null,
        totalPage: null,
        currentPage: 1,
        item: {},
        index: null,
        showAdd: true,
        ids: [],
        email: ''
      }
    },
    components: {
      'add-address': addAddress,
    },
    created: function () {
      /**
       * 数据初始化
       */
      let email = session.getHistory('email');
      if (email) {
        this.email = email;
      }
      this.getAddressList()
    },
    methods: {
      load() {
        this.$api.address.list({
            page: this.page,
            limit: this.limit,
          })
          .then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  res.page.list.forEach((data) => {
                    data.checked = false
                  });
                  this.list = res.page.list
                  this.totalCount = res.page.totalCount;
                  this.totalPage = res.page.totalCount;
                  break;
                case 503:
                  break;
                default:
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  });
                  break;
              }
            }
          })
      },
      outEvent() {
        this.showAdd = true;
        this.load();
      },
      getAddressList() {
        this.load();
      },

      checked(index) {
        this.list[index].checked = !this.list[index].checked;
        if (this.list[index].checked) {
          this.ids.push(this.list[index].id)
        } else {
          var index = this.ids.indexOf(this.list[index].id);
          if (index > -1) {
            this.ids.splice(index, 1);
          }
        }
      },
      /**
       * 编辑地址
       */
      edit(item, index) {
        this.index = 2;
        this.item = item;
        this.showAdd = false;
      },
      /**
       * 删除地址
       */
      del(item) {
        let message = '';
        let notice = '';
        let buttonCancel = '';
        let buttonConfirm = '';
        let deleteCancel = ''
        if (this.lang === 'en') {
          message = 'Delete the address, do you want to continue?'
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
          this.ids.push(item.id);
          this.$api.address.delete(this.ids).then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  this.page = 1;
                  this.load();
                  break;
                case 503:
                  break;
                default:
                  this.$message({
                    message: res.msg,
                    type: 'error'
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
      add() {
        this.index = 1;
        this.showAdd = false;
      },
      delchecked() {
        if (this.ids.length == 0) {
          let message;
          if (this.lang === 'en') {
            message = 'Please select the address to delete first'
          } else {
            message = '请先选择要删除的地址'
          }
          this.$message({
            message: message,
            type: 'error'
          });
          return;
        }
        this.$post('/api/tuseraddress/delete', this.ids).then((res) => {
          if (res && res.code == 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.load();
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },
      /**
       * 分页
       */
      handleSizeChange(val) {
        this.page = val;
        this.load();
      },

      handleCurrentChange(val) {
        this.page = val;
        this.load();
      }
    }
  }

</script>

<style lang="less" scoped>
  .addresslist {
    margin: 0px 20px;
    color: #101010;

    .two-title {
      display: flex;
      justify-content: space-between;
      margin: 20px 0px;
      align-items: center;
    }

    .button {
      /deep/ .el-button {
        font-size: 12px;
        border: none;
      }
    }

    .address-list {
      margin: 10px 0px;
      position: relative;

      .address-item {
        border: 1px solid #e6e6e6;
        padding: 20px;
        color: #666;
        font-size: 12px;
        position: relative;
        margin-bottom: 10px;

        .address-item-one {
          display: flex;
          font-size: 14px;
          margin-bottom: 15px;
          align-items: center;

          .one-right {
            background: #ffaa45;
            padding: 2px 4px;
            margin-left: 20px;
            color: #fff;
          }
        }

        .address-item-two {
          margin-bottom: 10px;

          span {
            color: #999;
          }
        }

        .address-edit {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }

        .address-del {
          position: absolute;
          top: 20px;
          right: 20px;

          /deep/ .el-button {
            border: none;
            text-align: right;
            padding: 0px;
          }
        }
      }

      // .address-item {
      //   color: #101010;
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      //   font-size: 14px;
      //   padding-bottom: 10px;
      //   margin-bottom: 20px;
      //   border-bottom: 1px solid #ccc;

      //   .address-item-left {
      //     display: flex;
      //     align-items: center;

      //     .list-checkbox {
      //       margin-right: 20px;
      //     }

      //     .avatar {
      //       width: 65px;
      //       height: 65px;
      //       border-radius: 50%;
      //       margin-right: 20px;
      //       background: #000;
      //     }

      //     .active {
      //       background: yellow;
      //     }

      //     .info {
      //       .info-top {
      //         display: flex;
      //         align-items: center;
      //         margin-bottom: 5px;

      //         .name {
      //           margin-right: 20px;
      //         }
      //       }
      //     }
      //   }
      // }

      // .el-pagination {
      //   width: 500px;
      //   margin: 0 auto;
      // }
    }
  }

</style>

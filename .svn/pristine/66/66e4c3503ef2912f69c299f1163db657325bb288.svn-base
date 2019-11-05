<template>
  <div class="cartAddress">
    <el-card class="box-card cart-address">
      <div class="title">{{$t('cartAddress.receivingAddress')}}</div>
      <div class="center">
        <div class="small-title">{{$t('cartAddress.selectShippingAddress')}}</div>
        <el-card class="select">
          <div>{{$t('cartAddress.plaeseSelectShippingAddress')}}</div>
        </el-card>
        <div class="address-item" v-for="(item, index) of list" :key="index" @click="check(item, index)"
          v-bind:class="{active:key== index}">
          <div class="address-item-one">
            <div class="one-left">{{item.contactsName}}</div>
            <div class="one-right" v-if="item.type==0">{{$t('cartAddress.setAsDefault')}}</div>
          </div>
          <div class="address-item-two">
            <div class="left"><span>{{$t('cartAddress.consignee')}}：</span> {{item.contactsName}}</div>
            <div> <span>{{$t('cartAddress.cellphoneNumber')}}：</span>{{item.phoneCode}} {{item.contactsPhone}}</div>
          </div>
          <div class="address-item-two">
            <div class="left" v-if="item.province && item.province.length>0">
              <span>{{$t('cartAddress.area')}}：</span>
              {{item.province}}{{item.city}}{{item.area}}</div>
            <div><span>{{$t('cartAddress.address')}}：</span> {{item.address}}</div>
          </div>
        </div>
        <el-card class="select">
          <div @click="dialogVisible = true" class="add">{{$t('cartAddress.addShippingAddress')}}</div>
        </el-card>
        <el-dialog :title="$t('cartAddress.addShippingAddress')" :visible.sync="dialogVisible">
          <el-form :model="formName" label-width="150px" class="demo-ruleForm">
            <el-form-item :label="$t('cartAddress.consignee')">
              <el-input type="text" :placeholder="$t('cartAddress.placeholderPeople')" v-model="formName.contactsName">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('cartAddress.phoneCode')">
              <el-select v-model="formName.phoneCode" :placeholder="$t('cartAddress.placeholdephoneCode')">
                <el-option v-for="item in countruyData" :key="item.key" :label="item.value" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('cartAddress.cellphoneNumber')">
              <el-input type="text" :placeholder="$t('cartAddress.cellphoneNumber')" v-model="formName.contactsPhone">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('basicSet.country')" v-if="lang !== 'en'">
              <el-select :placeholder="$t('basicSet.placeholderCountry')" @change="changeCountry" v-model="name">
                <el-option v-for="item in countruy" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('basicSet.Province')" v-if="lang === 'en' || id==='en' ">
              <el-input type="text" :placeholder="$t('basicSet.placeholderProvince')" v-model="formName.province">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('basicSet.City')" v-if="lang === 'en' || id==='en' ">
              <el-input type="text" :placeholder="$t('basicSet.placeholderCity')" v-model="formName.city">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('basicSet.location')" prop="pce" v-if="id==='cn' && lang !== 'en'">
              <v-distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"
                :province="formName.province" :city="formName.city" :area="formName.area"></v-distpicker>
            </el-form-item>
            <el-form-item :label="$t('basicSet.Detailedaddress')">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}"
                :placeholder="$t('basicSet.placeholderaddress')" v-model="formName.address">
              </el-input>
            </el-form-item>
            <el-checkbox v-model="checked" @click="checkAddress">{{$t('cartAddress.setAsDefaultAddress')}}</el-checkbox>
            <el-form-item class="basic-center">
              <el-button type="primary" round @click="submitForm(formName)">{{$t('cartAddress.confirmSave')}}
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <div class="button">
        <el-button round @click="next()">{{$t('cartAddress.confirm')}}</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
  import VDistpicker from 'v-distpicker'
  import session from '@/libs/session';
  import {
    countruyCode,
    countruyCodeEn
  } from '@/components/account/countryCode.js'
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex'
  export default {
    name: 'cartAddress',
    data() {
      return {
        countruy: [{
            name: '中国',
            id: 'cn'
          },
          {
            name: '其他',
            id: 'en'
          }
        ],
        id: '',
        name: '',
        page: 1,
        limit: 10,
        list: [],
        key: null,
        dialogVisible: false,
        formName: {
          contactsName: '',
          contactsPhone: '',
          province: '',
          city: '',
          area: '',
          address: '',
          type: null,
          phoneCode: ''
        },
        checked: false,
        data: {},
        cartData: {},
      }
    },
    components: {
      VDistpicker
    },
    created: function () {
      /**
       * 初始化数据
       */
      this.data = JSON.parse(session.getHistory('bargainData'))
      this.cartData = JSON.parse(session.getHistory('cartData'));
      this.load();
    },
    computed: {
      ...mapState("common", ["lang"]),
      countruyData() {
        if (this.lang === 'en') {
          return countruyCodeEn
        } else {
          return countruyCode
        }
      }
    },
    methods: {
      ...mapActions('cart', ['cartNumber', 'addCart']),
      // 选择国家
      changeCountry(e) {
        this.id = e;
      },
      load() {
        this.$api.address.list({
            page: this.page,
            limit: this.limit,
          })
          .then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.list = res.page.list
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
      /**
       * 选择地址
       */
      check(item, index) {
        this.key = index;

      },
      /**
       * 选择默认地址
       */
      checkAddress() {
        this.checked = !this.checked
      },
      /**
       * 提交表单
       */
      submitForm(formName) {
        if (formName.contactsName.length == 0) {
          this.$message({
            message: this.$t('cartAddress.placeholderPeople'),
            type: 'error'
          });
          return;
        }
        if (formName.phoneCode.length == 0) {
          this.$message({
            message: this.$t('cartAddress.placeholdephoneCode'),
            type: 'error'
          });
          return;
        }
        if (formName.contactsPhone.length == 0) {
          this.$message({
            message: this.$t('cartAddress.placeholderMobile'),
            type: 'error'
          });
          return;
        }
        if (this.id === 'cn') {
          if (formName.province.length == 0 || formName.city.length == 0 || formName.area.length == 0) {
            this.$message({
              message: this.$t('basicSet.provinces'),
              type: 'error'
            });
            return;
          }
        } else {
          if (formName.province.length == 0 || formName.city.length == 0) {
            this.$message({
              message: this.$t('basicSet.provinces'),
              type: 'error'
            });
            return;
          }
        }
        if (formName.address.length == 0) {
          this.$message({
            message: this.$t('basicSet.placeholderaddress'),
            type: 'error'
          });
          return;
        }
        if (this.checked) {
          formName.type = 0;
        } else {
          formName.type = 1;
        }
        var data = {
          contactsName: formName.contactsName,
          contactsPhone: formName.contactsPhone,
          address: formName.address,
          type: formName.type,
          phoneCode: formName.phoneCode,
          province: formName.province,
          city: formName.city,
        }
        if (this.lang !== 'en' && this.id === 'cn') {
          Object.assign(data, {
            area: formName.area
          })
        }
        this.$api.address.save(data).then((res) => {
          if (res) {
            switch (res.code) {
              case 200:
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.formName = {
                  contactsName: '',
                  contactsPhone: '',
                  province: '',
                  city: '',
                  area: '',
                  address: '',
                  type: null
                }
                this.checked = false;
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
            this.load();
            this.dialogVisible = false;
          }
        })
      },
      /**
       * 地址选择
       */
      onChangeProvince(a) {
        if (a.value === '其他地区') {
          this.show = true;
        } else {
          this.show = false;
          this.formName.province = a.value;
        }
      },
      onChangeCity(a) {
        this.formName.city = a.value;
      },
      onChangeArea(a) {
        this.formName.area = a.value;
      },
      /**
       * 下一步
       */
      next() {
        if (this.key === null) {
          let message;
          if (this.lang === 'en') {
            message = 'Please select the address first'
          } else {
            message = '请先选择地址'
          }
          this.$message({
            message: message,
            type: 'error'
          });
          return;
        }
        if (this.data && this.data.expectedPrice) {
          let data = {
            addressId: this.list[this.key].id,
            currency: this.data.currency,
            color: this.data.color,
            count: this.data.count,
            initialPrice: this.data.initialPrice,
            expectedPrice: this.data.expectedPrice,
            orderNo: this.data.orderNo,
            goodsStockId: this.data.goodsStockId
          }
          this.$api.bargain.update(data).then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.dialogVisible = false;
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  })
                  session.addHistory('StepKey', 3)
                  this.$emit('Out', {
                    key: 3
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
        if (this.cartData && this.cartData.goodsList.length > 0) {
          this.cartData.addressId = this.list[this.key].id;
          this.$api.order.createOrder(this.cartData).then((res) => {
            if (res) {
              switch (res.code) {
                case 200:
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  })
                  session.clearHistory('cartData');
                  this.$api.cart.deleteAll({})
                    .then((res) => {
                      this.cartNumber([]);
                    })
                  session.addHistory('StepKey', 3)
                  session.addHistory('orderNoList', res.orderNoList)
                  this.$emit('Out', {
                    key: 3
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
  }

</script>
<style lang="less" scoped>
  /deep/ .el-card__body {
    padding: 0px;
  }

  .cart-address {
    .title {
      width: 100%;
      text-align: center;
      height: 80px;
      line-height: 80px;
      font-size: 20px;
      color: #6d6d6d;
      border-bottom: 1px solid #e5e5e5;
    }

    .center {
      padding: 0px 135px;

      .small-title {
        font-size: 20px;
        color: #6d6d6d;
        margin: 30px 0px;
      }

      .select {
        height: 55px;
        width: 100%;
        text-align: center;
        line-height: 55px;
        border: 1px solid #e5e5e5;
      }

      .address-item {
        border: 1px solid #e6e6e6;
        padding: 20px;
        color: #666;
        font-size: 12px;
        position: relative;
        cursor: pointer;

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
          display: flex;
          align-items: center;

          .left {
            margin-right: 30px;
          }

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

      .add {
        cursor: pointer;
      }

      .active {
        background: #e6e6e6;
      }
    }

    .button {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 40px auto;

      /deep/ .el-button {
        width: 160px;
        background: #3b3232;
        color: #fff;
      }
    }

    /deep/ .el-form {
      width: 600px;
      margin: 0 auto;

      /deep/ .el-input {
        width: 300px;
      }

      /deep/ .el-textarea {
        width: 400px;
      }

      /deep/ .el-checkbox {
        margin-left: 50px;
      }

      .basic-center {
        margin: 20px 0px;
        width: 100%;
        display: flex;
        justify-content: center;
        ;
      }
    }

  }

</style>

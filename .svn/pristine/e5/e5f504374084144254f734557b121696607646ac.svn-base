<template>
  <div class="addaddress">
    <div class="two-title"></div>
    <div class="two-title">
      <div>{{$t('cartAddress.addShippingAddress')}}</div>
      <el-button @click="back()" type="primary">
        <i class="iconfont icon-fanhui1" style="margin-right:5px;"></i>{{$t('basicSet.back')}}
      </el-button>
    </div>
    <el-form :model="formName" label-width="120px" class="demo-ruleForm">
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
        <el-input type="text" :placeholder="$t('cartAddress.placeholderMobile')" v-model="formName.contactsPhone">
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
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" :placeholder="$t('basicSet.placeholderaddress')"
          v-model="formName.address">
        </el-input>
      </el-form-item>
      <el-checkbox v-model="checked" @click="checkAddress">{{$t('cartAddress.setAsDefaultAddress')}}</el-checkbox>
      <div class="basic-center">
        <el-button type="primary" @click="submitForm(formName)">{{$t('cartAddress.confirmSave')}}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import {
    countruyCode,
    countruyCodeEn
  } from '@/components/account/countryCode.js'
  import {
    mapState,
    mapActions,
    mapGetters
  } from "vuex";
  import VDistpicker from 'v-distpicker'
  export default {
    name: 'addaddress',
    props: ['item', 'index'],
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
        show: false,
      };
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
    created: function () {
      /**
       * 初始化数据
       */
      switch (this.index) {
        case 1:
          this.checked = false;
          break;
        default:
          this.formName = this.item;
          if (this.item.type === '1') {
            this.checked = false;
          } else {
            this.checked = true;
          }
          break;
      }
    },
    components: {
      VDistpicker
    },
    methods: {
      // 选择国家
      changeCountry(e) {
        this.id = e;
      },
      /**
       * 勾选默认
       */
      checkAddress() {
        this.checked = !this.checked
      },
      back() {
        this.$emit('Out');
      },
      /**
       * 新增地址
       */
      add(formName) {
        this.$api.address.save(formName).then((res) => {
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
                this.$emit('Out');
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
       * 编辑地址
       */
      edit(formName) {
        this.$api.address.update(formName).then((res) => {
          if (res) {
            switch (res.code) {
              case 200:
                this.$message({
                  message: '修改成功',
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
                this.$emit('Out');
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
        let data = {
          contactsName: formName.contactsName,
          contactsPhone: formName.contactsPhone,
          address: formName.address,
          type: formName.type,
          area: formName.area,
          province: formName.province,
          phoneCode: formName.phoneCode
        }
        if (this.lang !== 'en' && this.id === 'cn') {
          Object.assign(data, {
            city: formName.city
          })
        }
        switch (this.index) {
          case 1:
            this.add(data);
            break;
          case 2:
            Object.assign(data, {
              id: formName.id,
            })
            this.edit(data);
            break;
        }
      },
      /**
       * 城市选择
       */
      onChangeProvince(a) {
        this.formName.province = a.value;
      },
      onChangeCity(a) {
        this.formName.city = a.value;
      },
      onChangeArea(a) {
        this.formName.area = a.value;
      },
    }
  }

</script>
<style lang="less" scoped>
  .addaddress {
    margin: 0px 20px;
    color: #101010;

    .title {
      height: 53px;
      line-height: 53px;
      font-size: 18px;
      border-bottom: 1px solid #ccc;
    }

    .two-title {
      display: flex;
      justify-content: space-between;
      margin: 20px 0px;
      align-items: center;
    }

    .el-input,
    .el-textarea {
      width: 60%;
    }

    .el-checkbox {
      margin-left: 100px;
    }

    /deep/ .el-checkbox__inner {
      border: 1px solid #409EFF;
    }

    .basic-center {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

</style>

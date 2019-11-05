<template>
  <div class="basicInfo">
    <div class="two-title">{{$t('basicSet.basicInfo')}}</div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <el-form-item :label="$t('basicSet.country')" v-if="lang !== 'en'">
        <el-select :placeholder="$t('basicSet.placeholderCountry')" @change="changeCountry" v-model="name">
          <el-option v-for="item in countruyData" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('basicSet.location')" prop="pce" v-if="id==='cn' && lang !== 'en'">
        <v-distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"
          :province="ruleForm.province" :city="ruleForm.city" :area="ruleForm.area"></v-distpicker>
      </el-form-item>
      <el-form-item :label="$t('basicSet.Province')" v-if="lang === 'en' || id==='en' ">
        <el-input type="text" :placeholder="$t('basicSet.placeholderProvince')" v-model="ruleForm.province">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('basicSet.City')" v-if="lang === 'en' || id==='en' ">
        <el-input type="text" :placeholder="$t('basicSet.placeholderCity')" v-model="ruleForm.city">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('basicSet.Detailedaddress')" v-if="lang === 'en' || id==='en' ">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" :placeholder="$t('basicSet.placeholderaddress')"
          v-model="ruleForm.address">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('cartAddress.phoneCode')">
        <el-select v-model="ruleForm.phoneCode" :placeholder="$t('cartAddress.placeholdephoneCode')">
          <el-option v-for="item in countruyData1" :key="item.key" :label="item.value" :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('basicSet.telephone')">
        <el-input type="text" :placeholder="$t('basicSet.placeholdertelephone')" v-model="ruleForm.telephone">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('basicSet.email')">
        {{email}}
      </el-form-item>
      <el-form-item :label="$t('basicSet.picHead')" prop="picHead" style="position: relative;">
        <img :src="ruleForm.picHead" alt="" v-if="ruleForm.picHead.length>0" class="cover-img">
        <img src="../../assets/add.jpg" alt="" v-else class="cover-img">
        <span>{{$t('basicSet.sample')}}</span>
        <img src="../../assets/example.jpg" alt="" class="cover-img">
        <div>
          <div type="primary" size="mini" class="file">
            {{$t('basicSet.upload')}}<input type="file" accept="image/*" ref="showinput" @change="Preview($event,3)">
          </div>
          <el-button type="primary" size="mini" @click="delect(3)">{{$t('basicSet.delete')}}</el-button>
        </div>
      </el-form-item>
      <el-form-item label="企业生产许可证" prop="businessLicensePic" v-if="userType==2">
        <img :src="ruleForm.businessLicensePic" alt="" v-if="ruleForm.businessLicensePic.length>0" class="cover-img">
        <img src="../../assets/add.jpg" alt="" v-else class="cover-img">
        <div>
          <div type="primary" size="mini" class="file">上传<input type="file" @change="Preview($event,1)" accept="image/*"
              ref="showinput"></div>
          <el-button type="primary" size="mini" @click="delect(1)">删除</el-button>
        </div>
      </el-form-item>
      <el-form-item label="上传品牌资质证书：" prop="certPic" v-if="userType==2">
        <img :src="ruleForm.certPic" alt="" v-if="ruleForm.certPic.length>0" class="cover-img">
        <img src="../../assets/add.jpg" alt="" v-else class="cover-img">
        <div>
          <div type="primary" size="mini" class="file">上传<input type="file" @change="Preview($event,2)" accept="image/*"
              ref="showinput"></div>
          <el-button type="primary" size="mini" @click="delect(2)">删除</el-button>
        </div>
      </el-form-item>
      <el-form-item label="核心产品/服务" prop="productCore" v-if="userType==2">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入内容"
          v-model="ruleForm.productCore">
        </el-input>
      </el-form-item>
      <div class="basic-center">
        <el-button type="primary" @click="submitForm(ruleForm)">{{$t('basicSet.save')}}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import VDistpicker from 'v-distpicker';
  import session from '@/libs/session';
  import {
    countruyCode,
    countruyCodeEn
  } from '@/components/account/countryCode.js'
  import {
    mapState,
    mapActions
  } from 'vuex'
  export default {
    name: 'basicInfo',
    data() {
      return {
        countruyData: [{
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
        ruleForm: {
          address: '',
          businessLicensePic: "",
          certPic: "",
          productCore: "",
          province: '',
          city: '',
          area: '',
          telephone: '',
          picHead: '',
          phoneCode: '',
        },
        email: '',
        userType: null,
      };
    },
    created: function () {
      /**
       * 初始化数据
       */
      let email = session.getHistory('email');
      let userType = session.getHistory('userType');
      if (email) {
        this.email = email;
      }
      if (userType) {
        this.userType = Number(userType);
      }
    },
    components: {
      VDistpicker
    },
    computed: {
      ...mapState("common", ["lang"]),
      countruyData1() {
        if (this.lang === 'en') {
          return countruyCodeEn
        } else {
          return countruyCode
        }
      }
    },
    methods: {
      ...mapActions('user', ['updateUserInfo']),
      // 选择国家
      changeCountry(e) {
        this.id = e;
      },
      /**
       * 上传图片
       */
      Preview(ev, index) {
        const self = this;
        const file = ev.target.files[0];
        let obj = new FileReader();
        obj.readAsDataURL(file);
        obj.onload = () => {
          this.picReduce(obj.result, base64 => {
            switch (index) {
              case 1:
                self.ruleForm.businessLicensePic = base64;
                break
              case 2:
                self.ruleForm.certPic = base64;
                break
              case 3:
                self.ruleForm.picHead = base64;
                break
            }
          });
        };
      },
      picReduce(picObj, callback) {
        let img = new Image();
        img.src = picObj;
        img.onload = () => {
          const w = img.width;
          const h = img.height;
          const scale = w / h;
          const max_w = w > 1080 ? 1080 : w;
          const max_h = h * max_w / w;
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext('2d');
          canvas.width = max_w;
          canvas.height = max_h;
          ctx.drawImage(img, 0, 0, max_w, max_h);
          var base64 = canvas.toDataURL('image/jpeg', 0.7);
          callback(base64)
        }
      },
      /**
       * 删除上传商品
       */
      delect(index) {
        switch (index) {
          case 1:
            this.ruleForm.businessLicensePic = '';
            break;
          case 2:
            this.ruleForm.certPic = '';
            break;
          case 3:
            this.ruleForm.picHead = '';
            break;
        }
      },
      submitForm(formName) {
        if (this.id === 'en') {
          if (formName.address.length == 0 || formName.province.length == 0 || formName.city.length == 0) {
            this.$message({
              message: this.$t('basicSet.placeholderaddress'),
              type: 'error'
            });
            return;
          }
        } else {
          if (formName.province.length == 0 || formName.city.length == 0 || formName.area.length == 0) {
            this.$message({
              message: this.$t('basicSet.province'),
              type: 'error'
            });
            return;
          }
        }
        if (formName.picHead.length == 0) {
          this.$message({
            message: this.$t('basicSet.uploadavatar'),
            type: 'error'
          });
          return;
        }
        if (formName.telephone.length == 0) {
          this.$message({
            message: this.$t('basicSet.placeholdertelephone'),
            type: 'error'
          });
          return;
        }
        let data
        switch (this.userType) {
          case 1:
            data = {
              address: formName.address,
              province: formName.province,
              city: formName.city,
              area: formName.area,
              telephone: formName.telephone,
              picHead: formName.picHead,
              phoneCode: formName.phoneCode
            }
            break;
          default:
            if (formName.businessLicensePic.length == 0) {
              this.$message({
                message: '请上传企业生产许可证',
                type: 'error'
              });
              return;
            }
            if (formName.certPic.length == 0) {
              this.$message({
                message: '请上传上传品牌资质证书：',
                type: 'error'
              });
              return;
            }
            if (formName.productCore.length == 0) {
              this.$message({
                message: '请完善核心产品/服务',
                type: 'error'
              });
              return;
            }
            data = {
              address: formName.address,
              businessLicensePic: formName.businessLicensePic,
              certPic: formName.certPic,
              productCore: formName.productCore,
              province: formName.province,
              city: formName.city,
              area: formName.area,
              telephone: formName.telephone,
              picHead: formName.picHead
            }
            break;
        }
        this.updateUserInfo(formName).then((res) => {
          if (res) {
            switch (res.code) {
              case 200:
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.ruleForm = {
                  businessLicensePic: "",
                  certPic: "",
                  productCore: "",
                  province: '',
                  city: '',
                  area: '',
                  telephone: '',
                  picHead: '',
                }
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
       * 地址选择
       */
      onChangeProvince(a) {
        this.ruleForm.province = a.value;
      },
      onChangeCity(a) {
        this.ruleForm.city = a.value;
      },
      onChangeArea(a) {
        this.ruleForm.area = a.value;
      },
    }
  }

</script>
<style lang="less" scoped>
  .basicInfo {
    margin: 0px 20px;
    color: #101010;

    .title {
      height: 53px;
      line-height: 53px;
      font-size: 18px;
      border-bottom: 1px solid #ccc;
    }

    .two-title {
      margin: 20px 0px;
    }

    span {
      position: relative;
      top: -171px;
      left: 0;
      margin-left: 20px;
      margin-right: 10px;
      font-size: 14px;
      color: #606266;
    }

    .el-input,
    .el-textarea {
      width: 60%;
    }

    .basic-center {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cover-img {
      width: 200px;
      height: 200px;
      border-radius: 5px;
    }

    .file {
      position: relative;
      display: inline-block;
      background: #D0EEFF;
      border: 1px solid #99D3F5;
      border-radius: 4px;
      padding: 4px 12px;
      overflow: hidden;
      color: #1E88C7;
      text-decoration: none;
      text-indent: 0;
      line-height: 20px;
      top: 11px;
    }

    .file input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
    }

    .file:hover {
      background: #AADFFD;
      border-color: #78C3F3;
      color: #004974;
      text-decoration: none;
    }
  }

</style>

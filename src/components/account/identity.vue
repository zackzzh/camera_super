<template>
  <div class="identity">
    <div class="two-title">{{$t('basicSet.Realname')}}</div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <el-form-item :label="$t('basicSet.actualname')">
        <el-input type="text" :placeholder="$t('basicSet.placeholdername')" v-model="ruleForm.realname">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('basicSet.DocumentType')" v-if="lang !== 'en'">
        <el-select :placeholder="$t('basicSet.placeholderId')" @change="changeidTypes" v-model="name">
          <el-option v-for="item in idTypes" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('basicSet.idcardNo')" v-if="idType==='NI' || lang === 'en'">
        <el-input type="text" :placeholder="$t('basicSet.placeholderidcardNo')" v-model="ruleForm.idcardNo">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('basicSet.idcardPic')" prop="businessLicensePic">
        <img :src="ruleForm.idcardPic" alt="" v-if="ruleForm.idcardPic.length>0" class="cover-img">
        <img src="../../assets/add.jpg" alt="" v-else class="cover-img">
        <span>{{$t('basicSet.sample')}}</span>
        <img src="../../assets/hz.jpg" alt="" class="cover-img" v-if="idType === 'PP'">
        <img src="../../assets/cnID.jpg" alt="" class="cover-img" v-if="idType === 'NI'">
        <div>
          <div type="primary" size="mini" class="file">{{$t('basicSet.upload')}}<input type="file"
              @change="Preview($event)" accept="image/*" ref="showinput"></div>
          <el-button type="primary" size="mini" @click="delect()">{{$t('basicSet.delete')}}</el-button>
        </div>
      </el-form-item>
      <div class="basic-center">
        <el-button type="primary" @click="submitForm(ruleForm)">{{$t('basicSet.save')}}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  export default {
    name: 'identity',
    data() {
      return {
        ruleForm: {
          realname: '',
          idcardPic: '',
          idcardNo: ''
        },
        image: '',
        idType: 'PP',
        name: '',
        idTypes: [{
            name: '身份证',
            id: 'NI'
          },
          {
            name: '护照',
            id: 'PP'
          },
          {
            name: '其他',
            id: 'OT'
          }
        ],
      };
    },
    computed: {
      ...mapState("common", ["lang"]),
    },
    methods: {
      // 选择证件类型
      changeidTypes(e) {
        this.idType = e;
        this.ruleForm.idcardNo = '';
        this.ruleForm.idcardPic = '';
      },
      ...mapActions('user', ['updateUserInfo']),
      /**
       * 图片上传
       */
      Preview(ev) {
        const self = this;
        const file = ev.target.files[0];
        let obj = new FileReader();
        obj.readAsDataURL(file);
        obj.onload = () => {
          this.picReduce(obj.result, base64 => {
            self.ruleForm.idcardPic = base64;
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
       * 删除上传照片
       */
      delect(index) {
        this.ruleForm.idcardPic = '';
      },
      /**
       * 提交
       */
      submitForm(ruleForm) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (ruleForm.realname.length == 0) {
          this.$message({
            message: this.$t('basicSet.placeholdername'),
            type: 'error'
          });
          return;
        }
        if (this.idType === 'NI' || this.lang === 'en') {
          if (ruleForm.idcardNo.length == 0) {
            this.$message({
              message: this.$t('basicSet.placeholderidcardNo'),
              type: 'error'
            });
            return;
          } else if (!reg.test(ruleForm.idcardNo)) {
            this.$message({
              message: this.$t('basicSet.placeholderidcardNoreg'),
              type: 'error'
            });
            return;
          }
        }
        if (ruleForm.idcardPic.length == 0) {
          this.$message({
            message: this.$t('basicSet.upIdcard'),
            type: 'error'
          });
          return;
        }
        if (this.lang === 'en') {
          Object.assign(ruleForm, {
            idType: 'PP'
          })
        } else {
          Object.assign(ruleForm, {
            idType: this.idType
          })
        }
        this.updateUserInfo(ruleForm).then((res) => {
          if (res) {
            switch (res.code) {
              case 200:
                this.$message({
                  message: '上传成功',
                  type: 'success'
                });
                this.ruleForm = {
                  realname: "",
                  idcardPic: "",
                  idcardNo: ""
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
    }
  }

</script>
<style lang="less" scoped>
  .identity {
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

    .el-input {
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

    span {
      position: relative;
      top: -171px;
      left: 0;
      margin-left: 20px;
      margin-right: 10px;
      font-size: 14px;
      color: #606266;
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
      top: 10px;
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

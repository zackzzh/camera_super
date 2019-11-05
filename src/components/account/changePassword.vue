<template>
  <div class="changePassword">
    <div class="two-title">{{$t('basicSet.changePassword')}}</div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="180px" class="demo-ruleForm">
      <el-form-item :label="$t('basicSet.password')">
        <el-input type="password" :placeholder="$t('basicSet.placeholderold')" v-model="ruleForm.password">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('basicSet.newPassword')">
        <el-input type="password" :placeholder="$t('basicSet.placeholdernew')" v-model="ruleForm.newPassword">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('basicSet.comPassword')">
        <el-input type="password" :placeholder="$t('basicSet.placeholdercom')" v-model="ruleForm.comPassword">
        </el-input>
      </el-form-item>
      <div class="basic-center">
        <el-button type="primary" @click="submitForm(ruleForm)">{{$t('basicSet.Confirmchange')}}</el-button>
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
    name: 'changePassword',
    data() {
      return {
        ruleForm: {
          password: '',
          newPassword: '',
          comPassword: ''
        },
      };
    },

    methods: {
      ...mapActions('user', ['modifyPwd']),
      /**
       * 提交
       */
      submitForm(formName) {
        var reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/);
        if (formName.password.length == 0) {
          this.$message({
            message: this.$t('basicSet.validateoldPassword'),
            type: 'error'
          });
          return;
        } else if (!reg.test(formName.password)) {
          this.$message({
            message: this.$t('basicSet.validatePasswordreg'),
            type: 'error'
          });
          return;
        }
        if (formName.newPassword.length == 0) {
          this.$message({
            message: this.$t('basicSet.validatenewPassword'),
            type: 'error'
          });
          return;
        } else if (!reg.test(formName.newPassword)) {
          this.$message({
            message: this.$t('basicSet.validatePasswordreg'),
            type: 'error'
          });
          return;
        }
        if (formName.comPassword.length == 0) {
          this.$message({
            message: this.$t('basicSet.validatecomPassword'),
            type: 'error'
          });
          return;
        } else if (!reg.test(formName.comPassword)) {
          this.$message({
            message: this.$t('basicSet.validatePasswordreg'),
            type: 'error'
          });
          return;
        }
        if (formName.comPassword !== formName.newPassword) {
          this.$message({
            message: this.$t('basicSet.Inconsistent'),
            type: 'error'
          });
        }
        this.modifyPwd(formName).then((res) => {
          if (res) {
            switch (res.code) {
              case 200:
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.ruleForm = {
                  password: "",
                  newPassword: "",
                  comPassword: "",
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
  .changePassword {
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
  }

</style>

<template>
  <div class="changePassword">
    <el-container>
      <div class="forget">
        <el-card class="box-card">
          <div class="two-title">{{$t('forget.resetPassword')}}</div>
          <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item :label="$t('forget.email')">
              <span class="email-span"></span>
              <el-input v-model="ruleForm.email"></el-input>
              <div class="send">
                <el-button type="primary" size="mini" @click="sendEmail">{{$t('forget.emalcode')}}</el-button>
              </div>
            </el-form-item>
            <el-form-item :label="$t('forget.code')">
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
            <el-form-item :label="$t('forget.newPassword')">
              <el-input v-model="ruleForm.newPassword" type="text"></el-input>
            </el-form-item>
            <el-form-item class="basic-center">
              <el-button type="primary" @click="submitForm(ruleForm)">{{$t('forget.resetPassword')}}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-container>

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
          email: '',
          code: '',
          newPassword: ''
        },
        showCode: false,
      };
    },

    methods: {
      /**
       * 发送邮箱验证码
       */
      sendEmail() {
        var once = true;
        var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");
        if (this.ruleForm.email.length == 0) {
          this.$message({
            message: this.$t('register.validateEmailo'),
            type: 'error'
          });
        } else if (!reg.test(this.ruleForm.email)) {
          this.$message({
            message: this.$t('register.validateEmailt'),
            type: 'error'
          });
        } else {
          if (once) {
            once = false;
            this.$api.sendCode.sendResetPwdCode({
                email: this.ruleForm.email
              })
              .then((res) => {
                if (res && res.code == 200) {
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  });
                  once = true;
                  this.showCode = true;
                } else {
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  });
                }
              })
          }
        }
      },
      /**
       * 提交
       */
      submitForm(formName) {
        var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");
        var regpass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/);
        if (formName.email.length == 0) {
          this.$message({
            message: this.$t('register.validateEmailo'),
            type: 'error'
          });
          return;
        } else if (!reg.test(formName.email)) {
          this.$message({
            message: this.$t('register.validateEmailt'),
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
        } else if (!regpass.test(formName.newPassword)) {
          this.$message({
            message: this.$t('register.validatePasswordreg'),
            type: 'error'
          });
          return;
        }
        if (formName.code.length == 0) {
          this.$message({
            message: this.$t('register.validateCode'),
            type: 'error'
          });
          return;
        }
        this.$api.user.resetPassword(formName).then((res) => {
          if (res) {
            switch (res.code) {
              case 200:
                this.$message({
                  message: '重置成功',
                  type: 'success'
                });
                this.ruleForm = {
                  email: "",
                  code: "",
                  newPassword: ''
                }
                this.$router.push({
                  name: 'login',
                  path: 'login'
                })
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

    /deep/ .el-card__body {
      padding: 80px 20px;
    }

    .forget {
      margin: 40px 0px;

      .send {
        position: absolute;
        left: 438px;
        top: 0px;
      }

      /deep/ .el-form {
        width: 500px;
        margin: 0 auto;
          .el-form-item__content {
          margin-left: 0px !important;
        }
      }

      .title {
        height: 53px;
        line-height: 53px;
        border-bottom: 1px solid #ccc;
      }

      .two-title {
        font-size: 22px;
        margin: 20px 0px;
        width: 100%;
        text-align: center;
      }

      .el-input,
      .el-textarea {
        width: 60%;
      }

      .basic-center {
        width: 100%;
        display: flex;
        justify-content: center;

      }
    }
  }

</style>

<template>
  <div class="register">
    <el-container>
      <div class="main">
        <div class="left">
          <img src="../../assets/images/register.png" alt="">
        </div>
        <div class="register-form">
          <div class="one">
            <div class="title">
              <span>{{$t('register.detailOne')}}</span> :{{$t('register.detailTwo')}}
            </div>
            <el-form :label-position="'left'" :label-width="width" :model="formLabelAlign" ref="form" :rules="rules2">
              <el-form-item :label="$t('register.username')" required prop="username">
                <el-input v-model="formLabelAlign.username"></el-input>
              </el-form-item>
              <el-form-item :label="$t('register.password')" required prop="password">
                <el-input v-model="formLabelAlign.password" type="password"></el-input>
              </el-form-item>
              <el-form-item :label="$t('register.email')" required prop="email">
                <span class="email-span"></span>
                <el-input v-model="formLabelAlign.email"></el-input>
                <div class="send">
                  <el-button type="primary" size="mini" @click="sendEmail">{{$t('register.emalcode')}}</el-button>
                </div>
              </el-form-item>
              <el-form-item :label="$t('register.code')" required prop="code">
                <el-input v-model="formLabelAlign.code"></el-input>
              </el-form-item>
              <el-form-item :label="$t('register.companyName')" required prop="companyName">
                <el-input v-model="formLabelAlign.companyName"></el-input>
              </el-form-item>
              <el-form-item :label="$t('register.companyPhone')" required prop="companyPhone">
                <el-input v-model="formLabelAlign.companyPhone"></el-input>
              </el-form-item>
              
              <el-form-item :label="$t('register.type')" required>
                <el-radio v-model="formLabelAlign.type" label="1">{{$t('register.typeO')}}</el-radio>
                <el-radio v-model="formLabelAlign.type" label="2">{{$t('register.typeT')}}</el-radio>
              </el-form-item>
              <div class="re-checked">
                <el-checkbox v-model="checked" @click="checkedService"></el-checkbox>
                {{$t('register.checked')}}
              </div>
              <div class="button">
                <el-button type="primary" @click="onSubmit(formLabelAlign)">{{$t('register.myAccount')}}</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
  import session from '@/libs/session';
 
  import {
    mapState,
    mapActions,
    mapGetters
  } from "vuex";
  export default {
    name: "register",
    data() {
      var validateUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('register.validateUsername')));
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        var reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/);
        if (!value) {
          return callback(new Error(this.$t('register.validatePassword')));
        } else if ((!reg.test(value))) {
          callback(new Error(this.$t('register.validatePasswordreg')));
        } else {
          callback()
        }
      };
      var validateEmail = (rule, value, callback) => {
        var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");
        if (!value) {
          return callback(new Error(this.$t('register.validateEmailo')));
        } else if ((!reg.test(value))) {
          callback(new Error(this.$t('register.validateEmailt')));
        } else {
          callback()
        }
      };
      var validateCompanyName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('register.validateCompanyName')));
        } else {
          callback();
        }
      };
      var validateCompanyPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('register.validateCompanyPhone')));
        } else {
          callback();
        }
      };
      var validateCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('register.validateCode')));
        } else {
          callback();
        }
      };
      return {
        message: '',
        show: 1,
        showCode: false,
        formLabelAlign: {
          username: '',
          password: '',
          email: '',
          companyName: '',
          type: '1',
          companyPhone: '',
          introduction: '',
          code: '',
          currentCode: ''
        },
        checked: true,
        rules2: {
          username: [{
            validator: validateUsername,
            trigger: 'blur'
          }],
          password: [{
            validator: validatePassword,
            trigger: 'blur'
          }],
          email: [{
            validator: validateEmail,
            trigger: 'blur'
          }],
          companyName: [{
            validator: validateCompanyName,
            trigger: 'blur'
          }],
          companyPhone: [{
            validator: validateCompanyPhone,
            trigger: 'blur'
          }],
          code: [{
            validator: validateCode,
            trigger: 'blur'
          }],
        },
        width: null,
      }
    },
    computed: {
      ...mapState("common", ["lang"]),
    },
    created: function () {
      switch (this.lang) {
        case 'cn':
          this.width = '80px'
          break;
        case 'en':
          this.width = '120px'
          break;
        case 'tc':
          this.width = '80px'
          break;
      }
    },
    watch: {
      lang(n) {
        switch (n) {
          case 'cn':
            this.width = '80px'
            break;
          case 'en':
            this.width = '120px'
            break;
          case 'tc':
            this.width = '80px'
            break;
        }
      },
    },
    methods: {
      ...mapActions('user', ['register']),
      /**
       * 服务条款勾选
       */
      checkedService() {
        this.checked = !this.checked;
      },
      /**
       * 提交
       */
      onSubmit(formLabelAlign) {
        if (formLabelAlign.username.length == 0) {
          this.$message({
            message: this.$t('register.validateUsername'),
            type: 'error'
          });
          return;
        }
        if (formLabelAlign.password.length == 0) {
          this.$message({
            message: this.$t('register.validatePassword'),
            type: 'error'
          });
          return;
        }
        if (formLabelAlign.email.length == 0) {
          this.$message({
            message: this.$t('register.validateEmailo'),
            type: 'error'
          });
          return;
        }
        if (formLabelAlign.code.length == 0) {
          this.$message({
            message: this.$t('register.validateCode'),
            type: 'error'
          });
          return;
        }
        if (formLabelAlign.companyName.length == 0) {
          this.$message({
            message: this.$t('register.validateCompanyName'),
            type: 'error'
          });
          return;
        }
        if (formLabelAlign.companyPhone.length == 0) {
          this.$message({
            message: this.$t('register.validateCompanyPhone'),
            type: 'error'
          });
          return;
        }
        if (!this.checked) {
          this.$message({
            message: this.$t('register.protocol'),
            type: 'error'
          });
          return;
        }
        session.addHistory('email', formLabelAlign.email);
        this.register(formLabelAlign).then((res) => {
          if (res && res.code == 200) {
            this.show = 2;
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            this.$router.push({
              path: "/",
              name: "home"
            });
            location.reload();
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },
      /**
       * 发送验证码
       */
      async sendEmail() {
        var once = true;
        if (this.formLabelAlign.email.length == 0) {
          this.$message({
            message: this.$t('register.validateEmailo'),
            type: 'error'
          });
        } else {
          if (once) {
            once = false;
            await this.$api.sendCode.sendRegisterCode({
              email: this.formLabelAlign.email
            }).then((res) => {
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
       * 返回首页
       */
      home() {
        this.$router.push('/')
      }
    }
  }

</script>
<style lang="less">
  .el-container {
    width: 1200px;
    margin: 0 auto;

    .main {
      display: flex;
      align-items: center;
      height: 667px;

      .left {
        width: 565px;

        img {
          width: 565px;
          height: 565px;
        }
      }

      .register-form {
        margin: 0 auto;

        .title {
          height: 55px;
          line-height: 55px;
          font-size: 14px;
          color: #535353;

          span {
            color: #101010;
          }
        }

        .one-label {
          text-align: left;
          font-size: 14px;
          color: #535353;
        }

        .send {
          position: absolute;
          left: 278px;
          top: 0px;
        }

        .el-form-item {
          position: relative;
          margin-bottom: 30px;
          display: flex;
          justify-content: center;

          label {
            padding: 0;
            text-align: right;
            margin-right: 5px;
            // width: 118px;
          }

          .el-form-item__error {
            line-height: 15px;
          }

          .el-form-item__content {
            margin-left: 0px !important;
          }

          .el-input__inner {
            width: 265px;
            height: 33px;
            line-height: 33px;
          }

          .email-span {
            position: absolute;
            top: -28px;
            left: 57px;
            font-size: 12px;
            color: #A29F9F;
          }
        }

        .emial {
          font-size: 14px;
          color: #101010;
          text-align: left;
          margin-bottom: 10px;
        }

        .success-image {
          width: 100px;
          height: 100px;
        }

        .button {
          margin: 40px 0px 20px 0px;
          display: flex;
          align-items: center;
          justify-content: center;

          .el-button {
            width: 141px;
            font-size: 14px;
            border: none;
            height: 35px;
            display: flex;
            justify-content: center;
            line-height: 10px;
          }
        }

        .re-checked {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;

          label {
            margin-right: 5px;
            top: 1px;
          }
        }
      }
    }

  }

</style>

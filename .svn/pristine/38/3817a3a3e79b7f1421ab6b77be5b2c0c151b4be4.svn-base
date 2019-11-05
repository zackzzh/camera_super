<template>
  <div class="login">
    <div class="header">
      <div class="img" @click="$go('/')">
        <div class="img">
          <img src="../../assets/images/login-logo.png" alt>
        </div>
        <div class="title">
          <div class="title-one">{{$t('header.logoNmae')}}</div>
          <div class="title-two" v-bind:class="{'two':lang==='en'}">{{$t('login.welcome')}}</div>
        </div>
      </div>
      <div class="back" @click="$go('/')">{{$t('login.back')}}>></div>
    </div>
    <div class="container">
      <div class="img">
        <img src="../../assets/images/loginback.png" alt class="imgback">
        <img src="../../assets/images/logintop.png" alt class="topbak">
        <div class="center">
          <div class="title">{{$t('login.Userlogin')}}</div>
          <el-form :model="form">
            <el-form-item>
              <el-input prefix-icon="iconfont icon-user" v-model="form.username" autocomplete="off" :placeholder="$t('login.placeholderUsername')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input :type="eye" prefix-icon="iconfont icon-password" v-model="form.password" autocomplete="off"
                :placeholder="$t('login.placeholderPassword')"></el-input>
              <el-button icon="el-icon-view" type="text" @click="showEye" class="eye"></el-button>
            </el-form-item>
            <div class="islogin">
              <div class="islogin-one">
                <el-button type="text" size="mini" @click="$go('forget')">{{$t('login.forget')}}?</el-button>
              </div>
            </div>
            <div class="button">
              <el-button type="primary" @click="sure">{{$t('login.login')}}</el-button>
            </div>
            <div class="register">
              <span @click="$go('register')">{{$t('login.noAccount')}}</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapState,
    mapActions
  } from "vuex";
  export default {
    name: "login",
    data() {
      return {
        checked: true,
        eye: 'password',
        form: {
          username: "",
          password: ""
        }
      };
    },
    computed: {
      ...mapState("common", ["lang"]),
    },
    methods: {
      ...mapActions("user", ["login"]),
      /**
       * 显示密码
       */
      showEye() {
        if (this.eye === 'password') {
          this.eye = 'text'
        } else {
          this.eye = 'password'
        }
      },
      sure() {
        if (this.form.username.length == 0) {
          this.$message({
            message: this.$t('login.placeholderUsername'),
            type: "error"
          });
          return;
        }
        if (this.form.password.length == 0) {
          this.$message({
            message: this.$t('login.placeholderPassword'),
            type: "error"
          });
          return;
        }
        this.login(this.form).then(res => {
          if (res && res.code == 200) {
            this.dialogVisible = false;
            this.$message({
              message: "登陆成功",
              type: "success"
            });
            this.$go('/');
            setTimeout(() => {
              location.reload();
            }, 500);
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      },
    }
  };

</script>
<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100%;

    .header {
      width: 1200px;
      height: 120px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;

      .back {
        cursor: pointer;
        position: absolute;
        top: 50px;
        right: 100px;
      }

      .img {
        display: flex;
        align-items: center;

        img {
          margin-right: 15px;
        }

        .title {
          .title-one {
            font-size: 30px;
            letter-spacing: 5px;
          }

          .title-two {
            font-size: 20px;
            letter-spacing: 20px;
          }
          .two{
            letter-spacing: 6px;
          }
        }
      }
    }

    .container {
      height: 667px;

      .img {
        position: relative;
        height: 667px;

        .imgback {
          height: 667px;
          width: 100%;
          z-index: 1;
          font-size: 0px;
        }

        .topbak {
          font-size: 0px;
          position: absolute;
          z-index: 2;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 30%;
        }

        .center {
          background: transparent;
          height: 300px;
          width: 300px;
          font-size: 0px;
          position: absolute;
          z-index: 2;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;

          .title {
            width: 100%;
            text-align: center;
            color: #4f4c4c;
            font-size: 28px;
            margin-bottom: 30px;
          }

          .islogin-one {
            color: #666;
          }

          .el-input__inner {
            border: none;
            border-bottom: 1px solid #e5e5e5;
          }

          .el-input__prefix {
            color: #666;
            width: 26px;
          }

          input::placeholder {
            color: #6f6d6d;
          }

          .islogin {
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }

          .eye {
            position: absolute;
            top: 0px;
            right: 10px;
          }

          .el-button--text {
            color: #756e6d;

          }

          .button {
            margin: 40px 0px 20px 0px;
            display: flex;
            align-items: center;
            justify-content: center;

            .el-button {
              background: transparent;
              font-size: 14px;
              border: none;
              height: 35px;
              border: 1px solid #4f4c4c;
              display: flex;
              line-height: 10px;
              font-size: 16px;
              color: #756e6d;
              width: 120px;
              justify-content: center;
              text-align: center;
            }
          }

          .register {
            cursor: pointer;
            width: 100%;
            text-align: center;
            color: #756e6d;
            font-size: 12px;
          }
        }
      }
    }
  }

</style>

<template>
  <div class="success">
    <div class="success-title">{{$t('bargainSuccess.submitCompleted')}}</div>
    <div class="success-content">
      <div class="content-left">
        <div class="mid">
          <div class="order-tip">
            {{$t('bargainSuccess.tipOne')}} <span><span @click="$go('/')">{{$t('bargainSuccess.tipTwo')}}</span>><span
                @click="$go('enquire')">{{$t('bargainSuccess.tipThree')}}</span></span>
            {{$t('bargainSuccess.tipFour')}}
          </div>
          <div class="order-other">{{$t('bargainSuccess.Service')}}</div>
          <div class="button">
            <el-button type="primary" @click="$go('enquire')">{{$t('bargainSuccess.tipThree')}}</el-button>
          </div>
        </div>
      </div>
      <div class="content-right">
        <img src="../../assets/images/success.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'bargainSuccess',
    data() {
      return {

      }
    },
    methods: {}
  }

</script>
<style lang="less" scoped>
  .success {
    .success-title {
      width: 100%;
      text-align: center;
      color: #5b5b5b;
      font-size: 28px;
      margin-bottom: 40px;
    }

    .success-content {
      display: flex;
      justify-content: center;

      .content-left {
        width: 50%;
        margin: 0 auto;
        font-size: 14px;
        color: #b6b6b6;

        .mid {
          width: 300px;
          margin: 0 auto;

          .order-sn {
            margin-bottom: 20px;
          }

          .order-time {
            margin-bottom: 70px;
          }

          .order-tip {
            margin-bottom: 70px;
            line-height: 25px;

            span {
              cursor: pointer;
              color: #393939;
              font-weight: bold;
            }
          }

          .button {
            display: flex;
            margin-top: 80px;
          }
        }
      }

      .content-right {
        width: 50%;
        margin: 0 auto;

        img {
          width: 300px;
          margin: 0 auto;
          display: block;
        }
      }
    }
  }

</style>

<template>
  <div class="cart">
    <el-container>
      <div class="steps">
        <el-steps :active="key" simple>
          <el-step :title="$t('cart.stepOne')" icon="iconfont icon-cart"></el-step>
          <el-step :title="$t('cart.stepTwo')" icon="el-icon-location"></el-step>
          <el-step :title="$t('cart.stepThree')" icon="iconfont icon-order"></el-step>
        </el-steps>
      </div>
      <div class="cart">
        <cart-one v-on:Out="OutEvent($event)" v-if="key===1"></cart-one>
        <cart-address v-on:Out="OutEvent($event)" v-if="key===2"></cart-address>
        <cart-success v-on:Out="OutEvent($event)" v-if="key===3"></cart-success>
      </div>
    </el-container>
  </div>
</template>
<script>
  import cartOne from "@/components/cart/cartOne.vue";
  import cartAddress from "@/components/cart/cartAddress.vue";
  import cartSuccess from "@/components/cart/cartSuccess.vue";
  import session from '@/libs/session';
  export default {
    name: "cart",
    data() {
      return {
        key: 1,
      };
    },
    created: function () {
      let key = session.getHistory('StepKey');
      if (key) {
        this.key = Number(key);
      }
    },
    destroyed: function () {
      session.clearHistory('cartData');
      session.clearHistory('StepKey');
      session.clearHistory('orderNoList');
    },
    components: {
      "cart-one": cartOne,
      'cart-address': cartAddress,
      'cart-success': cartSuccess
    },
    methods: {
      OutEvent(event) {
        if (event) {
          this.key = event.key
        }
      }
    }
  };

</script>
<style lang="less" scoped>
  .steps {
    background: #fff;
    margin: 40px 0px;

    /deep/ .el-steps--simple {
      background: #fff;
    }

    /deep/ .el-step__head.is-process,
    /deep/ .el-step__title.is-process,
    /deep/ .el-step__head.is-wait,
    /deep/ .el-step__head.is-wait {
      color: #5b5b5b;
    }
  }

  /deep/ .el-card__body {
    padding: 0px;
  }

</style>

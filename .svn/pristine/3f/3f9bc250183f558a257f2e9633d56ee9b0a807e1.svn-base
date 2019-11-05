<template>
  <div class="bargain">
    <el-container>
      <div class="steps">
        <el-steps :active="key" simple>
          <el-step :title="$t('bargain.stepOne')" icon="iconfont icon-bianji"></el-step>
          <el-step :title="$t('bargain.stepTwo')" icon="el-icon-location"></el-step>
          <el-step :title="$t('bargain.stepThree')" icon="iconfont icon-iconfontxuanzhong1"></el-step>
        </el-steps>
      </div>
      <div class="bargain-order">
        <el-card class="box-card">
          <bargain-create v-if="key===1" v-on:Out="OutEvent($event)"></bargain-create>
          <cart-address v-if="key===2" v-on:Out="OutEvent($event)"></cart-address>
          <bargain-success v-if="key===3" v-on:Out="OutEvent($event)"></bargain-success>
        </el-card>
      </div>
    </el-container>
  </div>
</template>
<script>
  import bargainCreate from "@/components/bargain/bargainCreate.vue"
  import bargainSuccess from "@/components/bargain/bargainSuccess.vue"
  import cartAddress from "@/components/cart/cartAddress.vue";
  import session from '@/libs/session'
  export default {
    name: 'bargain',
    data() {
      return {
        key: 1
      }
    },
    components: {
      'bargain-create': bargainCreate,
      'cart-address': cartAddress,
      'bargain-success': bargainSuccess
    },
    created: function () {
      let key = session.getHistory('StepKey');
      if (key) {
        this.key = Number(key);
      }
    },
    destroyed: function () {
      session.clearHistory('StepKey');
      session.clearHistory('bargainData');
    },

    methods: {
      OutEvent(e) {
        if (e) {
          this.key = e.key;
        }
      }
    }
  }

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
    padding: 40px;
  }

</style>

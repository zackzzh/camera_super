<template>
  <div class="home">
    <el-container>
      <div v-if="userType===2">
        <j-home></j-home>
      </div>
      <div v-else>
        <home-visitor></home-visitor>
      </div>
    </el-container>
   
  </div>
</template>
<script>
  import home from "@/components/home/home.vue"
  import homeVisitor from "@/components/home/homeVisitor.vue"
  import session from '@/libs/session';
  export default {
    name: "register",
    data() {
      return {
        activeName: 'first',
        userType: null
      }
    },
    created: function () {
      let userType = session.getHistory('userType');
      if (userType) {
        this.userType = Number(userType);
      } else {
        this.userType = 1;
      }
    },
    components: {
      'j-home': home,
      'home-visitor': homeVisitor
    },
    methods: {}
  }

</script>
<style lang="less">
</style>

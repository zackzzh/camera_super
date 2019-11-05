<template>
  <div class="basicSet">
    <el-container>
      <el-card>
        <div class="basicSet-all">
          <div class="title">{{$t('basicSet.Personalsettings')}}</div>
          <div class="basic">
            <div class="basic-left">
              <el-tree :data="$t('basicSet.data')" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="highlight_current"
                class="tree" node-key="id" :default-expanded-keys="[tree_id, tree_id]" :default-checked-keys="[tree_id]"></el-tree>
            </div>
            <div class="basic-right">
              <basic-info v-show="tree_id == '1-1'"></basic-info>
              <change-password v-show="tree_id == '2-1'"></change-password>
              <address-list v-show="tree_id == '3-1'"></address-list>
              <identity v-show="tree_id == '4-1'"></identity>
            </div>
          </div>
        </div>
      </el-card>
    </el-container>
  </div>
</template>
<script>
  import basicInfo from "@/components/account/basicInfo.vue"
  import changePassword from "@/components/account/changePassword.vue"
  import addressList from "@/components/account/addressList.vue"
  import identity from "@/components/account/identity.vue"
  export default {
    name: "basicSet",
    data() {
      return {
        highlight_current: true,
        tree_id: '1-1',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    components: {
      'basic-info': basicInfo,
      'change-password': changePassword,
      'address-list': addressList,
      'identity': identity
    },
    methods: {
      handleNodeClick(data) {
        this.tree_id = data.id;
      }
    }
  }

</script>
<style lang="less">
  .basicSet {
    width: 100%;

    .el-container {
      background: #fff;
      margin-top: 40px;

      .el-tree-node__content {
        height: 40px;
      }
    }

    .basicSet-all {
      width: 100%;

      .title {
        height: 110px;
        background: #fff;
        text-align: center;
        line-height: 110px;
        color: #535353;
        font-size: 28px;
      }

      .basic {
        display: flex;
        width: 100%;
        min-height: 600px;
        background: #fff;

        .basic-left {
          width: 228px;
          border-right: 1px solid #ccc;

          .el-tree {
            color: #101010;
          }

          .el-tree-node__content:hover {}

          .el-tree-node:focus>.el-tree-node__content {
            color: #299eff;
          }
        }

        .basic-right {
          width: 100%;
        }
      }
    }
  }

</style>

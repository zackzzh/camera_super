<template>
  <div class="page-message">
    <el-container>
      <div class="card">
        <el-card>
          <div class="big-title">
            <span class="line"></span>
            <span>{{$t('header.message')}}</span>
            <span class="line"></span>
          </div>
          <div class="message-content">
            <div
              class="content-item"
              v-for="(item ,key) in messageList"
              :key="key"
              @click="update(item.id)"
              v-bind:class="{'content-item-active':item.status==1}"
            >
              <div class="item-left">
                <i class="iconfont icon-dian"></i>
                <span v-if="lang==='en'">{{item.titleEn}}</span>
                <span v-else>{{item.title}}</span>
              </div>
              <div class="item-right">
                {{item.createtime}}
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "message",
  data() {
    return {
      messageList: []
    };
  },
  created: function() {
    this.load();
  },
  computed: {
    ...mapState("common", ["lang"])
  },
  destroyed() {
    this.$api.message.updateAll({}).then(res => {
      this.getMsgNum();
    });
  },
  methods: {
    ...mapActions("cart", ["getMsgNum"]),
    /**
     * 初始化数据
     */
    load() {
      this.$api.message.list({}).then(res => {
        if (res.code === 200) {
          this.messageList = res.messageList;
        }
      });
    },
    /**
     * 更新消息
     */
    update(id) {
      this.$api.message
        .update({
          messageId: id
        })
        .then(res => {
          this.load();
          this.getMsgNum();
        });
    }
  }
};
</script>

<style scoped lang="less">
.page-message {
  .card {
    margin: 40px 0px;

    /deep/ .el-card {
      min-height: 517px;
    }
  }

  .big-title {
    width: 100%;
    margin: 40px auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      display: inline-block;
      margin: 0px 10px;
      font-size: 30px;
    }

    .line {
      display: inline-block;
      width: 50px;
      height: 2px;
      background: #ccc;
    }
  }

  .message-content {
    font-size: 14px;
    color: #333;
    width: 80%;
    margin: 0 auto;
    cursor: pointer;

    .content-item {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e5e5e5;

      &-active {
        color: #999;
      }

      .item-left {
        .icon-dian {
          font-size: 25px;
          position: relative;
          top: 5px;
        }
      }
    }

    .content-item:hover {
      color: #409eff;
    }
  }
}
</style>

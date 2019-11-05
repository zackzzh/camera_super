<template>
  <div class="Home-service">
    <el-container>
      <el-card class="card-box">
        <div class="service-top">{{item.title}}</div>
        <div class="service-sub">{{item.subtitle}}</div>
        <div class="detail">
          <div class="detail-time">发布时间{{item.createtime}}</div>
          <div class="detail-author">作者：{{item.creator}}</div>
        </div>
        <div class="content" id="center">
        </div>
      </el-card>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'HomeService',
    data() {
      return {
        item: {}
      }
    },
    created: function () {
      setTimeout(() => {
        this.item = JSON.parse(this.$route.query.item)
        document.getElementById('center').innerHTML = this.item.content;
      }, 500);
    }
  }

</script>
<style lang="less" scoped>
  .Home-service {
    width: 100%;
    height: 100%;

    .card-box {
      margin-top: 40px;

      .service-top {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
      }

      .service-sub {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .detail {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #999;
        &-time {
          margin-right: 20px;
        }
      }

      .content {
        margin-top: 20px;
      }
    }

  }

</style>

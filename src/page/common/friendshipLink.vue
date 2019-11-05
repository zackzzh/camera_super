<template>
  <div class="friendship">
    <el-container>
      <div class="card">
        <el-card>
          <div class="big-title">
            <span class="line"></span> <span>{{$t('footer.Links')}}</span> <span class="line"></span>
          </div>
          <el-row :gutter="20" v-if="linksList.length>0" class="frendlist">
            <el-col :span="6" v-for="(item, key) in linksList" :key="key">
              <a :href="item.url" target="_blank" class="label">
                <span v-if="!item.picUrl">{{item.title}}</span>
                <img :src="item.picUrl" alt="" v-else>
              </a>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'friendshipLink',
    data() {
      return {
        linksList: []
      }
    },
    created: function () {
      this.load()
    },
    methods: {
      load() {
        this.$api.footer.getLinks({})
          .then((res) => {
            if (res.code == 200) {
              this.linksList = res.linksList
            }
          })
      },
      toUrl(url) {
        window.location.href = url
      }
    }
  }

</script>

<style scoped lang="less">
  .friendship {


    .card {
      margin: 40px 0px;

      /deep/ .el-card {
        min-height: 517px;
      }
    }

    .label {
      text-align: center;
      margin-bottom: 10px;
      color: #333;
      text-decoration: none;

      i {
        margin-right: 10px;
        color: #409eff;
      }
    }

    .label:hover {
      color: #409eff;
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

    .frendlist {
      cursor: pointer;

      /deep/ .el-col {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

</style>

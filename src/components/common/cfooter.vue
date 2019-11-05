<template>

  <div class="footer">
    <div class="footer-one">
      <div class="footer-two-content1">
        <div class="nav-list1">
          <div class="nav-item1" v-for="(item, key) in footerPicList" :key="key">
            <div>
              <img :src="item.picUrl" alt="">
            </div>
            <div>
              <div class="big">
                <span v-if="lang=='en'">{{item.titleEn}}</span>
                <span v-else>{{item.title}}</span>
              </div>
              <div class="small">
                <span v-if="lang=='en'">{{item.subtitleEn}}</span>
                <span v-else>{{item.subtitle}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-two">
      <div class="footer-two-content">
        <div class="nav-list">
          <div class="nav-item" v-for="(p, key) in $t('footer.fd')" :key="key" @click="$go(p.path)">
            {{p.label}}
          </div>
        </div>
        <div class="footer-one">Copyright Notice © 2017 - 2018</div>
        <div class="footer-two">增值电信业务经营许可证: *********** | ICP备**********号 | 京*网安备 *********号 | 经营证照</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from "vuex";
  export default {
    name: 'cfooter',
    data() {
      return {
        footerPicList: []
      }
    },
    computed: {
      ...mapState("common", ["lang"]),
    },
    created: function () {
      this.$api.home.getFooterPicList({})
        .then((res) => {
          this.footerPicList = res.footerPicList;
        })
    }
  }

</script>
<style lang="less" scoped>
  .footer {
    width: 100%;

    .footer-two {
      background: #2D2C2C;
      padding: 10px 0px;

      .footer-two-content {
        color: #fff;
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        font-size: 12px;

        .nav-list {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 40px 0px;

          .nav-item {
            // flex: 1 25%;
            // max-width: 25%;
            cursor: pointer;
            text-align: center;
            font-size: 14px;
            color: #BBBBBB;
            margin-right: 30px;
            position: relative;

            &::after {
              position: absolute;
              top: 5px;
              right: -15px;
              content: '';
              width: 0px;
              height: 50%;
              border: 1px solid #666;
            }
          }

          .nav-item:nth-last-child(1) {
            &::after {
              position: absolute;
              top: 5px;
              right: -15px;
              content: '';
              width: 0px;
              height: 50%;
              border: 0px solid #666;
            }
          }
        }

        .footer-one {
          margin-bottom: 5px;
        }
      }
    }

    .footer-one {
      .footer-two-content1 {
        color: #fff;
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        font-size: 12px;

        .nav-list1 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 40px 0px;

          .nav-item1 {
            flex: 1 25%;
            max-width: 25%;
            text-align: center;
            font-size: 16px;
            color: #BBBBBB;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              margin-right: 20px;
            }

            .big {
              font-size: 22px;
              font-weight: bold;
              color: #3e3e3e;
            }

            .small {
              font-size: 16px;
              color: #999999;
            }
          }
        }
      }
    }
  }

</style>

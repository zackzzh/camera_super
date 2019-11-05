<template>
  <div class="about">
    <div class="one">
      <img src="../../assets/images/about1.jpg" alt="">
      <div class="button">
        <div class="item" @click="bottom">Contact us</div>
        <div class="item" @click="$go('/')">GO to shopping</div>
      </div>
    </div>
    <div class="one">
      <img src="../../assets/images/about2.jpg" alt="">
    </div>
    <div class="one">
      <img src="../../assets/images/about3.jpg" alt="">
    </div>
    <div class="footer">
      <el-container>
        <div class="top">
          <div class="top-left">
            <div class="title">联系我们</div>
            <div class="left-list">
              <div class="list-item">
                <i class="iconfont icon-qq"></i>
                QQ：302904568
              </div>
              <div class="list-item">
                <i class="iconfont icon-phone"></i>
                电话：020-302904568
              </div>
              <div class="list-item">
                <i class="iconfont icon-youxiang"></i>
                邮箱：302904568@qq.com
              </div>
              <div class="list-item">
                <i class="iconfont icon-dizhi"></i>
                地址：广州市荔湾区信义路七喜创意园
              </div>
            </div>
          </div>
          <div class="top-min">
            <div class="title1">工作环境</div>
            <div class="left-list">
              <div class="list-item1">
                <div class="item-left">
                  <img src="../../assets/images/register.png" alt="">
                </div>
                <div class="item-right">
                  <div class="content">Happy to know how to share, to be more happy</div>
                  <div>26 May 2018</div>
                </div>
              </div>
              <div class="list-item1">
                <div class="item-left">
                  <img src="../../assets/images/register.png" alt="">
                </div>
                <div class="item-right">
                  <div class="content">Time is not to let people forget the pain, it just makes people used to pain</div>
                  <div>26 May 2018</div>
                </div>
              </div>
              <div class="list-item1">
                <div class="item-left">
                  <img src="../../assets/images/register.png" alt="">
                </div>
                <div class="item-right">
                  <div class="content">The most painful distance is that you are not around, but in my heart</div>
                  <div>26 May 2018</div>
                </div>
              </div>
            </div>
          </div>
          <div class="top-right">
            <div class="title1">合作伙伴</div>
            <el-row :gutter="10">
              <el-col :span="12">
                <img src="../../assets/images/home-p.png" alt="">
              </el-col>
              <el-col :span="12">
                <img src="../../assets/images/home-p1.png" alt="">
              </el-col>
              <el-col :span="12">
                <img src="../../assets/images/home-p2.png" alt="">
              </el-col>
              <el-col :span="12">
                <img src="../../assets/images/home-p3.png" alt="">
              </el-col>
              <el-col :span="12">
                <img src="../../assets/images/home-p4.png" alt="">
              </el-col>
              <el-col :span="12">
                <img src="../../assets/images/home-p5.png" alt="">
              </el-col>
              <el-col :span="12">
                <img src="../../assets/images/home-p.png" alt="">
              </el-col>
              <el-col :span="12">
                <img src="../../assets/images/home-p1.png" alt="">
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="bottom">
          <p>Life has been very simple, but we have been unable to help it become very complex.</p>
          <p>©2018 xx公司 版权所有</p>
        </div>
      </el-container>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'about',
    data() {
      return {
        aboutUsList: []
      }
    },
    created: function () {
      this.load()
    },
    methods: {
      bottom() {
        window.scrollTo(0, document.body.scrollHeight);
      },
      load() {
        this.$api.footer.getAboutUs({})
          .then((res) => {
            if (res.code == 200) {
              this.aboutUsList = res.aboutUsList
            }
          })
      }
    }
  }

</script>
<style lang="less" scoped>
  .one {
    width: 100%;
    position: relative;

    img {
      display: block;
      width: 100%;
    }

    .button {
      display: flex;
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 80px;
      margin: auto;

      .item {
        cursor: pointer;
        text-align: center;
        width: 216px;
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        border: 1px solid #06accf;
        color: #06accf;
        background: transparent;
        margin: 0px 10px;
      }

      .item:hover {
        color: #fff;
        background: #06accf;
      }
    }
  }

  .footer {
    background: #2d2c2c;
    padding: 50px 0px;
    color: #bbbbbb;

    .el-container {
      min-height: 350px;
    }

    .top {
      display: flex;
      justify-content: space-between;

      .top-left,
      .top-min {
        .title {
          font-size: 24px;
          color: #06accf;
          margin-bottom: 60px;
        }

        .title1 {
          font-size: 18px;
          color: #06accf;
          margin-bottom: 10px;
        }

        .left-list {
          .list-item {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-bottom: 20px;

            .iconfont {
              font-size: 24px;
              margin-right: 10px;
            }
          }

          .list-item1 {
            display: flex;
            align-items: center;

            .item-left {
              img {
                width: 70px;
                height: 70px;
                margin-right: 5px;
                border-radius: 5px;
              }
            }

            .item-right {
              .content {
                margin-bottom: 5px;
              }
            }
          }
        }
      }

      .top-right {
        width: 250px;

        .title1 {
          font-size: 18px;
          color: #06accf;
          margin-bottom: 10px;
        }

        img {
          width: 125px;
          height: 45px;
        }
      }
    }

    .bottom {
      margin: 0px 40px;
      border-top: 1px solid #666;
      text-align: center;
    }
  }

</style>

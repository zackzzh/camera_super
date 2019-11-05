<template>
  <div class="contancUs">
    <el-container>
      <div class="big-title">
        <span class="line"></span> <span>{{$t('footer.contact')}}</span> <span class="line"></span>
      </div>
      <div class="contancUs-info">
        <div class="info-item">
          <div class="item-left" v-if="contactUsInfo.zipCode">
           {{$t('footer.zipCode')}}:{{contactUsInfo.zipCode}}
          </div>
          <div class="item-right" v-if="contactUsInfo.wechatNumber">
            {{$t('footer.wechatNumber')}}:{{contactUsInfo.wechatNumber}}
          </div>
        </div>
        <div class="info-item">
          <div class="item-left" v-if="contactUsInfo.qqNumber">
            QQ:{{contactUsInfo.qqNumber}}
          </div>
          <div class="item-right" v-if="contactUsInfo.email">
            {{$t('forget.email')}}:{{contactUsInfo.email}}
          </div>
        </div>
        <div class="info-item">
          <div class="item-left" v-if="contactUsInfo.mobile">
            {{$t('cartAddress.cellphoneNumber')}}:{{contactUsInfo.mobile}}
          </div>
          <div class="item-right" v-if="contactUsInfo.officePhone">
            {{$t('footer.officePhone')}}:{{contactUsInfo.officePhone}}
          </div>
        </div>
        <div class="info-item">
          <div class="item-left" v-if="contactUsInfo.address">
            {{$t('footer.address')}}:{{contactUsInfo.address}}
          </div>
        </div>
      </div>
      <div class="contancUs-map">
        <el-card>
          <div id="container"></div>
        </el-card>
      </div>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'contactUs',
    data() {
      return {
        contactUsInfo: {},
        zoom: 12,
        center: [113.24428, 23.09485],
        markers: [{
          center: [113.24428, 23.09485],
          radius: 20,
          fillOpacity: 1,
          fillColor: 'rgba(0,0,255,1)',
          events: {
            click: () => {}
          }
        }]
      }
    },
    created: function () {
      this.load()
    },
    methods: {
      getMap() {
        // AMap是高德地图的构造函数，这里.Map是创建地图，.Marker是创建坐标点
        let mapObj = new AMap.Map('container', { //'container'是对应页面盒子的id
          resizeEnable: true, //自适应大小
          zoom: 20, //初始视窗
          center: [113.24428, 23.09485] //中心点
        });
        var marker = new AMap.Marker({
          map: mapObj,
          position: new AMap.LngLat('113.24428', '23.09485') //此处根据页面数据可以直接传入经纬度进行描点
        })
        marker.setMap(mapObj);
      },
      load() {
        this.$api.footer.getContactUs({})
          .then((res) => {
            if (res.code == 200) {
              this.contactUsInfo = res.contactUsInfo
            }
          })
      }
    },
    mounted() {
      this.getMap();
    }
  }

</script>
<style scoped lang="less">
  .contancUs {
    #container {
      width: 100%;
      height: 500px;
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

    .contancUs-info {
      width: 700px;
      margin: 0 auto;

      .info-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0px;
      }
    }
  }

</style>

<template>
  <div class="product">
    <el-form :label-position="labelPosition" label-width="86px" :model="formData">
      <el-form-item label="品牌名称：" class="one">
        <el-select v-model="formData.brandName" placeholder="请选择品牌名" @change="brandSelect">
          <el-option v-for="item in goodsBrandList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="型号名称：" class="one">
        <el-select v-model="formData.modelName" placeholder="请选择型号" @change="modelSelect">
          <el-option v-for="item in selectModel" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品库存：">
        <el-table :data="formData.stockList" border style="width: 100%">
          <el-table-column prop="date" label="颜色">
            <template slot-scope="scope">
              <el-input placeholder="请输入产品颜色" v-model="formData.stockList[scope.$index].color"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="单价">
            <template slot-scope="scope">
              <el-input placeholder="请输入产品单价" v-model="formData.stockList[scope.$index].price"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="库存">
            <template slot-scope="scope">
              <el-input placeholder="请输入产品库存" v-model="formData.stockList[scope.$index].inventory"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit('add')" type="info">增加</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index)" type="info">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <div class="button">
        <el-button type="danger" @click="submit(formData)" v-if="formData.id">编辑保存</el-button>
        <el-button type="danger" @click="submit(formData)" v-else>发布</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'publish',
    props: ['item'],
    data() {
      return {
        labelPosition: 'left',
        goodsModelList: [],
        goodsBrandList: [],
        formData: {
          brandName: '',
          modelName: '',
          stockList: [{
            inventory: null,
            price: null,
            color: ''
          }]
        },
        selectModel: [],
        brandId: '',
        modelId: ''
      }
    },
    created: function () {
      if (Object.keys(this.item).length > 0) {
        this.formData = this.item
      }
      this.load();
    },
    methods: {
      /**
       * 初始化数据
       */
      load() {
        this.$api.home.supplier({}).then(res => {
          if (res.code == 200) {
            this.goodsModelList = res.goodsModelList;
            this.goodsBrandList = res.goodsBrandList;
            if (Object.keys(this.item).length > 0) {
              this.brandSelect(this.item.brandName)
              this.modelSelect();
            }
          }
        });
      },
      /**
       * 品牌下拉框值变化时
       */
      brandSelect(value) {
        let ob = {};
        ob = this.goodsBrandList.find((data) => {
          return data.name === value
        })
        this.selectModel = this.goodsModelList.filter((data) => {
          return data.brandId === ob.id
        })
        this.brandId = ob.id;
      },
      /**
       * 型号下拉框值变化时
       */
      modelSelect(value) {
        let ob = {};
        ob = this.goodsModelList.find((data) => {
          return data.name === value
        })
        this.modelId = ob.id;
      },
      /**
       * 发布
       */
      submit(formData) {
        if (this.formData.brandName.length === 0) {
          this.$message({
            message: "品牌名称不能为空",
            type: "error"
          });
          return;
        }
        if (this.formData.modelName.length === 0) {
          this.$message({
            message: "型号名称不能为空",
            type: "error"
          });
          return;
        }
        let arr = this.formData.stockList.filter((data) => {
          return data.color.length == 0 || data.price === null || data.inventory === null
        })
        if (arr.length > 0) {
          this.$message({
            message: "产品库存信息不完整",
            type: "error"
          });
          return;
        }
        if (this.formData && this.formData.id) {
          this.formData.brandId = this.brandId;
          this.formData.modelId = this.modelId;
          this.$api.manageProduct.update(this.formData).then(res => {
            if (res && res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.formData = {
                brandName: '',
                modelName: '',
                stockList: [{
                  inventory: null,
                  price: null,
                  color: ''
                }]
              }
              this.$emit('Out', {
                item: {},
                keys: '0'
              })
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          });
        } else {
          let data = {
            brandId: this.brandId,
            modelId: this.modelId,
            stockList: this.formData.stockList,
          }
          this.$api.manageProduct.save(data).then(res => {
            if (res && res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.formData = {
                brandName: '',
                modelName: '',
                stockList: [{
                  inventory: null,
                  price: null,
                  color: ''
                }]
              }
              this.$emit('Out', {
                item: {},
                keys: '5'
              })
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          });
        }
      },
      handleEdit(type) {
        if (type === 'add') {
          this.formData.stockList.push({
            inventory: null,
            price: null,
            color: ''
          })
        } else {
          if (this.formData.stockList.length === 1) {
            this.$message({
              type: 'error',
              message: '必须要有一组商品规格'
            })
            return;
          }
          this.formData.stockList.splice(type, 1)
        }
      }
    }
  }

</script>
<style lang="less" scoped>
  .product {
    .one {
      /deep/ .el-input__inner {
        width: 200px;
      }
    }

    /deep/ .el-table .cell {
      display: flex;
      justify-content: center;
    }

    .button {
      display: flex;
      justify-content: center;

      /deep/ .el-button {
        width: 150px;
      }
    }
  }

</style>

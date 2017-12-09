<template>
  <el-row style="width:80%;margin:auto">
    <el-col :span="8">
      <el-card>
        <div slot="header" class="clearfix">
          <span>乘客详细信息</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <cMap></cMap>
    </el-col>
  </el-row>
</template>

<style scoped>
  span {
    padding: 0;
    text-align: left;
  }
  .text {
    font-size: 14px;
    text-align: left;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>

<script>
import cMap from './map'
export default {
  components: {
    cMap
  }
}
</script>


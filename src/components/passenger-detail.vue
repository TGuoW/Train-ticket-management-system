<template>
  <el-row style="width:80%;margin:auto">
    <el-col :span="6" :offset="2">
      <el-card>
        <div slot="header" class="clearfix">
          <span>乘客详细信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="back">返回</el-button>
        </div>
        <div v-for="o in information" :key="o.id" class="text item">
          {{o[0]+':'+o[1]}}
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
  data () {
    return {
      index: 0,
      information: [
        ['姓名', 'xxx'],
        ['性别', 'xxxxx'],
        ['身份证号', 'xxxx'],
        ['籍贯', 'xxxxxxxxxxxxxxx'],
        ['出发地', 'xxxxxxxxxx'],
        ['出发时间', 'xxxxxx'],
        ['到达地', 'sadxasx'],
        ['到达时间', 'ssasdqwiujekl']
      ]
    }
  },
  components: {
    cMap
  },
  methods: {
    back () {
      this.$emit('back', 0)
      console.log(2)
    }
  }
}
</script>


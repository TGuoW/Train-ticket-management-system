<template>
<el-container>
  <!-- <el-header>
    <el-button type="primary" class="add-train">增加车次信息</el-button>
  </el-header> -->
  <el-header class="main">
    <el-col :span="18">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="9">
              <el-select v-model="form.region" placeholder="输入车次">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
            <el-col :span="9">
              <!-- <span class="demonstration">日期</span> -->
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <!-- <el-button>重置</el-button> -->
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" class="add-train">增加车次信息</el-button>
    </el-col>
  </el-header>
  <el-main>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 82%;margin:0 auto;text-align:left"
      height="450">
      <el-table-column
        prop="date"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="车次">
      </el-table-column>
      <el-table-column
        prop="address"
        label="始发站">
      </el-table-column>
      <el-table-column
        prop="address"
        label="到达站">
      </el-table-column>
      <el-table-column
        prop="address"
        label="出发时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="到达时间">
      </el-table-column>
    </el-table>
  </el-main>
</el-container>
</template>

<style scoped>
  .main {
    margin-bottom: -20px;
  }
  .add-train {
    position: absolute;
    right: 18%;
  }
</style>

<script>
  export default {
    data () {
      return {
        form: {
          region: '',
          date: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上'
        }, {
        }]
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
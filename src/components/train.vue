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
            <el-col :span="6" :offset="3">
              <el-input v-model="form.region" placeholder="输入车次">
              </el-input>
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
      <el-button type="primary" class="add-train" @click="dialogVisible = true;add()">增加车次信息</el-button>
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
        prop="number"
        label="序号">
      </el-table-column>
      <!-- <el-table-column
        prop="date"
        label="日期">
      </el-table-column> -->
      <el-table-column
        prop="trainNumber"
        label="车次">
      </el-table-column>
      <el-table-column
        prop="departure"
        label="始发站">
      </el-table-column>
      <el-table-column
        prop="arrival"
        label="到达站">
      </el-table-column>
      <el-table-column
        prop="departureTime"
        label="出发时间">
      </el-table-column>
      <el-table-column
        prop="arrivalTime"
        label="到达时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="dialogVisible = true;beforeModifyThis(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteThis(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="车次信息" :visible.sync="dialogVisible">
      <el-form :model="Dialog">
        <el-form-item>
          <el-col :span="3" :offset="1">车次</el-col>
          <el-col :span="7">
            <el-input v-model="Dialog.trainNumber" auto-complete="off"></el-input>
          </el-col>
          <!-- <el-col>日期</el-col>
          <el-input v-model="Dialog.date" auto-complete="off"></el-input> -->
        </el-form-item>
        <el-form-item>
          <el-col :span="3" :offset="1">出发地</el-col>
          <el-col :span="7">
            <el-input v-model="Dialog.departure" auto-complete="off"></el-input>
          </el-col>
        <!-- </el-form-item>
        <el-form-item label="出发时间" :label-width="formLabelWidth"> -->
          <el-col :span="4">出发时间</el-col>
          <el-col :span="7">
            <el-input v-model="Dialog.departureTime" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="3" :offset="1">到达地</el-col>
          <el-col :span="7">
            <el-input v-model="Dialog.arrival" auto-complete="off"></el-input>
          </el-col>
        <!-- </el-form-item>
        <el-form-item label="到达时间" :label-width="formLabelWidth"> -->
          <el-col :span="4">到达时间</el-col>
          <el-col :span="7">
            <el-input v-model="Dialog.arrivalTime" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;modifyThis()">确 定</el-button>
      </div>
    </el-dialog>
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
        dialogVisible: false,
        form: {
          region: '',
          date: ''
        },
        Dialog: {
          number: Number,
          date: '',
          trainNumber: '',
          departure: '',
          departureTime: '',
          arrival: '',
          arrivalTime: ''
        },
        tableData: [{
          number: 1,
          date: '2016-05-02',
          trainNumber: 'E888',
          departure: '上',
          departureTime: '20:44',
          arrival: 'asdjaskl',
          arrivalTime: '22:09'
        }, {
          number: 2,
          date: '2016-05-02',
          trainNumber: 'E888',
          departure: '上asd',
          departureTime: '20:44',
          arrival: 'asdjaskl',
          arrivalTime: '22:09'
        }]
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      add () {
        this.Dialog = {
          number: Number,
          date: '',
          trainNumber: '',
          departure: '',
          departureTime: '',
          arrival: '',
          arrivalTime: ''
        }
        this.Dialog.number = this.tableData.length + 1
      },
      deleteThis (row) {
        // console.log(row)
        this.$confirm('确认删除？')
          .then(_ => {
            if (this.tableData.length > 1) {
              for (let i = row.number - 1; i < this.tableData.length - 1; i++) {
                this.tableData[i] = this.tableData[i + 1]
                this.tableData[i].number--
              }
              this.tableData.pop()
            } else {
              this.tableData = ''
            }
          })
          .catch(_ => {})
      },
      beforeModifyThis (row) {
        for (let i in row) {
          this.Dialog[i] = row[i]
        }
      },
      modifyThis () {
        if (this.Dialog.number > this.tableData.length) {
          this.tableData.push(this.Dialog)
        } else {
          for (let i in this.Dialog) {
            this.tableData[this.Dialog.number - 1][i] = this.Dialog[i]
          }
        }
      }
    }
  }
</script>
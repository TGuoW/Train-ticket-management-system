<template>
<el-container>
  <el-header class="main">
    <el-col :span="22" :offset="1">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="5">
              <el-input
                placeholder="请输入始发站"
                suffix-icon="el-icon-location"
                v-model="form.departure">
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input
                placeholder="请输入到达站"
                suffix-icon="el-icon-location"
                v-model="form.destination">
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="search()">查询</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
  </el-header>
  <el-main style="width:79.8%;margin:0 auto;">
    <el-table
      :data="tableData"
      stripe
      border
      style="text-align:left"
      height="450">
      <el-table-column
        prop="number"
        label="序号"
        width="85">
      </el-table-column>
      <el-table-column
        prop="trainNumber"
        label="车次"
        width="85">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="departureTime"
        label="发车时间"
        width="85">
      </el-table-column>
      <el-table-column
        prop="departure"
        label="始发站"
        width="85">
      </el-table-column>
      <el-table-column
        prop="arrival"
        label="终点站"
        width="85">
      </el-table-column>
      <el-table-column
        prop="trainType"
        label="车型"
        width="85">
      </el-table-column>
      <el-table-column
        prop="availableTicket"
        label="总可售票数"
        width="95">
      </el-table-column>
      <el-table-column
        prop="soldTicket"
        label="已售票数"
        width="85">
      </el-table-column>
      <el-table-column
        prop="lastTicket"
        label="剩余票数"
        width="85">
      </el-table-column>
      <el-table-column
        label="操作"
        width="105">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="dialogVisible = true;check(scope.row)">订票</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <el-dialog title="确认车次信息" :visible.sync="dialogVisible">
      <el-form :model="Dialog">
        <el-form-item>
          <el-col :span="3">车次</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.trainNumber" :disabled="true" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">日期</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.date" :disabled="true" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">发车时间</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.departureTime" :disabled="true" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="3">车型</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.trainType" :disabled="true" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="3">始发站</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.departure" :disabled="true" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">到达站</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.arrival" :disabled="true" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;buy()">确 定</el-button>
      </div>
    </el-dialog>
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
  import axios from 'axios'
  export default {
    data () {
      return {
        dialogVisible: false,
        form: {
          departure: '',
          destination: '',
          date: ''
        },
        Dialog: {
          number: Number,
          trainNumber: '',
          date: '',
          departureTime: '',
          departure: '',
          arrival: '',
          trainType: ''
        },
        tableData: []
      }
    },
    methods: {
      search () {
        axios({
          url: '/getTrainInfo',
          method: 'post',
          data: {
            '车次': this.trainNumber,
            '日期': this.date
          }
        }).then((response) => {
          for (let o in response.data) {
            if (response.data[o]['始发站'] === this.form.departure && response.data[o]['终点站'] === this.form.destination) {
              this.tableData.push({
                number: this.tableData.length + 1,
                trainNumber: response.data[o]['车次'],
                date: response.data[o]['日期'],
                departureTime: response.data[o]['发车时间'],
                departure: response.data[o]['始发站'],
                arrival: response.data[o]['终点站'],
                trainType: response.data[o]['车型'],
                availableTicket: response.data[o]['额定可售票数'],
                soldTicket: response.data[o]['已售票数'],
                lastTicket: response.data[o]['剩余票数']
              })
            }
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      buy () {
        axios({
          url: '/bookTicket',
          method: 'post',
          data: {
            '身份证号': this.$store.state.userInfo['身份证号'],
            '车次': this.Dialog.trainNumber
          }
        }).then((response) => {
          this.$alert('订票成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info'
              })
            }
          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
        })
      },
      check (row) {
        for (let i in row) {
          this.Dialog[i] = row[i]
        }
      },
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
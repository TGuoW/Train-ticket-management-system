<template>
<el-container>
  <el-main>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 84%;margin:0 auto;text-align:left"
      height="450">
      <el-table-column
        prop="number"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="ticketNumber"
        label="车票号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="trainNumber"
        label="车次"
        width="60">
      </el-table-column>
      <el-table-column
        prop="identityNumber"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="realName"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="联系方式"
        width="110">
      </el-table-column>
      <el-table-column
        prop="date"
        label="乘车日期"
        width="95">
      </el-table-column>
      <el-table-column
        prop="departureTime"
        label="乘车时间"
        width="80">
      </el-table-column>
      <el-table-column
        prop="departure"
        label="始发站"
        width="70">
      </el-table-column>
      <el-table-column
        prop="arrival"
        label="终点站"
        width="70">
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="dialogVisible = true;beforeModifyThis(scope.row)">改签</el-button>
          <el-button type="danger" size="mini" @click="deleteThis(scope.row)">退票</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>

  <el-dialog title="车次信息" :visible.sync="dialogVisible">
      <el-form :model="Dialog">
        <el-form-item>
          <el-col :span="3">车次</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.trainNumber" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">乘车日期</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.date" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">乘车时间</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.departureTime" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="3">车票号</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.ticketNumber" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">始发站</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.departure" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">到达站</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.arrival" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="3">乘客姓名</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.realName"  :disabled="true" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">身份证号</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.identityNumber" :disabled="true" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">联系方式</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.phoneNumber" :disabled="true" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;modifyThis()">确 定</el-button>
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
        Dialog: {
          number: Number,
          ticketNumber: '',
          trainNumber: '',
          identityNumber: '',
          realName: '',
          phoneNumber: '',
          date: '',
          departureTime: '',
          departure: '',
          arrival: ''
        },
        tableData: []
      }
    },
    mounted () {
      axios({
        url: '/bookingTicket',
        method: 'post',
        data: {
          '身份证号': this.$store.state.userInfo['身份证号']
        }
      }).then((response) => {
        for (let o in response.data) {
          this.tableData.push({
            number: this.tableData.length + 1,
            trainNumber: response.data[o]['车次'],
            ticketNumber: response.data[o]['车票号'],
            date: response.data[o]['乘车日期'],
            departureTime: response.data[o]['乘车时间'],
            departure: response.data[o]['始发站'],
            arrival: response.data[o]['终点站'],
            identityNumber: response.data[o]['乘客身份证号'],
            realName: response.data[o]['乘客姓名'],
            phoneNumber: response.data[o]['联系方式']
          })
        }
      })
    },
    methods: {
      beforeModifyThis (row) {
        for (let i in row) {
          this.Dialog[i] = row[i]
        }
      },
      modifyThis () {
        axios({
          url: '/changeBookedTicket',
          method: 'post',
          data: {
            '车票号': this.Dialog.ticketNumber,
            '身份证号': this.$store.state.userInfo['身份证号']
          }
        }).then((response) => {
          for (let o in this.Dialog) {
            this.tableData[this.Dialog.number - 1][o] = this.Dialog[o]
          }
          this.Dialog = {
            number: Number,
            ticketNumber: '',
            trainNumber: '',
            identityNumber: '',
            realName: '',
            phoneNumber: '',
            date: '',
            departureTime: '',
            departure: '',
            arrival: ''
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      deleteThis (row) {
        this.$confirm('确认退票？')
          .then(_ => {
            axios({
              url: '/returnTicket',
              method: 'post',
              data: {
                '车票号': row.ticketNumber,
                '身份证号': this.$store.state.userInfo['身份证号']
              }
            }).then((response) => {
              if (this.tableData.length > 1) {
                for (let i = row.number - 1; i < this.tableData.length - 1; i++) {
                  this.tableData[i] = this.tableData[i + 1]
                  this.tableData[i].number--
                }
                this.tableData.pop()
              } else {
                this.tableData = []
              }
              this.$alert('退票成功', '提示', {
                confirmButtonText: '确定'
              }).catch((error) => {
                console.log(error)
              })
            }).catch((error) => {
              console.log(error)
            })
          })
          .catch(_ => {
            console.log(_)
          })
      }
    }
  }
</script>
<template>
<el-container>
  <el-header class="main">
    <el-col :span="18">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="4" :offset="3">
              <el-input v-model="form.departure" placeholder="输入始发站">
              </el-input>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-input v-model="form.arrival" placeholder="输入终点站">
              </el-input>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-input v-model="form.trainNumber" placeholder="输入车次">
              </el-input>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期(必填)">
              </el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="search()">查询</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="5" :offset="1">
      <el-button type="primary" class="add-train" @click="dialogVisible = true;add()">增加车次信息</el-button>
    </el-col>
  </el-header>
  <el-main style="width:79.8%;margin:0 auto;">
    <el-table
      :data="tableData"
      stripe
      border
      style="text-align:left;"
      height="450">
      <el-table-column
        prop="number"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="trainNumber"
        label="车次"
        width="80">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="departureTime"
        label="发车时间"
        width="80">
      </el-table-column>
      <el-table-column
        prop="departure"
        label="始发站"
        width="80">
      </el-table-column>
      <el-table-column
        prop="arrival"
        label="终点站"
        width="80">
      </el-table-column>
      <el-table-column
        prop="trainType"
        label="车型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="availableTicket"
        label="可售票数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="soldTicket"
        label="已售票数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="lastTicket"
        label="剩余票数"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="dialogVisible = true;beforeModifyThis(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteThis(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="车次信息" :visible.sync="dialogVisible">
      <el-form :model="Dialog">
        <el-form-item>
          <el-col :span="3">车次</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.trainNumber" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">日期</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.date" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">发车时间</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.departureTime" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="3">车型</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.trainType" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
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
          <el-col :span="3">可售票数</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.availableTicket" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">已售票数</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.soldTicket" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="3">剩余票数</el-col>
          <el-col :span="5">
            <el-input v-model="Dialog.lastTicket" auto-complete="off"></el-input>
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
  import axios from 'axios'
  export default {
    data () {
      return {
        dialogVisible: false,
        form: {
          departure: '',
          arrival: '',
          trainNumber: '',
          date: ''
        },
        Dialog: {
          number: Number,
          trainNumber: '',
          date: '',
          departureTime: '',
          departure: '',
          arrival: '',
          trainType: '',
          availableTicket: '',
          soldTicket: '',
          lastTicket: ''
        },
        tableData: []
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      search () {
        axios({
          url: '/getTrainInfo',
          method: 'post',
          data: {
            '车次': this.trainNumber,
            '日期': this.date
          }
        }).then((response) => {
          console.log(this.form)
          this.tableData = []
          for (let o in response.data) {
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
        }).catch((error) => {
          console.log(error)
        })
      },
      add () {
        this.Dialog = {
          number: Number,
          trainNumber: '',
          date: '',
          departureTime: '',
          departure: '',
          arrival: '',
          trainType: '',
          availableTicket: '',
          soldTicket: '',
          lastTicket: ''
        }
        this.Dialog.number = this.tableData.length + 1
      },
      deleteThis (row) {
        // console.log(row)
        this.$confirm('确认删除？')
          .then(_ => {
            axios({
              url: '/deleteTrainInfo',
              method: 'post',
              data: {
                '车次': this.tableData[row.number - 1].trainNumber
              }
            }).then((response) => {
              if (this.tableData.length > 1) {
                for (let i = row.number - 1; i < this.tableData.length - 1; i++) {
                  this.tableData[i] = this.tableData[i + 1]
                  this.tableData[i].number--
                }
                this.tableData.pop()
              } else {
                this.tableData = ''
              }
              this.$alert('删除成功', '提示', {
                confirmButtonText: '确定'
              }).catch((error) => {
                console.log(error)
              })
            }).catch((error) => {
              console.log(error)
            })
          })
          .catch(_ => {})
      },
      beforeModifyThis (row) {
        for (let i in row) {
          this.Dialog[i] = row[i]
        }
      },
      modifyThis () {
        axios({
          url: '/updateTrainInfo',
          method: 'post',
          data: {
            '车次': this.Dialog.trainNumber,
            '日期': this.Dialog.date,
            '发车时间': this.Dialog.departureTime,
            '始发站': this.Dialog.departure,
            '终点站': this.Dialog.arrival,
            '车型': this.Dialog.trainType,
            '额定可售票数': this.Dialog.availableTicket,
            '已售票数': this.Dialog.soldTicket,
            '剩余票数': this.lastTicket
          }
        }).then((response) => {
          if (this.Dialog.number > this.tableData.length) {
            this.tableData.push(this.Dialog)
          } else {
            for (let i in this.Dialog) {
              this.tableData[this.Dialog.number - 1][i] = this.Dialog[i]
            }
          }
          this.$alert('修改成功', '提示', {
            confirmButtonText: '确定'
          }).catch((error) => {
            console.log(error)
          })
          this.Dialog = {
            number: Number,
            trainNumber: '',
            date: '',
            departureTime: '',
            departure: '',
            arrival: '',
            trainType: '',
            availableTicket: '',
            soldTicket: '',
            lastTicket: ''
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>
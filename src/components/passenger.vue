<template>
<el-container>
  <el-header class="main">
    <el-col :span="22">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="5" :offset="3">
              <el-input
                placeholder="请输入车次"
                v-model="form.departure">
              </el-input>
            </el-col>
            <el-col :span="9">
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
  <el-main v-if="isShow">
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 70%;margin:0 auto;text-align:left"
      height="450">
      <el-table-column
        prop="number"
        label="序号"
        width="90">
      </el-table-column>
      <el-table-column
        prop="realName"
        label="姓名"
        width="90">
      </el-table-column>
      <el-table-column
        prop="identityNumber"
        label="身份证号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="trainNumber"
        label="车次"
        width="90">
      </el-table-column>
      <el-table-column
        prop="ticketNumber"
        label="车票号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="联系方式"
        width="150">
      </el-table-column>
      <el-table-column
        label="操作"
        width="102">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteThis(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <el-main v-else>
    <pd v-on:back="backk"></pd>
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
  import pd from './passenger-detail.vue'
  import axios from 'axios'
  export default {
    components: {
      pd
    },
    data () {
      return {
        isShow: 1,
        form: {
          region: '',
          date: ''
        },
        tableData: []
      }
    },
    methods: {
      search () {
        axios({
          url: '/getPassengerInfo',
          method: 'post',
          data: {
            '车次': this.trainNumber,
            '日期': this.date
          }
        }).then((response) => {
          for (let o in response.data) {
            this.tableData.push({
              number: this.tableData.length + 1,
              realName: response.data[o]['乘客名'],
              identityNumber: response.data[o]['乘客身份证号'],
              trainNumber: response.data[o]['车次'],
              ticketNumber: response.data[o]['车票号'],
              phoneNumber: response.data[o]['联系方式']
            })
          }
        })
      },
      viewPassenger () {
        this.isShow = 0
      },
      deleteThis (row) {
        this.$confirm('确认删除？')
          .then(_ => {
            axios({
              url: '/deleteTicketInfo',
              method: 'post',
              data: {
                '车票号': this.tableData[row.number - 1].ticketNumber
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
      backk (res) {
        this.isShow = 1
      }
    }
  }
</script>
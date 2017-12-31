<template>
  <div class="hello">
    <canvas id="canvas"></canvas>
    <p>火车票务管理系统</p>
    <div class="form">
      <el-tabs v-model="activeName2" @tab-click="handleClick" style="width:100%">
        <el-tab-pane label="用户登陆" name="first">
          <el-form
            :model="ruleForm1" 
            :rules="rules1" 
            ref="ruleForm1" 
            label-position="left" 
            label-width="40px" 
            class="demo-ruleForm">
            <el-form-item 
              label="账号" 
              prop="acount">
              <el-input 
              v-model="ruleForm1.acount"
              auto-complete="off" 
              placeholder="账号">
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass" style="margin-bottom:10px;">
              <el-input type="password" v-model="ruleForm1.pass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="identity" style="margin-top:-10px;">
              <el-radio-group v-model="ruleForm1.identity" size="medium" style="margin-bottom:-20px;">
                <el-radio label="1">乘客</el-radio>
                <el-radio label="2">管理员</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button type="primary" @click="submitForm('ruleForm1')" class="login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="乘客注册" name="second" style="margin:auto;text-align:center;">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="40px" class="demo-ruleForm">
            <el-form-item prop="identityNumber">
              <el-input v-model="ruleForm2.identityNumber" auto-complete="off" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item prop="realName">
              <el-input v-model="ruleForm2.realName" auto-complete="off" placeholder="真实姓名"></el-input>
            </el-form-item>
            <el-form-item prop="userName">
              <el-input v-model="ruleForm2.userName" auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="checkPassword">
              <el-input type="password" v-model="ruleForm2.checkPassword" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="phoneNumber">
              <el-input v-model="ruleForm2.phoneNumber" auto-complete="off" placeholder="联系方式"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button type="success" @click="registered('ruleForm2')" class="login">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    var validateAcount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateIdentity = (rule, value, callback) => {
      if (value === 0) {
        callback(new Error('请选择您的身份'))
      } else {
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.ruleForm2.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateIdentityNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号'))
      } else {
        callback()
      }
    }
    var validateRealName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入真实姓名'))
      } else {
        callback()
      }
    }
    var validatePhoneNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系方式'))
      } else {
        callback()
      }
    }
    return {
      activeName2: 'first',
      ruleForm1: {
        acount: '',
        pass: '',
        identity: 0
      },
      ruleForm2: {
        identityNumber: '',
        realName: '',
        userName: '',
        password: '',
        phoneNumber: ''
      },
      rules1: {
        acount: [
          { validator: validateAcount, trigger: 'blur' }
        ],
        pass: [
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        identity: [
          { validator: validateIdentity, trigger: 'blur' }
        ]
      },
      rules2: {
        identityNumber: [
          { min: 18, max: 18, message: '长度为18位', trigger: 'blur' },
          { validator: validateIdentityNumber, trigger: 'blur' }
        ],
        realName: [
          { validator: validateRealName, trigger: 'blur' }
        ],
        userName: [
          { validator: validateAcount, trigger: 'blur' }
        ],
        password: [
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validateCheckPass, trigger: 'blur' }
        ],
        phoneNumber: [
          { min: 11, max: 11, message: '长度为11位', trigger: 'blur' },
          { validator: validatePhoneNumber, trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function () {
    this.draw()
  },
  methods: {
    draw () {
      // 做一个ticket的动画，杂乱的线段聚成TICKETD
      var c = document.getElementById('canvas')
      var h = screen.height
      var w = screen.width
      c.setAttribute('width', w)
      c.setAttribute('height', h)
      var ctx = c.getContext('2d')
      var line = {
        x: 100,
        y: 200,
        vx: 5,
        vy: 5,
        radius: 25,
        draw: function (x1, y1, x2, y2) {
          ctx.strokeStyle = '#aaaaaa'
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      }
      setInterval(function () {
        let x1, y1, x2, y2
        let t = Math.random()
        let w = (screen.width + 2) / 12
        if (t * 2 > 1) {
          x1 = parseInt(Math.random() * w * 1.2 + w * 2 / 5)
          y1 = parseInt(Math.random() * w / 3 + 100)
          x2 = parseInt(Math.random() * w * 1.2 + w * 2 / 5)
          y2 = parseInt(Math.random() * w / 3 + 100)
          line.draw(x1, y1, x2, y2)
        } else {
          x1 = parseInt(Math.random() * w / 3 + w * 5 / 6)
          y1 = parseInt(Math.random() * 400 + 100)
          x2 = parseInt(Math.random() * w / 3 + w * 5 / 6)
          y2 = parseInt(Math.random() * 400 + 100)
          line.draw(x1, y1, x2, y2)
        } // T
        x1 = parseInt(Math.random() * w / 3 + w * 67 / 30)
        y1 = parseInt(Math.random() * 400 + 100)
        x2 = parseInt(Math.random() * w / 3 + w * 67 / 30)
        y2 = parseInt(Math.random() * 400 + 100)
        line.draw(x1, y1, x2, y2) // I
        if (t * 3 > 2) {
          x1 = parseInt(Math.random() * w * 1.2 + w * 96 / 30)
          y1 = parseInt(Math.random() * w / 3 + 100)
          x2 = parseInt(Math.random() * w * 1.2 + w * 96 / 30)
          y2 = parseInt(Math.random() * w / 3 + 100)
          line.draw(x1, y1, x2, y2)
        } else if (t * 3 > 1) {
          x1 = parseInt(Math.random() * w / 3 + w * 96 / 30)
          y1 = parseInt(Math.random() * 400 + 100)
          x2 = parseInt(Math.random() * w / 3 + w * 96 / 30)
          y2 = parseInt(Math.random() * 400 + 100)
          line.draw(x1, y1, x2, y2)
        } else {
          x1 = parseInt(Math.random() * w * 1.2 + w * 96 / 30)
          y1 = parseInt(Math.random() * w / 3 + 460)
          x2 = parseInt(Math.random() * w * 1.2 + w * 96 / 30)
          y2 = parseInt(Math.random() * w / 3 + 460)
          line.draw(x1, y1, x2, y2)
        } // C
        if (t * 3 > 2) {
          x1 = parseInt(Math.random() * w * 1.2 + w * 228 / 30)
          y1 = parseInt(Math.random() * 60 + 100 + 200 - (x1 - w * 228 / 30) * 1.5)
          x2 = parseInt(Math.random() * w * 1.2 + w * 228 / 30)
          y2 = parseInt(Math.random() * 60 + 100 + 200 - (x2 - w * 228 / 30) * 1.5)
          line.draw(x1, y1, x2, y2)
        } else if (t * 3 > 1) {
          x1 = parseInt(Math.random() * w / 3 + w * 228 / 30)
          y1 = parseInt(Math.random() * 400 + 100)
          x2 = parseInt(Math.random() * w / 3 + w * 228 / 30)
          y2 = parseInt(Math.random() * 400 + 100)
          line.draw(x1, y1, x2, y2)
        } else {
          x1 = parseInt(Math.random() * w * 1.2 + w * 228 / 30)
          y1 = parseInt(Math.random() * 60 + 440 - 200 + (x1 - w * 228 / 30) * 1.5)
          x2 = parseInt(Math.random() * w * 1.2 + w * 228 / 30)
          y2 = parseInt(Math.random() * 60 + 440 - 200 + (x2 - w * 228 / 30) * 1.5)
          line.draw(x1, y1, x2, y2)
        } // K
        if (t * 4 > 3) {
          x1 = parseInt(Math.random() * w * 1.2 + w * 270 / 30)
          y1 = parseInt(Math.random() * 40 + 100)
          x2 = parseInt(Math.random() * w * 1.2 + w * 270 / 30)
          y2 = parseInt(Math.random() * 40 + 100)
          line.draw(x1, y1, x2, y2)
        } else if (t * 4 > 2) {
          x1 = parseInt(Math.random() * w * 1.2 + w * 270 / 30)
          y1 = parseInt(Math.random() * 40 + 280)
          x2 = parseInt(Math.random() * w * 1.2 + w * 270 / 30)
          y2 = parseInt(Math.random() * 40 + 280)
          line.draw(x1, y1, x2, y2)
        } else if (t * 4 > 1) {
          x1 = parseInt(Math.random() * w * 1.2 + w * 270 / 30)
          y1 = parseInt(Math.random() * 40 + 460)
          x2 = parseInt(Math.random() * w * 1.2 + w * 270 / 30)
          y2 = parseInt(Math.random() * 40 + 460)
          line.draw(x1, y1, x2, y2)
        } else {
          x1 = parseInt(Math.random() * w / 3 + w * 270 / 30)
          y1 = parseInt(Math.random() * 400 + 100)
          x2 = parseInt(Math.random() * w / 3 + w * 270 / 30)
          y2 = parseInt(Math.random() * 400 + 100)
          line.draw(x1, y1, x2, y2)
        }// E
        if (t * 2 > 1) {
          x1 = parseInt(Math.random() * w * 1.2 + w * 10.4)
          y1 = parseInt(Math.random() * 40 + 100)
          x2 = parseInt(Math.random() * w * 1.2 + w * 10.4)
          y2 = parseInt(Math.random() * 40 + 100)
          line.draw(x1, y1, x2, y2)
        } else {
          x1 = parseInt(Math.random() * w / 3 + w * 130 / 12)
          y1 = parseInt(Math.random() * 400 + 100)
          x2 = parseInt(Math.random() * w / 3 + w * 130 / 12)
          y2 = parseInt(Math.random() * 400 + 100)
          line.draw(x1, y1, x2, y2)
        } // T
      }, 10)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    submitForm (formName) {
      let self = this
      console.log(this.ruleForm1)
      self.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url: '/validateLogin',
            method: 'post',
            data: {
              '用户名': self.ruleForm1.acount,
              '密码': self.ruleForm1.password,
              '身份': self.ruleForm1.identity
            }
          }).then((response) => {
            if (self.ruleForm1.identity === '1') {
              self.$store.commit('login', response.data)
              self.$store.commit('c', 1)
              self.$router.push({path: '/main/buy'})
            } else if (self.ruleForm1.identity === '2') {
              self.$store.commit('login', response.data)
              self.$store.commit('c', 2)
              self.$router.push({path: '/main/train'})
            }
          }).catch((error) => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    registered (formName) {
      let self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url: '/signUp',
            method: 'post',
            data: {
              '身份证号': self.ruleForm2.identityNumber,
              '名字': self.ruleForm2.realName,
              '用户名': self.ruleForm2.userName,
              '密码': self.ruleForm2.password,
              '联系方式': self.ruleForm2.phoneNumber
            }
          }).then((response) => {
            console.log('注册成功')
            this.$alert('注册成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info'
                })
              }
            }).catch((error) => {
              console.log(error)
            })
            this.ruleForm2 = {
              identityNumber: '',
              realName: '',
              userName: '',
              password: '',
              phoneNumber: ''
            }
          }).catch((error) => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
p {
  position: fixed;
  display:block;
  left: 0;
  right: 0;
  top: 20px;
  bottom: 0;
  margin: auto;
  font-size: 48px;
  color: #000;
  user-select: none;
}
a {
  color: #42b983;
}
/* .a {
  label{
    line-height: 14px;
  }
} */
label {
  line-height: 14px;
}
.login {
  width: 100%;
}
.form {
  position: fixed;
  text-align: center;
  display:block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  margin-top: 130px;
  width: 18%;
}
.demo-ruleForm {
  text-align: left; 
  margin-left: -40px;
  margin-top: 10px;
  font-size: 10px;
}
.hello {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background: #000; */
}
#canvas {
  opacity: 0.2;
}
</style>

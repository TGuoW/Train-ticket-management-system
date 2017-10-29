<template>
  <div class="hello">
    <canvas id="canvas"></canvas>
    <p>火车票管理系统</p>
    <div class="form">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="top" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="pass" class="a">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass" class="a" size="">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm2.age"></el-input>
        </el-form-item> -->
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="submitForm('ruleForm2')" class="login">登录</el-button>
          <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
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
    submitForm (formName) {
      let self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url: '/login',
            method: 'post'
          }).then((response) => {
            console.log(response.data)
            self.$store.commit('login', response.data)
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
  display:block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  margin-top: 180px;
  width: 18%;
}
.demo-ruleForm {
  text-align: left; 
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

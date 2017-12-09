<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo top"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <span>火车票管理系统</span>
        <el-menu-item index="1" @click="$router.push({path: '/main/train'})">车次管理</el-menu-item>
        <el-menu-item index="2" @click="$router.push({path: '/main/passenger'})">乘客管理</el-menu-item>
        <el-menu-item index="3" @click="$router.push({path: '/main/analysis'})">统计分析</el-menu-item>
        <el-menu-item index="4" v-if="!activeIndex" @click="$router.push({path: '/main/analysis'})">购票</el-menu-item>
        <div style="position:absolute;right:0;user-select: none;cursor: default;">
          <span style="font-size:16px;">欢迎您，userName</span>
          <el-button size="mini" id="log-out" @click="jj">注销</el-button>
        </div>
      </el-menu>
    </el-header>
    <el-main class="item">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import cMap from './map.vue'
  import axios from 'axios'
  // import train from './train.vue'
  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    mounted () {
      let t = document.getElementsByClassName('top')
      let p = document.getElementById('log-out')
      p.style.marginTop = (t[0].clientHeight - 28) / 2 + 'px'
      p.style.marginRight = '20px'
    },
    components: {
      cMap
    },
    methods: {
      jj () {
        axios({
          url: 'http://39.108.221.165/submission/getMsg.php',
          method: 'post',
          data: {
            weixie: 'weixie',
            status: '0'
          }
        }).then((response) => {
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })
        axios({
          url: '/submission/getMsg.php',
          method: 'post',
          data: {
            weixie: 'weixie',
            status: '0'
          }
        }).then((response) => {
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
  span {
    float: left;
    cursor: default;
    color: #fff;
    font-size: 24px;
    line-height: 61px;
    padding-left: 60px;
    padding-right: 60px;
    user-select: none;
    &:focus {
      outline: none;
    }
  }
  div {
    &:focus {
      outline: none;
    }
  }
  .top {
    position: fixed;
    padding: 0;
    width: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: hidden;
  }
  // .item {
  //   // position: fixed;
  //   // top: 0;
  //   // bottom: 0;
  //   width: 80%;
  //   margin: 50px auto;
  //   overflow: hidden;
  //   // background: #000;
  // }
</style>
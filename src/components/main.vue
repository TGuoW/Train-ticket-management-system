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
        <el-menu-item index="1" v-show="identity-1" @click="$router.push({path: '/main/train'})">车次管理</el-menu-item>
        <el-menu-item index="2" v-show="identity-1" @click="$router.push({path: '/main/passenger'})">乘客管理</el-menu-item>
        <el-menu-item index="3" v-show="identity-1" @click="$router.push({path: '/main/analysis'})">统计分析</el-menu-item>
        <el-menu-item index="4" v-show="!(identity-1)" @click="$router.push({path: '/main/analysis'})">购票</el-menu-item>
        <div style="position:absolute;right:0;user-select: none;cursor: default;">
          <span style="font-size:16px;" @click="cc">欢迎您，userName</span>
          <el-button size="mini" id="log-out" @click="signUp">注销</el-button>
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
  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        identity: this.$store.state.identity
      }
    },
    mounted () {
      let self = this
      if (!self.$store.state.isLogin) {
        self.$router.push({path: '/'})
      }
      if (self.$store.state.identity === 1) {
        self.activeIndex2 = '4'
      }
      let t = document.getElementsByClassName('top')
      let p = document.getElementById('log-out')
      p.style.marginTop = (t[0].clientHeight - 28) / 2 + 'px'
      p.style.marginRight = '20px'
    },
    components: {
      cMap
    },
    methods: {
      signUp () {
        let self = this
        self.$store.commit('signUp', true)
        self.$router.push({path: '/'})
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      cc () {
        console.log(this.identity)
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
<template>
  <div>
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
    </el-menu>
    <div class="item">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import cMap from './map.vue'
  // import train from './train.vue'
  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    components: {
      cMap
    },
    methods: {
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
  .top {
    position: fixed;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  .item {
    // position: fixed;
    // top: 0;
    // bottom: 0;
    width: 80%;
    margin: 50px auto;
    // overflow: hidden;
    // background: #000;
  }
</style>
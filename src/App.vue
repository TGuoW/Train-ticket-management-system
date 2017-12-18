<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import mainV from './components/main'
// import hello from './components/HelloWorld'
export default {
  name: 'app',
  data () {
    return {
      isLogin () {
        return this.$store.state.isLogin
      }
    }
  // },
  // components: {
  //   mainV,
  //   hello
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  /* overflow: hidden; */
}
html body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>

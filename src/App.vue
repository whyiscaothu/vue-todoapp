<template>
  <div id="app">
    <div id="nav">
        <router-link :to="{name: 'Home'}">Home</router-link>  |
        <router-link :to="{name: 'User'}">User</router-link>  |
        <router-link :to="{name: 'About'}">About</router-link>  |
        <router-link :to="{name: 'Login'}">Login</router-link>  |
        <router-link :to="{name: 'Register'}">Register</router-link>
    </div>

    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>

  export default {

    created() {
      this.$store.dispatch('getTodoesFromApi');

    },
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
  <div id="app">
    <v-app >
        <v-container
                fluid
                class="py-0"
        >
            <v-row>
                <v-nav id="nav" class="col-sm-1 col-lg-2"></v-nav>
                <div class="col-sm-11 col-lg-10 pa-0">
                    <c-vue-scroll>
                        <router-view :key="$route.fullPath"/>
                    </c-vue-scroll>
                </div>
            </v-row>
        </v-container>
    </v-app>
  </div>
</template>

<script>
    import VNav from "./components/VNav";
    import CVueScroll from "./components/CVueScroll";
  export default {
    components: {
        VNav,
        CVueScroll
    },
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

      a {
        font-weight: bold;
        color: whitesmoke;

        &.router-link-exact-active {
          color: #42b983;
          border: solid #42b983 1px;
        }
      }
    }

    .relative {
        position: relative;
    }
</style>

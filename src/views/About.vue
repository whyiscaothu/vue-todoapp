<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
              'innerBrowserHeight'
      ])
    }
  }
</script>

<style lang="css">
  #scroll-bar {
    scrollbar-base-color: blue;
    scrollbar-3dlight-color: aqua;
  }
</style>
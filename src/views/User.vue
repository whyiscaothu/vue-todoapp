<template>
  <div class="about">
    <h1>This is an user page</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ops: {
          vuescroll: {},
          scrollPanel: {},
          rail: {
            background: '#01a99a',
            opacity: 0.1,
            size: '12px',
            // specifyBorderRadius: false,
            gutterOfEnds: null,
            gutterOfSide: '2px',
            keepShow: false
          },
          scrollButton: {
            enable: true,
            background: '#22a44a',
            opacity: 1,
            step: 180,
            mousedownStep: 30
          },
          bar: {
            showDelay: 750,
            onlyShowBarOnScroll: false,
            keepShow: false,
            background: '#cecece',
            opacity: 1,
            hoverStyle: true,
            specifyBorderRadius: false,
            minSize: 0.1,
            size: '8px',
            disable: false
    }
        }
      }
    }
  }
</script>

<style>
  .parent-element {
    height: 600px;
  }
</style>
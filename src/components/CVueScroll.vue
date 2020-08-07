<template>
    <v-sheet
            :min-height="innerBrowserHeight"
            :max-height="innerBrowserHeight"
            class="parent-element"
    >
        <!-- bind your configurations -->
        <vue-scroll :ops="ops">
            <div class="child-element">
                <slot></slot>
            </div>
        </vue-scroll>
    </v-sheet>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'CVueScroll',
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
        },


        computed: {
            ...mapGetters([
                'innerBrowserHeight'
            ])
        }
    }
</script>

<style>
    .parent-element {
        height: 600px;
    }
</style>
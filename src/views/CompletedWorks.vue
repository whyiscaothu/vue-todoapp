<template>
    <div class="completed-works">
        <c-list-box :todoList="todoesWithStatusDone">
            <v-icon
                    slot="check-icon"
                    color="success"
            >
                mdi-check
            </v-icon>
        </c-list-box>
    </div>
</template>

<script>
    import CListBox from "@/components/CListBox";
    import {mapGetters} from "vuex";

    export default {

        name: 'CompletedWorks',


        props: {
            //
        },


        components: {
            CListBox
        },
        data() {
            return {
                //
            }
        },


        methods: {
            //
        },


        computed: {
            ...mapGetters([
                'todoesWithStatusDone'
            ]),
        },

    }
</script>

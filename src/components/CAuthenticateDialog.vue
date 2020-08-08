<template>
    <v-dialog
            v-model="loginStatus1"
            hide-overlay
            persistent
            width="300"
    >
        <v-card
                color="primary"
                dark
        >
            <slot></slot>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "CAuthenticateDialog",


        computed: {
            ...mapGetters({
                loginStatus1: 'authenticate/loginStatus'
            })
        },
    }
</script>

<style scoped>

</style>
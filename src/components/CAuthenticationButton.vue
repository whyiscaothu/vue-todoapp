<template>
    <v-sheet rounded>
        <v-list-item link>
            <v-list-item-icon>
                <v-icon>{{mdiIcon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="text-capitalize">
                    {{title}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-sheet>
</template>

<script>
    export default {
        name: "CAuthenticationButton",
        props: {
            title: String,
            mdiIcon: String
        },

    }
</script>

<style scoped>

</style>
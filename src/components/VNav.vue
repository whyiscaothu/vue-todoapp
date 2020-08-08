<template>
    <v-navigation-drawer
            v-model="drawer"
            :color="color"
            :height="innerBrowserHeight"
            :expand-on-hover="expandOnHover"
            :mini-variant="miniVariant"
            permanent
            dark
    >
        <v-list
                dense
                nav
                class="py-0"
        >
            <v-list-item two-line :class="miniVariant && 'px-0'">
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Application</v-list-item-title>
                    <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    class="px-0"
            >


                <router-link class="d-flex col-12 py-0 text-decoration-none" :to="item.nameRoute">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>

                                {{ item.title }}

                        </v-list-item-title>
                    </v-list-item-content>
                </router-link>

            </v-list-item>
        </v-list>
        <template v-slot:append>
            <c-authentication-button @click.native="logout" title="logout" mdi-icon="mdi-logout" />
            <c-authentication-button title="login" mdi-icon="mdi-login" />
        </template>
    </v-navigation-drawer>
</template>

<script>
    import {mapGetters} from 'vuex'
    import CAuthenticationButton from "./CAuthenticationButton";

    export default {
        name: "VNav",
        components: {
            CAuthenticationButton
        },

        data () {
            return {
                drawer: true,
                items: [
                    {
                        title: 'Home',
                        icon: 'mdi-view-dashboard',
                        nameRoute: {
                            name: 'Home'
                        }
                    },
                    {
                        title: 'User',
                        icon: 'mdi-view-dashboard',
                        nameRoute: {
                            name: 'User'
                        }
                    },
                    {
                        title: 'About',
                        icon: 'mdi-view-dashboard',
                        nameRoute: {
                            name: 'About'
                        }
                    },

                ],
                color: 'dark',
                colors: [
                    'primary',
                    'blue',
                    'success',
                    'red',
                    'teal',
                ],
                miniVariant: false,
                expandOnHover: false,
                background: false,
            }
        },

        computed: {


            ...mapGetters([
                'innerBrowserHeight',
            ]),


            bg () {
                return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
            },

        },

        methods: {
            logout () {
                this.$store.dispatch('logout');
            }
        }
    }
</script>

<style scoped>

</style>
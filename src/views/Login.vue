<template>
    <v-app id="inspire">
        <v-main>
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form @submit.prevent="login">
                                    {{loginStatus}}
                                    <v-text-field
                                            label="Email"
                                            name="email"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            v-model="email"
                                    ></v-text-field>

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            v-model="password"
                                    ></v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn type="submit" color="primary">Login</v-btn>
                                    </v-card-actions>


                                    <c-authenticate-dialog>
                                        <v-card-text v-if="loginStatus && loginMessage === null">
                                            Please stand by
                                            <v-progress-linear
                                                    indeterminate
                                                    color="white"
                                                    class="mb-0"
                                            ></v-progress-linear>
                                        </v-card-text>

                                        <v-card-text v-else-if="loginStatus && loginMessage">
                                            <div class="pt-6">
                                                {{loginMessage}}
                                            </div>
                                        </v-card-text>
                                    </c-authenticate-dialog>


                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {LOGIN} from '@/store/authenticate-module/mutation-types'
    import CAuthenticateDialog from "@/components/CAuthenticateDialog";
    export default {
        name: "Login",
        components: {CAuthenticateDialog},
        data() {
            return {
                email: null,
                password: null,
                countDown: 5
            }
        },


        computed: {
            ...mapGetters({
                loginStatus: 'authenticate/loginStatus',
                loginMessage: 'authenticate/loginMessage'
            })
        },

        methods: {
            login() {
                let loginMessage = null;
                let loginStatus = true;
                this.$store.commit(`authenticate/${LOGIN}`, {
                    loginMessage,
                    loginStatus
                });

                this.$store.dispatch('authenticate/login', {
                    email: this.email,
                    password: this.password
                })
            }
        }
    }
</script>

<style scoped>

</style>
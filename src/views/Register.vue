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
                                <v-toolbar-title>Register form</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form @submit.prevent="register">
                                    <v-text-field
                                            label="Full Name"
                                            name="name"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            v-model="name"
                                    ></v-text-field>


                                    <v-text-field
                                            label="Email"
                                            name="email"
                                            prepend-icon="mdi-email"
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
                                    <v-text-field
                                            id="CPassword"
                                            label="Confirm Password"
                                            name="c_password"
                                            prepend-icon="mdi-lock-check"
                                            type="password"
                                            v-model="confirmPassword"
                                    ></v-text-field>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn type="submit" class="px-16" color="primary">Sign In</v-btn>
                                    </v-card-actions>
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
    export default {
        name: "Register",
        data() {
            return {
                name: null,
                email: null,
                password: null,
                confirmPassword: null
            }
        },
        methods: {
            register() {
                this.$store.dispatch('register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    c_password: this.c_password
                })
            }
        }
    }
</script>

<style scoped>

</style>
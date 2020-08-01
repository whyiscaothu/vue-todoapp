<template>
    <v-container>
        <v-row justify="center">
            <div class="container col-8">

                <v-text-field
                        @keyup.enter="saveTodoWork"
                        ref="insertCursor"
                        v-model="inputTodoWork"
                        label="Type your TODO in here and hit Enter."
                ></v-text-field>
                <v-btn @click="saveTodoWork" class="ma-2" tile color="white" dark>Save</v-btn>



                <v-card
                        tile
                >
                    <v-list flat>
                        <v-list-item-group v-model="item" color="primary">
                            <v-list-item
                                    v-for="(todoFromApi, i) in todoesFromApi"
                                    :key="i"
                            >
                                <v-checkbox></v-checkbox>
                                <v-list-item-content>
                                    <v-list-item-title v-text="todoFromApi.name"></v-list-item-title>
                                </v-list-item-content>
                                <v-btn class="ma-2" text icon color="blue lighten-2">
                                    <v-icon>mdi-edit</v-icon>
                                </v-btn>
                                <v-btn @click="deleteTodoWork(todoFromApi.id)" class="ma-2" text icon color="blue lighten-2">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </div>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        props: {
        },
        data() {
            return {
                inputTodoWork: '',
                item: 1,
                items: [
                    { text: 'Real-Time', icon: 'mdi-clock' },
                    { text: 'Audience', icon: 'mdi-account' },
                    { text: 'Conversions', icon: 'mdi-flag' },
                ],
            }
        },
        methods: {
            async saveTodoWork() {
                if (this.inputTodoWork.length > 0) {
                    await this.$store.dispatch('saveTodoWork', this.inputTodoWork);
                    await this.$store.dispatch('getTodoesFromApi')
                    //remove input text
                    this.inputTodoWork = ''
                }else {
                    this.$refs.insertCursor.focus()
                }
            },
            async deleteTodoWork(id) {
                await this.$store.dispatch('deleteTodoWork', id)
                await this.$store.dispatch('getTodoesFromApi');
            },
        },
        computed: {
            ...mapGetters({
                todoesFromApi: 'todoesFromApi'
            }),
        },

    };
</script>

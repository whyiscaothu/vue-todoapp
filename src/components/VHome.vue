<template>
    <v-container>
        <v-row>
            <div class="col-lg-8 col-md-10 col-sm-12 col-12 mx-auto">

                <v-text-field
                        @keyup.enter="saveTodoWork"
                        ref="insertCursor"
                        v-model="inputTodoWork"
                        label="What need to be done?"
                        :loading="savingInputTodoWork"
                        :disabled="savingInputTodoWork"
                ></v-text-field>

                <v-btn @click="saveTodoWork" class="ma-2 px-16" tile color="success" dark>Save</v-btn>

                <v-card tile>



                    <v-list flat>

                        <v-list-item-group v-model="item" color="primary">

                            <v-skeleton-loader
                                    v-if="savingInputTodoWork"
                                    elevation="1"
                                    type="list-item"
                            ></v-skeleton-loader>

                            <v-list-item
                                    v-for="(todoFromApi, i) in todoesFromApi"
                                    :key="i"
                            >
                                <v-checkbox></v-checkbox>

                                <v-list-item-content>
                                    <v-list-item-title v-text="todoFromApi.name"></v-list-item-title>
                                </v-list-item-content>

                                <div class="text-center">

                                    <v-tooltip top>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                    class="ma-2"
                                                    text
                                                    icon
                                                    @click="deleteTodoWork(todoFromApi.id)"
                                                    color="primary"
                                                    dark
                                                    v-bind="attrs"
                                                    v-on="on"
                                            ><v-icon>mdi-delete</v-icon></v-btn>
                                        </template>
                                        <span>Delete</span>
                                    </v-tooltip>

                                </div>

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
    import CVueScroll from "./CVueScroll";
    export default {
        props: {
        },
        components: {
            CVueScroll
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
                    this.$store.commit('savingInputTodoWork')
                    await this.$store.dispatch('saveTodoWork', this.inputTodoWork);
                    await this.$store.dispatch('getTodoesFromApi');

                    //remove input text
                    this.inputTodoWork = '';
                }else {
                    this.$refs.insertCursor.focus();
                }
            },
            async deleteTodoWork(id) {
                await this.$store.dispatch('deleteTodoWork', id)
                await this.$store.dispatch('getTodoesFromApi');
            },
        },
        computed: {
            ...mapGetters({
                todoesFromApi: 'todoesFromApi',
                savingInputTodoWork: 'savingInputTodoWork'
            }),
        },

    };
</script>

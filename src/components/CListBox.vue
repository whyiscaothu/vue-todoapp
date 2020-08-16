<template>
    <v-container>
        <v-row>
            <div class="col-lg-8 col-md-10 col-sm-12 col-12 mx-auto">

                <slot name="input-field"></slot>

                <v-card tile>
                    <v-list
                            flat
                            elevation="10"
                    >
                        <v-skeleton-loader
                                v-show="savingInputTodoWork"
                                elevation="1"
                                type="list-item"
                        ></v-skeleton-loader>

                        <v-list-item
                                v-for="(todo, i) in todoList"
                                :key="i"
                                :disabled="listTodoWorkId.some((someId) => someId === todo.id)"
                        >
                            <v-hover
                                    v-slot:default="{ hover }"
                            >
                                <v-card
                                        :elevation="hover ? 2 : 0"
                                        class="mx-auto"
                                        min-width="80%"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text="todo.name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-card>
                            </v-hover>

                            <!--infomation icon-->
                            <div class="text-center">
                                <v-tooltip top right>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                                class="ma-2"
                                                icon
                                                color="primary"
                                                v-bind="attrs"
                                                v-on="on"
                                                :disabled="listTodoWorkId.some((someId) => someId === todo.id)"
                                        ><v-icon>mdi-information</v-icon></v-btn>
                                    </template>
                                    <span>{{todo.created_at}}</span>
                                </v-tooltip>
                            </div>

                            <!--Check is complete-->
                            <div class="text-center">
                                <v-tooltip top right>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                                :disabled="disableDeleteButton(todo.id)"
                                                class="ma-2"
                                                text
                                                icon
                                                @click.stop="onCompleteTodoWorkClicked(todo.id)"
                                                color="success"
                                                v-bind="attrs"
                                                v-on="on"
                                        >
                                            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Done</span>
                                </v-tooltip>
                            </div>

                            <!--delete icon-->
                            <div class="text-center">
                                <v-tooltip top right>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                                :disabled="disableDeleteButton(todo.id)"
                                                class="ma-2"
                                                text
                                                icon
                                                @click.stop="onDeleteButtonClicked(todo.id)"
                                                color="red"
                                                v-bind="attrs"
                                                v-on="on"
                                        ><v-icon>mdi-delete</v-icon></v-btn>
                                    </template>
                                    <span>Delete</span>
                                </v-tooltip>
                            </div>
                        </v-list-item>
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

        name: 'CListBox',


        props: {
            todoList: {
                type: Array,
            }
        },


        components: {
            CVueScroll
        },


        data() {
            return {
                listTodoWorkId: [],
                listItemComponentId: [],
                inputTodoWork: '',
                item: 1,
            }
        },


        methods: {

            async onCompleteTodoWorkClicked(completeTodoWorkId) {
                await this.$store.dispatch('updateStatusTodoWork', completeTodoWorkId)
                await this.$store.dispatch('getTodoesFromApi');
            },

            async onDeleteButtonClicked(todoWorkId) {
                this.listTodoWorkId.push(todoWorkId)
                await this.$store.dispatch('deleteTodoWork', todoWorkId)
                await this.$store.dispatch('getTodoesFromApi');
            },

            disableDeleteButton(todoWorkId) {
                return this.listTodoWorkId.some((someId) => someId === todoWorkId)
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

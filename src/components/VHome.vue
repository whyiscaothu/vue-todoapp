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





                    <v-list
                            flat
                            elevation="10"
                    >
                        <v-skeleton-loader
                                v-if="savingInputTodoWork"
                                elevation="1"
                                type="list-item"
                        ></v-skeleton-loader>

                        <v-list-item
                                v-for="(todoFromApi, i) in todoesFromApi"
                                :key="i"
                                :disabled="listTodoWorkId.some((someId) => someId === todoFromApi.id)"
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
                                        <v-list-item-title v-text="todoFromApi.name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-card>
                            </v-hover>
<!--                            <v-list-item-content>-->
<!--                                <v-list-item-title v-text="todoFromApi.name"></v-list-item-title>-->
<!--                            </v-list-item-content>-->

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
                                                :disabled="listTodoWorkId.some((someId) => someId === todoFromApi.id)"
                                        ><v-icon>mdi-information</v-icon></v-btn>
                                    </template>
                                    <span>{{todoFromApi.created_at}}</span>
                                </v-tooltip>
                            </div>

                            <!--Check is complete-->
                            <div class="text-center">
                                <v-tooltip top right>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                                :disabled="disableDeleteButton(todoFromApi.id)"
                                                class="ma-2"
                                                text
                                                icon
                                                @click.stop="onCompleteTodoWorkClicked(todoFromApi.id)"
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
                                                :disabled="disableDeleteButton(todoFromApi.id)"
                                                class="ma-2"
                                                text
                                                icon
                                                @click.stop="onDeleteButtonClicked(todoFromApi.id)"
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
        props: {
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

            onCompleteTodoWorkClicked(completeTodoWorkId) {
                this.$store.dispatch('updateStatusTodoWork', completeTodoWorkId)
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

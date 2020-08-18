<template>
  <div class="home">
    <c-list-box :todoList="todoesWithStatusUndone">

      <slot slot="input-field">
        <v-text-field
                @keyup.enter="saveTodoWork"
                ref="insertCursor"
                v-model="inputTodoWork"
                label="What need to be done?"
                color="info"
                :loading="savingInputTodoWork"
                :disabled="savingInputTodoWork"
        ></v-text-field>

        <v-btn @click="saveTodoWork" class="ma-2 px-16" tile color="success" dark>
          <v-icon>mdi-cloud-upload</v-icon>
          Save
        </v-btn>
      </slot>


      <template
              v-slot:check-complete-btn="{disableDeleteButton, onCompleteTodoWorkClicked, todoId}"
              class="text-center"
      >
        <v-tooltip top right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                    :disabled="disableDeleteButton(todoId)"
                    class="ma-2"
                    text
                    icon
                    @click.stop="onCompleteTodoWorkClicked(todoId)"
                    color="success"
                    v-bind="attrs"
                    v-on="on"
            >
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
          </template>
          <span>Done</span>
        </v-tooltip>
      </template>

    </c-list-box>
  </div>
</template>

<script>
// @ is an alias to /src
import CListBox from '@/components/CListBox.vue'
import {mapGetters} from "vuex";

export default {
  name: 'Home',


  components: {
    CListBox
  },


  data() {
    return {
      inputTodoWork: null,
    }
  },


  methods: {

    async saveTodoWork() {
      if (this.inputTodoWork !== null) {
        this.$store.commit('savingInputTodoWork')
        await this.$store.dispatch('saveTodoWork', this.inputTodoWork);
        await this.$store.dispatch('getTodoesFromApi');

        //remove input text
        this.inputTodoWork = null;
      }else {
        this.$refs.insertCursor.focus();
      }
    },

  },


  computed: {
    ...mapGetters([
      'savingInputTodoWork',
      'todoesWithStatusUndone'
    ]),
  },
}
</script>

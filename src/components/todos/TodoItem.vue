<template>
  <li
    :key="todo.id"
    :class="{ completed: todo.completed, editing: todo === editedTodo }"
  >
    <div class="view">
      <input type="checkbox" v-model="todo.completed" />
      <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
      <button @click="removeTodo(todo)">X</button>
    </div>

    <!-- 编辑待办 -->
    <!-- <input
          type="text"
          class="edit"
          v-model="todo.title"
          v-todo-focus="todo === editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.escape="cancelEdit(todo)"
        /> -->

    <EditTodo
      class="edit"
      v-model:todo-title="todo.title"
      v-todo-focus="todo === editedTodo"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.escape="cancelEdit(todo)"
    ></EditTodo>
  </li>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    editedTodo: Object,
  },
  emits: ["remove-todo", "update:edited-todo"],
  setup(props, { emit }) {
    const state = reactive({
      beforEditCache: "", // 编辑前的 title
    });

    function editTodo(todo) {
      state.beforEditCache = todo.title;
      emit("update:edited-todo", todo);
    }
    function cancelEdit(todo) {
      todo.title = state.beforEditCache;
      emit("update:edited-todo", null);
    }

    function doneEdit(todo) {
      emit("update:edited-todo", null);
    }
    function removeTodo(todo) {
      emit("remove-todo", todo);
    }

    return {
      ...toRefs(state),
      editTodo,
      doneEdit,
      cancelEdit,
      removeTodo,
    };
  },

  directives: {
    "todo-focus": (el, { value }) => {
      if (value) {
        el.focus();
      }
    },
  },
};
</script>

<style scoped>

.completed label {
  text-decoration: line-through;
}

.edit,
.editing .view {
  display: none;
}
.view,
.editing .edit {
  display: block;
}

</style>
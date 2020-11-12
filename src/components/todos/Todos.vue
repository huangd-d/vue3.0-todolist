<template>
  <div>
    <!-- 新增 -->
    <EditTodo
      v-model:todo-title="newTodo"
      @keyup.enter="addTodo"
      autofocus
      placeholder="新增今日待办"
      autocomplete="off"
    ></EditTodo>

    <!-- todo列表 -->
    <ul>
      <TodoItem
        v-for="todo in filterdTodos"
        :key="todo.id"
        :todo="todo"
        v-model:editedTodo="editedTodo"
        @remove-todo="removeTodo"
      ></TodoItem>
    </ul>

    <!-- 过滤 -->
    <Filter :items="filterItems" v-model="visibility"></Filter>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watchEffect } from "vue";

import TodoItem from "./TodoItem.vue";
import Filter from "./Filter.vue";
import { useTodos } from "./useTodos.js";
import { useFilter } from "./useFilter.js";

// 缓存操作

export default {
  components: {
    TodoItem,
    Filter,
  },
  setup() {
    const todoState = reactive({
      newTodo: "",
      editedTodo: null,
    });
    const { todos, addTodo, removeTodo } = useTodos(todoState);

    // const filterState = useFilter(todos);
    const { visibility, filterdTodos, filterItems } = useFilter(todos);

    return {
      //   ...toRefs(filterState),
      ...toRefs(todoState),
      addTodo,
      removeTodo,
      visibility,
      filterdTodos,
      filterItems,
    };
  },
};
</script>

<style scoped>
</style>
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Todos></Todos>
</template>

<script>
import Todos from './components/todos/Todos.vue'

export default {
  name: 'App',
  components: {
    Todos
  }
}
</script>

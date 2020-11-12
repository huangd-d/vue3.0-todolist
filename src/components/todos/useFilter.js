import { reactive, computed, ref } from "vue";
const filter = {
    all(todos) {
        return todos;
    },
    active(todos) {
        return todos.filter((todo) => !todo.completed);
    },
    completed(todos) {
        return todos.filter((todo) => todo.completed);
    },
};

export function useFilter(todos) {
    const visibility = ref("all");
    const filterdTodos = computed(() => {
        return filter[visibility.value](todos.value);
    });
    const filterItems = reactive([
        {
            label: "all",
            value: "all",
        },
        {
            label: "active",
            value: "active",
        },
        {
            label: "completed",
            value: "completed",
        },
    ]);
    // const filterState = reactive({
    //     visibility: "all",
    //     filterItems: ,
    //     filterdTodos:
    // });

    return {
        visibility,
        filterdTodos,
        filterItems,
    };
}

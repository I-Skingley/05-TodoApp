import { db } from "../../db"

export default defineEventHandler((e) => {
    const method = e.req.method;
    const context = e.context;
    // 1) Extract the path parameter (ID)
    const { id } = context.params;

    const findTodoById = (todoId) => {
        // 2) Find todo in db
        let index;
        const todo = db.todos.find((t, i) => {
            if (t.id === todoId) {
                index = i;
                return true;
            }
            return false;
        });

        // 3) Throw error if todo not found
        if (!todo) throw new Error();

        return {todo, index};
    }

    if (method === "PUT") {

        const {todo, index} = findTodoById(id);


        // 4) Update the completed status
        const updateTodo = {
            ...todo,
            completed: !todo.completed,
        };

        db.todos[index] = updateTodo;

        // 5) Return updated todo
        return updateTodo;
    }

    if (method === "DELETE") {
        const {todo, index} = findTodoById(id);
        db.todos.splice(index,1);
        return {
            message: "item deleted"
        }
    }
})
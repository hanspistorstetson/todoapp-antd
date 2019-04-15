import ITodo from "../../models/ITodo";

export const ADD_TODO = 'ADD_TODO'

export interface TodoState {
    todos: ITodo[]
}

interface AddTodoAction {
    type: typeof ADD_TODO;
    todo: ITodo;
}

export type TodoActionTypes = AddTodoAction
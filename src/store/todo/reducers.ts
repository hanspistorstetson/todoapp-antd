import {
    TodoState,
    TodoActionTypes,
    ADD_TODO
} from './types'

const initialState: TodoState = {
    todos: []
}

export const todoReducer = (state = initialState, action: TodoActionTypes): TodoState => {
    switch (action.type) {
        case ADD_TODO:
            return {
                todos: [...state.todos, action.todo]
            }
        default:
            return state;
    }
}